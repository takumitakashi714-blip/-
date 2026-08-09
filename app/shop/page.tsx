import Link from "next/link";
import type { Metadata } from "next";
import { products } from "@/lib/data/products";
import { formatPrice } from "@/lib/format";
import SectionHeading from "@/components/SectionHeading";
import AddToCartButton from "@/components/AddToCartButton";

export const metadata: Metadata = {
  title: "オンラインショップ | 花笑み -Hanaemi-",
  description: "花笑みオリジナルスキンケアをオンラインで購入できます。",
};

export default function ShopPage() {
  return (
    <div className="container-page py-14">
      <SectionHeading
        eyebrow="Shop"
        title="オンラインショップ"
        description="サロンで実際に使用しているオリジナルスキンケアラインです。全国へ配送いたします。"
      />

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <div
            key={product.slug}
            className="flex flex-col rounded-2xl border border-[var(--color-border)] bg-white p-6"
          >
            <Link href={`/shop/${product.slug}`} className="flex flex-col items-center text-center">
              <span className="text-5xl">{product.icon}</span>
              <p className="mt-4 text-xs text-[var(--color-ink-soft)]">
                {product.category}
              </p>
              <p className="mt-1 font-brand text-lg text-[var(--color-ink)]">
                {product.name}
              </p>
              <p className="mt-2 text-sm text-[var(--color-ink-soft)]">
                {product.shortDescription}
              </p>
              <p className="mt-3 text-base font-semibold text-[var(--color-primary-dark)]">
                {formatPrice(product.price)}
              </p>
            </Link>
            <div className="mt-5">
              <AddToCartButton product={product} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
