import { Service, Testimonial } from "@/lib/types";

export const services: Service[] = [
  {
    slug: "facial-esthetic",
    name: "フェイシャルエステ",
    kana: "facial esthetic",
    icon: "🧖‍♀️",
    tagline: "心を込めたハンドマッサージで、内側から輝く肌へ",
    description:
      "一人ひとりの肌の状態を見ながら、心を込めたハンドマッサージで丁寧にケアします。リフトアップ効果のある超音波の機械も使用し、お悩みに合わせたパックで仕上げます。",
    points: [
      "心を込めたハンドマッサージ",
      "リフトアップ効果のある超音波の機械を使用",
      "毛穴・美白・シワたるみなど、お悩みに合わせたパックをセレクト",
    ],
    menu: [
      { id: "pore", name: "毛穴ケアコース", description: "気になる毛穴の黒ずみ・詰まりに" },
      { id: "whitening", name: "美白ケアコース", description: "透明感のある肌へ" },
      { id: "lift", name: "シワ・たるみケアコース", description: "リフトアップ機器で引き締めケア" },
    ],
    priceLabel: "¥5,000〜¥8,000",
  },
  {
    slug: "ear-jewelry",
    name: "耳つぼジュエリー",
    kana: "ear reflexology jewelry",
    icon: "💎",
    tagline: "つけたまま過ごせる、かわいいセルフケア",
    description:
      "耳つぼの位置を丁寧に見極め、小さなジュエリーを貼付します。腰痛・血流・美容・痩身など、お悩みに合わせてツボを選びます。シャワーもOKでそのまま日常生活を送れます。",
    points: [
      "お悩みカウンセリングつき",
      "ジュエリーは複数カラー・デザインから選択可",
      "痛みはほとんどありません",
    ],
    menu: [{ id: "ear-jewelry", name: "耳つぼジュエリー" }],
    priceLabel: "¥2,000〜",
  },
];

export const earJewelryTestimonials: Testimonial[] = [
  {
    name: "ご来店のお客様",
    text: "耳つぼジュエリーをつけてもらいました。腰痛・血流・痩身のツボを見ていただいて、左右で少し変えてもらいました。かわいくてお気に入りです。",
  },
  {
    name: "ご来店のお客様",
    text: "可愛い耳つぼアクセサリーを付けていただきました。腰痛・頭痛・痩身のツボに置いてもらって、うれしくて涙が出ました。ありがとうございます。",
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
