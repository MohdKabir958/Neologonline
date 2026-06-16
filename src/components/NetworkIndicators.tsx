import React from "react";

export default function NetworkIndicators() {
  return (
    <section className="bg-[var(--surface-container-low)] py-12 border-y border-[var(--border-cyan)]/50 overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-5 md:px-16">
        <div className="mb-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.05em] text-[var(--primary)] mb-2">
            Enterprise Infrastructure
          </p>
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-[var(--text-primary)]">
            Network Trust & Capability Indicators
          </h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {/* Fiber Coverage */}
          <div className="p-5 technical-border rounded-xl bg-[var(--surface)] text-center flex flex-col items-center justify-center group hover:border-[var(--primary)] transition-all">
            <span className="material-symbols-outlined text-[var(--primary)] text-[36px] mb-4 group-hover:scale-110 transition-transform">
              cable
            </span>
            <p className="font-outfit text-3xl font-bold text-[var(--text-primary)] mb-1">
              2,700+
            </p>
            <p className="text-xs font-bold uppercase tracking-wider text-[var(--primary)] mb-2">
              Fiber Coverage
            </p>
            <p className="text-[10px] text-[var(--text-muted)] leading-relaxed">
              Kilometers of Engineered Optical Fiber
            </p>
          </div>

          {/* Backbone Capacity */}
          <div className="p-5 technical-border rounded-xl bg-[var(--surface)] text-center flex flex-col items-center justify-center group hover:border-[var(--primary)] transition-all">
            <span className="material-symbols-outlined text-[var(--primary)] text-[36px] mb-4 group-hover:scale-110 transition-transform">
              speed
            </span>
            <p className="font-outfit text-3xl font-bold text-[var(--text-primary)] mb-1 flex items-baseline justify-center gap-1">
              50 <span className="text-xl font-medium">Gbps</span>
            </p>
            <p className="text-xs font-bold uppercase tracking-wider text-[var(--primary)] mb-2">
              Backbone Capacity
            </p>
            <p className="text-[10px] text-[var(--text-muted)] leading-relaxed">
              Total Network Capacity
            </p>
          </div>

          {/* Active Bandwidth Consumption */}
          <div className="p-5 technical-border rounded-xl bg-[var(--surface)] text-center flex flex-col items-center justify-center group hover:border-[var(--primary)] transition-all col-span-2 sm:col-span-1">
            <span className="material-symbols-outlined text-[var(--primary)] text-[36px] mb-4 group-hover:scale-110 transition-transform">
              network_check
            </span>
            <p className="font-outfit text-3xl font-bold text-[var(--text-primary)] mb-1 flex items-baseline justify-center gap-1">
              42+ <span className="text-xl font-medium">Gbps</span>
            </p>
            <p className="text-xs font-bold uppercase tracking-wider text-[var(--primary)] mb-2 leading-tight">
              Active Bandwidth Consumption
            </p>
            <p className="text-[10px] text-[var(--text-muted)] leading-relaxed">
              Real-time data traffic<br/>Historical peak: 80+ Gbps
            </p>
          </div>

          {/* 40G Ring 1 */}
          <div className="p-5 technical-border rounded-xl bg-[var(--surface)] text-center flex flex-col items-center justify-center group hover:border-[var(--secondary)] transition-all">
            <span className="material-symbols-outlined text-[var(--secondary)] text-[36px] mb-4 group-hover:scale-110 transition-transform">
              all_inclusive
            </span>
            <p className="font-outfit text-3xl font-bold text-[var(--text-primary)] mb-1">
              40G
            </p>
            <p className="text-xs font-bold uppercase tracking-wider text-[var(--secondary)] mb-2">
              Ring 1 Primary
            </p>
            <p className="text-[10px] text-[var(--text-muted)] leading-relaxed">
              Metro Core Network
            </p>
          </div>

          {/* 40G Ring 2 */}
          <div className="p-5 technical-border rounded-xl bg-[var(--surface)] text-center flex flex-col items-center justify-center group hover:border-[var(--secondary)] transition-all">
            <span className="material-symbols-outlined text-[var(--secondary)] text-[36px] mb-4 group-hover:scale-110 transition-transform">
              sync_alt
            </span>
            <p className="font-outfit text-3xl font-bold text-[var(--text-primary)] mb-1">
              40G
            </p>
            <p className="text-xs font-bold uppercase tracking-wider text-[var(--secondary)] mb-2">
              Ring 2 Core
            </p>
            <p className="text-[10px] text-[var(--text-muted)] leading-relaxed">
              High-Capacity Transit
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
