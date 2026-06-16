"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { whyNeologBenefits } from "@/data/features";
import { Suspense } from "react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const refId = searchParams.get("ref") || "NL-000000";

  return (
    <div className="max-w-[1280px] mx-auto px-5 md:px-16 pt-4 pb-12">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Content */}
        <div className="flex-1 lg:max-w-2xl">
          <div className="technical-border rounded-xl p-8 bg-[var(--surface)] text-center mb-8">
            <div className="w-20 h-20 rounded-full bg-[var(--primary)]/10 technical-border flex items-center justify-center mx-auto mb-6">
              <span className="material-symbols-outlined text-[40px] text-[var(--primary)]">
                check_circle
              </span>
            </div>
            <h1 className="font-heading text-2xl font-bold text-[var(--text-primary)] mb-3">
              Request Received Successfully!
            </h1>
            <p className="text-sm text-[var(--text-muted)] max-w-md mx-auto mb-8">
              Thank you for choosing NeoLog. Our representative will call you at
              the provided mobile number within 2 hours to verify your details
              and schedule the installation.
            </p>
            <div className="inline-block technical-border rounded-xl px-8 py-4">
              <p className="text-xs text-[var(--text-muted)] uppercase tracking-[0.05em] mb-1">
                Reference ID
              </p>
              <p className="font-heading text-xl font-bold text-[var(--primary)]">
                {refId}
              </p>
            </div>
          </div>

          {/* Next Steps */}
          <div className="technical-border rounded-xl p-8 bg-[var(--surface)] mb-8">
            <h2 className="font-heading text-lg font-bold text-[var(--primary)] mb-6">
              Next Steps
            </h2>
            <div className="space-y-4">
              {[
                "Technical verification (Phone call)",
                "Document collection (On-site)",
                "Installation & Activation",
              ].map((step, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-[var(--primary)]/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-[var(--primary)]">
                      {i + 1}
                    </span>
                  </div>
                  <p className="text-sm font-bold text-[var(--text-primary)]">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* CTAs */}
          <div className="flex gap-4">
            <Link
              href="/dashboard"
              className="flex-1 py-4 text-center bg-[var(--primary)] text-[var(--on-primary)] rounded-xl text-sm font-bold hover:brightness-110 transition-all"
            >
              Track Request Status
            </Link>
            <Link
              href="/"
              className="flex-1 py-4 text-center technical-border text-[var(--text-primary)] rounded-xl text-sm font-bold hover:bg-[var(--surface)] transition-all"
            >
              Back to Home
            </Link>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:w-[380px] space-y-6">
          <div className="technical-border rounded-xl p-6 bg-[var(--surface)]">
            <h3 className="font-heading text-lg font-bold text-[var(--primary)] mb-6">
              Why NeoLog?
            </h3>
            <div className="space-y-6">
              {whyNeologBenefits.map((b) => (
                <div key={b.title} className="flex gap-4">
                  <span className="material-symbols-outlined text-[var(--primary)] text-[24px] flex-shrink-0 mt-1">
                    {b.icon}
                  </span>
                  <div>
                    <h4 className="font-heading text-base font-bold text-[var(--text-primary)] mb-1">
                      {b.title}
                    </h4>
                    <p className="text-sm text-[var(--text-muted)]">
                      {b.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="technical-border rounded-xl p-6 bg-[var(--surface)] text-center">
            <span className="material-symbols-outlined text-[var(--primary)] text-[40px] mb-3 block">
              map
            </span>
            <h4 className="font-heading text-base font-bold text-[var(--text-primary)] mb-2">
              Coverage Map
            </h4>
            <p className="text-sm text-[var(--text-muted)] mb-4">
              See if NeoLog is already active in your locality across Hyderabad.
            </p>
            <Link
              href="/coverage"
              className="text-sm font-medium text-[var(--primary)] underline"
            >
              Check Locality Coverage
            </Link>
          </div>
          <div className="technical-border rounded-xl p-6 bg-[var(--surface)] flex items-center gap-4">
            <span className="material-symbols-outlined text-[var(--primary)] text-[24px]">
              chat
            </span>
            <div>
              <p className="text-sm text-[var(--text-muted)]">Need urgent help?</p>
              <p className="font-heading text-base font-bold text-[var(--primary)]">
                1800-NEO-LOG
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ConnectionSuccessPage() {
  return (
    <Suspense fallback={<div className="max-w-[1280px] mx-auto px-5 md:px-16 py-12">Loading...</div>}>
      {/* Breadcrumbs */}
      <div className="max-w-[1280px] mx-auto px-5 md:px-16 pt-4 pb-2 flex items-center gap-2 text-xs font-semibold text-[var(--text-muted)] select-none">
        <Link href="/" className="hover:text-[var(--primary)] transition-colors">Home</Link>
        <span className="material-symbols-outlined text-[14px] leading-none opacity-40">chevron_right</span>
        <Link href="/new-connection" className="hover:text-[var(--primary)] transition-colors">New Connection</Link>
        <span className="material-symbols-outlined text-[14px] leading-none opacity-40">chevron_right</span>
        <span className="text-[var(--text-primary)]">Success</span>
      </div>
      <SuccessContent />
    </Suspense>
  );
}
