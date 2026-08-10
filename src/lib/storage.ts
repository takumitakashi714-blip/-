import type { BodyMetric, Exercise, Routine, WorkoutSession } from '../types'
import { createId } from './id'

const KEYS = {
  exercises: 'workout-log:exercises',
  routines: 'workout-log:routines',
  sessions: 'workout-log:sessions',
  bodyMetrics: 'workout-log:body-metrics',
} as const

const DEFAULT_EXERCISES: Exercise[] = [
  'ベンチプレス',
  'スクワット',
  'デッドリフト',
  'ショルダープレス',
  'ラットプルダウン',
  'アームカール',
].map((name) => ({ id: createId(), name }))

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return fallback
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

function write<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value))
}

export function loadExercises(): Exercise[] {
  const existing = read<Exercise[] | null>(KEYS.exercises, null)
  if (existing && existing.length > 0) return existing
  write(KEYS.exercises, DEFAULT_EXERCISES)
  return DEFAULT_EXERCISES
}

export function saveExercises(exercises: Exercise[]): void {
  write(KEYS.exercises, exercises)
}

export function loadRoutines(): Routine[] {
  return read<Routine[]>(KEYS.routines, [])
}

export function saveRoutines(routines: Routine[]): void {
  write(KEYS.routines, routines)
}

export function loadSessions(): WorkoutSession[] {
  return read<WorkoutSession[]>(KEYS.sessions, [])
}

export function saveSessions(sessions: WorkoutSession[]): void {
  write(KEYS.sessions, sessions)
}

export function loadBodyMetrics(): BodyMetric[] {
  return read<BodyMetric[]>(KEYS.bodyMetrics, [])
}

export function saveBodyMetrics(metrics: BodyMetric[]): void {
  write(KEYS.bodyMetrics, metrics)
}
