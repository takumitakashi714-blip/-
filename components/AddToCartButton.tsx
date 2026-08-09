"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/CartProvider";
import { Product } from "@/lib/types";

export default function AddToCartButton({
  product,
  showQuantity = false,
}: {
  product: Product;
  showQuantity?: boolean;
}) {
  const { addItem } = useCart();
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem(
      { slug: product.slug, name: product.name, price: product.price },
      quantity
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="flex items-center gap-3">
      {showQuantity && (
        <div className="flex items-center rounded-full border border-[var(--color-border)]">
          <button
            type="button"
            className="h-9 w-9 text-lg text-[var(--color-ink-soft)]"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            aria-label="数量を減らす"
          >
            −
          </button>
          <span className="w-8 text-center text-sm">{quantity}</span>
          <button
            type="button"
            className="h-9 w-9 text-lg text-[var(--color-ink-soft)]"
            onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
            aria-label="数量を増やす"
          >
            +
          </button>
        </div>
      )}
      <button
        type="button"
        onClick={handleAdd}
        className="flex-1 rounded-full bg-[var(--color-primary)] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[var(--color-primary-dark)]"
      >
        {added ? "カートに追加しました ✓" : "カートに入れる"}
      </button>
      {showQuantity && added && (
        <button
          type="button"
          onClick={() => router.push("/cart")}
          className="whitespace-nowrap text-xs text-[var(--color-primary-dark)] underline underline-offset-4"
        >
          カートを見る
        </button>
      )}
    </div>
  );
}
