import { Service } from "@/lib/types";

export const services: Service[] = [
  {
    slug: "head-spa",
    category: "treatment",
    name: "ヘッドスパ",
    kana: "head spa",
    icon: "💆‍♀️",
    tagline: "頭皮から始まる、うるおいケア",
    description:
      "毎日のスマホやパソコンで凝り固まった頭皮を、じっくりとほぐしていきます。血行を促し、髪と心に軽やかさを取り戻すメニューです。初めての方にも安心のカウンセリング付き。",
    points: [
      "オーガニック頭皮用オイルを使用",
      "肩・首まわりのケアも含めたトータルコース",
      "施術後はノンシリコンシャンプーで仕上げ",
    ],
    variants: [
      {
        id: "relax-45",
        name: "リラックスヘッドスパ",
        durationMinutes: 45,
        price: 5500,
        description: "頭皮の凝りをほぐす基本コース",
      },
      {
        id: "premium-70",
        name: "プレミアムヘッドスパ（炭酸泉＋肩甲骨ケア）",
        durationMinutes: 70,
        price: 8000,
        description: "炭酸泉で毛穴の汚れをオフし、肩甲骨まわりまでケア",
      },
    ],
  },
  {
    slug: "massage",
    category: "treatment",
    name: "マッサージ",
    kana: "massage",
    icon: "💆",
    tagline: "がんばった体に、深いゆるみを",
    description:
      "国家資格を持つ施術者が、その日の体調やお悩みに合わせて圧や流れを調整します。デスクワークによる肩こり・腰の張りから、むくみ対策まで幅広く対応します。",
    points: [
      "お悩みに合わせたオーダーメイド施術",
      "妊娠中の方向けメニューもご相談可能",
      "アロマオイルは数種類からお選びいただけます",
    ],
    variants: [
      {
        id: "part-30",
        name: "部分ケア（肩・首）",
        durationMinutes: 30,
        price: 3500,
      },
      {
        id: "lymph-60",
        name: "リンパドレナージュ",
        durationMinutes: 60,
        price: 7000,
      },
      {
        id: "full-90",
        name: "ボディケア（全身）",
        durationMinutes: 90,
        price: 9500,
      },
    ],
  },
  {
    slug: "ear-jewelry",
    category: "treatment",
    name: "耳つぼジュエリー",
    kana: "ear reflexology jewelry",
    icon: "💎",
    tagline: "つけたまま過ごせる、かわいいセルフケア",
    description:
      "耳つぼの位置を丁寧に見極め、小さなジュエリーシールを貼付します。ダイエットや自律神経、美容など、お悩みに合わせてツボを選びます。シャワーもOKで1〜2週間ほど持続します。",
    points: [
      "お悩みカウンセリングつき",
      "ジュエリーは複数カラー・デザインから選択可",
      "痛みはほとんどありません",
    ],
    variants: [
      {
        id: "single-ear",
        name: "耳つぼジュエリー（片耳）",
        durationMinutes: 20,
        price: 3000,
      },
      {
        id: "double-ear-special",
        name: "両耳スペシャル（お悩み相談付）",
        durationMinutes: 35,
        price: 5000,
      },
    ],
  },
  {
    slug: "yoga",
    category: "class",
    name: "ヨガ",
    kana: "yoga",
    icon: "🧘",
    tagline: "呼吸を整え、自分に還る時間",
    description:
      "少人数制のグループレッスンです。初心者の方には丁寧にポーズをサポートし、経験者の方にはより深い呼吸と動きをご提案します。ヨガマットの無料レンタルあり。",
    points: [
      "少人数制で初心者も安心",
      "ヨガマット無料レンタルあり",
      "動きやすい服装でお越しください",
    ],
    variants: [
      {
        id: "trial-60",
        name: "体験レッスン（初回限定）",
        durationMinutes: 60,
        price: 1000,
      },
      {
        id: "group-60",
        name: "グループヨガレッスン",
        durationMinutes: 60,
        price: 2000,
      },
      {
        id: "private-60",
        name: "プライベートヨガ",
        durationMinutes: 60,
        price: 6000,
      },
    ],
    classTimes: ["10:00", "19:00"],
    capacity: 8,
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function getVariant(service: Service, variantId: string) {
  return service.variants.find((v) => v.id === variantId);
}
