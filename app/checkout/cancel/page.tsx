import Link from "next/link";

export default function CheckoutCancelPage() {
  return (
    <div className="container-page flex flex-col items-center gap-4 py-24 text-center">
      <p className="text-5xl">🛒</p>
      <h1 className="font-brand text-2xl text-[var(--color-ink)]">
        お手続きがキャンセルされました
      </h1>
      <p className="max-w-md text-sm leading-relaxed text-[var(--color-ink-soft)]">
        カートの内容はそのまま保存されています。いつでも購入手続きを再開できます。
      </p>
      <Link
        href="/cart"
        className="mt-2 rounded-full bg-[var(--color-primary)] px-6 py-2.5 text-sm font-medium text-white transition hover:bg-[var(--color-primary-dark)]"
      >
        カートに戻る
      </Link>
    </div>
  );
}
