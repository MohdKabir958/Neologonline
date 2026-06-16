import { Plan } from "@/lib/types";
import Link from "next/link";

interface PlanCardProps {
  plan: Plan;
  showSpeed?: boolean;
}

export default function PlanCard({ plan, showSpeed = true }: PlanCardProps) {
  const isPopular = plan.isPopular;

  return (
    <div
      className={`relative p-8 rounded-xl transition-all group ${
        isPopular
          ? "border-2 border-[var(--primary)] active-glow lg:-translate-y-4"
          : "technical-border hover:border-[var(--primary)]"
      } bg-[var(--surface)]`}
    >
      {/* Popular badge */}
      {isPopular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[var(--primary)] text-[var(--on-primary)] px-4 py-1 rounded-full text-xs font-semibold uppercase tracking-[0.05em]">
          Best Value
        </div>
      )}

      {/* Plan name */}
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.05em] text-[var(--text-muted)] mb-2">
          {plan.name}
        </p>
        <p className="text-sm text-[var(--text-muted)] mb-3">
          {plan.description}
        </p>
        <div className="flex items-baseline gap-1">
          <span
            className={`font-outfit text-4xl font-bold ${
              isPopular ? "text-[var(--primary)]" : "text-[var(--text-primary)]"
            }`}
          >
            ₹{plan.price.toLocaleString("en-IN")}
          </span>
          <span className="text-sm text-[var(--text-muted)]">/mo</span>
        </div>
      </div>

      {/* Speed */}
      {showSpeed && (
        <div className="flex items-center gap-2 mb-6">
          <span className="material-symbols-outlined text-[var(--primary)] text-lg">
            speed
          </span>
          <span className="font-outfit text-xl font-bold text-[var(--text-primary)]">
            {plan.speed} {plan.speedUnit}
          </span>
        </div>
      )}

      {/* Features */}
      <ul className="space-y-3 mb-8">
        {plan.features.map((feature, i) => (
          <li
            key={i}
            className="flex items-center gap-3 text-sm text-[var(--text-primary)]"
          >
            <span className="material-symbols-outlined text-[var(--primary)] text-[18px]">
              check_circle
            </span>
            {feature}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <Link
        href={`/new-connection?plan=${plan.id}`}
        className={`block w-full py-3 rounded-lg text-sm font-bold text-center transition-all ${
          isPopular
            ? "bg-[var(--primary)] text-[var(--on-primary)] hover:brightness-110"
            : "technical-border text-[var(--text-primary)] group-hover:bg-[var(--primary)]/10 group-hover:border-[var(--primary)]"
        }`}
      >
        {plan.ctaLabel}
      </Link>
    </div>
  );
}
