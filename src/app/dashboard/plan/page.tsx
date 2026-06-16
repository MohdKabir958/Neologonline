"use client";

import { useState } from "react";
import { dashboardData } from "@/data/dashboard";

const UPGRADE_OPTIONS = [
  { id: "plan-60", name: "60 Mbps", speed: "60 Mbps", price: 3186, features: ["Symmetrical Speed", "Dual-Band Wi-Fi 5", "Priority Routing", "Free installation"] },
  { id: "plan-100", name: "100 Mbps", speed: "100 Mbps", price: 4248, features: ["Wi-Fi 6 Mesh Router", "2 Static IPs optional", "Direct NOC routing", "99.9% SLA"] },
];

export default function DashboardPlanPage() {
  const { planDetails } = dashboardData;
  const [upgraded, setUpgraded] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  function handleUpgrade(planName: string) {
    setSelectedPlan(planName);
    setUpgraded(true);
    setTimeout(() => {
      setUpgraded(false);
      setSelectedPlan(null);
      alert(`Upgrade request for ${planName} submitted! Our team will call you within 2 hours to deploy the upgrade.`);
    }, 1500);
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-heading text-2xl font-bold text-[var(--text-primary)] mb-2">My Active Plan</h1>
        <p className="text-sm text-[var(--text-muted)]">View and manage your active broadband plan parameters.</p>
      </div>

      {/* Active Plan Card */}
      <div className="p-6 technical-border rounded-xl bg-[var(--surface)] grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <span className="inline-block px-3 py-1 bg-[var(--primary)]/10 text-[var(--primary)] text-xs font-semibold rounded-full mb-3 uppercase tracking-wider">
            Active Connection
          </span>
          <h2 className="font-heading text-3xl font-bold text-[var(--text-primary)] mb-1">{planDetails.name}</h2>
          <p className="text-sm text-[var(--text-muted)] mb-4">{planDetails.series}</p>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[var(--primary)] text-[22px]">speed</span>
            <span className="text-xl font-bold text-[var(--text-primary)]">{planDetails.speed}</span>
          </div>
        </div>

        {/* Detailed Specs Table */}
        <div className="space-y-3 border-t md:border-t-0 md:border-l border-[var(--border-cyan)]/40 pt-6 md:pt-0 md:pl-8">
          <div className="flex justify-between text-sm py-1 border-b border-[var(--border-cyan)]/20">
            <span className="text-[var(--text-muted)] font-medium">Data Limit</span>
            <span className="text-[var(--text-primary)] font-semibold">{planDetails.fupLimit}</span>
          </div>
          <div className="flex justify-between text-sm py-1 border-b border-[var(--border-cyan)]/20">
            <span className="text-[var(--text-muted)] font-medium">Hardware CPE</span>
            <span className="text-[var(--text-primary)] font-semibold">{planDetails.router}</span>
          </div>
          <div className="flex justify-between text-sm py-1">
            <span className="text-[var(--text-muted)] font-medium">Static IP Route</span>
            <span className="text-[var(--text-primary)] font-semibold">{planDetails.staticIp}</span>
          </div>
        </div>
      </div>

      {/* Available Upgrades */}
      <div>
        <h2 className="font-heading text-xl font-bold text-[var(--text-primary)] mb-4">Available High-Speed Upgrades</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {UPGRADE_OPTIONS.map((option) => (
            <div key={option.id} className="p-6 technical-border rounded-xl bg-[var(--surface)] hover:border-[var(--primary)] transition-all flex flex-col justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.05em] text-[var(--text-muted)] mb-1">
                  {option.name}
                </p>
                <p className="font-heading text-2xl font-bold text-[var(--text-primary)] mb-1">
                  {option.speed}
                </p>
                <p className="text-sm text-[var(--primary)] font-semibold mb-4">
                  ₹{option.price} /6mo
                </p>
                <ul className="space-y-2 mb-6">
                  {option.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
                      <span className="material-symbols-outlined text-[var(--primary)] text-[14px]">
                        check_circle
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <button
                onClick={() => handleUpgrade(option.name)}
                disabled={upgraded}
                className="w-full py-2.5 bg-[var(--primary)]/10 border border-[var(--primary)]/30 text-[var(--primary)] rounded-lg text-xs font-bold hover:bg-[var(--primary)] hover:text-[var(--on-primary)] transition-all disabled:opacity-50"
              >
                {upgraded && selectedPlan === option.name ? "Processing..." : "Request Upgrade"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
