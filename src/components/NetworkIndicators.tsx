import React from "react";
import ScrollReveal from "@/components/ScrollReveal";

export default function NetworkIndicators() {
  return (
    <section className="bg-[var(--surface-container-low)] py-16 border-y border-[var(--border-cyan)]/50 overflow-hidden section-glow">
      <div className="max-w-[1280px] mx-auto px-5 md:px-16">
        {/* Section Header */}
        <ScrollReveal variant="up">
          <div className="mb-12 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[var(--primary)]/8 border border-[var(--border-cyan)] rounded-full mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] animate-pulse" />
              <span className="text-[var(--primary)] text-[10px] font-bold tracking-[0.1em] uppercase">
                Live Infrastructure
              </span>
            </div>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-[var(--text-primary)] tracking-tight">
              Network Trust & Capability Indicators
            </h2>
          </div>
        </ScrollReveal>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {/* Fiber Coverage */}
          <ScrollReveal variant="up" delay={0}>
            <div className="glass-card rounded-2xl p-6 text-center flex flex-col items-center justify-center group glow-card-cyan relative overflow-hidden h-full">
            <div className="absolute inset-0 bg-gradient-to-b from-[var(--primary)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <div className="icon-container mb-4 relative z-10">
              <span className="material-symbols-outlined text-[var(--primary)] text-[24px]">
                cable
              </span>
            </div>
            <p className="font-outfit text-3xl font-bold stat-gradient mb-1 relative z-10">
              2,700+
            </p>
            <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--primary)] mb-2 relative z-10">
              Fiber Coverage
            </p>
            <p className="text-[10px] text-[var(--text-muted)] leading-relaxed relative z-10">
              Kilometers of Engineered Optical Fiber
            </p>
            </div>
          </ScrollReveal>

          {/* Backbone Capacity */}
          <ScrollReveal variant="up" delay={80}>
            <div className="glass-card rounded-2xl p-6 text-center flex flex-col items-center justify-center group glow-card-cyan relative overflow-hidden h-full">
            <div className="absolute inset-0 bg-gradient-to-b from-[var(--primary)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <div className="icon-container mb-4 relative z-10">
              <span className="material-symbols-outlined text-[var(--primary)] text-[24px]">
                speed
              </span>
            </div>
            <p className="font-outfit text-3xl font-bold stat-gradient mb-1 flex items-baseline justify-center gap-1 relative z-10">
              50 <span className="text-xl font-medium">Gbps</span>
            </p>
            <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--primary)] mb-2 relative z-10">
              Backbone Capacity
            </p>
            <p className="text-[10px] text-[var(--text-muted)] leading-relaxed relative z-10">
              Total Network Capacity
            </p>
            </div>
          </ScrollReveal>

          {/* Active Bandwidth Consumption */}
          <ScrollReveal variant="up" delay={160}>
            <div className="glass-card rounded-2xl p-6 text-center flex flex-col items-center justify-center group glow-card-cyan col-span-2 sm:col-span-1 relative overflow-hidden h-full">
            <div className="absolute inset-0 bg-gradient-to-b from-[var(--primary)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <div className="icon-container mb-4 relative z-10">
              <span className="material-symbols-outlined text-[var(--primary)] text-[24px]">
                network_check
              </span>
            </div>
            <p className="font-outfit text-3xl font-bold stat-gradient mb-1 flex items-baseline justify-center gap-1 relative z-10">
              42+ <span className="text-xl font-medium">Gbps</span>
            </p>
            <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--primary)] mb-2 leading-tight relative z-10">
              Active Bandwidth
            </p>
            <p className="text-[10px] text-[var(--text-muted)] leading-relaxed relative z-10">
              Real-time data traffic<br/>Peak: 80+ Gbps
            </p>
            </div>
          </ScrollReveal>

          {/* 40G Ring 1 */}
          <ScrollReveal variant="up" delay={240}>
            <div className="glass-card rounded-2xl p-6 text-center flex flex-col items-center justify-center group glow-card-gold relative overflow-hidden h-full">
            <div className="absolute inset-0 bg-gradient-to-b from-[var(--secondary)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <div className="icon-container mb-4 relative z-10" style={{ background: 'linear-gradient(135deg, rgba(255,185,90,0.15) 0%, rgba(255,185,90,0.05) 100%)', borderColor: 'rgba(255,185,90,0.2)' }}>
              <span className="material-symbols-outlined text-[var(--secondary)] text-[24px]">
                all_inclusive
              </span>
            </div>
            <p className="font-outfit text-3xl font-bold text-[var(--text-primary)] mb-1 relative z-10">
              40G
            </p>
            <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--secondary)] mb-2 relative z-10">
              Ring 1 Primary
            </p>
            <p className="text-[10px] text-[var(--text-muted)] leading-relaxed relative z-10">
              Metro Core Network
            </p>
            </div>
          </ScrollReveal>

          {/* 40G Ring 2 */}
          <ScrollReveal variant="up" delay={320}>
            <div className="glass-card rounded-2xl p-6 text-center flex flex-col items-center justify-center group glow-card-gold relative overflow-hidden h-full">
            <div className="absolute inset-0 bg-gradient-to-b from-[var(--secondary)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <div className="icon-container mb-4 relative z-10" style={{ background: 'linear-gradient(135deg, rgba(255,185,90,0.15) 0%, rgba(255,185,90,0.05) 100%)', borderColor: 'rgba(255,185,90,0.2)' }}>
              <span className="material-symbols-outlined text-[var(--secondary)] text-[24px]">
                sync_alt
              </span>
            </div>
            <p className="font-outfit text-3xl font-bold text-[var(--text-primary)] mb-1 relative z-10">
              40G
            </p>
            <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--secondary)] mb-2 relative z-10">
              Ring 2 Core
            </p>
            <p className="text-[10px] text-[var(--text-muted)] leading-relaxed relative z-10">
              High-Capacity Transit
            </p>
            </div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
}
