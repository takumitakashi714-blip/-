"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/components/CartProvider";

const NAV_LINKS = [
  { href: "/services", label: "サービス" },
  { href: "/shop", label: "ショップ" },
  { href: "/booking", label: "ご予約" },
  { href: "/about", label: "私たちについて" },
  { href: "/contact", label: "お問い合わせ" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const { totalCount } = useCart();

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--color-border)] bg-[var(--color-cream)]/95 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between">
        <Link
          href="/"
          className="font-brand text-xl tracking-wide text-[var(--color-primary-dark)]"
          onClick={() => setOpen(false)}
        >
          花笑み <span className="text-sm tracking-widest">-Hanaemi-</span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-[var(--color-ink-soft)] transition hover:text-[var(--color-primary-dark)]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/cart"
            className="relative flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-ink)] transition hover:border-[var(--color-primary)]"
            aria-label="カートを見る"
          >
            🛍️
            {totalCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--color-primary)] text-xs text-white">
                {totalCount}
              </span>
            )}
          </Link>
          <button
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border)] md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="メニューを開く"
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-[var(--color-border)] bg-[var(--color-cream)] md:hidden">
          <div className="container-page flex flex-col gap-1 py-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded px-2 py-2 text-sm text-[var(--color-ink-soft)] hover:bg-white"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
