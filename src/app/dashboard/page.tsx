"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { DashboardSkeleton } from "@/components/ui/Skeleton";
import ErrorState from "@/components/ui/ErrorState";
import { fetchDashboardData, fetchInvoices } from "@/lib/api";
import { DashboardData, Invoice } from "@/lib/types";

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      setLoading(true);
      setError(false);
      const [d, inv] = await Promise.all([
        fetchDashboardData(),
        fetchInvoices(),
      ]);
      setData(d);
      setInvoices(inv);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <DashboardSkeleton />;
  if (error) return <ErrorState onRetry={loadData} />;
  if (!data) return null;

  const maxUsage = Math.max(...data.dailyUsage.map((d) => d.usage));

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            icon: "speed",
            label: "Current Plan",
            value: `${data.currentPlan.name}`,
            sub: data.currentPlan.description,
            valueColor: "text-[var(--primary)]",
          },
          {
            icon: "data_usage",
            label: "Data Usage",
            value: `${data.dataUsage.used} ${data.dataUsage.unit}`,
            sub: `of ${data.dataUsage.total}`,
            valueColor: "text-[var(--primary)]",
          },
          {
            icon: "receipt",
            label: "Bill Status",
            value: data.billStatus.status,
            sub: data.billStatus.message,
            valueColor:
              data.billStatus.status === "Paid"
                ? "text-green-400"
                : "text-[var(--error)]",
          },
          {
            icon: "event",
            label: "Next Renewal",
            value: data.nextRenewal.date,
            sub: data.nextRenewal.description,
            valueColor: "text-[var(--secondary)]",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="p-5 technical-border rounded-xl bg-[var(--surface)]"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-[var(--text-muted)] text-[18px]">
                {stat.icon}
              </span>
              <span className="text-xs text-[var(--text-muted)]">
                {stat.label}
              </span>
            </div>
            <p className={`font-heading text-2xl font-bold ${stat.valueColor}`}>
              {stat.value}
            </p>
            <p className="text-xs text-[var(--text-muted)] mt-1">{stat.sub}</p>
          </div>
        ))}
      </div>

      {/* Usage Chart + Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="lg:col-span-2 p-6 technical-border rounded-xl bg-[var(--surface)]">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-heading text-xl font-bold text-[var(--text-primary)]">
              Daily Usage (GB)
            </h3>
            <div className="flex gap-1 technical-border rounded-lg overflow-hidden">
              <button className="px-3 py-1 text-xs font-medium bg-[var(--primary)]/10 text-[var(--primary)]">
                7D
              </button>
              <button className="px-3 py-1 text-xs font-medium text-[var(--text-muted)]">
                1M
              </button>
            </div>
          </div>
          <div className="flex items-end justify-between gap-3 h-[200px]">
            {data.dailyUsage.map((d, i) => (
              <div key={d.day} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full relative flex-1 flex items-end">
                  <div
                    className="w-full bg-[var(--primary)]/30 hover:bg-[var(--primary)]/50 rounded-t transition-all animate-bar-grow"
                    style={{
                      height: `${(d.usage / maxUsage) * 100}%`,
                      animationDelay: `${i * 0.1}s`,
                    }}
                  />
                </div>
                <span className="text-xs text-[var(--text-muted)]">
                  {d.day}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-3">
          {[
            {
              icon: "payments",
              title: "Pay Bill",
              sub: "Fast & Secure Payments",
              color: "text-[var(--primary)]",
            },
            {
              icon: "upgrade",
              title: "Upgrade",
              sub: "Experience Gigabit Speeds",
              color: "text-[var(--secondary)]",
            },
            {
              icon: "confirmation_number",
              title: "Raise Ticket",
              sub: "24/7 Technical Support",
              color: "text-[var(--primary)]",
            },
          ].map((action) => (
            <Link
              key={action.title}
              href="#"
              className="flex items-center gap-4 p-4 technical-border rounded-xl bg-[var(--surface)] hover:border-[var(--primary)] transition-all group"
            >
              <span
                className={`material-symbols-outlined text-[24px] ${action.color}`}
              >
                {action.icon}
              </span>
              <div className="flex-1">
                <p className="text-sm font-bold text-[var(--text-primary)]">
                  {action.title}
                </p>
                <p className="text-xs text-[var(--text-muted)]">
                  {action.sub}
                </p>
              </div>
              <span className="material-symbols-outlined text-[var(--text-muted)] text-[20px] group-hover:text-[var(--primary)]">
                chevron_right
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Invoices */}
      <div className="p-6 technical-border rounded-xl bg-[var(--surface)]">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-heading text-xl font-bold text-[var(--text-primary)]">
            Recent Invoices
          </h3>
          <button className="text-sm font-medium text-[var(--primary)]">
            View All
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--border-cyan)]">
                {["Month", "Amount", "Status", "Invoice"].map((h) => (
                  <th
                    key={h}
                    className="text-left py-3 text-xs font-semibold uppercase tracking-[0.05em] text-[var(--text-muted)]"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv) => (
                <tr
                  key={inv.id}
                  className="border-b border-[var(--border-cyan)]/30"
                >
                  <td className="py-4 text-sm font-medium text-[var(--text-primary)]">
                    {inv.month}
                  </td>
                  <td className="py-4 text-sm text-[var(--text-muted)]">
                    ₹{inv.amount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                  </td>
                  <td className="py-4">
                    <span
                      className={`text-xs font-semibold uppercase tracking-wider ${
                        inv.status === "PAID"
                          ? "text-green-400"
                          : "text-[var(--error)]"
                      }`}
                    >
                      {inv.status}
                    </span>
                  </td>
                  <td className="py-4">
                    <button className="text-[var(--text-muted)] hover:text-[var(--primary)]">
                      <span className="material-symbols-outlined text-[20px]">
                        download
                      </span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Plan Info + Contact Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Plan Info */}
        <div className="p-6 technical-border rounded-xl bg-[var(--surface)]">
          <h3 className="font-heading text-xl font-bold text-[var(--text-primary)] mb-4">
            Detailed Plan Info
          </h3>
          <p className="text-sm text-[var(--text-muted)] mb-4">
            {data.planDetails.series}
          </p>
          <div className="space-y-3">
            {[
              { label: "Speed", value: data.planDetails.speed, color: "text-[var(--primary)]" },
              { label: "FUP Limit", value: data.planDetails.fupLimit },
              { label: "Router", value: data.planDetails.router },
              { label: "Static IP", value: data.planDetails.staticIp, color: "text-[var(--secondary)]" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex justify-between py-2 border-b border-[var(--border-cyan)]/30"
              >
                <span className="text-sm text-[var(--text-muted)]">
                  {item.label}
                </span>
                <span className={`text-sm font-bold ${item.color || "text-[var(--text-primary)]"}`}>
                  {item.value}
                </span>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-3 bg-[var(--primary)] text-[var(--on-primary)] rounded-lg text-sm font-bold flex items-center justify-center gap-2 hover:brightness-110 transition-all">
            <span className="material-symbols-outlined text-[18px]">bolt</span>
            Upgrade Plan
          </button>
        </div>

        {/* Contact Details */}
        <div className="p-6 technical-border rounded-xl bg-[var(--surface)]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading text-xl font-bold text-[var(--text-primary)]">
              Contact Details
            </h3>
            <button className="text-sm text-[var(--primary)] flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">edit</span>
              Edit
            </button>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.05em] text-[var(--text-muted)] mb-1">
                  Full Name
                </p>
                <div className="px-4 py-3 technical-border rounded-lg bg-[var(--background)] text-sm text-[var(--text-primary)]">
                  {data.contactDetails.fullName}
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.05em] text-[var(--text-muted)] mb-1">
                  Phone Number
                </p>
                <div className="px-4 py-3 technical-border rounded-lg bg-[var(--background)] text-sm text-[var(--text-primary)]">
                  {data.contactDetails.phone}
                </div>
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.05em] text-[var(--text-muted)] mb-1">
                Email Address
              </p>
              <div className="px-4 py-3 technical-border rounded-lg bg-[var(--background)] text-sm text-[var(--text-primary)]">
                {data.contactDetails.email}
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.05em] text-[var(--text-muted)] mb-1">
                Installation Address
              </p>
              <div className="px-4 py-3 technical-border rounded-lg bg-[var(--background)] text-sm text-[var(--text-primary)]">
                {data.contactDetails.installationAddress}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat FAB */}
      <button className="fixed bottom-8 right-8 w-14 h-14 bg-[var(--primary)] text-[var(--on-primary)] rounded-full flex items-center justify-center shadow-lg hover:brightness-110 transition-all z-50">
        <span className="material-symbols-outlined text-[24px]">chat</span>
      </button>
    </div>
  );
}
