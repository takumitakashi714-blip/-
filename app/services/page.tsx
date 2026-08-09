import Link from "next/link";
import type { Metadata } from "next";
import { services } from "@/lib/data/services";
import { formatPrice } from "@/lib/format";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "サービス一覧 | 花笑み -Hanaemi-",
  description:
    "ヘッドスパ・マッサージ・耳つぼジュエリー・ヨガのメニューと料金をご紹介します。",
};

export default function ServicesPage() {
  return (
    <div className="container-page py-14">
      <SectionHeading
        eyebrow="Menu"
        title="サービス一覧"
        description="お悩みや気分に合わせてお選びください。メニュー詳細ページからご予約に進めます。"
      />

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {services.map((service) => (
          <Link
            key={service.slug}
            href={`/services/${service.slug}`}
            className="flex flex-col gap-4 rounded-2xl border border-[var(--color-border)] bg-white p-7 transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className="flex items-center gap-3">
              <span className="text-4xl">{service.icon}</span>
              <div>
                <p className="font-brand text-xl text-[var(--color-ink)]">
                  {service.name}
                </p>
                <p className="text-xs uppercase tracking-widest text-[var(--color-ink-soft)]">
                  {service.kana}
                </p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-[var(--color-ink-soft)]">
              {service.tagline}
            </p>
            <ul className="mt-auto space-y-1 border-t border-[var(--color-border)] pt-4 text-sm text-[var(--color-ink)]">
              {service.variants.map((v) => (
                <li key={v.id} className="flex justify-between gap-4">
                  <span>
                    {v.name}（{v.durationMinutes}分）
                  </span>
                  <span className="whitespace-nowrap font-semibold text-[var(--color-primary-dark)]">
                    {formatPrice(v.price)}
                  </span>
                </li>
              ))}
            </ul>
          </Link>
        ))}
      </div>

      <div className="mt-12 rounded-2xl border border-[var(--color-border)] bg-white p-7 text-center">
        <p className="font-brand text-lg text-[var(--color-ink)]">
          化粧品もオンラインでお求めいただけます
        </p>
        <p className="mt-2 text-sm text-[var(--color-ink-soft)]">
          サロンで使用しているオリジナルスキンケアラインをショップページでご紹介しています。
        </p>
        <Link
          href="/shop"
          className="mt-4 inline-block rounded-full bg-[var(--color-primary)] px-6 py-2.5 text-sm font-medium text-white transition hover:bg-[var(--color-primary-dark)]"
        >
          ショップを見る
        </Link>
      </div>
    </div>
  );
}
