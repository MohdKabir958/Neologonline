"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import SectionHeader from "@/components/ui/SectionHeader";
import { CardSkeleton } from "@/components/ui/Skeleton";
import ErrorState from "@/components/ui/ErrorState";
import {
  fetchCorporatePlans,
  fetchLeaseLineFeatures,
  submitEnterpriseQuote,
} from "@/lib/api";
import { CorporatePlan, LeaseLineFeature } from "@/lib/types";
import { enterpriseFeatures, infrastructureFeatures } from "@/data/corporate";

export default function CorporatePage() {
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");
  const [plans, setPlans] = useState<CorporatePlan[]>([]);
  const [features, setFeatures] = useState<LeaseLineFeature[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [formData, setFormData] = useState({
    companyName: "",
    employeeCount: "10 - 50",
    contactNumber: "",
    message: "",
  });
  const [formLoading, setFormLoading] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);

  useEffect(() => {
    loadData();
  }, [billing]);

  async function loadData() {
    try {
      setLoading(true);
      setError(false);
      const [p, f] = await Promise.all([
        fetchCorporatePlans(billing),
        fetchLeaseLineFeatures(),
      ]);
      setPlans(p);
      setFeatures(f);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      setFormLoading(true);
      await submitEnterpriseQuote(formData);
      setFormSuccess(true);
    } catch {
      alert("Failed to submit. Please try again.");
    } finally {
      setFormLoading(false);
    }
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-[var(--surface)] border-b border-[var(--border-cyan)] relative overflow-hidden">
        <div className="absolute inset-0 map-grid opacity-20"></div>
        <div className="relative max-w-[1280px] mx-auto px-5 md:px-16 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[var(--primary)]/10 technical-border rounded-full mb-6">
                <span className="material-symbols-outlined text-[16px] text-[var(--primary)]">
                  business
                </span>
                <span className="text-[var(--primary)] text-xs font-semibold tracking-[0.05em] uppercase">
                  Mission-Critical Connectivity
                </span>
              </div>
              <h1 className="font-heading text-4xl md:text-[52px] font-bold leading-tight text-[var(--text-primary)] mb-4">
                Let&apos;s Build Resilient Digital
                <br />
                Infrastructure Together
              </h1>
              <p className="text-base md:text-lg text-[var(--text-muted)] mb-8 leading-relaxed">
                Enterprise-grade connectivity for mission-critical businesses across Telangana and Andhra Pradesh. 
                Backed by strict service SLAs and redundant core topologies.
              </p>
              <div className="flex gap-4 mb-4">
                <Link
                  href="#quote"
                  className="bg-[var(--secondary)] text-[var(--on-secondary)] px-8 py-4 rounded-xl text-sm font-bold flex items-center gap-2 hover:brightness-110 transition-all shadow-md w-fit"
                >
                  Request Enterprise Quote
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </Link>
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden technical-border relative">
                <img
                  src="/images/heroes/corporate.png"
                  alt="Neolog Corporate Enterprise Network"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* SLA Performance Metrics (highlight cards) */}
          <div className="max-w-none grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 pt-10 border-t border-[var(--border-cyan)]/40 mt-10">
            {[
              { value: "99.99%", label: "Network Uptime" },
              { value: "< 4 Hours", label: "MTTR SLA" },
              { value: "< 2 ms", label: "Metro Latency" },
              { value: "< 0.1%", label: "Packet Loss" },
              { value: "< 1 ms", label: "Network Jitter" },
            ].map((s) => (
              <div key={s.label} className="text-center p-3 rounded-lg bg-[var(--surface-container-low)] technical-border">
                <p className="font-heading text-lg md:text-xl font-bold text-[var(--primary)]">
                  {s.value}
                </p>
                <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider font-semibold mt-1">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enterprise Solutions Portfolio (5 offerings) */}
      <section className="max-w-[1280px] mx-auto px-5 md:px-16 py-20">
        <SectionHeader 
          title="Enterprise Solutions Portfolio" 
          subtitle="A comprehensive suite of customized connectivity services engineered for specific operational scales." 
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {enterpriseFeatures.map((f, i) => (
            <div
              key={f.title}
              className="p-6 rounded-xl technical-border bg-[var(--surface)] hover:bg-[var(--surface-variant)] transition-all flex flex-col justify-between"
            >
              <div>
                <span className="material-symbols-outlined text-[32px] text-[var(--primary)] mb-4 block">
                  {f.icon}
                </span>
                <h3 className="font-heading text-base font-bold text-[var(--text-primary)] mb-3">
                  {f.title}
                </h3>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  {f.description}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[var(--border-cyan)]/20 text-[10px] uppercase font-bold text-[var(--primary)] tracking-wider">
                Offering 0{i + 1}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Comparison Section (Why Neolog over Large ISPs) */}
      <section className="max-w-[1280px] mx-auto px-5 md:px-16 py-16 bg-[var(--surface-container-low)] rounded-3xl my-8">
        <SectionHeader
          title="Why Neolog over Large ISPs"
          subtitle="Compare the tailored benefits of partnering with a local infrastructure expert vs centralized generic ISPs."
        />
        <div className="overflow-x-auto technical-border rounded-xl">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[var(--surface)] border-b border-[var(--border-cyan)]">
                <th className="text-left py-4 px-6 text-xs font-semibold uppercase tracking-[0.05em] text-[var(--primary)]">
                  Feature / Capability
                </th>
                <th className="text-left py-4 px-6 text-xs font-semibold uppercase tracking-[0.05em] text-[var(--text-muted)]">
                  Standard Large ISPs
                </th>
                <th className="text-left py-4 px-6 text-xs font-semibold uppercase tracking-[0.05em] text-[var(--primary)] bg-[var(--primary)]/5">
                  Neolog Enterprise
                </th>
              </tr>
            </thead>
            <tbody>
              {features.map((row, i) => (
                <tr key={i} className="border-b border-[var(--border-cyan)]/30 hover:bg-[var(--surface)]/50 transition-colors">
                  <td className="py-4 px-6 text-sm font-bold text-[var(--text-primary)]">
                    {row.feature}
                  </td>
                  <td className="py-4 px-6 text-sm text-[var(--text-muted)]">
                    {row.standardBroadband}
                  </td>
                  <td className="py-4 px-6 text-sm font-semibold text-[var(--primary)] bg-[var(--primary)]/5">
                    {row.neologLeasedLine}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Enterprise Plans */}
      <section className="max-w-[1280px] mx-auto px-5 md:px-16 py-16">
        <SectionHeader 
          title="Scalable Enterprise Rates" 
          subtitle="From high-growth businesses to dense corporate hubs, find the bandwidth rate that fits your scale." 
        />
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-1 bg-[var(--surface)] rounded-full p-1 technical-border">
            {(["monthly", "annual"] as const).map((p) => (
              <button
                key={p}
                onClick={() => setBilling(p)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  billing === p
                    ? "bg-[var(--primary)] text-[var(--on-primary)]"
                    : "text-[var(--text-muted)]"
                }`}
              >
                {p === "monthly" ? "Monthly billing" : "Annual billing (Save 30%)"}
              </button>
            ))}
          </div>
        </div>
        {error ? (
          <ErrorState onRetry={loadData} />
        ) : loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`relative p-6 rounded-xl transition-all flex flex-col justify-between ${
                  plan.isPopular
                    ? "border-2 border-[var(--primary)] active-glow"
                    : "technical-border"
                } bg-[var(--surface)]`}
              >
                <div>
                  {plan.isPopular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[var(--primary)] text-[var(--on-primary)] px-3 py-0.5 rounded-full text-xs font-semibold uppercase">
                      Best Value
                    </div>
                  )}
                  <p className="text-xs font-semibold uppercase tracking-[0.05em] text-[var(--text-muted)] mb-1">
                    {plan.name}
                  </p>
                  <p className="font-heading text-2xl font-bold text-[var(--text-primary)] mb-1">
                    {plan.speed}
                  </p>
                  <p className="text-sm text-[var(--text-muted)] mb-4">
                    {plan.tier === "custom"
                      ? "Custom Quote Required"
                      : `₹${plan.price.toLocaleString("en-IN")} /mo`}
                  </p>
                  <ul className="space-y-2 mb-6">
                    {plan.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-[var(--text-primary)]">
                        <span className="material-symbols-outlined text-[var(--primary)] text-[16px]">
                          check_circle
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <Link
                  href="#quote"
                  className={`w-full py-3 rounded-lg text-sm font-bold text-center block transition-all ${
                    plan.isPopular
                      ? "bg-[var(--primary)] text-[var(--on-primary)] hover:brightness-110"
                      : plan.tier === "custom"
                      ? "bg-[var(--secondary)] text-[var(--on-secondary)] hover:brightness-110"
                      : "technical-border text-[var(--text-primary)] hover:border-[var(--primary)]"
                  }`}
                >
                  {plan.ctaLabel}
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Key Differentiators */}
      <section className="bg-[var(--surface-container-low)] py-16 border-t border-b border-[var(--border-cyan)]/50">
        <div className="max-w-[1280px] mx-auto px-5 md:px-16">
          <SectionHeader title="The Neolog Advantage" subtitle="Why enterprises trust us to keep their operations moving." />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {infrastructureFeatures.map((f) => (
              <div key={f.title} className="p-6 technical-border rounded-xl bg-[var(--surface)]">
                <span className="material-symbols-outlined text-[var(--primary)] text-[28px] mb-4 block">
                  {f.icon}
                </span>
                <h3 className="font-heading text-lg font-bold text-[var(--text-primary)] mb-2">
                  {f.title}
                </h3>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact / Quote Form Section */}
      <section id="quote" className="max-w-[1280px] mx-auto px-5 md:px-16 py-16">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="flex-1">
            <h2 className="font-heading text-3xl font-bold text-[var(--text-primary)] mb-4">
              Ready to Connect? Let&apos;s discuss your enterprise needs
            </h2>
            <p className="text-base text-[var(--text-muted)] mb-8 leading-relaxed">
              Explore custom optical line solutions. Reach out to our dedicated Hyderabad enterprise NOC 
              for a complete feasibility check.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-lg bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)]">
                  <span className="material-symbols-outlined text-[20px]">call</span>
                </span>
                <div>
                  <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider font-semibold">Enterprise Sales Desk</p>
                  <p className="text-sm font-bold text-[var(--text-primary)]">040 45 25 69 60</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-lg bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)]">
                  <span className="material-symbols-outlined text-[20px]">support_agent</span>
                </span>
                <div>
                  <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider font-semibold">NOC 24x7 Priority Support</p>
                  <p className="text-sm font-bold text-[var(--text-primary)]">noc@neologbroadband.com</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-lg bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)]">
                  <span className="material-symbols-outlined text-[20px]">language</span>
                </span>
                <div>
                  <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider font-semibold">Official Domain</p>
                  <p className="text-sm font-bold text-[var(--primary)] hover:underline">
                    <a href="https://www.neologbroadband.com" target="_blank" rel="noopener noreferrer">
                      www.neologbroadband.com
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 w-full max-w-lg p-8 technical-border rounded-xl bg-[var(--surface)]">
            {formSuccess ? (
              <div className="text-center py-8">
                <span className="material-symbols-outlined text-[48px] text-[var(--primary)] mb-4 block">
                  check_circle
                </span>
                <p className="font-heading text-lg font-bold text-[var(--text-primary)]">
                  Quote request received!
                </p>
                <p className="text-sm text-[var(--text-muted)] mt-2">
                  Our enterprise team will contact you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-[var(--text-muted)] mb-1">Company Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Acme Corp"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-[var(--background)] technical-border text-[var(--text-primary)] text-sm placeholder:text-[var(--text-muted)]/50 focus:border-[var(--primary)] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-[var(--text-muted)] mb-1">Employee Count</label>
                    <select
                      value={formData.employeeCount}
                      onChange={(e) => setFormData({ ...formData, employeeCount: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-[var(--background)] technical-border text-[var(--text-primary)] text-sm focus:border-[var(--primary)] focus:outline-none appearance-none"
                    >
                      <option>10 - 50</option>
                      <option>50 - 200</option>
                      <option>200 - 500</option>
                      <option>500+</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-[var(--text-muted)] mb-1">Contact Number</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 XXXXX XXXXX"
                    value={formData.contactNumber}
                    onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-[var(--background)] technical-border text-[var(--text-primary)] text-sm placeholder:text-[var(--text-muted)]/50 focus:border-[var(--primary)] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm text-[var(--text-muted)] mb-1">Message (Optional)</label>
                  <textarea
                    placeholder="Tell us about your requirements..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 rounded-lg bg-[var(--background)] technical-border text-[var(--text-primary)] text-sm placeholder:text-[var(--text-muted)]/50 focus:border-[var(--primary)] focus:outline-none resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={formLoading}
                  className="w-full py-4 bg-[var(--secondary)] text-[var(--on-secondary)] rounded-xl text-sm font-bold hover:brightness-110 transition-all disabled:opacity-50"
                >
                  {formLoading ? "Submitting..." : "Request Enterprise Quote"}
                </button>
                <p className="text-xs text-center text-[var(--text-muted)]">
                  By submitting, you agree to our corporate data handling policy.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
