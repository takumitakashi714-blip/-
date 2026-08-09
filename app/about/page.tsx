import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "私たちについて | 花笑み -Hanaemi-",
  description: "花笑み -Hanaemi- の想いとこだわりをご紹介します。",
};

const values = [
  {
    icon: "🌿",
    title: "からだにやさしい素材選び",
    text: "施術やスキンケアに使用するアイテムは、肌への負担が少ないものを厳選しています。",
  },
  {
    icon: "🗣️",
    title: "丁寧なカウンセリング",
    text: "施術前に体調やお悩みをじっくり伺い、おひとりおひとりに合わせたご提案をします。",
  },
  {
    icon: "🏠",
    title: "地域に根ざしたサロン",
    text: "地元のお客様に長く通っていただける、あたたかい雰囲気づくりを大切にしています。",
  },
];

export default function AboutPage() {
  return (
    <div className="container-page py-14">
      <SectionHeading eyebrow="About" title="私たちについて" />

      <div className="mx-auto mt-10 max-w-2xl text-center">
        <p className="text-sm leading-loose text-[var(--color-ink-soft)]">
          「花笑み -Hanaemi-」は、化粧品販売・ヘッドスパ・マッサージ・耳つぼジュエリー・ヨガの5つのメニューを通して、
          日々がんばる皆さまの体と心にやさしい時間をお届けするサロンです。
          <br />
          <br />
          忙しい毎日の中でも、少し立ち止まって自分をいたわる時間を持ってほしい。
          そんな想いから、施術メニューだけでなく、ご自宅でも使えるスキンケアアイテムの販売や、
          気軽に参加できるヨガクラスもご用意しています。
          <br />
          <br />
          はじめての方も安心してお越しいただけるよう、カウンセリングを大切にしています。
          ちいさな不調やお悩みも、どうぞお気軽にお聞かせください。
        </p>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {values.map((v) => (
          <div
            key={v.title}
            className="rounded-2xl border border-[var(--color-border)] bg-white p-6 text-center"
          >
            <span className="text-3xl">{v.icon}</span>
            <p className="mt-3 font-brand text-base text-[var(--color-ink)]">
              {v.title}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-[var(--color-ink-soft)]">
              {v.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
