"use client";

import { useState } from "react";
import { dashboardData, invoicesData } from "@/data/dashboard";

export default function DashboardBillsPage() {
  const { billStatus, nextRenewal } = dashboardData;
  const [invoices, setInvoices] = useState(invoicesData);
  const [downloading, setDownloading] = useState<string | null>(null);

  function handleDownload(id: string) {
    setDownloading(id);
    setTimeout(() => {
      setDownloading(null);
      alert(`Receipt for invoice ${id} downloaded successfully!`);
    }, 1200);
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-heading text-2xl font-bold text-[var(--text-primary)] mb-2">Billing & Invoices</h1>
        <p className="text-sm text-[var(--text-muted)]">Track billing cycles, auto-debits, and download past receipts.</p>
      </div>

      {/* Bill Status Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Bill Status */}
        <div className="p-6 technical-border rounded-xl bg-[var(--surface)] flex justify-between items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-1">
              Outstanding Balance
            </p>
            <p className="font-heading text-3xl font-bold text-emerald-400 mb-2">
              {billStatus.status === "Paid" ? "₹0.00" : "₹999.00"}
            </p>
            <p className="text-xs text-[var(--text-muted)]">{billStatus.message}</p>
          </div>
          <span className="material-symbols-outlined text-emerald-400/20 text-[64px]">
            check_circle
          </span>
        </div>

        {/* Next Renewal */}
        <div className="p-6 technical-border rounded-xl bg-[var(--surface)] flex justify-between items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-1">
              Next Invoice Cycle
            </p>
            <p className="font-heading text-3xl font-bold text-[var(--primary)] mb-2">
              {nextRenewal.date}
            </p>
            <p className="text-xs text-[var(--text-muted)]">{nextRenewal.description}</p>
          </div>
          <span className="material-symbols-outlined text-[var(--primary)]/20 text-[64px]">
            calendar_today
          </span>
        </div>
      </div>

      {/* Invoice Table */}
      <div className="p-6 technical-border rounded-xl bg-[var(--surface)]">
        <h3 className="font-heading text-lg font-bold text-[var(--text-primary)] mb-6">Payment History</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-[var(--border-cyan)]/30 text-left">
                <th className="py-3 px-4 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                  Invoice ID
                </th>
                <th className="py-3 px-4 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                  Billing Period
                </th>
                <th className="py-3 px-4 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                  Amount Charged
                </th>
                <th className="py-3 px-4 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                  Payment Status
                </th>
                <th className="py-3 px-4 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] text-right">
                  Receipt
                </th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv) => (
                <tr key={inv.id} className="border-b border-[var(--border-cyan)]/10 hover:bg-[var(--surface-container-low)]/50 transition-colors">
                  <td className="py-4 px-4 text-sm font-bold text-[var(--text-primary)]">
                    {inv.id}
                  </td>
                  <td className="py-4 px-4 text-sm text-[var(--text-muted)]">
                    {inv.month}
                  </td>
                  <td className="py-4 px-4 text-sm font-semibold text-[var(--text-primary)]">
                    ₹{inv.amount.toFixed(2)}
                  </td>
                  <td className="py-4 px-4">
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-400/10 text-emerald-400">
                      {inv.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <button
                      onClick={() => handleDownload(inv.id)}
                      disabled={downloading === inv.id}
                      className="px-3 py-1.5 bg-[var(--primary)]/10 text-[var(--primary)] rounded-lg text-xs font-bold hover:bg-[var(--primary)] hover:text-[var(--on-primary)] transition-all flex items-center gap-1.5 ml-auto disabled:opacity-50"
                    >
                      <span className="material-symbols-outlined text-[14px]">
                        download
                      </span>
                      {downloading === inv.id ? "Loading..." : "Download"}
                    </button>
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
