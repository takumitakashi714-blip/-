import { useMemo, useState } from 'react'
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { PageHeader } from '../components/PageHeader'
import { useExercises, useSessions } from '../hooks/useAppData'
import { formatDateJp } from '../lib/date'
import { importHistoricalSeed } from '../lib/importHistory'
import { HISTORICAL_SESSIONS } from '../data/historicalSeed'

export function HistoryPage() {
  const { exercises, setExercises } = useExercises()
  const { sessions, setSessions } = useSessions()
  const [exerciseId, setExerciseId] = useState<string>('')
  const [importMessage, setImportMessage] = useState<string | null>(null)

  const hasUnimportedHistory = HISTORICAL_SESSIONS.some(
    (seed) => !sessions.some((s) => s.date === seed.date),
  )

  function handleImport() {
    const result = importHistoricalSeed(exercises, sessions)
    setExercises(result.exercises)
    setSessions(result.sessions)
    setImportMessage(
      `${result.addedCount}件の記録を取り込みました${result.skippedCount > 0 ? `(${result.skippedCount}件は同じ日付の記録が既にあるためスキップ)` : ''}。`,
    )
  }

  const sortedSessions = useMemo(
    () => [...sessions].sort((a, b) => (a.date < b.date ? 1 : -1)),
    [sessions],
  )

  const chartData = useMemo(() => {
    if (!exerciseId) return []
    return [...sessions]
      .filter((s) => s.entries.some((e) => e.exerciseId === exerciseId))
      .sort((a, b) => (a.date < b.date ? -1 : 1))
      .map((s) => {
        const entry = s.entries.find((e) => e.exerciseId === exerciseId)!
        const maxWeight = Math.max(...entry.sets.map((set) => set.weight))
        const totalVolume = entry.sets.reduce((sum, set) => sum + set.weight * set.reps, 0)
        return { date: formatDateJp(s.date), maxWeight, totalVolume }
      })
  }, [sessions, exerciseId])

  return (
    <div>
      <PageHeader title="履歴・グラフ" />
      <div className="p-4 space-y-4">
        {hasUnimportedHistory && (
          <div className="rounded-xl border border-indigo-200 dark:border-indigo-900 bg-indigo-50 dark:bg-indigo-950/40 p-3 space-y-2">
            <p className="text-sm text-indigo-800 dark:text-indigo-300">
              2026/6/3〜8/10の過去メモがまだ取り込まれていません。
            </p>
            <button
              type="button"
              onClick={handleImport}
              className="w-full rounded-lg bg-indigo-600 text-white font-semibold py-2 text-sm"
            >
              過去のメモを取り込む
            </button>
          </div>
        )}
        {importMessage && <p className="text-sm text-gray-500">{importMessage}</p>}

        <div>
          <label className="block text-sm text-gray-500 mb-1">種目で絞り込み</label>
          <select
            value={exerciseId}
            onChange={(e) => setExerciseId(e.target.value)}
            className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2"
          >
            <option value="">種目を選択…</option>
            {exercises.map((ex) => (
              <option key={ex.id} value={ex.id}>
                {ex.name}
              </option>
            ))}
          </select>
        </div>

        {exerciseId && (
          <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-3 bg-white dark:bg-gray-900">
            {chartData.length > 0 ? (
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip />
                    <Line type="monotone" dataKey="maxWeight" name="最大重量(kg)" stroke="#4f46e5" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <p className="text-center text-gray-400 py-8">この種目の記録がまだありません</p>
            )}
          </div>
        )}

        <div className="space-y-3">
          <h2 className="font-semibold text-sm text-gray-500">記録一覧</h2>
          {sortedSessions
            .filter((s) => !exerciseId || s.entries.some((e) => e.exerciseId === exerciseId))
            .map((session) => (
              <div
                key={session.id}
                className="rounded-xl border border-gray-200 dark:border-gray-800 p-3 bg-white dark:bg-gray-900"
              >
                <h3 className="font-semibold mb-1">
                  {formatDateJp(session.date)}
                  {session.memo && (
                    <span className="ml-2 text-xs font-normal text-gray-400">{session.memo}</span>
                  )}
                </h3>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-0.5">
                  {session.entries
                    .filter((e) => !exerciseId || e.exerciseId === exerciseId)
                    .map((entry) => {
                      const exName = exercises.find((ex) => ex.id === entry.exerciseId)?.name ?? '不明な種目'
                      return (
                        <li key={entry.exerciseId}>
                          {exName}: {entry.sets.map((s) => `${s.weight}kg×${s.reps}`).join(', ')}
                        </li>
                      )
                    })}
                </ul>
              </div>
            ))}
          {sortedSessions.length === 0 && (
            <p className="text-center text-gray-400 py-8">まだ記録がありません</p>
          )}
        </div>
      </div>
    </div>
  )
}
