import { useMemo, useState } from 'react'
import { PageHeader } from '../components/PageHeader'
import { MuscleBody3D } from '../components/MuscleBody3D'
import { useExercises } from '../hooks/useAppData'
import { EXERCISE_MUSCLES } from '../data/exerciseMuscles'
import { MUSCLE_LABELS } from '../data/muscleGroups'

export function MusclePage() {
  const { exercises } = useExercises()
  const [exerciseName, setExerciseName] = useState<string>('')

  const activeName = exerciseName || exercises[0]?.name || ''
  const engagement = EXERCISE_MUSCLES[activeName]
  const primary = useMemo(() => engagement?.primary ?? [], [engagement])
  const secondary = useMemo(() => engagement?.secondary ?? [], [engagement])

  return (
    <div>
      <PageHeader title="部位を見る" />
      <div className="p-4 space-y-4">
        <div>
          <label className="block text-sm text-gray-500 mb-1">種目を選択</label>
          <select
            value={activeName}
            onChange={(e) => setExerciseName(e.target.value)}
            className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2"
          >
            {exercises.map((ex) => (
              <option key={ex.id} value={ex.name}>
                {ex.name}
              </option>
            ))}
          </select>
        </div>

        <div
          className="rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-950"
          style={{ height: 420 }}
        >
          <MuscleBody3D primary={primary} secondary={secondary} />
        </div>

        <div className="flex flex-wrap gap-2">
          {primary.map((m) => (
            <span key={m} className="rounded-full bg-red-600 text-white text-xs px-3 py-1 font-semibold">
              {MUSCLE_LABELS[m]}(主働筋)
            </span>
          ))}
          {secondary.map((m) => (
            <span
              key={m}
              className="rounded-full bg-orange-300 dark:bg-orange-900 text-orange-900 dark:text-orange-200 text-xs px-3 py-1 font-semibold"
            >
              {MUSCLE_LABELS[m]}(補助筋)
            </span>
          ))}
          {primary.length === 0 && secondary.length === 0 && (
            <p className="text-sm text-gray-400">この種目の部位データはまだ登録されていません</p>
          )}
        </div>

        <p className="text-xs text-gray-400 text-center">ドラッグで360度回転できます</p>
        <p className="text-[10px] text-gray-400 text-center">
          人体モデル: BodyParts3D © DBCLS (CC BY-SA 2.1 JP) / Z-Anatomy (CC BY-SA 4.0)
        </p>
      </div>
    </div>
  )
}
