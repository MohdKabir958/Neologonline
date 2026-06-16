"use client";

import { useState, useEffect } from "react";
import SectionHeader from "@/components/ui/SectionHeader";
import Accordion from "@/components/ui/Accordion";
import ErrorState from "@/components/ui/ErrorState";
import { fetchPlanAddons } from "@/lib/api";
import { PlanAddon } from "@/lib/types";
import { plansFaqs } from "@/data/faqs";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Plan specifications for comparisons
const PLAN_SPECS: Record<string, { name: string; speed: number; description: string }> = {
  "plan-40": { name: "40 Mbps", speed: 40, description: "Perfect for basic browsing and streaming." },
  "plan-60": { name: "60 Mbps", speed: 60, description: "Optimized for high-definition streaming & gaming." },
  "plan-100": { name: "100 Mbps", speed: 100, description: "Designed for heavy multi-device usage & UHD." },
};

// Rich comparison dataset with explanations
interface ComparisonRow {
  id: string;
  feature: string;
  explanation: string;
  plan40: string;
  plan60: string;
  plan100: string;
}

const COMPARISON_ROWS: ComparisonRow[] = [
  {
    id: "speed",
    feature: "Download Speed",
    explanation: "How fast you can stream, download files, and load web pages.",
    plan40: "40 Mbps",
    plan60: "60 Mbps",
    plan100: "100 Mbps",
  },
  {
    id: "data",
    feature: "Monthly Data",
    explanation: "Fair Usage Policy (FUP) allocation of high-speed data per billing cycle.",
    plan40: "Unlimited",
    plan60: "Unlimited",
    plan100: "Unlimited",
  },
  {
    id: "router",
    feature: "Router Type",
    explanation: "Dual Band supports faster speeds and multiple devices simultaneously.",
    plan40: "Standard Single-Band",
    plan60: "Dual-Band Wi-Fi 5",
    plan100: "Premium Wi-Fi 6 Mesh",
  },
  {
    id: "support",
    feature: "Technical Support",
    explanation: "Priority routing gets your issues resolved by senior NOC engineers faster.",
    plan40: "Standard Helpdesk",
    plan60: "Priority Helpline",
    plan100: "24/7 Priority NOC",
  },
  {
    id: "staticIp",
    feature: "Static IP",
    explanation: "A fixed IP address for hosting services, CCTV, or remote servers.",
    plan40: "Not Available",
    plan60: "Add-on Available",
    plan100: "Add-on Available",
  },
  {
    id: "contract",
    feature: "Contract Term",
    explanation: "Commitment period. All our plans are pay-as-you-go with no exit penalties.",
    plan40: "6/12 Months",
    plan60: "6/12/18 Months",
    plan100: "6/12/18 Months",
  },
];

const keyMap: Record<string, "plan40" | "plan60" | "plan100"> = {
  "plan-40": "plan40",
  "plan-60": "plan60",
  "plan-100": "plan100"
};

export default function PlansPage() {
  const router = useRouter();
  const [billing, setBilling] = useState<"6M" | "12M" | "18M">("6M");
  const [addons, setAddons] = useState<PlanAddon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Hover and Interactive states
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);
  const [hoverExplainer, setHoverExplainer] = useState<string | null>(null);
  const [activeExplainer, setActiveExplainer] = useState<string | null>(null);
  const [mobileSelectedPlan, setMobileSelectedPlan] = useState<string>("plan-60");

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      setLoading(true);
      setError(false);
      const addonsRes = await fetchPlanAddons();
      setAddons(addonsRes);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  const onSelectPlan = (planId: string) => {
    router.push(`/new-connection?plan=${planId}`);
  };

  const getPlanPrice = (planId: string) => {
    if (billing === "6M") {
      if (planId === "plan-40") return 2799;
      if (planId === "plan-60") return 3186;
      if (planId === "plan-100") return 4248;
    }
    if (billing === "12M") {
      if (planId === "plan-40") return 4999;
      if (planId === "plan-60") return 5664;
      if (planId === "plan-100") return 8496;
    }
    if (billing === "18M") {
      if (planId === "plan-40") return -1;
      if (planId === "plan-60") return 7434;
      if (planId === "plan-100") return 11682;
    }
    return 0;
  };

  const toggleExplainer = (id: string) => {
    setActiveExplainer((prev) => (prev === id ? null : id));
  };

  const orderedPlans = ["plan-40", "plan-60", "plan-100"];
  const visiblePlans = orderedPlans;

  return (
    <>
      {/* Breadcrumbs */}
      <div className="max-w-[1280px] mx-auto px-5 md:px-16 pt-4 pb-2 flex items-center gap-2 text-xs font-semibold text-[var(--text-muted)] select-none">
        <Link href="/" className="hover:text-[var(--primary)] transition-colors">Home</Link>
        <span className="material-symbols-outlined text-[14px] leading-none opacity-40">chevron_right</span>
        <span className="text-[var(--text-primary)]">Plans</span>
      </div>

      {/* Hero */}
      <section className="max-w-[1280px] mx-auto px-5 md:px-16 pt-6 pb-4 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.05em] text-[var(--primary)] mb-3">
          Broadband Plans
        </p>
        <h1 className="font-heading text-4xl md:text-[48px] font-bold leading-tight text-[var(--text-primary)] mb-4">
          Choose the speed you need
        </h1>
        <p className="text-base text-[var(--text-muted)] max-w-2xl mx-auto leading-relaxed">
          Filter and compare Greater Hyderabad&apos;s most stable optical network plans.
        </p>
      </section>

      {/* Unified Plans Dashboard */}
      <section className="max-w-[1280px] mx-auto px-5 md:px-16 py-8">
        
        {/* Simple Filters Row */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-12">
          
          {/* Billing Term Filter */}
          <div className="flex bg-[var(--surface)] p-1.5 rounded-2xl border border-[var(--border-cyan)]/50 shadow-lg">
            {(["6M", "12M", "18M"] as const).map((term) => (
              <button
                key={term}
                onClick={() => setBilling(term)}
                className={`px-5 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                  billing === term
                    ? "bg-[var(--secondary)] text-[var(--on-secondary)] shadow-md"
                    : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                }`}
              >
                {term === "6M" ? "6 Months" : term === "12M" ? "12 Months" : "18 Months"}
              </button>
            ))}
          </div>
        </div>

        {/* Plan Cards Grid */}
        <div className={`grid grid-cols-1 ${visiblePlans.length === 1 ? 'md:grid-cols-1 max-w-sm' : visiblePlans.length === 2 ? 'md:grid-cols-2 max-w-2xl' : visiblePlans.length === 3 ? 'md:grid-cols-3 max-w-5xl' : 'md:grid-cols-2 lg:grid-cols-4'} gap-6 mb-16 mx-auto`}>
          {visiblePlans.map((planId) => {
            const plan = PLAN_SPECS[planId];
            const price = getPlanPrice(planId);
            const isHovered = hoveredPlan === planId;
            const isDimmed = hoveredPlan !== null && hoveredPlan !== planId;

            return (
              <div
                key={planId}
                onMouseEnter={() => setHoveredPlan(planId)}
                onMouseLeave={() => setHoveredPlan(null)}
                className={`relative flex flex-col bg-[var(--surface)] rounded-3xl border transition-all duration-300 p-8 cursor-pointer ${
                  isHovered
                    ? "border-[var(--primary)] shadow-[0_0_30px_rgba(99,222,255,0.15)] -translate-y-2 z-10"
                    : "border-[var(--border-cyan)]/30 hover:border-[var(--primary)]/50"
                } ${isDimmed ? "opacity-50 grayscale-[20%]" : "opacity-100"}`}
              >
                {/* Popular Badge */}
                {planId === "plan-60" && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[var(--primary)] text-[var(--on-primary)] text-xs font-extrabold uppercase px-4 py-1.5 rounded-full tracking-wider shadow active-glow">
                    Most Popular
                  </div>
                )}
                
                <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2 uppercase tracking-wide">
                  {plan.name}
                </h3>
                <p className="text-sm text-[var(--text-muted)] mb-6 h-10">
                  {plan.description}
                </p>

                <div className="mb-6">
                  {price === -1 ? (
                    <div className="flex items-baseline gap-1 h-10">
                      <span className="font-outfit text-2xl font-black text-[var(--text-muted)]">
                        Not Available
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-baseline gap-1 h-10">
                      <span className="font-outfit text-4xl font-black text-[var(--text-primary)]">
                        ₹{price.toLocaleString("en-IN")}
                      </span>
                      <span className="text-sm text-[var(--text-muted)]">
                        /{billing}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-3 bg-[var(--background)] px-4 py-3 rounded-xl border border-[var(--border-cyan)]/30 mb-8">
                  <span className="material-symbols-outlined text-[var(--primary)]">speed</span>
                  <div>
                    <div className="text-xs text-[var(--text-muted)] uppercase tracking-wider font-bold">Speed</div>
                    <div className="font-outfit text-lg font-bold text-[var(--text-primary)]">{plan.speed} Mbps</div>
                  </div>
                </div>

                <div className="mt-auto">
                  <button
                    onClick={() => onSelectPlan(planId)}
                    disabled={price === -1}
                    className={`w-full py-3.5 rounded-xl text-sm font-bold transition-all text-center ${
                      price === -1 ? 'bg-[var(--surface-container)] text-[var(--text-muted)] opacity-50 cursor-not-allowed border border-[var(--border-cyan)]/30' :
                      isHovered || planId === "plan-60"
                        ? "bg-[var(--primary)] text-[var(--on-primary)] active-glow"
                        : "bg-[var(--surface-container)] text-[var(--text-primary)] border border-[var(--border-cyan)] hover:border-[var(--primary)]"
                    }`}
                  >
                    Get {plan.name}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Feature Comparison Table Section */}
        <div className="bg-[var(--surface)] border border-[var(--border-cyan)]/50 rounded-3xl p-6 md:p-10 shadow-xl overflow-hidden">
          <div className="text-center mb-8">
            <h2 className="font-heading text-2xl font-bold text-[var(--text-primary)] mb-2">Compare All Features</h2>
            <p className="text-sm text-[var(--text-muted)]">Hover over any column or card to highlight the plan details.</p>
          </div>

          {/* Mobile Plan Selector for Table */}
          <div className="md:hidden flex gap-2 overflow-x-auto pb-4 mb-4 hide-scrollbar">
            {visiblePlans.map((planId) => (
              <button
                key={`mobile-sel-${planId}`}
                onClick={() => setMobileSelectedPlan(planId)}
                className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm font-bold transition-all border ${
                  mobileSelectedPlan === planId
                    ? "bg-[var(--primary)] text-[var(--on-primary)] border-[var(--primary)]"
                    : "bg-[var(--surface-container)] text-[var(--text-muted)] border-[var(--border-cyan)]"
                }`}
              >
                {PLAN_SPECS[planId].name}
              </button>
            ))}
          </div>

          {error ? (
            <div className="p-8"><ErrorState onRetry={loadData} /></div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[300px] md:min-w-[600px] border-collapse">
                <thead>
                  <tr className="border-b-2 border-[var(--border-cyan)]">
                    <th className="py-4 px-4 text-left font-heading text-lg font-bold text-[var(--text-primary)] w-1/2 md:w-1/4">
                      Feature
                    </th>
                    {visiblePlans.map((planId) => {
                      const plan = PLAN_SPECS[planId];
                      const isHovered = hoveredPlan === planId;
                      const isDimmed = hoveredPlan !== null && hoveredPlan !== planId;
                      const isMobileHidden = visiblePlans.length > 1 && mobileSelectedPlan !== planId;

                      return (
                        <th
                          key={`th-${planId}`}
                          onMouseEnter={() => setHoveredPlan(planId)}
                          onMouseLeave={() => setHoveredPlan(null)}
                          className={`py-4 px-4 text-center font-bold text-lg transition-all duration-300 ${
                            isHovered ? "bg-[var(--primary)]/10 text-[var(--primary)] rounded-t-xl" : "text-[var(--text-primary)]"
                          } ${isDimmed ? "opacity-40" : "opacity-100"} ${isMobileHidden ? "hidden md:table-cell" : "table-cell"}`}
                        >
                          {plan.name}
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON_ROWS.map((row, index) => (
                    <tr
                      key={row.id}
                      className={`border-b border-[var(--border-cyan)]/20 transition-colors ${
                        index % 2 === 0 ? "bg-[var(--surface-container-low)]/30" : ""
                      } hover:bg-white/5`}
                    >
                      <td className="py-5 px-4">
                        <div className="flex items-center gap-2 relative">
                          <span className="font-bold text-sm text-[var(--text-primary)]">{row.feature}</span>
                          <button
                            onClick={() => toggleExplainer(row.id)}
                            onMouseEnter={() => setHoverExplainer(row.id)}
                            onMouseLeave={() => setHoverExplainer(null)}
                            className="text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors cursor-pointer rounded-full p-1 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                          >
                            <span className="material-symbols-outlined text-[16px]">info</span>
                          </button>
                          
                          {/* Tooltip */}
                          {(hoverExplainer === row.id || activeExplainer === row.id) && (
                            <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 w-64 bg-[var(--surface-bright)] p-4 rounded-xl shadow-2xl border border-[var(--border-cyan)] z-50 animate-fade-in-up">
                              <p className="font-bold text-[var(--primary)] mb-1 text-sm">{row.feature}</p>
                              <p className="text-xs text-[var(--text-primary)] leading-relaxed">{row.explanation}</p>
                            </div>
                          )}
                        </div>
                      </td>

                      {visiblePlans.map((planId) => {
                        const val = row[keyMap[planId]];
                        const isHovered = hoveredPlan === planId;
                        const isDimmed = hoveredPlan !== null && hoveredPlan !== planId;
                        const isMobileHidden = visiblePlans.length > 1 && mobileSelectedPlan !== planId;

                        return (
                          <td
                            key={`td-${planId}-${row.id}`}
                            onMouseEnter={() => setHoveredPlan(planId)}
                            onMouseLeave={() => setHoveredPlan(null)}
                            className={`py-5 px-4 text-center text-sm font-medium transition-all duration-300 ${
                              isHovered ? "bg-[var(--primary)]/10 text-[var(--text-primary)] font-bold shadow-[inset_0_0_0_1px_rgba(99,222,255,0.2)]" : "text-[var(--text-muted)]"
                            } ${isDimmed ? "opacity-40" : "opacity-100"} ${isMobileHidden ? "hidden md:table-cell" : "table-cell"} ${
                              isHovered && index === COMPARISON_ROWS.length - 1 ? "rounded-b-xl" : ""
                            }`}
                          >
                            {val}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>

      {/* Add-ons */}
      <section className="max-w-[1280px] mx-auto px-5 md:px-16 py-16">
        <SectionHeader title="Enhance Your Experience" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {addons.map((addon) => (
            <div
              key={addon.id}
              className="flex items-center justify-between p-6 technical-border rounded-xl bg-[var(--surface)] hover:border-[var(--primary)]/50 transition-colors"
            >
              <div>
                <h3 className="font-heading text-lg font-bold text-[var(--text-primary)]">
                  {addon.name}
                </h3>
                <p className="text-sm text-[var(--text-muted)]">
                  {addon.description}
                </p>
              </div>
              <div className="text-right ml-4 flex-shrink-0">
                <p className="font-heading text-xl font-bold text-[var(--primary)]">
                  ₹{addon.price}
                </p>
                <button className="text-sm font-medium text-[var(--primary)] hover:underline mt-1">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-[1280px] mx-auto px-5 md:px-16 py-16">
        <SectionHeader title="Common Questions" />
        <div className="max-w-2xl mx-auto">
          <Accordion items={plansFaqs} />
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[var(--surface-container)] py-16 mt-8">
        <div className="max-w-[1280px] mx-auto px-5 md:px-16 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="font-heading text-3xl font-bold text-[var(--text-primary)] mb-3">
              Still not sure which plan to choose?
            </h2>
            <p className="text-base text-[var(--text-muted)] max-w-xl">
              Our technical consultants are ready to design a custom
              connectivity map for your specific requirements.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="px-8 py-4 rounded-xl text-sm font-bold bg-[var(--primary)] text-[var(--on-primary)] hover:brightness-110 transition-all text-center whitespace-nowrap"
            >
              Talk to an expert
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 rounded-xl text-sm font-bold technical-border text-[var(--text-primary)] hover:border-[var(--primary)] transition-all text-center whitespace-nowrap"
            >
              Request Callback
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
