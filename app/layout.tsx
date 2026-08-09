import type { Metadata } from "next";
import { Noto_Sans_JP, Shippori_Mincho } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CartProvider } from "@/components/CartProvider";

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const shipporiMincho = Shippori_Mincho({
  variable: "--font-shippori-mincho",
  subsets: ["latin"],
  weight: ["400", "600", "800"],
});

export const metadata: Metadata = {
  title: "花笑み -Hanaemi- | 化粧品・ヘッドスパ・マッサージ・耳つぼジュエリー・ヨガ",
  description:
    "化粧品販売、ヘッドスパ、マッサージ、耳つぼジュエリー、ヨガ。からだとこころに、やさしい時間をお届けするサロン「花笑み -Hanaemi-」の公式サイト。オンラインショップとご予約はこちらから。",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ja"
      className={`${notoSansJP.variable} ${shipporiMincho.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-[var(--color-cream)] text-[var(--color-ink)]">
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
