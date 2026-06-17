"use client";

import Link from "next/link";
import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";

export default function CorporateTeaser() {
  return (
    <section className="bg-[var(--surface-container-low)] border-y border-[var(--border-cyan)] py-24 w-full relative overflow-hidden">
      {/* Background Grid Pattern Overlay */}
      <div className="absolute inset-0 map-grid opacity-[0.08] pointer-events-none" />
      {/* Background glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-[var(--primary)]/3 blur-[180px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[var(--secondary)]/3 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-5 md:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Content (7 cols) */}
          <ScrollReveal variant="left" className="lg:col-span-7">
            <div className="space-y-8 text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[var(--primary)]/8 border border-[var(--border-cyan)] rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] animate-pulse" />
              <span className="text-[var(--primary)] text-[10px] font-bold tracking-[0.1em] uppercase font-heading">
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 border-t border-[var(--border-cyan)] pt-8">
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
                <div key={i} className="flex gap-4 group">
                  <div className="icon-container shrink-0 w-11 h-11 rounded-xl">
                    <span className="material-symbols-outlined text-[var(--primary)] text-[20px]">
                      {feature.icon}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-heading text-sm font-bold text-[var(--text-primary)] mb-1">
                      {feature.title}
                    </h4>
                    <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 flex flex-wrap gap-4">
              <Link
                href="/corporate"
                className="bg-gradient-to-r from-[var(--primary)] to-[#4fc3f7] text-[var(--on-primary)] px-8 py-3.5 rounded-xl text-xs font-bold hover:brightness-110 transition-all uppercase tracking-wider shadow-lg shadow-[var(--primary)]/20 hover:shadow-[var(--primary)]/30 hover:scale-[1.02] duration-300"
              >
                Explore Enterprise Solutions
              </Link>
              <Link
                href="/contact?type=corporate"
                className="glass-card text-[var(--text-primary)] px-8 py-3.5 rounded-xl text-xs font-bold hover:border-[var(--primary)]/50 uppercase tracking-wider"
              >
                Request SLA Parameters
              </Link>
            </div>
            </div>
          </ScrollReveal>

          {/* Right Column: Visual Showcase (5 cols) */}
          <ScrollReveal variant="right" delay={150} className="lg:col-span-5">
            <div className="space-y-6">
            {/* Visual Frame */}
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-br from-[var(--primary)]/20 via-transparent to-[var(--secondary)]/20 rounded-[20px] blur-sm" />
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden premium-shadow group">
                <Image
                  src="/images/heroes/corporate.png"
                  alt="Corporate Server & Network Infrastructure"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent" />
                
                {/* Floating badge on image */}
                <div className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-1.5 bg-black/60 backdrop-blur-sm rounded-full border border-white/10">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-[10px] font-bold text-white uppercase tracking-wider">Network Active</span>
                </div>
              </div>
            </div>

            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { val: "99.99%", label: "Uptime SLA", color: "primary" },
                { val: "10G", label: "Max Speed", color: "primary" },
                { val: "24/7", label: "NOC Engineers", color: "secondary" }
              ].map((stat, i) => (
                <div
                  key={i}
                  className="glass-card rounded-xl p-4 text-center glow-card-cyan"
                >
                  <p className="font-outfit text-xl sm:text-2xl font-black stat-gradient mb-0.5">
                    {stat.val}
                  </p>
                  <p className="text-[9px] font-bold text-[var(--text-muted)] uppercase tracking-wider">
                    {stat.label}
                  </p>
                </div>
              ))}
              </div>
            </div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
}
