import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { products, getProductBySlug } from "@/lib/data/products";
import { formatPrice } from "@/lib/format";
import AddToCartButton from "@/components/AddToCartButton";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return {
    title: `${product.name} | 花笑み -Hanaemi-`,
    description: product.shortDescription,
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  return (
    <div className="container-page py-14">
      <Link
        href="/shop"
        className="text-sm text-[var(--color-ink-soft)] hover:text-[var(--color-primary-dark)]"
      >
        ← ショップに戻る
      </Link>

      <div className="mt-6 flex flex-col gap-10 lg:flex-row">
        <div className="flex flex-1 items-center justify-center rounded-2xl border border-[var(--color-border)] bg-white py-20">
          <span className="text-9xl">{product.icon}</span>
        </div>

        <div className="flex-1">
          <p className="text-xs text-[var(--color-ink-soft)]">{product.category}</p>
          <h1 className="font-brand mt-1 text-3xl text-[var(--color-ink)]">
            {product.name}
          </h1>
          {product.volume && (
            <p className="mt-1 text-sm text-[var(--color-ink-soft)]">
              {product.volume}
            </p>
          )}
          <p className="mt-5 text-2xl font-semibold text-[var(--color-primary-dark)]">
            {formatPrice(product.price)}
            <span className="ml-1 text-sm font-normal text-[var(--color-ink-soft)]">
              （税込）
            </span>
          </p>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-[var(--color-ink-soft)]">
            {product.description}
          </p>

          <div className="mt-8 max-w-sm">
            <AddToCartButton product={product} showQuantity />
          </div>

          <p className="mt-6 text-xs text-[var(--color-ink-soft)]">
            在庫: {product.stock} 点 ／ ご注文確定後、通常3〜5営業日でお届けします。
          </p>
        </div>
      </div>
    </div>
  );
}
