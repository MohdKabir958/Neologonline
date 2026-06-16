"use client";

import Link from "next/link";

export default function CorporateTeaser() {
  return (
    <section className="bg-[var(--surface-container-low)] border-y border-[var(--border-cyan)] py-20 w-full relative overflow-hidden">
      {/* Background Grid Pattern Overlay */}
      <div className="absolute inset-0 map-grid opacity-[0.15] pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-5 md:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Content (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[var(--primary)]/10 border border-[var(--border-cyan)] rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] animate-pulse" />
              <span className="text-[var(--primary)] text-[10px] font-bold tracking-[0.08em] uppercase font-heading">
                Enterprise Infrastructure
              </span>
            </div>
            
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--text-primary)] leading-tight tracking-tight">
              Symmetric Dedicated Leased Lines for Hyderabad&apos;s Businesses
            </h2>
            
            <p className="text-base md:text-lg text-[var(--text-muted)] leading-relaxed max-w-2xl">
              Equip your corporate headquarters, co-working hub, or technology startup with engineered fiber infrastructure. Neolog delivers strict SLA-backed connectivity with zero contention and direct access to major cloud exchanges.
            </p>

            {/* Structured Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-[var(--border-cyan)] pt-6">
              {[
                {
                  title: "1:1 Symmetric Bandwidth",
                  desc: "Guaranteed equal upload/download speeds up to 10 Gbps.",
                  icon: "sync_alt"
                },
                {
                  title: "Fail-Safe Redundancy",
                  desc: "Dual-ring underground optical fiber ring path protection.",
                  icon: "settings_backup_restore"
                },
                {
                  title: "99.99% Uptime Guarantee",
                  desc: "SLA-backed latency and uptime monitored 24/7/365.",
                  icon: "verified_user"
                },
                {
                  title: "Direct IRINN IP Allocation",
                  desc: "Independent IPv4 & IPv6 blocks routed over our ASN.",
                  icon: "lan"
                }
              ].map((feature, i) => (
                <div key={i} className="flex gap-3">
                  <span className="material-symbols-outlined text-[var(--primary)] text-xl mt-0.5 select-none">
                    {feature.icon}
                  </span>
                  <div>
                    <h4 className="font-heading text-sm font-bold text-[var(--text-primary)]">
                      {feature.title}
                    </h4>
                    <p className="text-xs text-[var(--text-muted)] mt-0.5 leading-normal">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 flex flex-wrap gap-4">
              <Link
                href="/corporate"
                className="bg-slate-950 dark:bg-white text-white dark:text-slate-950 px-8 py-3.5 rounded-xl text-xs font-bold hover:opacity-90 transition-opacity uppercase tracking-wider"
              >
                Explore Enterprise Solutions
              </Link>
              <Link
                href="/contact?type=corporate"
                className="technical-border text-[var(--text-primary)] px-8 py-3.5 rounded-xl text-xs font-bold hover:bg-[var(--surface)] transition-all uppercase tracking-wider"
              >
                Request SLA Parameters
              </Link>
            </div>
          </div>

          {/* Right Column: Visual Showcase (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Visual Frame */}
            <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden border border-[var(--border-cyan)] relative group shadow-2xl bg-[var(--surface-container-high)]">
              <img
                src="/images/heroes/corporate.png"
                alt="Corporate Server & Network Infrastructure"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent" />
            </div>

            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { val: "99.99%", label: "Uptime SLA" },
                { val: "10G", label: "Max Speed" },
                { val: "24/7", label: "NOC Engineers" }
              ].map((stat, i) => (
                <div
                  key={i}
                  className="p-4 bg-[var(--surface)] border border-[var(--border-cyan)] rounded-xl text-center active-glow transition-shadow"
                >
                  <p className="font-outfit text-xl sm:text-2xl font-black text-[var(--primary)] mb-0.5">
                    {stat.val}
                  </p>
                  <p className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
