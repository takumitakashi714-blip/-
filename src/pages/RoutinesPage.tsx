import { useState } from 'react'
import { PageHeader } from '../components/PageHeader'
import { useExercises, useRoutines } from '../hooks/useAppData'
import { createId } from '../lib/id'
import type { Routine } from '../types'

export function RoutinesPage() {
  const { exercises } = useExercises()
  const { routines, setRoutines } = useRoutines()
  const [editingId, setEditingId] = useState<string | null>(null)
  const [name, setName] = useState('')
  const [exerciseIds, setExerciseIds] = useState<string[]>([])

  function startNew() {
    setEditingId('new')
    setName('')
    setExerciseIds([])
  }

  function startEdit(routine: Routine) {
    setEditingId(routine.id)
    setName(routine.name)
    setExerciseIds(routine.exerciseIds)
  }

  function cancelEdit() {
    setEditingId(null)
  }

  function toggleExercise(id: string) {
    setExerciseIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }

  function save() {
    const trimmed = name.trim()
    if (!trimmed) return
    if (editingId === 'new') {
      setRoutines([...routines, { id: createId(), name: trimmed, exerciseIds }])
    } else if (editingId) {
      setRoutines(routines.map((r) => (r.id === editingId ? { ...r, name: trimmed, exerciseIds } : r)))
    }
    setEditingId(null)
  }

  function remove(id: string) {
    setRoutines(routines.filter((r) => r.id !== id))
    if (editingId === id) setEditingId(null)
  }

  const exerciseName = (id: string) => exercises.find((e) => e.id === id)?.name ?? '不明な種目'

  return (
    <div>
      <PageHeader title="メニュー管理" />
      <div className="p-4 space-y-4">
        {editingId === null && (
          <button
            type="button"
            onClick={startNew}
            className="w-full rounded-lg bg-indigo-600 text-white font-semibold py-3"
          >
            + 新しいメニューを作成
          </button>
        )}

        {editingId !== null && (
          <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-3 bg-white dark:bg-gray-900 space-y-3">
            <div>
              <label className="block text-sm text-gray-500 mb-1">メニュー名</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="例: 胸の日"
                className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-1">種目を選択</label>
              <div className="flex flex-wrap gap-2">
                {exercises.map((ex) => (
                  <button
                    key={ex.id}
                    type="button"
                    onClick={() => toggleExercise(ex.id)}
                    className={`rounded-full px-3 py-1.5 text-sm border ${
                      exerciseIds.includes(ex.id)
                        ? 'bg-indigo-600 text-white border-indigo-600'
                        : 'border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {ex.name}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={save}
                disabled={!name.trim()}
                className="flex-1 rounded-lg bg-indigo-600 disabled:bg-gray-300 dark:disabled:bg-gray-800 text-white font-semibold py-2"
              >
                保存
              </button>
              <button
                type="button"
                onClick={cancelEdit}
                className="flex-1 rounded-lg bg-gray-200 dark:bg-gray-800 font-semibold py-2"
              >
                キャンセル
              </button>
            </div>
          </div>
        )}

        <div className="space-y-3">
          {routines.map((routine) => (
            <div
              key={routine.id}
              className="rounded-xl border border-gray-200 dark:border-gray-800 p-3 bg-white dark:bg-gray-900"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">{routine.name}</h3>
                <div className="flex gap-3 text-sm">
                  <button type="button" onClick={() => startEdit(routine)} className="text-indigo-600 dark:text-indigo-400">
                    編集
                  </button>
                  <button type="button" onClick={() => remove(routine.id)} className="text-red-500">
                    削除
                  </button>
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                {routine.exerciseIds.length === 0
                  ? '種目未設定'
                  : routine.exerciseIds.map(exerciseName).join('、')}
              </p>
            </div>
          ))}
          {routines.length === 0 && editingId === null && (
            <p className="text-center text-gray-400 py-8">まだメニューがありません</p>
          )}
        </div>
      </div>
    </div>
  )
}
