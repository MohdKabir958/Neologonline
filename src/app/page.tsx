"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import SectionHeader from "@/components/ui/SectionHeader";
import PlanCard from "@/components/ui/PlanCard";
import { CardSkeleton } from "@/components/ui/Skeleton";
import ErrorState from "@/components/ui/ErrorState";
import { fetchPlans } from "@/lib/api";
import { Plan } from "@/lib/types";
import { featuresData, trustBarItems } from "@/data/features";
import { COMPANY } from "@/lib/constants";

export default function HomePage() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [speed, setSpeed] = useState(0);

  useEffect(() => {
    loadPlans();
    // Speed counter animation
    let start = 0;
    const end = 200;
    const duration = 2000;
    const startTime = Date.now();
    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      start = Math.floor(progress * end);
      setSpeed(start);
      if (progress >= 1) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, []);

  async function loadPlans() {
    try {
      setLoading(true);
      setError(false);
      const data = await fetchPlans();
      setPlans(data.slice(0, 3)); // Show first 3 on home
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "NeoLog Online Services",
            url: "https://www.neologonline.in",
            logo: "https://www.neologonline.in/logo.png",
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "+91-40-45256960",
              contactType: "customer service",
            },
            address: {
              "@type": "PostalAddress",
              addressLocality: "Hyderabad",
              addressRegion: "Telangana",
              addressCountry: "IN",
            },
          }),
        }}
      />

      {/* ─── Hero Section ──────────────────────────────── */}
      <section className="max-w-[1280px] mx-auto px-5 md:px-16 py-8 flex flex-col lg:flex-row items-center gap-6 overflow-hidden">
        {/* Left Content */}
        <div className="flex-1 space-y-4 z-10 py-8 lg:py-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[var(--primary)]/10 technical-border rounded-full">
            <span className="material-symbols-outlined text-[16px] text-[var(--primary)]">
              location_on
            </span>
            <span className="text-[var(--primary)] text-xs font-semibold tracking-[0.05em] uppercase">
              Hyderabad&apos;s fiber broadband
            </span>
          </div>
          <h1 className="font-heading text-4xl lg:text-[48px] font-bold leading-tight text-[var(--text-primary)]">
            Internet that{" "}
            <span className="text-[var(--primary)]">never slows</span> you down
          </h1>
          <p className="text-lg leading-7 text-[var(--text-muted)] max-w-xl">
            Experience ultra-stable fiber connectivity powered by a dedicated
            backbone. Designed for professional gamers, creators, and modern
            smart homes in Hyderabad.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <Link
              href="/plans"
              className="bg-[var(--secondary)] text-[var(--on-secondary)] px-8 py-4 rounded-xl text-sm font-bold flex items-center gap-2 hover:brightness-110 transition-all"
            >
              View Plans
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
            <a
              href={`tel:${COMPANY.phone.replace(/\s/g, "")}`}
              className="technical-border text-[var(--text-primary)] px-8 py-4 rounded-xl text-sm font-bold hover:bg-[var(--surface)] transition-all"
            >
              Call Us: {COMPANY.phone}
            </a>
          </div>
        </div>

        {/* Right: Speed Showcase */}
        <div className="flex-1 w-full lg:w-auto z-10 flex flex-col gap-4">
          <div className="bg-[var(--surface)] technical-border p-8 rounded-xl active-glow">
            <p className="text-xs font-semibold tracking-[0.05em] text-[var(--text-muted)] uppercase mb-4">
              Your connection could be
            </p>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="font-heading text-[48px] font-bold text-[var(--primary)]">
                {speed}
              </span>
              <span className="font-heading text-2xl font-bold text-[var(--text-muted)]">
                Mbps
              </span>
            </div>
            <div className="w-full h-2 bg-[var(--surface-container)] rounded-full overflow-hidden mb-8">
              <div className="h-full bg-[var(--primary)] animate-progress" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Reliability", value: "99.9%" },
                { label: "Support", value: "24/7" },
                { label: "Hardware", value: "Free", italic: true },
                { label: "Active Users", value: "5,000+" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="p-4 bg-[var(--background)]/50 technical-border rounded-lg"
                >
                  <p className="text-xs font-semibold tracking-[0.05em] text-[var(--text-muted)] uppercase mb-1">
                    {stat.label}
                  </p>
                  <span
                    className={`font-heading text-2xl font-bold text-[var(--text-primary)] ${
                      stat.italic ? "italic" : ""
                    }`}
                  >
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Trust Bar ─────────────────────────────────── */}
      <section className="bg-[var(--surface-container)] py-8 border-y border-[var(--border-cyan)]">
        <div className="max-w-[1280px] mx-auto px-5 md:px-16 flex flex-wrap justify-between items-center gap-8">
          {trustBarItems.map((item) => (
            <div key={item} className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[var(--primary)]" />
              <span className="text-sm font-medium text-[var(--text-primary)]">
                {item}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Plans Teaser ──────────────────────────────── */}
      <section className="max-w-[1280px] mx-auto px-5 md:px-16 py-24">
        <SectionHeader
          title="Choose Your Speed"
          subtitle="Flexible plans designed for everything from casual browsing to high-stakes professional streaming."
        />
        {error ? (
          <ErrorState onRetry={loadPlans} />
        ) : loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <PlanCard key={plan.id} plan={plan} showSpeed={false} />
            ))}
          </div>
        )}
      </section>

      {/* ─── Features Grid ─────────────────────────────── */}
      <section className="bg-[var(--surface-container-low)] py-24">
        <div className="max-w-[1280px] mx-auto px-5 md:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuresData.map((feature) => (
              <div
                key={feature.title}
                className="p-8 technical-border rounded-xl bg-[var(--surface)] hover:bg-[var(--surface-variant)] transition-colors"
              >
                <span className="material-symbols-outlined text-[var(--primary)] text-[40px] mb-6 block">
                  {feature.icon}
                </span>
                <h3 className="font-heading text-2xl font-bold text-[var(--text-primary)] mb-3">
                  {feature.title}
                </h3>
                <p className="text-sm text-[var(--text-muted)]">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── About Teaser ──────────────────────────────── */}
      <section className="max-w-[1280px] mx-auto px-5 md:px-16 py-24 flex flex-col lg:flex-row items-center gap-16">
        <div className="flex-1 space-y-6">
          <h2 className="font-heading text-[32px] font-bold text-[var(--text-primary)]">
            Built for Hyderabad,
            <br />
            Owned by Engineers.
          </h2>
          <p className="text-lg leading-7 text-[var(--text-muted)]">
            NeoLog Online Services started in 2021 with a simple mission: to
            provide the tech-hub of India with the reliable infrastructure it
            deserves. We don&apos;t just sell internet; we manage the fiber
            network ourselves.
          </p>
          <div className="flex gap-12 border-t border-[var(--border-cyan)] pt-12">
            <div>
              <p className="font-heading text-[48px] font-bold text-[var(--primary)] mb-1">
                5K+
              </p>
              <p className="text-sm font-medium text-[var(--text-muted)] uppercase tracking-wider">
                Subscribers
              </p>
            </div>
            <div>
              <p className="font-heading text-[48px] font-bold text-[var(--primary)] mb-1">
                99%
              </p>
              <p className="text-sm font-medium text-[var(--text-muted)] uppercase tracking-wider">
                Uptime Rate
              </p>
            </div>
          </div>
        </div>
        <div className="flex-1 w-full aspect-video rounded-3xl overflow-hidden technical-border relative">
          <img
            src="/images/engineers-network.png"
            alt="Neolog Network Engineers at Work"
            className="w-full h-full object-cover"
          />
        </div>
      </section>
    </>
  );
}
