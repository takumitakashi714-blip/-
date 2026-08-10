import { useMemo, useState } from 'react'
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { PageHeader } from '../components/PageHeader'
import { useExercises, useSessions } from '../hooks/useAppData'
import { formatDateJp } from '../lib/date'

export function HistoryPage() {
  const { exercises } = useExercises()
  const { sessions } = useSessions()
  const [exerciseId, setExerciseId] = useState<string>('')

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
                <h3 className="font-semibold mb-1">{formatDateJp(session.date)}</h3>
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
