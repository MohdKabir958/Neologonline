"use client";

import { useState } from "react";
import { dashboardData } from "@/data/dashboard";

export default function DashboardUsagePage() {
  const { dataUsage, dailyUsage } = dashboardData;
  const [timeframe, setTimeframe] = useState<"7d" | "30d">("7d");

  // Calculate stats
  const totalUsed = dailyUsage.reduce((sum, item) => sum + item.usage, 0);
  const averageUsage = Math.round(totalUsed / dailyUsage.length);
  const peakUsage = Math.max(...dailyUsage.map((item) => item.usage));

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-heading text-2xl font-bold text-[var(--text-primary)] mb-2">Data Usage Analytics</h1>
        <p className="text-sm text-[var(--text-muted)]">Track your daily and monthly data consumption trends.</p>
      </div>

      {/* Usage Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 technical-border rounded-xl bg-[var(--surface)]">
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-1">
            Current Billing Cycle
          </p>
          <p className="font-heading text-3xl font-bold text-[var(--primary)] mb-2">
            {dataUsage.used} {dataUsage.unit}
          </p>
          <p className="text-xs text-[var(--text-muted)]">
            of {dataUsage.total} allocation
          </p>
        </div>

        <div className="p-6 technical-border rounded-xl bg-[var(--surface)]">
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-1">
            Daily Average Usage
          </p>
          <p className="font-heading text-3xl font-bold text-[var(--primary)] mb-2">
            {averageUsage} GB
          </p>
          <p className="text-xs text-[var(--text-muted)]">
            Based on active week telemetry
          </p>
        </div>

        <div className="p-6 technical-border rounded-xl bg-[var(--surface)]">
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-1">
            Peak Daily Usage
          </p>
          <p className="font-heading text-3xl font-bold text-[var(--secondary)] mb-2">
            {peakUsage} GB
          </p>
          <p className="text-xs text-[var(--text-muted)]">
            Recorded this Saturday
          </p>
        </div>
      </div>

      {/* Chart Section */}
      <div className="p-6 technical-border rounded-xl bg-[var(--surface)]">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-heading text-lg font-bold text-[var(--text-primary)]">Daily Usage (GB)</h3>
          <div className="flex gap-2">
            {(["7d", "30d"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTimeframe(t)}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                  timeframe === t
                    ? "bg-[var(--primary)] text-[var(--on-primary)]"
                    : "technical-border text-[var(--text-muted)]"
                }`}
              >
                {t === "7d" ? "7 Days" : "1 Month"}
              </button>
            ))}
          </div>
        </div>

        {/* Bar Chart */}
        <div className="h-64 flex items-end gap-3 sm:gap-6 pt-6 px-2">
          {dailyUsage.map((item) => {
            const pct = (item.usage / 70) * 100;
            return (
              <div key={item.day} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                {/* Tooltip */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-[var(--surface-container-high)] text-[var(--primary)] text-xs font-bold px-2 py-1 rounded technical-border mb-1 absolute transform -translate-y-20 scale-90 group-hover:scale-100 duration-200">
                  {item.usage} GB
                </div>
                {/* Bar */}
                <div
                  style={{ height: `${pct}%` }}
                  className="w-full bg-gradient-to-t from-[var(--primary)]/40 to-[var(--primary)] rounded-t-md relative overflow-hidden group-hover:brightness-110 transition-all cursor-pointer animate-bar-grow"
                >
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                {/* Day label */}
                <span className="text-xs font-semibold text-[var(--text-muted)]">{item.day}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Speed Tips */}
      <div className="p-6 technical-border rounded-xl bg-[var(--surface-container-low)]">
        <h3 className="font-heading text-lg font-bold text-[var(--text-primary)] mb-3">Optimize your Wi-Fi 6 Connection</h3>
        <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-4">
          To maximize your Neolog 100Mbps symmetrical fiber connection, make sure your Wi-Fi 6 device is connected 
          to the 5GHz SSID band. Place the router in an elevated, central location away from dense concrete walls.
        </p>
      </div>
    </div>
  );
}
