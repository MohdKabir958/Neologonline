"use client";

import { useState } from "react";

interface Referral {
  name: string;
  date: string;
  status: "Connected" | "Pending" | "Expired";
  reward: string;
}

const INITIAL_REFERRALS: Referral[] = [
  { name: "Md. Sohail", date: "Jun 12, 2026", status: "Connected", reward: "₹500 Credited" },
  { name: "Priya Sharma", date: "May 28, 2026", status: "Pending", reward: "Pending activation" },
  { name: "Rohan Varma", date: "Apr 04, 2026", status: "Expired", reward: "Expired" },
];

export default function DashboardReferralPage() {
  const [referrals] = useState<Referral[]>(INITIAL_REFERRALS);
  const [copied, setCopied] = useState(false);
  const refCode = "NEOLOG-ARJUN99";

  function handleCopy() {
    navigator.clipboard.writeText(refCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-heading text-2xl font-bold text-[var(--text-primary)] mb-2">Refer a Friend & Earn</h1>
        <p className="text-sm text-[var(--text-muted)]">Invite your friends to Neolog Online and earn billing discounts.</p>
      </div>

      {/* Refer Card */}
      <div className="p-8 bg-gradient-to-r from-[var(--surface-container-low)] to-[var(--surface-container-high)] technical-border rounded-2xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="font-heading text-2xl font-bold text-[var(--text-primary)] mb-3">Earn ₹500 discount credits</h2>
          <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-6">
            Share your unique referral code. When your friend registers for a new fiber connection and starts their plan, 
            you both get ₹500 discount credited directly into your next billing cycles.
          </p>
          {/* Code display */}
          <div className="flex gap-2 w-full max-w-sm">
            <div className="flex-1 px-4 py-3 bg-[var(--background)] technical-border rounded-lg text-center font-mono text-base font-bold text-[var(--primary)] select-all uppercase">
              {refCode}
            </div>
            <button
              onClick={handleCopy}
              className="px-5 py-3 bg-[var(--primary)] text-[var(--on-primary)] rounded-lg text-sm font-bold hover:brightness-110 transition-all flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[18px]">
                {copied ? "check" : "content_copy"}
              </span>
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
        </div>

        <div className="flex justify-center">
          <span className="material-symbols-outlined text-[var(--primary)]/10 text-[180px] select-none">
            card_giftcard
          </span>
        </div>
      </div>

      {/* Referral History */}
      <div className="p-6 technical-border rounded-xl bg-[var(--surface)]">
        <h3 className="font-heading text-lg font-bold text-[var(--text-primary)] mb-6">My Referral History</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-[var(--border-cyan)]/30 text-left">
                <th className="py-3 px-4 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                  Friend&apos;s Name
                </th>
                <th className="py-3 px-4 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                  Invited Date
                </th>
                <th className="py-3 px-4 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                  Connection Status
                </th>
                <th className="py-3 px-4 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] text-right">
                  Reward Status
                </th>
              </tr>
            </thead>
            <tbody>
              {referrals.map((ref, idx) => (
                <tr key={idx} className="border-b border-[var(--border-cyan)]/10 hover:bg-[var(--surface-container-low)]/50 transition-colors">
                  <td className="py-4 px-4 text-sm font-bold text-[var(--text-primary)]">
                    {ref.name}
                  </td>
                  <td className="py-4 px-4 text-sm text-[var(--text-muted)]">
                    {ref.date}
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        ref.status === "Connected"
                          ? "bg-emerald-400/10 text-emerald-400"
                          : ref.status === "Pending"
                          ? "bg-[var(--secondary)]/10 text-[var(--secondary)]"
                          : "bg-red-400/10 text-red-400"
                      }`}
                    >
                      {ref.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-sm font-medium text-[var(--text-primary)] text-right">
                    {ref.reward}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
