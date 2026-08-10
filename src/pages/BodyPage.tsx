import { useMemo, useState } from 'react'
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { PageHeader } from '../components/PageHeader'
import { useBodyMetrics } from '../hooks/useAppData'
import { createId } from '../lib/id'
import { formatDateJp, todayStr } from '../lib/date'

export function BodyPage() {
  const { bodyMetrics, setBodyMetrics } = useBodyMetrics()
  const [date, setDate] = useState(todayStr)
  const [weight, setWeight] = useState('')
  const [bodyFat, setBodyFat] = useState('')

  const sorted = useMemo(
    () => [...bodyMetrics].sort((a, b) => (a.date < b.date ? 1 : -1)),
    [bodyMetrics],
  )

  const chartData = useMemo(
    () =>
      [...bodyMetrics]
        .sort((a, b) => (a.date < b.date ? -1 : 1))
        .map((m) => ({ date: formatDateJp(m.date), weight: m.weightKg, bodyFat: m.bodyFatPercent })),
    [bodyMetrics],
  )

  function save() {
    const weightKg = weight ? Number(weight) : undefined
    const bodyFatPercent = bodyFat ? Number(bodyFat) : undefined
    if (weightKg === undefined && bodyFatPercent === undefined) return

    const existing = bodyMetrics.find((m) => m.date === date)
    if (existing) {
      setBodyMetrics(
        bodyMetrics.map((m) => (m.id === existing.id ? { ...m, weightKg, bodyFatPercent } : m)),
      )
    } else {
      setBodyMetrics([...bodyMetrics, { id: createId(), date, weightKg, bodyFatPercent }])
    }
    setWeight('')
    setBodyFat('')
  }

  function remove(id: string) {
    setBodyMetrics(bodyMetrics.filter((m) => m.id !== id))
  }

  return (
    <div>
      <PageHeader title="体重・体脂肪" />
      <div className="p-4 space-y-4">
        <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-3 bg-white dark:bg-gray-900 space-y-3">
          <div>
            <label className="block text-sm text-gray-500 mb-1">日付</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2"
            />
          </div>
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="block text-sm text-gray-500 mb-1">体重 (kg)</label>
              <input
                type="number"
                inputMode="decimal"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm text-gray-500 mb-1">体脂肪率 (%)</label>
              <input
                type="number"
                inputMode="decimal"
                value={bodyFat}
                onChange={(e) => setBodyFat(e.target.value)}
                className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2"
              />
            </div>
          </div>
          <button
            type="button"
            onClick={save}
            className="w-full rounded-lg bg-indigo-600 text-white font-semibold py-3"
          >
            保存する
          </button>
        </div>

        {chartData.length > 0 && (
          <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-3 bg-white dark:bg-gray-900 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Line type="monotone" dataKey="weight" name="体重(kg)" stroke="#4f46e5" strokeWidth={2} connectNulls />
                <Line type="monotone" dataKey="bodyFat" name="体脂肪率(%)" stroke="#f59e0b" strokeWidth={2} connectNulls />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}

        <div className="space-y-2">
          {sorted.map((m) => (
            <div
              key={m.id}
              className="flex items-center justify-between rounded-xl border border-gray-200 dark:border-gray-800 p-3 bg-white dark:bg-gray-900 text-sm"
            >
              <span className="font-semibold">{formatDateJp(m.date)}</span>
              <span className="text-gray-600 dark:text-gray-400">
                {m.weightKg !== undefined ? `${m.weightKg}kg` : '-'}
                {m.bodyFatPercent !== undefined ? ` / ${m.bodyFatPercent}%` : ''}
              </span>
              <button type="button" onClick={() => remove(m.id)} className="text-red-500">
                削除
              </button>
            </div>
          ))}
          {sorted.length === 0 && <p className="text-center text-gray-400 py-8">まだ記録がありません</p>}
        </div>
      </div>
    </div>
  )
}
