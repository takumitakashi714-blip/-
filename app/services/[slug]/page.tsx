import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  services,
  getServiceBySlug,
  earJewelryTestimonials,
} from "@/lib/data/services";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return {
    title: `${service.name} | 花笑み -Hanaemi-`,
    description: service.description,
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  return (
    <div className="container-page py-14">
      <Link
        href="/services"
        className="text-sm text-[var(--color-ink-soft)] hover:text-[var(--color-primary-dark)]"
      >
        ← サービス一覧に戻る
      </Link>

      <div className="mt-6 flex flex-col gap-8 lg:flex-row">
        <div className="flex-1">
          <div className="flex items-center gap-4">
            <span className="text-5xl">{service.icon}</span>
            <div>
              <h1 className="font-brand text-3xl text-[var(--color-ink)]">
                {service.name}
              </h1>
              <p className="text-xs uppercase tracking-widest text-[var(--color-ink-soft)]">
                {service.kana}
              </p>
            </div>
          </div>

          <p className="mt-6 text-lg text-[var(--color-primary-dark)]">
            {service.tagline}
          </p>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[var(--color-ink-soft)]">
            {service.description}
          </p>

          <ul className="mt-6 space-y-2">
            {service.points.map((point) => (
              <li
                key={point}
                className="flex items-start gap-2 text-sm text-[var(--color-ink)]"
              >
                <span className="mt-0.5 text-[var(--color-secondary)]">✓</span>
                {point}
              </li>
            ))}
          </ul>

          {service.slug === "ear-jewelry" && (
            <div className="mt-10">
              <p className="font-brand text-lg text-[var(--color-ink)]">
                お客様の声
              </p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {earJewelryTestimonials.map((t, i) => (
                  <div
                    key={i}
                    className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white"
                  >
                    {t.image && (
                      <Image
                        src={t.image}
                        alt={`耳つぼジュエリーを実際に付けたお客様の写真${i + 1}`}
                        width={869}
                        height={1883}
                        className="w-full"
                      />
                    )}
                    <div className="p-5">
                      <p className="text-sm leading-relaxed text-[var(--color-ink-soft)]">
                        &ldquo;{t.text}&rdquo;
                      </p>
                      <p className="mt-3 text-xs font-semibold text-[var(--color-ink)]">
                        {t.name}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="w-full max-w-md shrink-0">
          <div className="rounded-2xl border border-[var(--color-border)] bg-white p-6">
            <p className="font-brand text-lg text-[var(--color-ink)]">
              メニューと料金
            </p>
            <p className="mt-2 text-2xl font-semibold text-[var(--color-primary-dark)]">
              {service.priceLabel}
            </p>
            <ul className="mt-4 space-y-3 border-t border-[var(--color-border)] pt-4">
              {service.menu.map((item) => (
                <li key={item.id} className="text-sm">
                  <p className="font-medium text-[var(--color-ink)]">
                    {item.name}
                  </p>
                  {item.description && (
                    <p className="mt-0.5 text-xs text-[var(--color-ink-soft)]">
                      {item.description}
                    </p>
                  )}
                </li>
              ))}
            </ul>
            <Link
              href="/contact"
              className="mt-5 block rounded-full bg-[var(--color-primary)] px-4 py-2.5 text-center text-sm font-medium text-white transition hover:bg-[var(--color-primary-dark)]"
            >
              ご来店・お問い合わせはこちら
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
