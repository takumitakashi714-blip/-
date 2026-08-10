import { useEffect, useMemo, useState } from 'react'
import { PageHeader } from '../components/PageHeader'
import { useExercises, useRoutines, useSessions } from '../hooks/useAppData'
import { createId } from '../lib/id'
import { todayStr } from '../lib/date'
import type { WorkoutExerciseEntry } from '../types'

export function LogPage() {
  const { exercises, setExercises } = useExercises()
  const { routines } = useRoutines()
  const { sessions, setSessions } = useSessions()

  const [date, setDate] = useState(todayStr)
  const [entries, setEntries] = useState<WorkoutExerciseEntry[]>([])
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [newExerciseName, setNewExerciseName] = useState('')
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const existing = sessions.find((s) => s.date === date)
    setSessionId(existing?.id ?? null)
    setEntries(existing ? existing.entries.map((e) => ({ ...e, sets: e.sets.map((s) => ({ ...s })) })) : [])
    setSaved(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date])

  const exerciseName = useMemo(() => {
    const map = new Map(exercises.map((e) => [e.id, e.name]))
    return (id: string) => map.get(id) ?? '不明な種目'
  }, [exercises])

  function addExercise(exerciseId: string) {
    if (!exerciseId) return
    if (entries.some((e) => e.exerciseId === exerciseId)) return
    setEntries((prev) => [...prev, { exerciseId, sets: [{ weight: 0, reps: 10 }] }])
    setSaved(false)
  }

  function addNewExercise() {
    const name = newExerciseName.trim()
    if (!name) return
    const exercise = { id: createId(), name }
    setExercises([...exercises, exercise])
    setNewExerciseName('')
    addExercise(exercise.id)
  }

  function applyRoutine(routineId: string) {
    const routine = routines.find((r) => r.id === routineId)
    if (!routine) return
    setEntries((prev) => {
      const existingIds = new Set(prev.map((e) => e.exerciseId))
      const additions = routine.exerciseIds
        .filter((id) => !existingIds.has(id))
        .map((id) => ({ exerciseId: id, sets: [{ weight: 0, reps: 10 }] }))
      return [...prev, ...additions]
    })
    setSaved(false)
  }

  function removeExercise(index: number) {
    setEntries((prev) => prev.filter((_, i) => i !== index))
    setSaved(false)
  }

  function addSet(entryIndex: number) {
    setEntries((prev) =>
      prev.map((entry, i) => {
        if (i !== entryIndex) return entry
        const last = entry.sets[entry.sets.length - 1]
        return { ...entry, sets: [...entry.sets, last ? { ...last } : { weight: 0, reps: 10 }] }
      }),
    )
    setSaved(false)
  }

  function removeSet(entryIndex: number, setIndex: number) {
    setEntries((prev) =>
      prev.map((entry, i) =>
        i !== entryIndex ? entry : { ...entry, sets: entry.sets.filter((_, j) => j !== setIndex) },
      ),
    )
    setSaved(false)
  }

  function updateSet(entryIndex: number, setIndex: number, field: 'weight' | 'reps', value: number) {
    setEntries((prev) =>
      prev.map((entry, i) =>
        i !== entryIndex
          ? entry
          : {
              ...entry,
              sets: entry.sets.map((s, j) => (j !== setIndex ? s : { ...s, [field]: value })),
            },
      ),
    )
    setSaved(false)
  }

  function save() {
    const cleanEntries = entries.filter((e) => e.sets.length > 0)
    if (sessionId) {
      setSessions(sessions.map((s) => (s.id === sessionId ? { ...s, entries: cleanEntries } : s)))
    } else if (cleanEntries.length > 0) {
      const id = createId()
      setSessionId(id)
      setSessions([...sessions, { id, date, entries: cleanEntries }])
    }
    setSaved(true)
  }

  return (
    <div>
      <PageHeader title="今日の記録" />
      <div className="p-4 space-y-4">
        <div>
          <label className="block text-sm text-gray-500 mb-1">日付</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2"
          />
        </div>

        {routines.length > 0 && (
          <div>
            <label className="block text-sm text-gray-500 mb-1">メニューから追加</label>
            <select
              defaultValue=""
              onChange={(e) => {
                applyRoutine(e.target.value)
                e.target.value = ''
              }}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2"
            >
              <option value="" disabled>
                メニューを選択…
              </option>
              {routines.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="space-y-3">
          {entries.map((entry, entryIndex) => (
            <div
              key={entry.exerciseId}
              className="rounded-xl border border-gray-200 dark:border-gray-800 p-3 bg-white dark:bg-gray-900"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">{exerciseName(entry.exerciseId)}</h3>
                <button
                  type="button"
                  onClick={() => removeExercise(entryIndex)}
                  className="text-red-500 text-sm"
                >
                  削除
                </button>
              </div>
              <div className="space-y-2">
                {entry.sets.map((set, setIndex) => (
                  <div key={setIndex} className="flex items-center gap-2 text-sm">
                    <span className="w-10 text-gray-500">{setIndex + 1}セット</span>
                    <input
                      type="number"
                      inputMode="decimal"
                      value={set.weight}
                      onChange={(e) => updateSet(entryIndex, setIndex, 'weight', Number(e.target.value))}
                      className="w-20 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-2 py-1"
                    />
                    <span className="text-gray-500">kg ×</span>
                    <input
                      type="number"
                      inputMode="numeric"
                      value={set.reps}
                      onChange={(e) => updateSet(entryIndex, setIndex, 'reps', Number(e.target.value))}
                      className="w-16 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-2 py-1"
                    />
                    <span className="text-gray-500">回</span>
                    <button
                      type="button"
                      onClick={() => removeSet(entryIndex, setIndex)}
                      className="ml-auto text-gray-400"
                      aria-label="セットを削除"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={() => addSet(entryIndex)}
                className="mt-2 text-sm text-indigo-600 dark:text-indigo-400 font-medium"
              >
                + セット追加
              </button>
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-dashed border-gray-300 dark:border-gray-700 p-3 space-y-2">
          <label className="block text-sm text-gray-500">種目を追加</label>
          <select
            defaultValue=""
            onChange={(e) => {
              addExercise(e.target.value)
              e.target.value = ''
            }}
            className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2"
          >
            <option value="" disabled>
              種目を選択…
            </option>
            {exercises.map((ex) => (
              <option key={ex.id} value={ex.id}>
                {ex.name}
              </option>
            ))}
          </select>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="新しい種目名"
              value={newExerciseName}
              onChange={(e) => setNewExerciseName(e.target.value)}
              className="flex-1 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2"
            />
            <button
              type="button"
              onClick={addNewExercise}
              className="rounded-lg bg-gray-200 dark:bg-gray-800 px-3 py-2 text-sm font-medium"
            >
              追加
            </button>
          </div>
        </div>

        <button
          type="button"
          onClick={save}
          disabled={entries.length === 0}
          className="w-full rounded-lg bg-indigo-600 disabled:bg-gray-300 dark:disabled:bg-gray-800 text-white font-semibold py-3"
        >
          {saved ? '保存しました ✓' : '保存する'}
        </button>
      </div>
    </div>
  )
}
