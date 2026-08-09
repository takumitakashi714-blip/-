import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-[var(--color-border)] bg-white">
      <div className="container-page grid gap-8 py-12 md:grid-cols-3">
        <div>
          <p className="font-brand text-lg text-[var(--color-primary-dark)]">
            花笑み <span className="text-sm">-Hanaemi-</span>
          </p>
          <p className="mt-3 text-sm leading-relaxed text-[var(--color-ink-soft)]">
            化粧品販売・フェイシャルエステ・耳つぼジュエリー。
            <br />
            からだとこころに、やさしい時間をお届けします。
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold text-[var(--color-ink)]">
            サイトマップ
          </p>
          <ul className="mt-3 space-y-2 text-sm text-[var(--color-ink-soft)]">
            <li>
              <Link href="/services" className="hover:text-[var(--color-primary-dark)]">
                サービス一覧
              </Link>
            </li>
            <li>
              <Link href="/shop" className="hover:text-[var(--color-primary-dark)]">
                オンラインショップ
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-[var(--color-primary-dark)]">
                私たちについて
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-[var(--color-primary-dark)]">
                お問い合わせ
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold text-[var(--color-ink)]">
            営業時間・定休日
          </p>
          <ul className="mt-3 space-y-1 text-sm text-[var(--color-ink-soft)]">
            <li>10:00 〜 19:00（最終受付 18:00）</li>
            <li>定休日：毎週水曜日</li>
            <li className="pt-2">
              <a
                href="tel:0000000000"
                className="hover:text-[var(--color-primary-dark)]"
              >
                TEL. 000-0000-0000
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-[var(--color-border)] py-4 text-center text-xs text-[var(--color-ink-soft)]">
        © {new Date().getFullYear()} 花笑み -Hanaemi-
      </div>
    </footer>
  );
}
