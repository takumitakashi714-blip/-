export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
}) {
  return (
    <div className={align === "center" ? "text-center" : "text-left"}>
      {eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-primary)]">
          {eyebrow}
        </p>
      )}
      <h2 className="mt-2 text-2xl font-semibold text-[var(--color-ink)] sm:text-3xl">
        {title}
      </h2>
      {description && (
        <p
          className={`mt-3 text-sm leading-relaxed text-[var(--color-ink-soft)] sm:text-base ${
            align === "center" ? "mx-auto max-w-2xl" : "max-w-2xl"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
