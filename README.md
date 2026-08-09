# 花笑み -Hanaemi-

化粧品販売・ヘッドスパ・マッサージ・耳つぼジュエリー・ヨガ。5つのサービスを展開するサロンの公式サイトです。オンラインでの商品購入と、施術・レッスンのご予約に対応しています。

Next.js（App Router）+ TypeScript + Tailwind CSS で構築し、予約・注文データは SQLite（better-sqlite3）に保存します。

## 主な機能

- **サービス紹介**（ヘッドスパ／マッサージ／耳つぼジュエリー／ヨガ）: メニュー・料金・所要時間の一覧と詳細
- **オンラインショップ**: オリジナルスキンケア商品の一覧・詳細・カート・Stripe Checkout 決済
- **オンライン予約**: 日付・空き時間枠の自動判定(営業時間・定休日・重複予約を考慮)、ヨガはクラス定員制
- **お問い合わせフォーム**

## セットアップ

```bash
npm install
cp .env.example .env.local   # 必要に応じて値を設定
npm run dev
```

http://localhost:3000 で確認できます。

### 環境変数(すべて任意)

`.env.example` を参照してください。

- `STRIPE_SECRET_KEY` を設定すると、ショップの決済が Stripe Checkout(テスト/本番)で実際に動作します。未設定の場合はレジ画面に案内メッセージが表示され、注文は保留されます。
- `SMTP_HOST` / `SMTP_PORT` / `SMTP_USER` / `SMTP_PASS` / `NOTIFY_TO_EMAIL` / `NOTIFY_FROM_EMAIL` を設定すると、新規予約・お問い合わせをメールで通知します。未設定でも予約・お問い合わせ自体は正常に保存されます。

### データの保存先

予約・注文データは `data/app.db`(SQLite、`.gitignore` 対象)に保存されます。本番運用でサーバーレス環境(Vercel など)にデプロイする場合、ファイルシステムが永続化されないため、Turso・PlanetScale・Supabase などの永続化された DB への切り替えを検討してください(`lib/db.ts` が接続の起点です)。

## ディレクトリ構成

```
app/                  ページ・API ルート(App Router)
components/           共有 UI コンポーネント
lib/data/             サービス・商品マスタデータ
lib/db.ts             SQLite 接続・スキーマ
lib/booking.ts        予約の空き枠判定・作成ロジック
lib/orders.ts         注文(Stripe)の保存・更新
lib/notify.ts         メール通知(任意設定)
```

## ビルド

```bash
npm run lint
npm run build
```

## 今後カスタマイズする際のポイント

- 店舗情報(名称・電話番号・住所・営業時間)は `components/Footer.tsx`、`app/contact/page.tsx`、`app/layout.tsx` の metadata に記載しています。実際の情報に差し替えてください。
- サービス・商品のメニューと価格は `lib/data/services.ts` / `lib/data/products.ts` で管理しています。
- 営業時間・定休日・予約の刻み幅は `lib/booking.ts` の定数(`BUSINESS_HOURS` / `LUNCH_BREAK` / `CLOSED_WEEKDAY` / `SLOT_STEP_MINUTES`)で調整できます。
