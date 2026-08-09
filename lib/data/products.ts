import { Product } from "@/lib/types";

export const products: Product[] = [
  {
    slug: "lotion",
    name: "化粧水",
    category: "化粧水",
    icon: "🧴",
    price: 3300,
    volume: "150ml",
    shortDescription: "肌の土台を整える、うるおい化粧水",
    description:
      "乾燥しがちな肌にすっとなじみ、うるおいを閉じ込めます。さっぱりとした使用感で、朝晩のケアに。",
    stock: 20,
  },
  {
    slug: "emulsion",
    name: "乳液",
    category: "乳液",
    icon: "💧",
    price: 3600,
    volume: "100ml",
    shortDescription: "うるおいを逃さず、しっとり仕上げる乳液",
    description:
      "化粧水のあとの仕上げに。肌表面を優しく包み込み、うるおいをキープします。",
    stock: 20,
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
