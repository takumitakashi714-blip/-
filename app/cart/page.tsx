"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/components/CartProvider";
import { formatPrice } from "@/lib/format";

export default function CartPage() {
  const { items, updateQuantity, removeItem, totalPrice } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = async () => {
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(
          data.message ||
            "現在オンライン決済の準備中です。お手数ですがお電話またはお問い合わせフォームよりご注文ください。"
        );
        return;
      }
      window.location.href = data.url;
    } catch {
      setError("通信エラーが発生しました。時間をおいて再度お試しください。");
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="container-page flex flex-col items-center gap-4 py-24 text-center">
        <p className="text-5xl">🛍️</p>
        <p className="font-brand text-xl text-[var(--color-ink)]">
          カートは空です
        </p>
        <Link
          href="/shop"
          className="mt-2 rounded-full bg-[var(--color-primary)] px-6 py-2.5 text-sm font-medium text-white transition hover:bg-[var(--color-primary-dark)]"
        >
          ショップを見る
        </Link>
      </div>
    );
  }

  return (
    <div className="container-page py-14">
      <h1 className="font-brand text-2xl text-[var(--color-ink)]">カート</h1>

      <div className="mt-8 flex flex-col gap-8 lg:flex-row">
        <ul className="flex-1 divide-y divide-[var(--color-border)] rounded-2xl border border-[var(--color-border)] bg-white">
          {items.map((item) => (
            <li key={item.slug} className="flex items-center gap-4 p-5">
              <div className="flex-1">
                <p className="text-sm font-medium text-[var(--color-ink)]">
                  {item.name}
                </p>
                <p className="text-xs text-[var(--color-ink-soft)]">
                  {formatPrice(item.price)}
                </p>
              </div>
              <div className="flex items-center rounded-full border border-[var(--color-border)]">
                <button
                  type="button"
                  className="h-8 w-8 text-[var(--color-ink-soft)]"
                  onClick={() => updateQuantity(item.slug, item.quantity - 1)}
                  aria-label="数量を減らす"
                >
                  −
                </button>
                <span className="w-7 text-center text-sm">{item.quantity}</span>
                <button
                  type="button"
                  className="h-8 w-8 text-[var(--color-ink-soft)]"
                  onClick={() => updateQuantity(item.slug, item.quantity + 1)}
                  aria-label="数量を増やす"
                >
                  +
                </button>
              </div>
              <p className="w-20 text-right text-sm font-semibold text-[var(--color-primary-dark)]">
                {formatPrice(item.price * item.quantity)}
              </p>
              <button
                type="button"
                onClick={() => removeItem(item.slug)}
                className="text-xs text-[var(--color-ink-soft)] hover:text-[var(--color-primary-dark)]"
                aria-label="削除"
              >
                削除
              </button>
            </li>
          ))}
        </ul>

        <div className="h-fit w-full rounded-2xl border border-[var(--color-border)] bg-white p-6 lg:w-80">
          <div className="flex justify-between text-sm text-[var(--color-ink-soft)]">
            <span>小計</span>
            <span>{formatPrice(totalPrice)}</span>
          </div>
          <div className="mt-1 flex justify-between text-sm text-[var(--color-ink-soft)]">
            <span>送料</span>
            <span>ご注文確定後に計算</span>
          </div>
          <div className="mt-4 flex justify-between border-t border-[var(--color-border)] pt-4 text-base font-semibold text-[var(--color-ink)]">
            <span>合計</span>
            <span>{formatPrice(totalPrice)}</span>
          </div>

          {error && (
            <p className="mt-4 rounded-lg bg-[var(--color-primary)]/10 p-3 text-xs leading-relaxed text-[var(--color-primary-dark)]">
              {error}
            </p>
          )}

          <button
            type="button"
            onClick={handleCheckout}
            disabled={loading}
            className="mt-5 w-full rounded-full bg-[var(--color-primary)] px-5 py-3 text-sm font-medium text-white transition hover:bg-[var(--color-primary-dark)] disabled:opacity-60"
          >
            {loading ? "処理中..." : "レジに進む"}
          </button>
          <Link
            href="/shop"
            className="mt-3 block text-center text-xs text-[var(--color-ink-soft)] hover:text-[var(--color-primary-dark)]"
          >
            買い物を続ける
          </Link>
        </div>
      </div>
    </div>
  );
}
