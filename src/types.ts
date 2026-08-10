export type Exercise = {
  id: string
  name: string
}

export type SetEntry = {
  weight: number
  reps: number
}

export type WorkoutExerciseEntry = {
  exerciseId: string
  sets: SetEntry[]
}

export type WorkoutSession = {
  id: string
  date: string // YYYY-MM-DD
  routineId?: string
  entries: WorkoutExerciseEntry[]
  memo?: string
}

export type Routine = {
  id: string
  name: string
  exerciseIds: string[]
}

export type BodyMetric = {
  id: string
  date: string // YYYY-MM-DD
  weightKg?: number
  bodyFatPercent?: number
}
