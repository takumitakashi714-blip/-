import Link from "next/link";
import { services } from "@/lib/data/services";
import { products } from "@/lib/data/products";
import { formatPrice } from "@/lib/format";
import SectionHeading from "@/components/SectionHeading";

const highlights = [
  {
    icon: "💄",
    title: "化粧品販売",
    description: "オリジナルスキンケアをオンラインで購入できます。",
    href: "/shop",
  },
  ...services.map((s) => ({
    icon: s.icon,
    title: s.name,
    description: s.tagline,
    href: `/services/${s.slug}`,
  })),
];

const testimonials = [
  {
    name: "40代 女性",
    text: "ヘッドスパのあと、頭が驚くほど軽くなりました。施術中は寝てしまうくらいリラックスできます。",
  },
  {
    name: "30代 女性",
    text: "耳つぼジュエリーがかわいくて、施術のたびに気分が上がります。相談にも親身にのってもらえて安心です。",
  },
  {
    name: "50代 女性",
    text: "ヨガのレッスンは少人数なので、自分のペースで参加できます。先生の声がやさしくて毎回癒されています。",
  },
];

export default function Home() {
  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[var(--color-primary)]/15 blur-3xl" />
        <div className="pointer-events-none absolute -left-24 top-40 h-72 w-72 rounded-full bg-[var(--color-secondary)]/15 blur-3xl" />
        <div className="container-page relative flex flex-col items-center gap-6 py-20 text-center sm:py-28">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--color-primary)]">
            Cosmetics / Head Spa / Massage / Ear Jewelry / Yoga
          </p>
          <h1 className="font-brand max-w-3xl text-3xl leading-relaxed text-[var(--color-ink)] sm:text-5xl sm:leading-relaxed">
            からだとこころに、
            <br className="sm:hidden" />
            やさしい時間を。
          </h1>
          <p className="max-w-xl text-sm leading-relaxed text-[var(--color-ink-soft)] sm:text-base">
            化粧品販売・ヘッドスパ・マッサージ・耳つぼジュエリー・ヨガ。
            5つのメニューで、あなたの「きれい」と「ほっとする時間」に寄り添います。
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              href="/booking"
              className="rounded-full bg-[var(--color-primary)] px-7 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-[var(--color-primary-dark)]"
            >
              ご予約はこちら
            </Link>
            <Link
              href="/shop"
              className="rounded-full border border-[var(--color-border)] bg-white px-7 py-3 text-sm font-medium text-[var(--color-ink)] transition hover:border-[var(--color-primary)]"
            >
              オンラインショップを見る
            </Link>
          </div>
        </div>
      </section>

      <section className="container-page py-14">
        <SectionHeading
          eyebrow="Menu"
          title="5つのサービス"
          description="お客様おひとりおひとりに合わせて、心と体がゆるむ時間をご提案します。"
        />
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {highlights.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group flex flex-col items-center gap-3 rounded-2xl border border-[var(--color-border)] bg-white px-4 py-8 text-center transition hover:-translate-y-1 hover:shadow-md"
            >
              <span className="text-4xl">{item.icon}</span>
              <span className="font-brand text-base text-[var(--color-ink)]">
                {item.title}
              </span>
              <span className="text-xs leading-relaxed text-[var(--color-ink-soft)]">
                {item.description}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="container-page">
          <SectionHeading
            eyebrow="Shop"
            title="人気のスキンケアアイテム"
            description="サロンでも使用しているオリジナルコスメを、ご自宅でも。"
          />
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {products.slice(0, 3).map((product) => (
              <Link
                key={product.slug}
                href={`/shop/${product.slug}`}
                className="flex flex-col rounded-2xl border border-[var(--color-border)] p-6 text-center transition hover:-translate-y-1 hover:shadow-md"
              >
                <span className="mx-auto text-5xl">{product.icon}</span>
                <span className="mt-4 font-brand text-lg">{product.name}</span>
                <span className="mt-1 text-sm text-[var(--color-ink-soft)]">
                  {product.shortDescription}
                </span>
                <span className="mt-4 text-sm font-semibold text-[var(--color-primary-dark)]">
                  {formatPrice(product.price)}
                </span>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/shop"
              className="text-sm font-medium text-[var(--color-primary-dark)] underline underline-offset-4"
            >
              ショップをもっと見る →
            </Link>
          </div>
        </div>
      </section>

      <section className="container-page py-14">
        <SectionHeading eyebrow="Voice" title="お客様の声" />
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="rounded-2xl border border-[var(--color-border)] bg-white p-6"
            >
              <p className="text-sm leading-relaxed text-[var(--color-ink-soft)]">
                &ldquo;{t.text}&rdquo;
              </p>
              <p className="mt-4 text-xs font-semibold text-[var(--color-ink)]">
                {t.name}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[var(--color-secondary)]/10 py-16">
        <div className="container-page flex flex-col items-center gap-5 text-center">
          <h2 className="font-brand text-2xl text-[var(--color-ink)] sm:text-3xl">
            まずは体験してみませんか？
          </h2>
          <p className="max-w-xl text-sm leading-relaxed text-[var(--color-ink-soft)]">
            オンラインで24時間ご予約を受け付けています。初めての方は体験メニューもご用意しています。
          </p>
          <Link
            href="/booking"
            className="rounded-full bg-[var(--color-secondary)] px-7 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-[var(--color-secondary-dark)]"
          >
            空き状況を見て予約する
          </Link>
        </div>
      </section>
    </div>
  );
}
