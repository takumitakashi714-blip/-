import type { Exercise, WorkoutSession } from '../types'
import { HISTORICAL_SESSIONS } from '../data/historicalSeed'
import { createId } from './id'

export type ImportResult = {
  exercises: Exercise[]
  sessions: WorkoutSession[]
  addedCount: number
  skippedCount: number
}

export function importHistoricalSeed(
  currentExercises: Exercise[],
  currentSessions: WorkoutSession[],
): ImportResult {
  const exercises = [...currentExercises]
  const exerciseIdByName = new Map(exercises.map((e) => [e.name, e.id]))

  function resolveExerciseId(name: string): string {
    const existing = exerciseIdByName.get(name)
    if (existing) return existing
    const id = createId()
    exerciseIdByName.set(name, id)
    exercises.push({ id, name })
    return id
  }

  const existingDates = new Set(currentSessions.map((s) => s.date))
  const newSessions: WorkoutSession[] = []
  let skippedCount = 0

  for (const seed of HISTORICAL_SESSIONS) {
    if (existingDates.has(seed.date)) {
      skippedCount += 1
      continue
    }
    newSessions.push({
      id: createId(),
      date: seed.date,
      memo: seed.memo,
      entries: seed.entries.map((entry) => ({
        exerciseId: resolveExerciseId(entry.exerciseName),
        sets: entry.sets,
      })),
    })
  }

  return {
    exercises,
    sessions: [...currentSessions, ...newSessions],
    addedCount: newSessions.length,
    skippedCount,
  }
}
