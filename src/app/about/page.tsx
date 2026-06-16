import type { Metadata } from "next";
import Link from "next/link";
import SectionHeader from "@/components/ui/SectionHeader";
import { COMPANY } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About Us | Neolog Online Services",
  description:
    "Learn about Neolog Online Services Pvt. Ltd. — Class B ISP License holder since 2020. Hyderabad's trusted enterprise infrastructure partner.",
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-[var(--surface)] border-b border-[var(--border-cyan)] overflow-hidden">
        <div className="absolute inset-0 map-grid opacity-20"></div>
        <div className="relative max-w-[1280px] mx-auto px-5 md:px-16 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[var(--primary)]/10 technical-border rounded-full mb-6">
                <span className="material-symbols-outlined text-[16px] text-[var(--primary)]">
                  verified
                </span>
                <span className="text-[var(--primary)] text-xs font-semibold tracking-[0.05em] uppercase">
                  Class B ISP License — Since 2020
                </span>
              </div>
              <h1 className="font-heading text-4xl md:text-[54px] font-bold leading-tight text-[var(--text-primary)] mb-4">
                Neolog Online Services Pvt. Ltd.
              </h1>
              <p className="text-lg md:text-xl text-[var(--primary)] font-medium mb-6">
                &ldquo;Enterprise Infrastructure Partner&rdquo;
              </p>
              <p className="text-base text-[var(--text-muted)] max-w-2xl leading-relaxed">
                Powering Telangana & Andhra Pradesh with carrier-grade fiber backbones, 
                zero-trust architecture, and resilient business continuity infrastructure.
              </p>
            </div>
            <div className="lg:col-span-5">
              <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden technical-border relative">
                <img
                  src="/images/heroes/about.png"
                  alt="Neolog Network Infrastructure"
                  className="w-full h-full object-cover"
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
            Our Core Mission Statement
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
                  12-13-97, Flat No. 403, Tara Tykoon, Tarnaka, Secunderabad, Telangana – 500017
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 pt-3 border-t border-[var(--border-cyan)]/50">
              <span className="material-symbols-outlined text-[var(--primary)] text-[20px]">
                gavel
              </span>
              <p className="text-sm text-[var(--text-muted)]">
                Compliance: DOT Licensed ISP & IRINN Sovereign Member
              </p>
            </div>
          </div>
        </div>

        {/* Technical Stats */}
        <div>
          <h2 className="font-heading text-3xl font-bold text-[var(--text-primary)] mb-6 text-center lg:text-left">
            Network Credibility
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: "2,700+ km", label: "Engineered Optical Fiber" },
              { value: "50 Gbps", label: "Total Network Capacity" },
              { value: "42+ Gbps", label: "Active Bandwidth (Peak 80G)" },
              { value: "99.99%", label: "Network Uptime" },
              { value: "100+", label: "Active Enterprise Circuits" },
              { value: "5 Zones", label: "Greater Hyderabad Coverage" },
            ].map((stat, i) => (
              <div
                key={i}
                className="p-5 technical-border rounded-xl bg-[var(--surface)] hover:border-[var(--primary)] transition-all"
              >
                <p className="font-heading text-xl md:text-2xl font-bold text-[var(--primary)] mb-1">
                  {stat.value}
                </p>
                <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider font-medium">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Commitment (3 pillars) */}
      <section className="max-w-[1280px] mx-auto px-5 md:px-16 py-16 bg-[var(--surface-container-low)] rounded-3xl my-8">
        <SectionHeader title="Core Commitments & Architecture Pillars" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: "shield_lock",
              title: "Security-by-Design",
              desc: "Engineered zero-trust network topology inside our metro core, ensuring absolute protection of network boundaries.",
            },
            {
              icon: "policy",
              title: "DoT Compliant",
              desc: "100% regulatory compliance with Department of Telecommunications (DoT) norms, license agreements, and logging audits.",
            },
            {
              icon: "lan",
              title: "Sovereign Resources",
              desc: "Independent IP address blocks (IPv4 & IPv6) allocated directly via IRINN, eliminating reliance on intermediary routing pools.",
            },
          ].map((pillar, i) => (
            <div key={i} className="p-6 technical-border bg-[var(--surface)] rounded-xl">
              <span className="material-symbols-outlined text-[var(--primary)] text-[36px] mb-4 block">
                {pillar.icon}
              </span>
              <h3 className="font-heading text-lg font-bold text-[var(--text-primary)] mb-2">
                {pillar.title}
              </h3>
              <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Infrastructure Highlights */}
      <section className="max-w-[1280px] mx-auto px-5 md:px-16 py-16">
        <SectionHeader title="Carrier-Grade Infrastructure" subtitle="High-capacity hardware and redundant routing loops covering the technology zones." />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "Metro Ring Topology",
              desc: "Ring 1 (40G Primary) & Ring 2 (40G High-Capacity) loops ensuring redundant path routing across Greater Hyderabad.",
            },
            {
              title: "Enterprise Core Hardware",
              desc: "Cisco 4500X access-layer switches combined with high-throughput Huawei S6720S distribution switches.",
            },
            {
              title: "30 Gbps Dedicated CDN",
              desc: "Direct caching nodes containing Google GGC (10G), Facebook CDN (10G), and Akamai CDN (10G).",
            },
            {
              title: "Upstreams & Peering",
              desc: "Active NIXI peering with multi-carrier redundant upstream transit pipes powered by Airtel & Tata Communications.",
            },
          ].map((infra, i) => (
            <div key={i} className="p-6 technical-border rounded-xl bg-[var(--surface)]">
              <h3 className="font-heading text-base font-bold text-[var(--primary)] mb-3">
                {infra.title}
              </h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                {infra.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Operations & Power Resiliency */}
      <section className="max-w-[1280px] mx-auto px-5 md:px-16 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 bg-[var(--surface-container-low)] rounded-3xl my-8">
        <div>
          <h2 className="font-heading text-3xl font-bold text-[var(--text-primary)] mb-6">
            NOC Operations & Resiliency
          </h2>
          <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-6">
            Our Network Operations Center operates 24x7x365 to handle proactive traffic analytics, 
            carrier detection, and real-time alert updates. Supported by dual independent UPS clusters 
            and a heavy standby power grid, Neolog has zero single-point-of-failures.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-[var(--surface)] rounded-xl technical-border">
              <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider font-semibold">Compliance Status</p>
              <p className="text-sm font-bold text-[var(--text-primary)] mt-1">SOC 2 Type II Certified</p>
            </div>
            <div className="p-4 bg-[var(--surface)] rounded-xl technical-border">
              <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider font-semibold">Power Backbone</p>
              <p className="text-sm font-bold text-[var(--text-primary)] mt-1">125 KVA Gen + Dual 40 KVA UPS</p>
            </div>
          </div>
        </div>

        {/* Financial Strength */}
        <div className="flex flex-col justify-center bg-[var(--surface)] p-8 technical-border rounded-xl">
          <h3 className="font-heading text-xl font-bold text-[var(--text-primary)] mb-4">
            Financial Health & Trust
          </h3>
          <p className="text-xs text-[var(--text-muted)] leading-relaxed mb-6">
            As a self-sustaining private entity, Neolog maintains strong capital liquidity 
            reinvested continually back into fiber optic networks and hardware.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider">Annual Run Rate</p>
              <p className="text-xl md:text-2xl font-bold text-[var(--secondary)] mt-1">₹8.19 Crore</p>
            </div>
            <div>
              <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider">Monthly Surplus</p>
              <p className="text-xl md:text-2xl font-bold text-[var(--secondary)] mt-1">₹12.5 Lakh+</p>
            </div>
          </div>
        </div>
      </section>

      {/* Client Portfolio */}
      <section className="max-w-[1280px] mx-auto px-5 md:px-16 py-16">
        <SectionHeader title="Trusted by Institutions & Enterprises" subtitle="Connecting major education institutions, landmarks, and schools." />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Engineering Institutions */}
          <div className="p-6 bg-[var(--surface)] rounded-xl technical-border">
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-[var(--primary)]">school</span>
              <h4 className="font-heading text-lg font-bold text-[var(--text-primary)]">15+ Engineering Colleges</h4>
            </div>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              Powering campuses like CVR, SNIST, MLRIT, GNITC, VBIT, ACE, HITAM, St. Peter&apos;s, 
              Stanley, Aurora&apos;s, Nalla Malla Reddy, and Nalla Narasimha Reddy.
            </p>
          </div>

          {/* K-12 Schools */}
          <div className="p-6 bg-[var(--surface)] rounded-xl technical-border">
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-[var(--primary)]">local_library</span>
              <h4 className="font-heading text-lg font-bold text-[var(--text-primary)]">K-12 Schools</h4>
            </div>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              Sub-second latency routing and content filtration for NIHOC, Birla Open Minds (Bibinagar), 
              and Rockwoods International.
            </p>
          </div>

          {/* Landmarks */}
          <div className="p-6 bg-[var(--surface)] rounded-xl technical-border">
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-[var(--primary)]">workspace_premium</span>
              <h4 className="font-heading text-lg font-bold text-[var(--text-primary)]">Landmark Clients</h4>
            </div>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              Critical fiber feeds at Yadagirigutta Devasthanam, Rajiv Gandhi International Cricket Stadium (Uppal), 
              and Metro TV Channel.
            </p>
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
          <div className="flex justify-center gap-4">
            <Link
              href="/corporate"
              className="px-8 py-4 bg-[var(--primary)] text-[var(--on-primary)] rounded-xl text-sm font-bold hover:brightness-110 transition-all"
            >
              Explore Leased Lines
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 technical-border text-[var(--text-primary)] rounded-xl text-sm font-bold hover:border-[var(--primary)] transition-all"
            >
              Contact Headquarters
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
