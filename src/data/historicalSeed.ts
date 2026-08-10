export type SeedSet = { weight: number; reps: number }
export type SeedEntry = { exerciseName: string; sets: SeedSet[] }
export type SeedSession = { date: string; memo?: string; entries: SeedEntry[] }

const BAR = 20

export const HISTORICAL_SESSIONS: SeedSession[] = [
  {
    date: '2026-06-03',
    memo: '12分ランニング',
    entries: [
      {
        exerciseName: 'スミスマシンインクラインベンチプレス',
        sets: [
          { weight: 50, reps: 7 },
          { weight: 50, reps: 5 },
          { weight: 47.5, reps: 5 },
        ],
      },
      {
        exerciseName: 'ショルダープレス',
        sets: [
          { weight: 20, reps: 10 },
          { weight: 20, reps: 9 },
        ],
      },
      {
        exerciseName: 'ラットプルダウン',
        sets: [
          { weight: 50, reps: 10 },
          { weight: 50, reps: 7 },
        ],
      },
      {
        exerciseName: 'アブドミナル',
        sets: [
          { weight: 50, reps: 8 },
          { weight: 50, reps: 10 },
          { weight: 57.5, reps: 5 },
          { weight: 50, reps: 8 },
        ],
      },
    ],
  },
  {
    date: '2026-06-07',
    memo: 'A',
    entries: [
      {
        exerciseName: 'スミスマシンベンチプレス',
        sets: [
          { weight: 50, reps: 8 },
          { weight: 50, reps: 7 },
          { weight: 50, reps: 6 },
        ],
      },
      {
        exerciseName: 'バーベルスクワット',
        sets: [
          { weight: 43.6, reps: 8 },
          { weight: 43.6, reps: 6 },
        ],
      },
      {
        exerciseName: 'ショルダープレス',
        sets: [
          { weight: 27, reps: 5 },
          { weight: 20, reps: 11 },
          { weight: 20, reps: 9 },
        ],
      },
      {
        exerciseName: 'ラットプルダウン',
        sets: [
          { weight: 50, reps: 12 },
          { weight: 50, reps: 12 },
          { weight: 50, reps: 10 },
        ],
      },
      {
        exerciseName: 'アームカール',
        sets: [
          { weight: BAR, reps: 12 },
          { weight: BAR + 5, reps: 9 },
          { weight: BAR + 5, reps: 12 },
        ],
      },
    ],
  },
  {
    date: '2026-06-09',
    memo: 'B',
    entries: [
      {
        exerciseName: 'アブドミナル',
        sets: [
          { weight: 50, reps: 12 },
          { weight: 50, reps: 8 },
        ],
      },
      {
        exerciseName: 'ローイングマシン',
        sets: [
          { weight: 42.5, reps: 12 },
          { weight: 50, reps: 12 },
          { weight: 50, reps: 12 },
          { weight: 50, reps: 12 },
          { weight: 57.5, reps: 12 },
          { weight: 57.5, reps: 12 },
        ],
      },
      {
        exerciseName: 'チェストプレス',
        sets: [
          { weight: 27.5, reps: 12 },
          { weight: 27.5, reps: 10 },
          { weight: 27.5, reps: 12 },
        ],
      },
      {
        exerciseName: 'レッグプレス',
        sets: [
          { weight: 72.5, reps: 8 },
          { weight: 65, reps: 12 },
          { weight: 65, reps: 13 },
        ],
      },
      {
        exerciseName: 'サイドレイズ',
        sets: [
          { weight: 4, reps: 12 },
          { weight: 4, reps: 14 },
          { weight: 4, reps: 15 },
        ],
      },
      {
        exerciseName: 'ショルダープレス',
        sets: [
          { weight: 27.5, reps: 1 },
          { weight: 20, reps: 8 },
        ],
      },
    ],
  },
  {
    date: '2026-06-12',
    memo: 'C',
    entries: [
      {
        exerciseName: 'バーベルスクワット',
        sets: [
          { weight: BAR, reps: 15 },
          { weight: BAR + 20, reps: 12 },
          { weight: BAR + 30, reps: 8 },
        ],
      },
      {
        exerciseName: 'ダンベルベンチプレス',
        sets: [
          { weight: 5, reps: 10 },
          { weight: 6, reps: 12 },
          { weight: 8, reps: 12 },
        ],
      },
      {
        exerciseName: 'リアレイズ',
        sets: [
          { weight: 8, reps: 12 },
          { weight: 8, reps: 12 },
          { weight: 8, reps: 10 },
        ],
      },
      {
        exerciseName: 'アームカール',
        sets: [
          { weight: BAR + 10, reps: 8 },
          { weight: BAR + 10, reps: 8 },
          { weight: BAR + 10, reps: 8 },
        ],
      },
    ],
  },
  {
    date: '2026-06-15',
    memo: 'A',
    entries: [
      {
        exerciseName: 'ラットプルダウン',
        sets: [
          { weight: 50, reps: 12 },
          { weight: 50, reps: 10 },
          { weight: 50, reps: 10 },
        ],
      },
      {
        exerciseName: 'アームカール',
        sets: [
          { weight: BAR + 10, reps: 10 },
          { weight: BAR + 10, reps: 10 },
          { weight: BAR + 10, reps: 8 },
        ],
      },
      {
        exerciseName: 'ベンチプレス',
        sets: [
          { weight: 40, reps: 8 },
          { weight: 45, reps: 8 },
          { weight: 47.5, reps: 8 },
          { weight: 52.5, reps: 5 },
        ],
      },
      {
        exerciseName: 'バーベルスクワット',
        sets: [
          { weight: BAR, reps: 15 },
          { weight: 40, reps: 11 },
          { weight: 45, reps: 10 },
        ],
      },
      {
        exerciseName: 'アブドミナル',
        sets: [{ weight: 57.5, reps: 12 }],
      },
    ],
  },
  {
    date: '2026-06-24',
    memo: 'B',
    entries: [
      {
        exerciseName: 'スミスマシンインクラインベンチプレス',
        sets: [
          { weight: 53.6, reps: 5 },
          { weight: 53.6, reps: 2 },
          { weight: 48.6, reps: 6 },
        ],
      },
      {
        exerciseName: 'ローイングマシン',
        sets: [
          { weight: 50, reps: 12 },
          { weight: 50, reps: 12 },
          { weight: 57.5, reps: 12 },
          { weight: 57.5, reps: 10 },
          { weight: 57.5, reps: 12 },
          { weight: 57.5, reps: 12 },
        ],
      },
      {
        exerciseName: 'サイドレイズ',
        sets: [
          { weight: 5, reps: 15 },
          { weight: 6, reps: 15 },
          { weight: 6, reps: 14 },
        ],
      },
      {
        exerciseName: 'ダンベルベンチプレス',
        sets: [
          { weight: 8, reps: 12 },
          { weight: 9, reps: 12 },
        ],
      },
    ],
  },
  {
    date: '2026-07-02',
    memo: 'C',
    entries: [
      {
        exerciseName: 'ベンチプレス',
        sets: [
          { weight: 60, reps: 2 },
          { weight: 65, reps: 0 },
          { weight: 55, reps: 5 },
          { weight: 55, reps: 5 },
          { weight: 55, reps: 4 },
        ],
      },
      {
        exerciseName: 'ルーマニアンデッドリフト',
        sets: [
          { weight: 50, reps: 10 },
          { weight: 50, reps: 8 },
          { weight: 50, reps: 8 },
        ],
      },
      {
        exerciseName: '懸垂',
        sets: [
          { weight: 0, reps: 5 },
          { weight: 0, reps: 4.5 },
          { weight: 0, reps: 4 },
        ],
      },
      {
        exerciseName: 'リアレイズ',
        sets: [
          { weight: 5, reps: 12 },
          { weight: 6, reps: 12 },
          { weight: 6, reps: 12 },
        ],
      },
      {
        exerciseName: 'アームカール',
        sets: [
          { weight: BAR + 10, reps: 10 },
          { weight: BAR + 10, reps: 6 },
        ],
      },
      {
        exerciseName: 'ライイングトライセプスエクステンション',
        sets: [
          { weight: BAR, reps: 10 },
          { weight: BAR, reps: 10 },
        ],
      },
    ],
  },
  {
    date: '2026-07-06',
    memo: 'A',
    entries: [
      {
        exerciseName: 'ラットプルダウン',
        sets: [
          { weight: 54, reps: 12 },
          { weight: 54, reps: 9 },
          { weight: 54, reps: 8 },
        ],
      },
      {
        exerciseName: 'ショルダープレス',
        sets: [
          { weight: 20, reps: 12 },
          { weight: 20, reps: 10 },
          { weight: 20, reps: 8 },
        ],
      },
      {
        exerciseName: 'ベンチプレス',
        sets: [
          { weight: 62.5, reps: 0 },
          { weight: 60, reps: 1 },
          { weight: 57.5, reps: 6 },
          { weight: 57.5, reps: 5 },
          { weight: 57.5, reps: 4 },
        ],
      },
      {
        exerciseName: 'アームカール',
        sets: [
          { weight: BAR + 10, reps: 10 },
          { weight: BAR + 10, reps: 9 },
          { weight: BAR + 10, reps: 9 },
        ],
      },
      {
        exerciseName: 'ダンベルスクワット',
        sets: [
          { weight: 18, reps: 15 },
          { weight: 20, reps: 20 },
          { weight: 20, reps: 20 },
        ],
      },
      {
        exerciseName: 'アブドミナル',
        sets: [
          { weight: 45, reps: 10 },
          { weight: 45, reps: 15 },
        ],
      },
    ],
  },
  {
    date: '2026-07-14',
    memo: 'B',
    entries: [
      {
        exerciseName: 'インクラインダンベルプレス',
        sets: [
          { weight: 10, reps: 12 },
          { weight: 10, reps: 12 },
          { weight: 10, reps: 10 },
        ],
      },
      {
        exerciseName: 'サイドレイズ',
        sets: [
          { weight: 6, reps: 15 },
          { weight: 6, reps: 13 },
          { weight: 6, reps: 14 },
        ],
      },
      {
        exerciseName: 'シーテッドロー',
        sets: [
          { weight: 33, reps: 12 },
          { weight: 40, reps: 10 },
          { weight: 40, reps: 12 },
        ],
      },
      {
        exerciseName: 'トライセプスプレスダウン',
        sets: [
          { weight: 21, reps: 10 },
          { weight: 21, reps: 10 },
          { weight: 21, reps: 8.5 },
        ],
      },
      {
        exerciseName: 'レッグプレス',
        sets: [
          { weight: 65, reps: 14 },
          { weight: 65, reps: 15 },
          { weight: 72.5, reps: 15 },
        ],
      },
      {
        exerciseName: 'アブドミナル',
        sets: [
          { weight: 52.5, reps: 12 },
          { weight: 52.5, reps: 15 },
          { weight: 52.5, reps: 12 },
        ],
      },
    ],
  },
  {
    date: '2026-07-18',
    memo: 'C',
    entries: [
      {
        exerciseName: 'ベンチプレス',
        sets: [
          { weight: 60, reps: 2 },
          { weight: 60, reps: 3 },
          { weight: 60, reps: 5 },
          { weight: 60, reps: 4 },
          { weight: 60, reps: 4 },
        ],
      },
      {
        exerciseName: '懸垂',
        sets: [
          { weight: 0, reps: 5 },
          { weight: 0, reps: 4 },
          { weight: 0, reps: 4 },
        ],
      },
      {
        exerciseName: 'アームカール',
        sets: [
          { weight: BAR + 12.5, reps: 8 },
          { weight: BAR + 12.5, reps: 7 },
          { weight: BAR + 12.5, reps: 4 },
        ],
      },
      {
        exerciseName: 'リアレイズ',
        sets: [
          { weight: 7, reps: 10 },
          { weight: 7, reps: 10 },
          { weight: 7, reps: 12 },
        ],
      },
      {
        exerciseName: 'トライセプス',
        sets: [
          { weight: 5, reps: 8 },
          { weight: 6, reps: 8 },
        ],
      },
    ],
  },
  {
    date: '2026-07-23',
    memo: 'A',
    entries: [
      {
        exerciseName: 'ベンチプレス',
        sets: [
          { weight: 62.5, reps: 4 },
          { weight: 62.5, reps: 3 },
          { weight: 62.5, reps: 4 },
          { weight: 60, reps: 5 },
        ],
      },
      {
        exerciseName: 'バーベルスクワット',
        sets: [
          { weight: 60, reps: 10 },
          { weight: 65, reps: 1 },
          { weight: 55, reps: 10 },
        ],
      },
      {
        exerciseName: 'ラットプルダウン',
        sets: [
          { weight: 61, reps: 8 },
          { weight: 61, reps: 8 },
          { weight: 61, reps: 6.5 },
        ],
      },
      {
        exerciseName: 'ショルダープレス',
        sets: [
          { weight: 25, reps: 7 },
          { weight: 25, reps: 6 },
          { weight: 25, reps: 6 },
        ],
      },
      {
        exerciseName: 'アームカール',
        sets: [
          { weight: BAR + 15, reps: 7 },
          { weight: BAR + 15, reps: 5 },
          { weight: BAR + 15, reps: 4 },
        ],
      },
    ],
  },
  {
    date: '2026-07-30',
    memo: 'B',
    entries: [
      {
        exerciseName: 'ベンチプレス',
        sets: [
          { weight: 62.5, reps: 4 },
          { weight: 62.5, reps: 5 },
          { weight: 62.5, reps: 4 },
        ],
      },
      {
        exerciseName: 'シーテッドロー',
        sets: [
          { weight: 40, reps: 15 },
          { weight: 47, reps: 12 },
          { weight: 47, reps: 13 },
        ],
      },
      {
        exerciseName: 'サイドレイズ',
        sets: [
          { weight: 7, reps: 15 },
          { weight: 7, reps: 13 },
          { weight: 7, reps: 12 },
        ],
      },
      {
        exerciseName: 'トライセプス',
        sets: [
          { weight: 20, reps: 5 },
          { weight: 20, reps: 6 },
          { weight: 20, reps: 4 },
        ],
      },
      {
        exerciseName: 'レッグプレス',
        sets: [
          { weight: 72.5, reps: 13 },
          { weight: 72.5, reps: 10 },
        ],
      },
      {
        exerciseName: 'アブドミナル',
        sets: [{ weight: 52.5, reps: 15 }],
      },
    ],
  },
  {
    date: '2026-08-01',
    memo: '合トレ',
    entries: [
      {
        exerciseName: 'デッドリフト',
        sets: [
          { weight: 110, reps: 0 },
          { weight: 90, reps: 10 },
          { weight: 90, reps: 4 },
          { weight: 90, reps: 5 },
          { weight: 90, reps: 4 },
        ],
      },
      {
        exerciseName: 'ベンチプレス',
        sets: [
          { weight: 60, reps: 5 },
          { weight: 60, reps: 5 },
          { weight: 60, reps: 5 },
        ],
      },
      {
        exerciseName: 'サイドレイズ',
        sets: [
          { weight: 7, reps: 15 },
          { weight: 7, reps: 10 },
          { weight: 6, reps: 14 },
          { weight: 6, reps: 15 },
        ],
      },
    ],
  },
  {
    date: '2026-08-08',
    memo: 'C',
    entries: [
      {
        exerciseName: 'ベンチプレス',
        sets: [
          { weight: 65, reps: 3 },
          { weight: 62.5, reps: 4 },
          { weight: 62.5, reps: 5 },
          { weight: 62.5, reps: 2.5 },
        ],
      },
      {
        exerciseName: '懸垂',
        sets: [
          { weight: 0, reps: 7 },
          { weight: 0, reps: 4.5 },
          { weight: 0, reps: 5 },
        ],
      },
      {
        exerciseName: 'アームカール',
        sets: [
          { weight: BAR + 15, reps: 7.5 },
          { weight: BAR + 15, reps: 7 },
          { weight: BAR + 15, reps: 4.5 },
        ],
      },
      {
        exerciseName: 'リアレイズ',
        sets: [
          { weight: 4, reps: 10 },
          { weight: 4, reps: 10 },
          { weight: 4, reps: 10 },
          { weight: 4, reps: 10 },
          { weight: 4, reps: 10 },
          { weight: 4, reps: 10 },
        ],
      },
      {
        exerciseName: 'トライセプス',
        sets: [
          { weight: BAR + 10, reps: 5 },
          { weight: BAR + 10, reps: 10 },
          { weight: BAR + 10, reps: 10 },
        ],
      },
      {
        exerciseName: 'シーテッドレッグカール',
        sets: [
          { weight: 37.5, reps: 20 },
          { weight: 45, reps: 10 },
        ],
      },
    ],
  },
  {
    date: '2026-08-10',
    memo: 'push',
    entries: [
      {
        exerciseName: 'ベンチプレス',
        sets: [
          { weight: 60, reps: 6 },
          { weight: 60, reps: 6 },
        ],
      },
    ],
  },
]
