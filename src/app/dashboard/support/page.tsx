"use client";

import { useState } from "react";
import { COMPANY } from "@/lib/constants";

interface Ticket {
  id: string;
  category: string;
  subject: string;
  status: "Open" | "In Progress" | "Resolved";
  date: string;
  description: string;
}

const INITIAL_TICKETS: Ticket[] = [
  {
    id: "TKT-82618",
    category: "Technical",
    subject: "Slight ping spikes during peak hours on Singapore server",
    status: "In Progress",
    date: "Jun 15, 2026",
    description: "Experiencing sub-optimal routes to gaming IP ranges starting around 8 PM daily.",
  },
  {
    id: "TKT-71932",
    category: "Billing",
    subject: "Auto-debit setup confirmation check",
    status: "Resolved",
    date: "May 28, 2026",
    description: "Requested verification of auto-debit registration status for my credit card.",
  },
];

export default function DashboardSupportPage() {
  const [tickets, setTickets] = useState<Ticket[]>(INITIAL_TICKETS);
  const [subject, setSubject] = useState("");
  const [category, setCategory] = useState("Technical");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      const newTicket: Ticket = {
        id: `TKT-${Math.floor(Math.random() * 90000 + 10000)}`,
        category,
        subject,
        status: "Open",
        date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        description,
      };
      setTickets([newTicket, ...tickets]);
      setSubject("");
      setDescription("");
      setSubmitting(false);
      alert("Support ticket raised successfully! An engineer will inspect the connection route and call you shortly.");
    }, 1200);
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-heading text-2xl font-bold text-[var(--text-primary)] mb-2">Priority NOC Support</h1>
        <p className="text-sm text-[var(--text-muted)]">Open technical tickets directly with Secunderabad NOC engineers.</p>
      </div>

      {/* Hotline Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-5 technical-border rounded-xl bg-[var(--surface)] flex items-center gap-4">
          <span className="w-12 h-12 rounded-lg bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] text-[24px] material-symbols-outlined">
            phone_in_talk
          </span>
          <div>
            <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider font-semibold">Priority Helpline</p>
            <p className="text-base font-bold text-[var(--text-primary)] mt-0.5">{COMPANY.techSupport}</p>
          </div>
        </div>

        <div className="p-5 technical-border rounded-xl bg-[var(--surface)] flex items-center gap-4">
          <span className="w-12 h-12 rounded-lg bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] text-[24px] material-symbols-outlined">
            mail
          </span>
          <div>
            <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider font-semibold">NOC Dispatch Email</p>
            <p className="text-base font-bold text-[var(--text-primary)] mt-0.5">{COMPANY.email}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Raise Ticket Form */}
        <div className="lg:col-span-7 p-6 technical-border rounded-xl bg-[var(--surface)]">
          <h3 className="font-heading text-lg font-bold text-[var(--text-primary)] mb-6">Open a Support Ticket</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs text-[var(--text-muted)] uppercase tracking-wider font-semibold mb-2">
                Problem Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-[var(--background)] technical-border text-[var(--text-primary)] text-sm focus:border-[var(--primary)] focus:outline-none appearance-none"
              >
                <option>Technical</option>
                <option>Billing</option>
                <option>Speed Issue</option>
                <option>Router / Hardware</option>
              </select>
            </div>

            <div>
              <label className="block text-xs text-[var(--text-muted)] uppercase tracking-wider font-semibold mb-2">
                Subject
              </label>
              <input
                type="text"
                required
                placeholder="Brief summary of the issue"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-[var(--background)] technical-border text-[var(--text-primary)] text-sm placeholder:text-[var(--text-muted)]/50 focus:border-[var(--primary)] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs text-[var(--text-muted)] uppercase tracking-wider font-semibold mb-2">
                Details / Description
              </label>
              <textarea
                required
                rows={4}
                placeholder="Provide details of the issue (router lights, error codes, speedtest numbers)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-[var(--background)] technical-border text-[var(--text-primary)] text-sm placeholder:text-[var(--text-muted)]/50 focus:border-[var(--primary)] focus:outline-none resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 bg-[var(--secondary)] text-[var(--on-secondary)] rounded-lg text-sm font-bold hover:brightness-110 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {submitting ? "Raising Ticket..." : "Open Priority Ticket"}
              <span className="material-symbols-outlined text-[18px]">send</span>
            </button>
          </form>
        </div>

        {/* Existing Tickets */}
        <div className="lg:col-span-5 space-y-4">
          <h3 className="font-heading text-lg font-bold text-[var(--text-primary)] mb-2">Active Technical Tickets</h3>
          {tickets.map((t) => (
            <div key={t.id} className="p-5 technical-border rounded-xl bg-[var(--surface)] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[var(--primary)]">{t.id}</span>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider ${
                    t.status === "Open"
                      ? "bg-[var(--primary)]/10 text-[var(--primary)]"
                      : t.status === "In Progress"
                      ? "bg-[var(--secondary)]/10 text-[var(--secondary)]"
                      : "bg-emerald-400/10 text-emerald-400"
                  }`}
                >
                  {t.status}
                </span>
              </div>
              <h4 className="font-heading text-sm font-bold text-[var(--text-primary)]">{t.subject}</h4>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">{t.description}</p>
              <div className="text-[10px] text-[var(--text-muted)] pt-2 border-t border-[var(--border-cyan)]/10 flex justify-between">
                <span>Category: {t.category}</span>
                <span>Raised: {t.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
