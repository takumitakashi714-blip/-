export type MuscleKey =
  | 'chest'
  | 'shoulders'
  | 'lats'
  | 'traps'
  | 'lowerBack'
  | 'biceps'
  | 'triceps'
  | 'abs'
  | 'glutes'
  | 'quads'
  | 'hamstrings'
  | 'calves'

export const MUSCLE_LABELS: Record<MuscleKey, string> = {
  chest: '大胸筋',
  shoulders: '三角筋',
  lats: '広背筋',
  traps: '僧帽筋',
  lowerBack: '脊柱起立筋',
  biceps: '上腕二頭筋',
  triceps: '上腕三頭筋',
  abs: '腹筋',
  glutes: '大臀筋',
  quads: '大腿四頭筋',
  hamstrings: 'ハムストリングス',
  calves: 'ふくらはぎ',
}

/**
 * Substring patterns (lowercase, spaces not underscores) used to match mesh
 * names in the anatomy model to one of our training-oriented muscle groups.
 * The model has 467 anatomically named meshes (e.g. "left pectoralis major");
 * these patterns intentionally cover only the meshes relevant to the app's
 * exercises, so most of the 467 meshes simply stay unmatched/neutral.
 */
export const MUSCLE_MESH_PATTERNS: Record<MuscleKey, string[]> = {
  chest: ['pectoralis'],
  shoulders: ['deltoid'],
  lats: ['latissimus'],
  traps: ['trapezius', 'rhomboid'],
  lowerBack: ['longissimus', 'iliocostalis', 'multifidus', 'quadratus lumborum'],
  biceps: ['biceps brachii', 'brachialis'],
  triceps: ['triceps brachii'],
  abs: ['rectus abdominis', 'external oblique', 'internal oblique', 'transversus abdominis'],
  glutes: ['gluteus'],
  quads: ['rectus femoris', 'vastus'],
  hamstrings: ['biceps femoris', 'semitendinosus', 'semimembranosus'],
  calves: ['gastrocnemius', 'soleus', 'plantaris'],
}
