import React from "react";
import SectionHeader from "@/components/ui/SectionHeader";

export default function ArchitectureStack() {
  return (
    <section className="bg-[var(--surface-container-low)] py-16 border-y border-[var(--border-cyan)]/50 relative overflow-hidden w-full">
      <div className="absolute inset-0 z-0 opacity-70 select-none pointer-events-none">
        <img
          src="/images/server_rack_bg.png"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--surface-container-low)] via-[var(--surface-container-low)]/50 to-[var(--surface-container-low)]" />
      </div>

      <div className="max-w-[1280px] mx-auto px-5 md:px-16 relative z-10">
        <SectionHeader title="Architecture & Hardware Stack" subtitle="Enterprise-grade components deployed across our dual-ring metro core." />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Metro Ring */}
          <div className="space-y-6">
            <h3 className="font-heading text-xl font-bold text-[var(--text-primary)] flex items-center gap-2">
              <span className="material-symbols-outlined text-[var(--secondary)]">all_inclusive</span>
              Metro Ring Architecture
            </h3>
            <div className="bg-[var(--surface)] p-6 rounded-xl technical-border space-y-6">
              <div>
                <p className="text-sm font-bold text-[var(--primary)] uppercase tracking-wider mb-3">
                  Ring 1 — 40G Primary
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Tarnaka", "Boduppal", "Narapally", "Ghatkesar", "Dammaiguda", "AS Rao Nagar"].map((node, i, arr) => (
                    <div key={node} className="flex items-center text-xs text-[var(--text-muted)]">
                      <span className="font-semibold text-[var(--text-primary)]">{node}</span>
                      {i < arr.length - 1 && <span className="material-symbols-outlined text-[14px] mx-1">arrow_forward</span>}
                    </div>
                  ))}
                </div>
              </div>
              <div className="pt-4 border-t border-[var(--border-cyan)]/30">
                <p className="text-sm font-bold text-[var(--secondary)] uppercase tracking-wider mb-3">
                  Ring 2 — 40G High-Capacity
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Nagole", "Ameerpet", "Kukatpally", "Nampally", "Falaknuma", "Santhosh Nagar", "Saidabad"].map((node, i, arr) => (
                    <div key={node} className="flex items-center text-xs text-[var(--text-muted)]">
                      <span className="font-semibold text-[var(--text-primary)]">{node}</span>
                      {i < arr.length - 1 && <span className="material-symbols-outlined text-[14px] mx-1">arrow_forward</span>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Hardware Stack */}
          <div className="space-y-6">
            <h3 className="font-heading text-xl font-bold text-[var(--text-primary)] flex items-center gap-2">
              <span className="material-symbols-outlined text-[var(--primary)]">dns</span>
              Hardware Stack
            </h3>
            <div className="overflow-hidden technical-border rounded-xl">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-[var(--surface)] border-b border-[var(--border-cyan)]">
                    <th className="text-left py-3 px-4 font-bold text-[var(--text-muted)]">Layer</th>
                    <th className="text-left py-3 px-4 font-bold text-[var(--text-muted)]">Equipment / System</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { layer: "Core Layer", equip: "Cisco 4500X — 10G/40G Uplinks" },
                    { layer: "Distribution Layer", equip: "Huawei S6720S — Aggregation Systems" },
                    { layer: "Access Layer", equip: "Cisco 4500X — Edge Integration" },
                    { layer: "Authentication", equip: "4 RADIUS Servers" },
                    { layer: "DNS", equip: "Primary & Secondary DNS" },
                    { layer: "Monitoring", equip: "MRTG Monitoring + Logging Servers" },
                  ].map((row, i) => (
                    <tr key={i} className="border-b border-[var(--border-cyan)]/30 bg-[var(--surface-container)] hover:bg-[var(--surface)] transition-colors">
                      <td className="py-3 px-4 font-semibold text-[var(--text-primary)]">{row.layer}</td>
                      <td className="py-3 px-4 text-[var(--text-muted)]">{row.equip}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
