"use client";

import { useState } from "react";
import Link from "next/link";
import HeroCarousel from "@/components/HeroCarousel";
import PlanFinder from "@/components/PlanFinder";
import CorporateTeaser from "@/components/CorporateTeaser";
import { featuresData, trustBarItems } from "@/data/features";
import NetworkIndicators from "@/components/NetworkIndicators";

export default function HomePage() {
  const [activeRingTab, setActiveRingTab] = useState<1 | 2>(1);
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
      <HeroCarousel />

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

      {/* ─── Plan Finder Section ────────────────────────── */}
      <PlanFinder />

      {/* ─── Network Indicators ────────────────────────── */}
      <NetworkIndicators />

      {/* ─── Corporate Teaser Section ───────────────────── */}
      <CorporateTeaser />

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

      {/* ─── Coverage Area Teaser ────────────────────────── */}
      <section className="bg-[var(--surface-container-low)] border-t border-b border-[var(--border-cyan)] py-20 w-full relative overflow-hidden">
        {/* Background Cover Image of Fiber Optics */}
        <div className="absolute inset-0 z-0 opacity-35 select-none pointer-events-none">
          <img
            src="/images/fiber-optics-bg.png"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--surface-container-low)] via-transparent to-[var(--surface-container-low)]" />
        </div>

        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[var(--primary)]/5 blur-[120px] rounded-full pointer-events-none z-0" />

        <div className="max-w-[1280px] mx-auto px-5 md:px-16 text-center relative z-10">
          <p className="text-xs font-semibold uppercase tracking-[0.05em] text-[var(--primary)] mb-1">
            Now Serving Twin Cities
          </p>
          <h2 className="font-heading text-3xl font-bold text-[var(--text-primary)] mb-4">
            Expanding High-Speed Fiber Coverage
          </h2>
          <p className="text-sm text-[var(--text-muted)] max-w-xl mx-auto mb-10 leading-relaxed">
            Neolog fiber rings are actively providing dedicated gigabit connections to Hyderabad&apos;s key commercial and residential hubs.
          </p>

          {/* Ring Selector Tabs */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-1 bg-[var(--surface)] p-1 rounded-xl border border-[var(--border-cyan)]">
              <button
                onClick={() => setActiveRingTab(1)}
                className={`px-5 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeRingTab === 1
                    ? "bg-[var(--primary)] text-[var(--on-primary)] active-glow"
                    : "text-[var(--text-muted)] hover:text-white"
                }`}
              >
                Metro Ring 1 (40G Primary)
              </button>
              <button
                onClick={() => setActiveRingTab(2)}
                className={`px-5 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeRingTab === 2
                    ? "bg-[var(--secondary)] text-[var(--on-secondary)]"
                    : "text-[var(--text-muted)] hover:text-white"
                }`}
              >
                Metro Ring 2 (40G High-Capacity)
              </button>
            </div>
          </div>

          {/* Animated Route Flow Trail */}
          <div className="flex flex-wrap justify-center items-center gap-2 max-w-[1000px] mx-auto bg-[var(--surface)] p-6 rounded-2xl border border-[var(--border-cyan)] mb-10 overflow-x-auto select-none">
            {(activeRingTab === 1
              ? ["Tarnaka", "Boduppal", "Narapally", "Ghatkesar", "Dammaiguda", "AS Rao Nagar", "Tarnaka"]
              : ["Nagole", "Ameerpet", "Kukatpally", "Nampally", "Falaknuma", "Santhosh Nagar", "Saidabad", "Nagole"]
            ).map((node, idx, arr) => (
              <div key={`${node}-${idx}`} className="flex items-center gap-2">
                <div className={`px-4 py-2 border rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  ["Tarnaka", "Secunderabad", "HITEC City", "Gachibowli", "Kukatpally"].includes(node)
                    ? "bg-[var(--primary)]/10 border-[var(--primary)] text-[var(--primary)] active-glow"
                    : "bg-[var(--surface-container)] border-[var(--border-cyan)] text-[var(--text-primary)]"
                }`}>
                  {node}
                </div>
                {idx < arr.length - 1 && (
                  <span className={`material-symbols-outlined text-[16px] animate-pulse ${
                    activeRingTab === 1 ? "text-[var(--primary)]" : "text-[var(--secondary)]"
                  }`}>
                    arrow_forward
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Active Zones Cards for the Selected Ring */}
          <p className="text-xs font-semibold uppercase tracking-[0.05em] text-[var(--text-muted)] mb-4">
            Active Hubs on this Ring
          </p>
          <div className="flex flex-wrap justify-center gap-4 max-w-[800px] mx-auto mb-10">
            {(activeRingTab === 1
              ? [
                  { name: "Tarnaka", spec: "Corporate HQ", ring: "Ring 1" },
                  { name: "Secunderabad", spec: "North Ring Hub", ring: "Ring 1" },
                ]
              : [
                  { name: "HITEC City", spec: "10G CDN Edge", ring: "Ring 2" },
                  { name: "Gachibowli", spec: "Enterprise Core", ring: "Ring 2" },
                  { name: "Kukatpally", spec: "Metro Transit", ring: "Ring 2" },
                ]
            ).map((zone) => (
              <div 
                key={zone.name} 
                className="w-[180px] p-5 bg-[var(--surface)] border border-[var(--border-cyan)] hover:border-[var(--primary)] rounded-2xl transition-all duration-300 text-center active-glow group"
              >
                <span className="material-symbols-outlined text-[var(--primary)] text-[24px] mb-2 block group-hover:scale-110 transition-transform">
                  location_on
                </span>
                <h4 className="font-heading text-sm font-bold text-[var(--text-primary)]">
                  {zone.name}
                </h4>
                <p className="text-[10px] text-[var(--text-muted)] mt-1">
                  {zone.spec}
                </p>
                <span className="inline-block mt-3 px-2 py-0.5 rounded-full bg-[var(--surface-container-high)] text-[8px] font-semibold text-[var(--primary)] uppercase tracking-wider">
                  {zone.ring}
                </span>
              </div>
            ))}
          </div>

          {/* Gold CTA button to /coverage */}
          <div className="mt-8 flex justify-center">
            <Link
              href="/coverage"
              className="px-8 py-4 bg-[var(--secondary)] text-[var(--on-secondary)] font-bold rounded-xl text-sm uppercase hover:brightness-110 transition-all cursor-pointer inline-flex items-center gap-2 active-glow shadow-md tracking-wider"
            >
              <span>Explore Interactive Coverage Map</span>
              <span className="material-symbols-outlined text-[18px]">map</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── College Clients Logo Wall ────────────────────────── */}
      <section className="bg-[var(--surface-container)] py-16 overflow-hidden border-y border-[var(--border-cyan)]">
        <div className="max-w-[1280px] mx-auto px-5 md:px-16 text-center mb-10">
          <p className="text-sm font-bold uppercase tracking-widest text-[var(--text-muted)]">
            Trusted by 15+ Engineering Institutions in Hyderabad
          </p>
        </div>
        <div className="relative flex overflow-x-hidden">
          {/* Subtle gradient masks for smooth fade at edges */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/6 bg-gradient-to-r from-[var(--surface-container)] to-transparent z-10"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/6 bg-gradient-to-l from-[var(--surface-container)] to-transparent z-10"></div>

          <div 
            className="flex w-max flex-nowrap py-4 hover:[animation-play-state:paused]"
            style={{ animation: 'marquee 40s linear infinite' }}
          >
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex flex-nowrap shrink-0 gap-6 pr-6 items-center">
                {[
                  "CVR College of Engineering",
                  "SNIST",
                  "MLRIT",
                  "GNITC",
                  "VBIT",
                  "ACE Engineering College",
                  "HITAM",
                  "St. Peter's Engineering College",
                  "Stanley Engineering College",
                  "Aurora's Engineering College",
                  "Nalla Malla Reddy",
                  "Nalla Narasimha Reddy"
                ].map((college, idx) => (
                  <div
                    key={`${college}-${i}-${idx}`}
                    className="flex items-center gap-3 px-6 py-4 bg-[var(--surface)] border border-[var(--border-cyan)]/50 rounded-xl whitespace-nowrap opacity-80 hover:opacity-100 transition-opacity cursor-default"
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                      idx % 3 === 0 ? 'bg-[var(--primary)]/20 text-[var(--primary)]' : 
                      idx % 3 === 1 ? 'bg-[var(--secondary)]/20 text-[var(--secondary)]' : 
                      'bg-[var(--surface-bright)] text-[var(--text-primary)]'
                    }`}>
                      <span className="material-symbols-outlined text-[16px]">
                        {idx % 2 === 0 ? "account_balance" : "school"}
                      </span>
                    </div>
                    <span className="text-sm font-bold text-[var(--text-primary)]">{college}</span>
                  </div>
                ))}
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
              <p className="font-outfit text-[48px] font-bold text-[var(--primary)] mb-1">
                5K+
              </p>
              <p className="text-sm font-medium text-[var(--text-muted)] uppercase tracking-wider">
                Subscribers
              </p>
            </div>
            <div>
              <p className="font-outfit text-[48px] font-bold text-[var(--primary)] mb-1">
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
