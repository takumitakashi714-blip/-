import { useCallback, useState } from 'react'
import type { BodyMetric, Exercise, Routine, WorkoutSession } from '../types'
import {
  loadBodyMetrics,
  loadExercises,
  loadRoutines,
  loadSessions,
  saveBodyMetrics,
  saveExercises,
  saveRoutines,
  saveSessions,
} from '../lib/storage'

export function useExercises() {
  const [exercises, setExercises] = useState<Exercise[]>(loadExercises)

  const update = useCallback((next: Exercise[]) => {
    setExercises(next)
    saveExercises(next)
  }, [])

  return { exercises, setExercises: update }
}

export function useRoutines() {
  const [routines, setRoutines] = useState<Routine[]>(loadRoutines)

  const update = useCallback((next: Routine[]) => {
    setRoutines(next)
    saveRoutines(next)
  }, [])

  return { routines, setRoutines: update }
}

export function useSessions() {
  const [sessions, setSessions] = useState<WorkoutSession[]>(loadSessions)

  const update = useCallback((next: WorkoutSession[]) => {
    setSessions(next)
    saveSessions(next)
  }, [])

  return { sessions, setSessions: update }
}

export function useBodyMetrics() {
  const [bodyMetrics, setBodyMetrics] = useState<BodyMetric[]>(loadBodyMetrics)

  const update = useCallback((next: BodyMetric[]) => {
    setBodyMetrics(next)
    saveBodyMetrics(next)
  }, [])

  return { bodyMetrics, setBodyMetrics: update }
}
