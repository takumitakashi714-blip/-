import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import BookingForm from "@/components/BookingForm";

export const metadata: Metadata = {
  title: "ご予約 | 花笑み -Hanaemi-",
  description: "ヘッドスパ・マッサージ・耳つぼジュエリー・ヨガのご予約はこちらから。",
};

export default async function BookingPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string; variant?: string }>;
}) {
  const { service, variant } = await searchParams;

  return (
    <div className="container-page py-14">
      <SectionHeading
        eyebrow="Reservation"
        title="ご予約"
        description="ご希望のメニュー・日時をお選びいただき、必要事項をご入力ください。定休日は毎週水曜日、営業時間は10:00〜19:00です。"
      />
      <div className="mt-10">
        <BookingForm initialServiceSlug={service} initialVariantId={variant} />
      </div>
    </div>
  );
}
