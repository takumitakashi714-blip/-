"use client";

import { useState } from "react";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "送信に失敗しました。");
        return;
      }
      setSent(true);
    } catch {
      setError("通信エラーが発生しました。時間をおいて再度お試しください。");
    } finally {
      setSubmitting(false);
    }
  };

  if (sent) {
    return (
      <div className="rounded-2xl border border-[var(--color-border)] bg-white p-8 text-center">
        <p className="text-3xl">✉️</p>
        <p className="mt-3 font-brand text-lg text-[var(--color-ink)]">
          お問い合わせありがとうございます
        </p>
        <p className="mt-2 text-sm text-[var(--color-ink-soft)]">
          内容を確認のうえ、担当より折り返しご連絡いたします。
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-5 rounded-2xl border border-[var(--color-border)] bg-white p-6 sm:p-8"
    >
      <label className="flex flex-col gap-1.5 text-sm">
        <span className="font-medium text-[var(--color-ink)]">お名前</span>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="rounded-lg border border-[var(--color-border)] px-3 py-2.5 text-sm"
          placeholder="山田 花子"
        />
      </label>
      <label className="flex flex-col gap-1.5 text-sm">
        <span className="font-medium text-[var(--color-ink)]">メールアドレス</span>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="rounded-lg border border-[var(--color-border)] px-3 py-2.5 text-sm"
          placeholder="example@email.com"
        />
      </label>
      <label className="flex flex-col gap-1.5 text-sm">
        <span className="font-medium text-[var(--color-ink)]">お問い合わせ内容</span>
        <textarea
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={5}
          className="rounded-lg border border-[var(--color-border)] px-3 py-2.5 text-sm"
          placeholder="ご質問・ご相談などお気軽にどうぞ"
        />
      </label>

      {error && (
        <p className="rounded-lg bg-[var(--color-primary)]/10 p-3 text-sm text-[var(--color-primary-dark)]">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="rounded-full bg-[var(--color-primary)] px-6 py-3 text-sm font-medium text-white transition hover:bg-[var(--color-primary-dark)] disabled:opacity-60"
      >
        {submitting ? "送信中..." : "送信する"}
      </button>
    </form>
  );
}
