"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { submitConnectionRequest } from "@/lib/api";
import { whyNeologBenefits } from "@/data/features";
import { plansData } from "@/data/plans";
import { Suspense } from "react";

function ConnectionFormInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preselectedPlan = searchParams.get("plan") || "";

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    email: "",
    selectedPlan: preselectedPlan,
    address: "",
    pincode: "",
    landmark: "",
  });

  const steps = [
    { num: 1, label: "Details" },
    { num: 2, label: "Plan" },
    { num: 3, label: "Address" },
    { num: 4, label: "Confirm" },
  ];

  async function handleSubmit() {
    try {
      setLoading(true);
      const result = await submitConnectionRequest(formData);
      if (result.success) {
        router.push(`/new-connection/success?ref=${result.referenceId}`);
      }
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleNext() {
    if (step < 4) setStep(step + 1);
    else handleSubmit();
  }

  return (
    <div className="max-w-[1280px] mx-auto px-5 md:px-16 py-12">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Form */}
        <div className="flex-1 lg:max-w-2xl">
          <h1 className="font-heading text-2xl font-bold text-[var(--primary)] mb-2">
            Get NeoLog at your home
          </h1>
          <p className="text-sm text-[var(--text-muted)] mb-8">
            Fill out the request and our representative will reach out with a
            callback in 2 hours.
          </p>

          {/* Progress Steps */}
          <div className="flex items-center justify-between mb-10">
            {steps.map((s, i) => (
              <div key={s.num} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                      step >= s.num
                        ? "bg-[var(--primary)] text-[var(--on-primary)]"
                        : "technical-border text-[var(--text-muted)]"
                    }`}
                  >
                    {step > s.num ? (
                      <span className="material-symbols-outlined text-[18px]">check</span>
                    ) : (
                      `0${s.num}`
                    )}
                  </div>
                  <span
                    className={`text-xs mt-2 font-medium ${
                      step >= s.num
                        ? "text-[var(--primary)]"
                        : "text-[var(--text-muted)]"
                    }`}
                  >
                    {s.label}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div
                    className={`flex-1 h-px mx-3 ${
                      step > s.num
                        ? "bg-[var(--primary)]"
                        : "bg-[var(--border-cyan)]"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Step Content */}
          <div className="technical-border rounded-xl p-8 bg-[var(--surface)]">
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-[var(--text-primary)] mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg bg-[var(--background)] technical-border text-[var(--text-primary)] text-sm placeholder:text-[var(--text-muted)]/50 focus:border-[var(--primary)] focus:outline-none transition-colors"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-[var(--text-primary)] mb-2">
                      Mobile Number
                    </label>
                    <div className="flex">
                      <span className="px-3 py-3 bg-[var(--surface-container)] technical-border rounded-l-lg text-sm text-[var(--text-muted)] border-r-0">
                        +91
                      </span>
                      <input
                        type="tel"
                        placeholder="98765 43210"
                        value={formData.mobile}
                        onChange={(e) =>
                          setFormData({ ...formData, mobile: e.target.value })
                        }
                        className="flex-1 px-4 py-3 rounded-r-lg bg-[var(--background)] technical-border text-[var(--text-primary)] text-sm placeholder:text-[var(--text-muted)]/50 focus:border-[var(--primary)] focus:outline-none transition-colors"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-[var(--text-primary)] mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="name@domain.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-lg bg-[var(--background)] technical-border text-[var(--text-primary)] text-sm placeholder:text-[var(--text-muted)]/50 focus:border-[var(--primary)] focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <h3 className="font-heading text-lg font-bold text-[var(--text-primary)] mb-4">
                  Select Your Plan
                </h3>
                {plansData.map((plan) => (
                  <button
                    key={plan.id}
                    onClick={() =>
                      setFormData({ ...formData, selectedPlan: plan.id })
                    }
                    className={`w-full flex items-center justify-between p-4 rounded-xl transition-all text-left ${
                      formData.selectedPlan === plan.id
                        ? "border-2 border-[var(--primary)] bg-[var(--primary)]/5"
                        : "technical-border hover:border-[var(--primary)]/50"
                    }`}
                  >
                    <div>
                      <p className="font-heading text-base font-bold text-[var(--text-primary)]">
                        {plan.name}
                      </p>
                      <p className="text-sm text-[var(--text-muted)]">
                        {plan.speed} {plan.speedUnit}
                      </p>
                    </div>
                    <p className="font-heading text-xl font-bold text-[var(--primary)]">
                      ₹{plan.price}/mo
                    </p>
                  </button>
                ))}
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-[var(--text-primary)] mb-2">
                    Installation Address
                  </label>
                  <textarea
                    placeholder="Enter your full address"
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    rows={3}
                    className="w-full px-4 py-3 rounded-lg bg-[var(--background)] technical-border text-[var(--text-primary)] text-sm placeholder:text-[var(--text-muted)]/50 focus:border-[var(--primary)] focus:outline-none transition-colors resize-none"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-[var(--text-primary)] mb-2">
                      Pincode
                    </label>
                    <input
                      type="text"
                      placeholder="500081"
                      value={formData.pincode}
                      onChange={(e) =>
                        setFormData({ ...formData, pincode: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-lg bg-[var(--background)] technical-border text-[var(--text-primary)] text-sm placeholder:text-[var(--text-muted)]/50 focus:border-[var(--primary)] focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-[var(--text-primary)] mb-2">
                      Landmark
                    </label>
                    <input
                      type="text"
                      placeholder="Near..."
                      value={formData.landmark}
                      onChange={(e) =>
                        setFormData({ ...formData, landmark: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-lg bg-[var(--background)] technical-border text-[var(--text-primary)] text-sm placeholder:text-[var(--text-muted)]/50 focus:border-[var(--primary)] focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6">
                <h3 className="font-heading text-lg font-bold text-[var(--text-primary)] mb-4">
                  Review Your Details
                </h3>
                <div className="space-y-3">
                  {[
                    { label: "Name", value: formData.fullName },
                    { label: "Mobile", value: `+91 ${formData.mobile}` },
                    { label: "Email", value: formData.email },
                    {
                      label: "Plan",
                      value:
                        plansData.find((p) => p.id === formData.selectedPlan)
                          ?.name || "Not selected",
                    },
                    { label: "Address", value: formData.address },
                    { label: "Pincode", value: formData.pincode },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex justify-between py-2 border-b border-[var(--border-cyan)]/30"
                    >
                      <span className="text-sm text-[var(--text-muted)]">
                        {item.label}
                      </span>
                      <span className="text-sm font-medium text-[var(--text-primary)]">
                        {item.value || "—"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-4 mt-6">
            {step > 1 && (
              <button
                onClick={() => setStep(step - 1)}
                className="flex-1 py-4 technical-border rounded-xl text-sm font-bold text-[var(--text-primary)] hover:bg-[var(--surface)] transition-all"
              >
                Back
              </button>
            )}
            <button
              onClick={handleNext}
              disabled={loading}
              className="flex-1 py-4 bg-[var(--secondary)] text-[var(--on-secondary)] rounded-xl text-sm font-bold hover:brightness-110 transition-all disabled:opacity-50"
            >
              {loading
                ? "Submitting..."
                : step === 4
                ? "Submit Request"
                : "Continue"}
            </button>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:w-[380px] space-y-6">
          {/* Why NeoLog */}
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

          {/* Coverage Map CTA */}
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

          {/* Urgent Help */}
          <div className="technical-border rounded-xl p-6 bg-[var(--surface)] flex items-center gap-4">
            <span className="material-symbols-outlined text-[var(--primary)] text-[24px]">
              chat
            </span>
            <div>
              <p className="text-sm text-[var(--text-muted)]">
                Need urgent help?
              </p>
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

export default function NewConnectionPage() {
  return (
    <Suspense fallback={<div className="max-w-[1280px] mx-auto px-5 md:px-16 py-12">Loading...</div>}>
      <ConnectionFormInner />
    </Suspense>
  );
}
