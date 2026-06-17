import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import SectionHeader from "@/components/ui/SectionHeader";
import NetworkIndicators from "@/components/NetworkIndicators";
import ArchitectureStack from "@/components/ArchitectureStack";

export const metadata: Metadata = {
  title: "About Us | Neolog Online Services",
  description:
    "Learn about Neolog Online Services Pvt. Ltd. — Class B ISP License holder since 2020. Hyderabad's trusted enterprise infrastructure partner.",
};

export default function AboutPage() {
  return (
    <>
      {/* Breadcrumbs */}
      <div className="bg-[var(--surface)]">
        <div className="max-w-[1280px] mx-auto px-5 md:px-16 pt-4 pb-2 flex items-center gap-2 text-xs font-semibold text-[var(--text-muted)] select-none">
          <Link href="/" className="hover:text-[var(--primary)] transition-colors">Home</Link>
          <span className="material-symbols-outlined text-[14px] leading-none opacity-40">chevron_right</span>
          <span className="text-[var(--text-primary)]">About Us</span>
        </div>
      </div>

      {/* Hero */}
      <section className="relative bg-[var(--surface)] border-b border-[var(--border-cyan)] overflow-hidden">
        <div className="absolute inset-0 map-grid opacity-20"></div>
        <div className="relative max-w-[1280px] mx-auto px-5 md:px-16 pt-8 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[var(--primary)]/10 technical-border rounded-full mb-6">
                <span className="material-symbols-outlined text-[16px] text-[var(--primary)]">
                  verified
                </span>
                <span className="text-[var(--primary)] text-xs font-semibold tracking-[0.05em] uppercase">
                  Class B ISP License — Established 2020
                </span>
              </div>
              <h1 className="font-heading text-4xl md:text-[54px] font-bold leading-tight text-[var(--text-primary)] mb-4">
                Neolog Online Services Pvt. Ltd.
              </h1>
              <p className="text-lg md:text-xl text-[var(--primary)] font-medium mb-6">
                Enterprise Infrastructure Partner
              </p>
              <p className="text-base text-[var(--text-muted)] max-w-2xl leading-relaxed mb-6">
                Powering Telangana & Andhra Pradesh with carrier-grade fiber backbones, 
                zero-trust architecture, and resilient business continuity infrastructure.
              </p>
              <div className="flex flex-wrap gap-4 text-xs font-semibold uppercase tracking-wider text-[var(--text-primary)]">
                <div className="flex items-center gap-2 bg-[var(--surface-container)] px-4 py-2 rounded-lg technical-border">
                  <span className="w-2 h-2 rounded-full bg-[var(--primary)]" />
                  High Availability
                </div>
                <div className="flex items-center gap-2 bg-[var(--surface-container)] px-4 py-2 rounded-lg technical-border">
                  <span className="w-2 h-2 rounded-full bg-[var(--primary)]" />
                  Scalable
                </div>
                <div className="flex items-center gap-2 bg-[var(--surface-container)] px-4 py-2 rounded-lg technical-border">
                  <span className="w-2 h-2 rounded-full bg-[var(--primary)]" />
                  Secure
                </div>
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden technical-border relative shadow-2xl">
                <Image
                  src="/images/heroes/about.png"
                  alt="Neolog Network Infrastructure"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Quote */}
      <section className="max-w-[1280px] mx-auto px-5 md:px-16 py-12">
        <div className="p-8 md:p-12 bg-gradient-to-r from-[var(--surface-container-low)] to-[var(--surface-container-high)] technical-border rounded-2xl text-center relative overflow-hidden">
          <div className="absolute -top-10 -left-10 text-[180px] font-serif text-[var(--primary)]/5 select-none">
            &ldquo;
          </div>
          <p className="relative font-heading text-2xl md:text-3xl italic font-bold text-[var(--text-primary)] max-w-3xl mx-auto leading-relaxed">
            &ldquo;We do not deliver retail connectivity. We deliver business continuity infrastructure.&rdquo;
          </p>
          <div className="mt-4 text-xs font-semibold uppercase tracking-widest text-[var(--primary)]">
            Core Brand Statement
          </div>
        </div>
      </section>

      {/* Company Identity & Registered Info */}
      <section className="max-w-[1280px] mx-auto px-5 md:px-16 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="font-heading text-3xl font-bold text-[var(--text-primary)] mb-6">
            Corporate Identity
          </h2>
          <p className="text-base text-[var(--text-muted)] leading-relaxed mb-6">
            Neolog Online Services Private Limited is a licensed Class B Internet Service Provider 
            offering enterprise digital infrastructure since 2020. We engineering bespoke network solutions 
            with independent IP resources, dual-carrier path upstreams, and fully compliant routing.
          </p>
          <div className="technical-border rounded-xl p-6 bg-[var(--surface)] space-y-4">
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-[var(--primary)] text-[20px] mt-0.5">
                location_on
              </span>
              <div>
                <p className="text-sm font-bold text-[var(--text-primary)]">
                  Registered Headquarters
                </p>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                  12-13-97, Flat No. 403, Tara Tykoon, Tarnaka, Secunderabad, Telangana – 500017, India
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 pt-3 border-t border-[var(--border-cyan)]/50">
              <span className="material-symbols-outlined text-[var(--primary)] text-[20px]">
                language
              </span>
              <p className="text-sm font-bold text-[var(--primary)] hover:underline">
                <a href="https://www.neologbroadband.com" target="_blank" rel="noopener noreferrer">
                  www.neologbroadband.com
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Network & Infrastructure Stats */}
        <div>
          <h2 className="font-heading text-3xl font-bold text-[var(--text-primary)] mb-6 text-center lg:text-left">
            Network & Infrastructure
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {[
              { value: "2,700+ km", label: "Optical Fiber" },
              { value: "50 Gbps", label: "Total Capacity" },
              { value: "42+ Gbps", label: "Active Bandwidth" },
              { value: "80+ Gbps", label: "Historical Peak" },
              { value: "100+", label: "Active Circuits" },
              { value: "5 Zones", label: "Coverage Zones" },
            ].map((stat, i) => (
              <div
                key={i}
                className="p-4 text-center technical-border rounded-xl bg-[var(--surface)] hover:border-[var(--primary)] transition-all"
              >
                <p className="font-outfit text-xl font-bold text-[var(--primary)] mb-1">
                  {stat.value}
                </p>
                <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider font-medium">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Network Indicators ────────────────────────── */}
      <NetworkIndicators />

      {/* Metro Ring Architecture & Hardware Stack */}
      <ArchitectureStack />

      {/* CDN & Peering / SLA Metrics */}
      <section className="max-w-[1280px] mx-auto px-5 md:px-16 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* CDN Table */}
        <div>
          <h2 className="font-heading text-2xl font-bold text-[var(--text-primary)] mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined text-[var(--primary)]">hub</span>
            CDN & Peering (30 Gbps Total)
          </h2>
          <div className="overflow-hidden technical-border rounded-xl mb-6">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-[var(--surface-container-low)] border-b border-[var(--border-cyan)]">
                  <th className="text-left py-3 px-4 font-bold text-[var(--text-primary)]">Partner</th>
                  <th className="text-left py-3 px-4 font-bold text-[var(--text-primary)]">Capacity</th>
                  <th className="text-left py-3 px-4 font-bold text-[var(--text-primary)]">Purpose</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { p: "Google GGC Cache", c: "10 Gbps", d: "YouTube, Google speed" },
                  { p: "Facebook CDN", c: "10 Gbps", d: "Instagram, Meta speed" },
                  { p: "Akamai CDN", c: "10 Gbps", d: "Content delivery" },
                  { p: "NIXI Peering", c: "—", d: "National Internet Exchange" },
                  { p: "Airtel & Tata", c: "—", d: "Multi-carrier upstream" },
                ].map((row, i) => (
                  <tr key={i} className="border-b border-[var(--border-cyan)]/30 hover:bg-[var(--surface-container-low)] transition-colors">
                    <td className="py-3 px-4 font-semibold text-[var(--text-primary)]">{row.p}</td>
                    <td className="py-3 px-4 font-outfit font-bold text-[var(--primary)]">{row.c}</td>
                    <td className="py-3 px-4 text-[var(--text-muted)]">{row.d}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex gap-2 text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] flex-wrap">
            <span className="bg-[var(--surface-container)] px-3 py-1 rounded-md">Lower Latency</span>
            <span className="bg-[var(--surface-container)] px-3 py-1 rounded-md">Faster Delivery</span>
            <span className="bg-[var(--surface-container)] px-3 py-1 rounded-md">Reduced Costs</span>
            <span className="bg-[var(--surface-container)] px-3 py-1 rounded-md">Better Performance</span>
          </div>
        </div>

        {/* SLA Metrics */}
        <div>
          <h2 className="font-heading text-2xl font-bold text-[var(--text-primary)] mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined text-[var(--secondary)]">speed</span>
            SLA Performance Metrics
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
            {[
              { value: "99.99%", label: "Network Uptime" },
              { value: "< 4 Hours", label: "MTTR SLA" },
              { value: "< 2 ms", label: "Metro Latency" },
              { value: "< 0.1%", label: "Packet Loss" },
              { value: "< 1 ms", label: "Network Jitter" },
            ].map((s) => (
              <div key={s.label} className="text-center p-4 rounded-xl bg-[var(--surface-container-low)] technical-border">
                <p className="font-outfit text-xl font-bold text-[var(--primary)]">
                  {s.value}
                </p>
                <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider font-semibold mt-1">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
          <p className="text-sm text-[var(--text-muted)] leading-relaxed italic border-l-2 border-[var(--primary)] pl-4">
            All SLAs are measured in real-time, monitored 24/7/365, and transparently reported monthly to our enterprise clients.
          </p>
        </div>
      </section>

      {/* Security Framework & Core Commitments */}
      <section className="bg-[var(--surface-container-low)] py-16 border-y border-[var(--border-cyan)]/50">
        <div className="max-w-[1280px] mx-auto px-5 md:px-16">
          <SectionHeader title="Security Framework & Core Commitments" subtitle="Our zero-trust architecture ensures absolute protection of network boundaries." />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "shield_lock", title: "Security-by-Design", desc: "Zero-trust architecture integrated directly at the core." },
              { icon: "vpn_key", title: "End-to-End Encryption", desc: "Encryption standards active on all enterprise connections." },
              { icon: "filter_alt", title: "L3/L4 Filtering", desc: "Advanced traffic filtering and proactive threat detection." },
              { icon: "security", title: "Next-Gen Firewall", desc: "Enterprise-grade firewalls with secure BGP routing and VLAN segmentation." },
              { icon: "policy", title: "DoT Compliant", desc: "Fully compliant with Department of Telecom norms and regulatory approved." },
              { icon: "lan", title: "Independent IP Allocation", desc: "IP blocks assigned via IRINN for sovereign network management." },
            ].map((pillar, i) => (
              <div key={i} className="p-6 technical-border bg-[var(--surface)] rounded-xl hover:border-[var(--primary)] transition-all">
                <span className="material-symbols-outlined text-[var(--primary)] text-[28px] mb-4 block">
                  {pillar.icon}
                </span>
                <h3 className="font-heading text-base font-bold text-[var(--text-primary)] mb-2">
                  {pillar.title}
                </h3>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NOC Operations & Financial Health */}
      <section className="max-w-[1280px] mx-auto px-5 md:px-16 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <h2 className="font-heading text-3xl font-bold text-[var(--text-primary)] mb-6 flex items-center gap-3">
            <span className="material-symbols-outlined text-[var(--primary)] text-3xl">electric_bolt</span>
            NOC Operations & Power
          </h2>
          <div className="space-y-6">
            <div className="p-6 bg-[var(--surface-container-low)] technical-border rounded-xl">
              <h3 className="text-sm font-bold uppercase tracking-widest text-[var(--text-primary)] mb-3 border-b border-[var(--border-cyan)]/30 pb-2">
                Power Infrastructure
              </h3>
              <ul className="space-y-2 text-sm text-[var(--text-muted)]">
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)]" /> Total Power Capacity: 125 KVA</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)]" /> Dual UPS — 40 KVA each</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)]" /> Clean voltage stabilization</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)]" /> Zero single-point failure design</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)]" /> 99.99% Uptime Design & SOC 2 Type II Certified</li>
              </ul>
            </div>
            <div className="p-6 bg-[var(--surface-container-low)] technical-border rounded-xl">
              <h3 className="text-sm font-bold uppercase tracking-widest text-[var(--text-primary)] mb-3 border-b border-[var(--border-cyan)]/30 pb-2">
                NOC Operations (24x7)
              </h3>
              <div className="flex flex-wrap gap-2">
                {["24x7 Monitoring", "Live Network Visibility", "Traffic Analytics", "Proactive Detection", "Structured Escalation", "Real-time Alerts"].map(item => (
                  <span key={item} className="px-3 py-1 bg-[var(--surface)] border border-[var(--border-cyan)]/50 rounded-lg text-xs font-semibold text-[var(--text-primary)]">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Financial Strength */}
        <div className="flex flex-col justify-center">
          <h2 className="font-heading text-3xl font-bold text-[var(--text-primary)] mb-6 flex items-center gap-3">
            <span className="material-symbols-outlined text-[var(--secondary)] text-3xl">trending_up</span>
            Financial Performance
          </h2>
          <div className="bg-[var(--surface)] p-8 technical-border rounded-xl mb-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider mb-1">Annual Run Rate (ARR)</p>
                <p className="font-outfit text-3xl md:text-4xl font-bold text-[var(--primary)]">₹8.19 Cr</p>
              </div>
              <div>
                <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider mb-1">Monthly Operating Surplus</p>
                <p className="font-outfit text-3xl md:text-4xl font-bold text-[var(--primary)]">₹12.5 L+</p>
              </div>
            </div>
          </div>
          <div className="bg-[var(--surface-container-low)] p-6 rounded-xl border-l-4 border-[var(--primary)]">
            <h3 className="text-sm font-bold text-[var(--text-primary)] mb-2">What this signals to our enterprise clients:</h3>
            <ul className="space-y-1.5 text-sm text-[var(--text-muted)]">
              <li className="flex items-center gap-2"><span className="material-symbols-outlined text-[14px] text-[var(--primary)]">check</span> Long-term sustainability & operational excellence</li>
              <li className="flex items-center gap-2"><span className="material-symbols-outlined text-[14px] text-[var(--primary)]">check</span> Healthy profitability for infrastructure reinvestment</li>
              <li className="flex items-center gap-2"><span className="material-symbols-outlined text-[14px] text-[var(--primary)]">check</span> Stable enterprise pricing guarantees</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Differentiators: Why Neolog vs Large ISPs */}
      <section className="bg-[var(--surface)] py-16 border-y border-[var(--border-cyan)] relative overflow-hidden w-full">
        <div className="absolute inset-0 z-0 opacity-60 select-none pointer-events-none">
          <Image
            src="/images/neolog_edge_bg.png"
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--surface)] via-[var(--surface)]/70 to-[var(--surface)]" />
        </div>

        <div className="max-w-[1280px] mx-auto px-5 md:px-16 relative z-10">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl font-bold text-[var(--text-primary)] mb-3">The Neolog Edge</h2>
            <p className="text-lg text-[var(--text-muted)] max-w-2xl mx-auto italic">
              &quot;Combining speed, flexibility, and expertise to deliver superior enterprise connectivity solutions&quot;
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="p-8 bg-[var(--surface-container-low)] rounded-2xl technical-border">
              <h3 className="font-heading text-xl font-bold text-[var(--error)] mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined">domain_disabled</span>
                Standard Large ISPs
              </h3>
              <ul className="space-y-4">
                {["Centralized support with high wait times", "Long provisioning and deployment cycles", "Rigid, inflexible SLAs", "Standard, un-optimized routing paths", "Limited flexibility for custom architecture"].map(item => (
                  <li key={item} className="flex items-start gap-3 text-[var(--text-muted)]">
                    <span className="material-symbols-outlined text-[var(--error)] mt-0.5 text-[20px]">close</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="p-8 bg-[var(--surface-bright)] rounded-2xl border-2 border-[var(--primary)] shadow-[0_0_30px_rgba(99,222,255,0.1)] relative overflow-hidden">
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[var(--primary)]/10 blur-3xl rounded-full"></div>
              <h3 className="font-heading text-xl font-bold text-[var(--primary)] mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined">verified</span>
                Neolog Enterprise Advantages
              </h3>
              <ul className="space-y-4 relative z-10">
                {["Local Hyderabad NOC — faster, direct response", "Agile & faster deployment cycles", "Custom enterprise SLAs tailored to your needs", "Custom traffic engineering & optimized routing", "Bespoke enterprise architecture solutions"].map(item => (
                  <li key={item} className="flex items-start gap-3 text-[var(--text-primary)] font-medium">
                    <span className="material-symbols-outlined text-[var(--primary)] mt-0.5 text-[20px]">check_circle</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Future Roadmap */}
      <section className="max-w-[1280px] mx-auto px-5 md:px-16 py-16">
        <SectionHeader title="Future Roadmap & Vision" subtitle="Continuous reinvestment to future-proof Hyderabad's digital infrastructure." />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <div className="space-y-4">
              <div className="p-5 bg-[var(--surface)] technical-border rounded-xl flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[var(--secondary)]/10 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[var(--secondary)]">account_balance_wallet</span>
                </div>
                <div>
                  <h4 className="font-bold text-[var(--text-primary)]">₹2 Crore Capital Investment</h4>
                  <p className="text-sm text-[var(--text-muted)]">Planned for next year&apos;s network expansion.</p>
                </div>
              </div>
              <div className="p-5 bg-[var(--surface)] technical-border rounded-xl flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[var(--primary)]/10 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[var(--primary)]">router</span>
                </div>
                <div>
                  <h4 className="font-bold text-[var(--text-primary)]">Aggressive FTTH Expansion</h4>
                  <p className="text-sm text-[var(--text-muted)]">Scaling retail and enterprise fiber deployments.</p>
                </div>
              </div>
              <div className="p-5 bg-[var(--surface)] technical-border rounded-xl flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[var(--primary)]/10 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[var(--primary)]">stacked_line_chart</span>
                </div>
                <div>
                  <h4 className="font-bold text-[var(--text-primary)]">10x Network Scalability</h4>
                  <p className="text-sm text-[var(--text-muted)]">Core engineered to handle 10x current traffic capacity without bottlenecks.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[var(--surface-container-low)] p-8 rounded-2xl technical-border">
            <h3 className="font-heading text-xl font-bold text-[var(--text-primary)] mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-[var(--secondary)]">radar</span>
              Key Focus Areas
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-[var(--surface)] p-4 rounded-xl technical-border">
                <h4 className="font-bold text-[var(--primary)] text-sm mb-1">Enterprise Corridor</h4>
                <p className="text-xs text-[var(--text-muted)]">High-value business zones</p>
              </div>
              <div className="bg-[var(--surface)] p-4 rounded-xl technical-border">
                <h4 className="font-bold text-[var(--primary)] text-sm mb-1">Corporate Parks</h4>
                <p className="text-xs text-[var(--text-muted)]">Tech hub fiber penetration</p>
              </div>
              <div className="bg-[var(--surface)] p-4 rounded-xl technical-border">
                <h4 className="font-bold text-[var(--primary)] text-sm mb-1">Dedicated ILL</h4>
                <p className="text-xs text-[var(--text-muted)]">Leased line services growth</p>
              </div>
              <div className="bg-[var(--surface)] p-4 rounded-xl technical-border">
                <h4 className="font-bold text-[var(--primary)] text-sm mb-1">DR Connectivity</h4>
                <p className="text-xs text-[var(--text-muted)]">Disaster recovery infrastructure</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="bg-[var(--surface)] py-16 border-t border-[var(--border-cyan)]">
        <div className="max-w-[1280px] mx-auto px-5 md:px-16 text-center">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-4">
            Resilient Infrastructure for Your Business
          </h2>
          <p className="text-sm text-[var(--text-muted)] max-w-xl mx-auto mb-8">
            Experience the stability of a network built for continuity. Talk to our engineering sales team today.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link
              href="/corporate"
              className="px-8 py-4 bg-[var(--primary)] text-[var(--on-primary)] rounded-xl text-sm font-bold hover:brightness-110 transition-all shadow-lg active-glow"
            >
              Explore Leased Lines
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 technical-border text-[var(--text-primary)] rounded-xl text-sm font-bold hover:border-[var(--primary)] transition-all bg-[var(--surface-container-low)]"
            >
              Contact Headquarters
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
