interface SectionHeaderProps {
  overline?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export default function SectionHeader({
  overline,
  title,
  subtitle,
  centered = true,
}: SectionHeaderProps) {
  return (
    <div className={`mb-12 ${centered ? "text-center" : ""}`}>
      {overline && (
        <p className="text-xs font-semibold uppercase tracking-[0.05em] text-[var(--primary)] mb-3">
          {overline}
        </p>
      )}
      <h2 className="font-heading text-3xl md:text-[32px] font-bold leading-tight text-[var(--text-primary)] mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-base text-[var(--text-muted)] max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}
