import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { services, getServiceBySlug } from "@/lib/data/services";
import { formatPrice } from "@/lib/format";

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

          {service.category === "class" && service.classTimes && (
            <p className="mt-6 rounded-xl bg-[var(--color-secondary)]/10 p-4 text-sm text-[var(--color-ink)]">
              開催時間：{service.classTimes.join(" / ")}（各回定員 {service.capacity} 名の少人数制）
            </p>
          )}
        </div>

        <div className="w-full max-w-md shrink-0">
          <div className="rounded-2xl border border-[var(--color-border)] bg-white p-6">
            <p className="font-brand text-lg text-[var(--color-ink)]">
              メニューと料金
            </p>
            <ul className="mt-4 space-y-4">
              {service.variants.map((variant) => (
                <li
                  key={variant.id}
                  className="rounded-xl border border-[var(--color-border)] p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-[var(--color-ink)]">
                        {variant.name}
                      </p>
                      <p className="text-xs text-[var(--color-ink-soft)]">
                        {variant.durationMinutes}分
                      </p>
                      {variant.description && (
                        <p className="mt-1 text-xs text-[var(--color-ink-soft)]">
                          {variant.description}
                        </p>
                      )}
                    </div>
                    <p className="whitespace-nowrap text-sm font-semibold text-[var(--color-primary-dark)]">
                      {formatPrice(variant.price)}
                    </p>
                  </div>
                  <Link
                    href={`/booking?service=${service.slug}&variant=${variant.id}`}
                    className="mt-3 block rounded-full bg-[var(--color-primary)] px-4 py-2 text-center text-xs font-medium text-white transition hover:bg-[var(--color-primary-dark)]"
                  >
                    この内容で予約する
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
