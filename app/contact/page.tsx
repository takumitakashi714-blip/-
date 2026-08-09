import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "お問い合わせ | 花笑み -Hanaemi-",
  description: "花笑み -Hanaemi- へのお問い合わせはこちらから。",
};

export default function ContactPage() {
  return (
    <div className="container-page py-14">
      <SectionHeading
        eyebrow="Contact"
        title="お問い合わせ"
        description="ご予約についてのご質問や、メニューに関するご相談などお気軽にお問い合わせください。"
      />

      <div className="mx-auto mt-10 grid max-w-4xl gap-8 lg:grid-cols-2">
        <ContactForm />

        <div className="rounded-2xl border border-[var(--color-border)] bg-white p-6 sm:p-8">
          <p className="font-brand text-lg text-[var(--color-ink)]">
            お電話でのお問い合わせ
          </p>
          <a
            href="tel:0000000000"
            className="mt-2 block text-2xl font-semibold text-[var(--color-primary-dark)]"
          >
            000-0000-0000
          </a>
          <p className="mt-1 text-xs text-[var(--color-ink-soft)]">
            受付時間 10:00〜19:00（水曜定休）
          </p>

          <div className="mt-6 border-t border-[var(--color-border)] pt-6">
            <p className="font-brand text-lg text-[var(--color-ink)]">アクセス</p>
            <p className="mt-2 text-sm leading-relaxed text-[var(--color-ink-soft)]">
              〒000-0000
              <br />
              ○○県○○市○○ 0-0-0
              <br />
              ○○駅より徒歩5分
            </p>
          </div>

          <div className="mt-6 border-t border-[var(--color-border)] pt-6">
            <p className="font-brand text-lg text-[var(--color-ink)]">営業時間</p>
            <p className="mt-2 text-sm leading-relaxed text-[var(--color-ink-soft)]">
              10:00〜19:00（最終受付 18:00）
              <br />
              定休日：毎週水曜日
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
