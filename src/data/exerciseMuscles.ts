import type { MuscleKey } from './muscleGroups'

export type MuscleEngagement = {
  primary: MuscleKey[]
  secondary?: MuscleKey[]
}

export const EXERCISE_MUSCLES: Record<string, MuscleEngagement> = {
  ベンチプレス: { primary: ['chest'], secondary: ['shoulders', 'triceps'] },
  スミスマシンベンチプレス: { primary: ['chest'], secondary: ['shoulders', 'triceps'] },
  スミスマシンインクラインベンチプレス: { primary: ['chest'], secondary: ['shoulders', 'triceps'] },
  インクラインダンベルプレス: { primary: ['chest'], secondary: ['shoulders', 'triceps'] },
  ダンベルベンチプレス: { primary: ['chest'], secondary: ['shoulders', 'triceps'] },
  チェストプレス: { primary: ['chest'], secondary: ['shoulders', 'triceps'] },

  スクワット: { primary: ['quads'], secondary: ['glutes', 'hamstrings'] },
  バーベルスクワット: { primary: ['quads'], secondary: ['glutes', 'hamstrings'] },
  ダンベルスクワット: { primary: ['quads'], secondary: ['glutes', 'hamstrings'] },
  レッグプレス: { primary: ['quads'], secondary: ['glutes', 'hamstrings'] },

  デッドリフト: { primary: ['hamstrings', 'glutes'], secondary: ['lowerBack', 'traps'] },
  ルーマニアンデッドリフト: { primary: ['hamstrings', 'glutes'], secondary: ['lowerBack'] },
  シーテッドレッグカール: { primary: ['hamstrings'] },
  カーフレイズ: { primary: ['calves'] },

  ショルダープレス: { primary: ['shoulders'], secondary: ['triceps'] },
  サイドレイズ: { primary: ['shoulders'] },
  リアレイズ: { primary: ['shoulders'], secondary: ['traps'] },

  ラットプルダウン: { primary: ['lats'], secondary: ['biceps', 'traps'] },
  懸垂: { primary: ['lats'], secondary: ['biceps', 'traps'] },
  シーテッドロー: { primary: ['lats'], secondary: ['biceps', 'traps'] },
  ローイングマシン: { primary: ['lats'], secondary: ['biceps', 'traps'] },

  アームカール: { primary: ['biceps'] },
  トライセプス: { primary: ['triceps'] },
  トライセプスプレスダウン: { primary: ['triceps'] },
  ライイングトライセプスエクステンション: { primary: ['triceps'] },

  アブドミナル: { primary: ['abs'] },
}
