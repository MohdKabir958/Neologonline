"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import SectionHeader from "@/components/ui/SectionHeader";
import { CardSkeleton } from "@/components/ui/Skeleton";
import ErrorState from "@/components/ui/ErrorState";
import {
  checkCoverage,
  fetchActiveNeighborhoods,
  fetchExpansionPhases,
} from "@/lib/api";
import { Neighborhood, ExpansionPhase, CoverageResult } from "@/lib/types";

export default function CoveragePage() {
  const [query, setQuery] = useState("");
  const [checking, setChecking] = useState(false);
  const [result, setResult] = useState<CoverageResult | null>(null);
  const [neighborhoods, setNeighborhoods] = useState<Neighborhood[]>([]);
  const [phases, setPhases] = useState<ExpansionPhase[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      setLoading(true);
      setError(false);
      const [nh, ph] = await Promise.all([
        fetchActiveNeighborhoods(),
        fetchExpansionPhases(),
      ]);
      setNeighborhoods(nh);
      setPhases(ph);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  async function handleCheck() {
    if (!query.trim()) return;
    try {
      setChecking(true);
      const res = await checkCoverage(query);
      setResult(res);
    } catch {
      setResult({
        available: false,
        area: query,
        message: "Could not check coverage. Please try again.",
      });
    } finally {
      setChecking(false);
    }
  }

  return (
    <>
      {/* Search Hero */}
      <section className="max-w-[1280px] mx-auto px-5 md:px-16 pt-16 pb-8">
        <h1 className="font-heading text-4xl md:text-[48px] font-bold text-[var(--text-primary)] mb-8">
          Check if NeoLog is available in your area
        </h1>
        <div className="max-w-2xl technical-border rounded-xl p-6 bg-[var(--surface)]">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-[var(--text-muted)] text-[20px]">
                location_on
              </span>
              <input
                type="text"
                placeholder="Enter pincode or area name..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleCheck()}
                className="w-full pl-12 pr-4 py-4 rounded-lg bg-[var(--background)] technical-border text-[var(--text-primary)] text-sm placeholder:text-[var(--text-muted)]/50 focus:border-[var(--primary)] focus:outline-none"
              />
            </div>
            <button
              onClick={handleCheck}
              disabled={checking}
              className="px-8 py-4 bg-[var(--secondary)] text-[var(--on-secondary)] rounded-lg text-sm font-bold hover:brightness-110 transition-all disabled:opacity-50"
            >
              {checking ? "Checking..." : "Check coverage"}
            </button>
          </div>
          <button className="flex items-center gap-2 mt-3 text-sm text-[var(--primary)]">
            <span className="material-symbols-outlined text-[16px]">my_location</span>
            Use my current location
          </button>
        </div>

        {/* Result */}
        {result && (
          <div
            className={`mt-6 max-w-2xl p-6 rounded-xl technical-border ${
              result.available ? "bg-[var(--primary)]/5" : "bg-[var(--secondary)]/5"
            }`}
          >
            <div className="flex items-start gap-4">
              <span
                className={`material-symbols-outlined text-[28px] ${
                  result.available
                    ? "text-[var(--primary)]"
                    : "text-[var(--secondary)]"
                }`}
              >
                {result.available ? "check_circle" : "schedule"}
              </span>
              <div>
                <p className="text-sm font-bold text-[var(--text-primary)] mb-1">
                  {result.available ? "Available!" : "Coming Soon"}
                </p>
                <p className="text-sm text-[var(--text-muted)]">
                  {result.message}
                </p>
                {!result.available && result.estimatedDate && (
                  <p className="text-xs text-[var(--secondary)] mt-1">
                    Expected: {result.estimatedDate}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Map */}
      <section className="max-w-[1280px] mx-auto px-5 md:px-16 py-8">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.05em] text-[var(--secondary)] mb-1">
              Live Network Status
            </p>
            <h2 className="font-heading text-2xl font-bold text-[var(--text-primary)]">
              Hyderabad Coverage Map
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[var(--primary)]" />
              <span className="text-xs text-[var(--text-muted)]">Active Zone</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[var(--secondary)]" />
              <span className="text-xs text-[var(--text-muted)]">Expanding Q3/Q4</span>
            </div>
          </div>
        </div>
        <div className="w-full h-[400px] technical-border rounded-xl bg-[var(--surface-container)] map-grid relative overflow-hidden">
          {/* Map placeholder with pins */}
          <div className="absolute top-1/3 left-1/3">
            <span className="material-symbols-outlined text-[var(--primary)] text-[28px]">
              location_on
            </span>
          </div>
          <div className="absolute top-1/2 left-1/2">
            <span className="material-symbols-outlined text-[var(--secondary)] text-[28px]">
              location_on
            </span>
          </div>
          <div className="absolute bottom-6 right-6 flex flex-col gap-2">
            <button className="w-8 h-8 bg-[var(--surface)] technical-border rounded text-[var(--text-primary)] flex items-center justify-center text-lg">
              +
            </button>
            <button className="w-8 h-8 bg-[var(--surface)] technical-border rounded text-[var(--text-primary)] flex items-center justify-center text-lg">
              −
            </button>
          </div>
        </div>
        {/* TODO: integrate Mapbox/Leaflet with dark theme */}
      </section>

      {/* Active Neighborhoods */}
      <section className="max-w-[1280px] mx-auto px-5 md:px-16 py-16">
        <h2 className="font-heading text-2xl font-bold text-[var(--text-primary)] mb-6">
          Active Neighborhoods
        </h2>
        {loading ? (
          <div className="flex flex-wrap gap-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="animate-pulse h-10 w-32 bg-[var(--surface-variant)] rounded-lg"
              />
            ))}
          </div>
        ) : error ? (
          <ErrorState onRetry={loadData} />
        ) : (
          <div className="flex flex-wrap gap-3">
            {neighborhoods.map((n) => (
              <div
                key={n.name}
                className="flex items-center gap-2 px-4 py-2 technical-border rounded-lg bg-[var(--surface)]"
              >
                <span className="text-sm text-[var(--text-primary)]">
                  {n.name}
                </span>
                <span
                  className={`w-2 h-2 rounded-full ${
                    n.status === "active"
                      ? "bg-[var(--primary)]"
                      : "bg-[var(--secondary)]"
                  }`}
                />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Expansion Roadmap */}
      <section className="max-w-[1280px] mx-auto px-5 md:px-16 py-16">
        <SectionHeader
          title="Expansion Roadmap"
          subtitle="We are aggressively scaling our fiber infrastructure across the city."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {phases.map((phase) => (
            <div
              key={phase.area}
              className="p-6 technical-border rounded-xl bg-[var(--surface)]"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 bg-[var(--secondary)]/10 text-[var(--secondary)] text-xs font-semibold rounded-full">
                  {phase.phase}
                </span>
                <span className="material-symbols-outlined text-[var(--text-muted)] text-[24px]">
                  {phase.icon}
                </span>
              </div>
              <h3 className="font-heading text-xl font-bold text-[var(--text-primary)] mb-2">
                {phase.area}
              </h3>
              <p className="text-sm text-[var(--text-muted)]">
                {phase.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-[1280px] mx-auto px-5 md:px-16 py-16 text-center">
        <h2 className="font-heading text-3xl font-bold text-[var(--text-primary)] mb-4">
          Ready to upgrade your experience?
        </h2>
        <p className="text-base text-[var(--text-muted)] max-w-xl mx-auto mb-8">
          Even if your area isn&apos;t listed, your request helps us prioritize
          where we build next.
        </p>
        <Link
          href="/new-connection"
          className="inline-block px-8 py-4 bg-[var(--secondary)] text-[var(--on-secondary)] rounded-xl text-sm font-bold hover:brightness-110 transition-all"
        >
          Request new connection
        </Link>
      </section>
    </>
  );
}
