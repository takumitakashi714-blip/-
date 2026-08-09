import { Product } from "@/lib/types";

export const products: Product[] = [
  {
    slug: "moisture-lotion",
    name: "潤いモイスチャーローション",
    category: "化粧水",
    icon: "🧴",
    price: 3300,
    volume: "150ml",
    shortDescription: "肌の土台を整える、とろみ化粧水",
    description:
      "ヒアルロン酸とセラミド配合で、乾燥しがちな肌にすっとなじみながらもうるおいを閉じ込めます。さっぱりとした使用感で、朝晩のケアに。",
    stock: 20,
  },
  {
    slug: "moisture-serum",
    name: "うるおい美容液",
    category: "美容液",
    icon: "💧",
    price: 5500,
    volume: "30ml",
    shortDescription: "気になる乾燥・ハリ不足に集中アプローチ",
    description:
      "植物由来のオイルとビタミン誘導体を配合した美容液です。年齢とともに気になるハリ・ツヤ不足に、少量でしっかり浸透します。",
    stock: 15,
  },
  {
    slug: "night-cream",
    name: "ふっくらナイトクリーム",
    category: "クリーム",
    icon: "🫙",
    price: 4800,
    volume: "40g",
    shortDescription: "眠っている間にふっくら肌へ導くクリーム",
    description:
      "夜のスキンケアの仕上げに。濃密なテクスチャーが肌表面を優しく包み込み、翌朝のもちもち感を叶えます。",
    stock: 18,
  },
  {
    slug: "gentle-cleansing-foam",
    name: "やさしい泡洗顔料",
    category: "洗顔料",
    icon: "🧼",
    price: 2600,
    volume: "100g",
    shortDescription: "もっちり泡で、肌をこすらず洗える",
    description:
      "きめ細かい泡が汚れや余分な皮脂を吸着し、必要なうるおいは残して洗い上げます。敏感肌の方にも使いやすい処方です。",
    stock: 25,
  },
  {
    slug: "trial-set",
    name: "スキンケア トライアルセット",
    category: "セット",
    icon: "🎁",
    price: 3900,
    volume: "化粧水・美容液・クリーム 各ミニサイズ",
    shortDescription: "はじめての方におすすめのミニセット",
    description:
      "化粧水・美容液・クリームをミニサイズでお試しいただけるセットです。ご自宅用はもちろん、プレゼントにも人気です。",
    stock: 30,
  },
  {
    slug: "scalp-oil",
    name: "頭皮ケア スカルプオイル",
    category: "ヘアケア",
    icon: "🌿",
    price: 4200,
    volume: "50ml",
    shortDescription: "ヘッドスパの仕上がりを自宅でも",
    description:
      "サロンのヘッドスパでも使用しているオーガニックブレンドオイル。頭皮マッサージ用に、軽やかな使用感に仕上げました。",
    stock: 16,
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
