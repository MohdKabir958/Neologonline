"use client";

import { useState, useEffect } from "react";
import SectionHeader from "@/components/ui/SectionHeader";
import PlanCard from "@/components/ui/PlanCard";
import Accordion from "@/components/ui/Accordion";
import { CardSkeleton } from "@/components/ui/Skeleton";
import ErrorState from "@/components/ui/ErrorState";
import { fetchPlans, fetchPlanAddons } from "@/lib/api";
import { Plan, PlanAddon } from "@/lib/types";
import { planComparisonFeatures } from "@/data/plans";
import { plansFaqs } from "@/data/faqs";
import Link from "next/link";

export default function PlansPage() {
  const [billing, setBilling] = useState<"monthly" | "quarterly" | "annual">("monthly");
  const [plans, setPlans] = useState<Plan[]>([]);
  const [addons, setAddons] = useState<PlanAddon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    loadData();
  }, [billing]);

  async function loadData() {
    try {
      setLoading(true);
      setError(false);
      const [plansRes, addonsRes] = await Promise.all([
        fetchPlans(billing),
        fetchPlanAddons(),
      ]);
      setPlans(plansRes);
      setAddons(addonsRes);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Hero */}
      <section className="max-w-[1280px] mx-auto px-5 md:px-16 pt-16 pb-8 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.05em] text-[var(--primary)] mb-3">
          Broadband Plans
        </p>
        <h1 className="font-heading text-4xl md:text-[48px] font-bold leading-tight text-[var(--text-primary)] mb-4">
          Choose the speed you need
        </h1>
        <p className="text-base text-[var(--text-muted)] max-w-2xl mx-auto mb-8">
          Hyper-fast fiber connectivity for your home and business, delivered
          with precision across Hyderabad.
        </p>

        {/* Billing Toggle */}
        <div className="inline-flex items-center gap-1 bg-[var(--surface)] rounded-full p-1 technical-border">
          {(["monthly", "quarterly", "annual"] as const).map((period) => (
            <button
              key={period}
              onClick={() => setBilling(period)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                billing === period
                  ? "bg-[var(--primary)] text-[var(--on-primary)]"
                  : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
              }`}
            >
              {period.charAt(0).toUpperCase() + period.slice(1)}
              {period === "quarterly" && (
                <span className="ml-1 text-xs opacity-75">-6%</span>
              )}
              {period === "annual" && (
                <span className="ml-1 text-xs opacity-75">-30%</span>
              )}
            </button>
          ))}
        </div>
      </section>

      {/* Plan Cards */}
      <section className="max-w-[1280px] mx-auto px-5 md:px-16 py-12">
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
              <PlanCard key={plan.id} plan={plan} />
            ))}
          </div>
        )}
      </section>

      {/* Feature Comparison Table */}
      <section className="max-w-[1280px] mx-auto px-5 md:px-16 py-16">
        <SectionHeader title="Compare All Features" />
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--border-cyan)]">
                <th className="text-left py-4 px-4 font-heading text-base font-bold text-[var(--text-primary)]">
                  Feature
                </th>
                <th className="text-center py-4 px-4 text-sm font-medium text-[var(--text-muted)]">
                  Starter
                </th>
                <th className="text-center py-4 px-4 text-sm font-bold text-[var(--primary)]">
                  Home Pro
                </th>
                <th className="text-center py-4 px-4 text-sm font-medium text-[var(--text-muted)]">
                  Ultra
                </th>
                <th className="text-center py-4 px-4 text-sm font-medium text-[var(--text-muted)]">
                  Business
                </th>
              </tr>
            </thead>
            <tbody>
              {planComparisonFeatures.map((row, i) => (
                <tr
                  key={i}
                  className="border-b border-[var(--border-cyan)]/50"
                >
                  <td className="py-4 px-4 text-sm font-bold text-[var(--text-primary)]">
                    {row.feature}
                  </td>
                  <td className="py-4 px-4 text-center text-sm text-[var(--text-muted)]">
                    {row.starter}
                  </td>
                  <td className="py-4 px-4 text-center text-sm font-bold text-[var(--primary)]">
                    {row.homePro}
                  </td>
                  <td className="py-4 px-4 text-center text-sm text-[var(--text-muted)]">
                    {row.ultra}
                  </td>
                  <td className="py-4 px-4 text-center text-sm text-[var(--text-muted)]">
                    {row.business}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Add-ons */}
      <section className="max-w-[1280px] mx-auto px-5 md:px-16 py-16">
        <SectionHeader title="Enhance Your Experience" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {addons.map((addon) => (
            <div
              key={addon.id}
              className="flex items-center justify-between p-6 technical-border rounded-xl bg-[var(--surface)]"
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
                <button className="text-sm font-medium text-[var(--primary)] hover:underline">
                  Add
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
      <section className="bg-[var(--surface-container)] py-16">
        <div className="max-w-[1280px] mx-auto px-5 md:px-16 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="font-heading text-3xl font-bold text-[var(--text-primary)] mb-3">
              Still not sure which plan to choose?
            </h2>
            <p className="text-base text-[var(--text-muted)]">
              Our technical consultants are ready to design a custom
              connectivity map for your specific requirements.
            </p>
          </div>
          <div className="flex gap-4">
            <Link
              href="/contact"
              className="px-8 py-4 rounded-xl text-sm font-bold bg-[var(--primary)] text-[var(--on-primary)] hover:brightness-110 transition-all text-center"
            >
              Talk to
              <br />
              an expert
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 rounded-xl text-sm font-bold technical-border text-[var(--text-primary)] hover:border-[var(--primary)] transition-all text-center"
            >
              Request
              <br />
              Callback
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
