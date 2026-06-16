export function CardSkeleton({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-pulse bg-[var(--surface)] technical-border rounded-xl p-8 ${className}`}
    >
      <div className="h-4 bg-[var(--surface-variant)] rounded w-1/3 mb-4" />
      <div className="h-8 bg-[var(--surface-variant)] rounded w-1/2 mb-6" />
      <div className="space-y-3">
        <div className="h-3 bg-[var(--surface-variant)] rounded w-full" />
        <div className="h-3 bg-[var(--surface-variant)] rounded w-4/5" />
        <div className="h-3 bg-[var(--surface-variant)] rounded w-3/5" />
      </div>
      <div className="h-10 bg-[var(--surface-variant)] rounded-lg mt-8" />
    </div>
  );
}

export function PlanCardSkeleton() {
  return <CardSkeleton />;
}

export function TextSkeleton({
  lines = 3,
  className = "",
}: {
  lines?: number;
  className?: string;
}) {
  return (
    <div className={`animate-pulse space-y-3 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="h-3 bg-[var(--surface-variant)] rounded"
          style={{ width: `${100 - i * 15}%` }}
        />
      ))}
    </div>
  );
}

export function StatCardSkeleton() {
  return (
    <div className="animate-pulse technical-border rounded-xl p-6 bg-[var(--surface)]">
      <div className="h-3 bg-[var(--surface-variant)] rounded w-2/3 mb-3" />
      <div className="h-7 bg-[var(--surface-variant)] rounded w-1/2 mb-2" />
      <div className="h-3 bg-[var(--surface-variant)] rounded w-full" />
    </div>
  );
}

export function BlogCardSkeleton() {
  return (
    <div className="animate-pulse technical-border rounded-xl overflow-hidden bg-[var(--surface)]">
      <div className="h-48 bg-[var(--surface-variant)]" />
      <div className="p-6 space-y-3">
        <div className="flex gap-4">
          <div className="h-3 bg-[var(--surface-variant)] rounded w-20" />
          <div className="h-3 bg-[var(--surface-variant)] rounded w-24" />
        </div>
        <div className="h-5 bg-[var(--surface-variant)] rounded w-3/4" />
        <div className="h-3 bg-[var(--surface-variant)] rounded w-full" />
        <div className="h-3 bg-[var(--surface-variant)] rounded w-2/3" />
      </div>
    </div>
  );
}

export function TableSkeleton({ rows = 3 }: { rows?: number }) {
  return (
    <div className="animate-pulse space-y-2">
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="flex gap-4 p-4 technical-border rounded-lg"
        >
          <div className="h-4 bg-[var(--surface-variant)] rounded flex-1" />
          <div className="h-4 bg-[var(--surface-variant)] rounded w-24" />
          <div className="h-4 bg-[var(--surface-variant)] rounded w-20" />
        </div>
      ))}
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <StatCardSkeleton key={i} />
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <CardSkeleton className="h-[300px]" />
        </div>
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <CardSkeleton key={i} className="h-[72px]" />
          ))}
        </div>
      </div>
    </div>
  );
}
