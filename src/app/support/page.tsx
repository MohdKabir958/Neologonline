"use client";

import { useState, useEffect } from "react";
import SectionHeader from "@/components/ui/SectionHeader";
import Accordion from "@/components/ui/Accordion";
import { CardSkeleton } from "@/components/ui/Skeleton";
import ErrorState from "@/components/ui/ErrorState";
import {
  fetchSupportCategories,
  fetchPopularGuides,
  submitSupportTicket,
  trackTicket,
  fetchFAQs,
} from "@/lib/api";
import { SupportCategory, SupportArticle, FAQ } from "@/lib/types";
import { quickSearchTags } from "@/data/support-categories";

export default function SupportPage() {
  const [categories, setCategories] = useState<SupportCategory[]>([]);
  const [guides, setGuides] = useState<SupportArticle[]>([]);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState("");
  const [ticketForm, setTicketForm] = useState({ subject: "Technical Issue", customerId: "", description: "" });
  const [ticketLoading, setTicketLoading] = useState(false);
  const [ticketSuccess, setTicketSuccess] = useState("");
  const [trackId, setTrackId] = useState("");
  const [trackResult, setTrackResult] = useState<{ status: string; lastUpdate: string } | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      setLoading(true);
      setError(false);
      const [cats, guides, faqData] = await Promise.all([
        fetchSupportCategories(),
        fetchPopularGuides(),
        fetchFAQs("support"),
      ]);
      setCategories(cats);
      setGuides(guides);
      setFaqs(faqData);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  async function handleTicketSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      setTicketLoading(true);
      const res = await submitSupportTicket(ticketForm);
      setTicketSuccess(res.ticketId);
      setTicketForm({ subject: "Technical Issue", customerId: "", description: "" });
    } catch {
      alert("Failed to submit ticket. Please try again.");
    } finally {
      setTicketLoading(false);
    }
  }

  async function handleTrack() {
    if (!trackId) return;
    const res = await trackTicket(trackId);
    setTrackResult(res);
  }

  return (
    <>
      {/* Search Hero */}
      <section className="bg-[var(--surface)] border-b border-[var(--border-cyan)]">
        <div className="max-w-[1280px] mx-auto px-5 md:px-16 py-16 text-center">
          <h1 className="font-heading text-4xl font-bold text-[var(--text-primary)] mb-8">
            How can we help you?
          </h1>
          <div className="max-w-xl mx-auto relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-[var(--text-muted)] text-[24px]">
              search
            </span>
            <input
              type="text"
              placeholder="Search for billing, slow connection, hardware setup..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-full bg-[var(--background)] technical-border text-[var(--text-primary)] text-sm placeholder:text-[var(--text-muted)]/50 focus:border-[var(--primary)] focus:outline-none"
            />
          </div>
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {quickSearchTags.map((tag) => (
              <button
                key={tag.label}
                onClick={() => setSearch(tag.label)}
                className="flex items-center gap-1 px-3 py-1.5 technical-border rounded-full text-xs text-[var(--text-primary)] hover:border-[var(--primary)] transition-all"
              >
                <span className="material-symbols-outlined text-[14px] text-[var(--primary)]">
                  {tag.icon}
                </span>
                {tag.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-[1280px] mx-auto px-5 md:px-16 py-16">
        <SectionHeader title="Browse by Category" />
        {error ? (
          <ErrorState onRetry={loadData} />
        ) : loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <CardSkeleton key={i} className="h-[140px]" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="p-6 technical-border rounded-xl bg-[var(--surface)] hover:bg-[var(--surface-variant)] transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[var(--primary)] text-[32px] mb-4 block">
                  {cat.icon}
                </span>
                <h3 className="font-heading text-lg font-bold text-[var(--text-primary)] mb-2">
                  {cat.name}
                </h3>
                <p className="text-sm text-[var(--text-muted)]">
                  {cat.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Popular Guides */}
      <section className="max-w-[1280px] mx-auto px-5 md:px-16 py-16">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="font-heading text-2xl font-bold text-[var(--text-primary)]">
              Popular Guides
            </h2>
            <p className="text-sm text-[var(--text-muted)]">
              Quick solutions for common challenges.
            </p>
          </div>
          <button className="text-sm font-medium text-[var(--primary)] flex items-center gap-1">
            View all articles
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {guides.map((guide, i) => (
            <div
              key={guide.id}
              className={`p-6 technical-border rounded-xl bg-[var(--surface)] hover:border-[var(--primary)] transition-all cursor-pointer ${
                i === 0 ? "md:col-span-2 lg:col-span-2" : ""
              }`}
            >
              {guide.isEssential && (
                <span className="inline-block px-2 py-0.5 bg-[var(--primary)]/10 text-[var(--primary)] text-xs font-semibold uppercase tracking-wider rounded mb-3">
                  Essentials
                </span>
              )}
              <h3 className="font-heading text-lg font-bold text-[var(--text-primary)] mb-2">
                {guide.title}
              </h3>
              <p className="text-sm text-[var(--text-muted)] mb-4">
                {guide.excerpt}
              </p>
              <span className="text-sm font-medium text-[var(--primary)] flex items-center gap-1">
                {i === 0 ? "Read full article" : ""}
                <span className="material-symbols-outlined text-[18px]">
                  arrow_forward
                </span>
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-[1280px] mx-auto px-5 md:px-16 py-16">
        <SectionHeader title="Frequently Asked Questions" />
        <div className="max-w-3xl mx-auto">
          <Accordion items={faqs} />
        </div>
      </section>

      {/* Ticket + Track */}
      <section className="bg-[var(--surface-container-low)] py-16">
        <div className="max-w-[1280px] mx-auto px-5 md:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Raise Ticket */}
            <div className="p-8 technical-border rounded-xl bg-[var(--surface)]">
              <h3 className="font-heading text-xl font-bold text-[var(--text-primary)] mb-6">
                Raise a Support Ticket
              </h3>
              {ticketSuccess ? (
                <div className="text-center py-4">
                  <span className="material-symbols-outlined text-[40px] text-[var(--primary)] mb-2 block">
                    check_circle
                  </span>
                  <p className="text-sm text-[var(--text-primary)] mb-1">
                    Ticket created: <strong className="text-[var(--primary)]">{ticketSuccess}</strong>
                  </p>
                  <button
                    onClick={() => setTicketSuccess("")}
                    className="text-sm text-[var(--primary)] underline mt-2"
                  >
                    Create another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleTicketSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm text-[var(--text-muted)] mb-1">Subject</label>
                    <select
                      value={ticketForm.subject}
                      onChange={(e) => setTicketForm({ ...ticketForm, subject: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-[var(--background)] technical-border text-[var(--text-primary)] text-sm focus:border-[var(--primary)] focus:outline-none appearance-none"
                    >
                      <option>Technical Issue</option>
                      <option>Billing</option>
                      <option>Plan Change</option>
                      <option>Hardware</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-[var(--text-muted)] mb-1">Customer ID / Registered Mobile</label>
                    <input
                      type="text"
                      placeholder="e.g. NL10245"
                      value={ticketForm.customerId}
                      onChange={(e) => setTicketForm({ ...ticketForm, customerId: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-[var(--background)] technical-border text-[var(--text-primary)] text-sm placeholder:text-[var(--text-muted)]/50 focus:border-[var(--primary)] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-[var(--text-muted)] mb-1">Description</label>
                    <textarea
                      placeholder="Describe your issue in detail..."
                      value={ticketForm.description}
                      onChange={(e) => setTicketForm({ ...ticketForm, description: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg bg-[var(--background)] technical-border text-[var(--text-primary)] text-sm placeholder:text-[var(--text-muted)]/50 focus:border-[var(--primary)] focus:outline-none resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={ticketLoading}
                    className="w-full py-3 bg-[var(--secondary)] text-[var(--on-secondary)] rounded-xl text-sm font-bold hover:brightness-110 transition-all disabled:opacity-50"
                  >
                    {ticketLoading ? "Submitting..." : "Submit Support Request"}
                  </button>
                </form>
              )}
            </div>

            {/* Track Ticket */}
            <div className="space-y-6">
              <div className="p-8 technical-border rounded-xl bg-[var(--surface)]">
                <h3 className="font-heading text-xl font-bold text-[var(--text-primary)] mb-4">
                  Track Ticket Status
                </h3>
                <p className="text-sm text-[var(--text-muted)] mb-4">
                  Enter your Ticket ID to see real-time progress on your request.
                </p>
                <div className="flex gap-3">
                  <input
                    type="text"
                    placeholder="e.g. TKT-88211"
                    value={trackId}
                    onChange={(e) => setTrackId(e.target.value)}
                    className="flex-1 px-4 py-3 rounded-lg bg-[var(--background)] technical-border text-[var(--text-primary)] text-sm placeholder:text-[var(--text-muted)]/50 focus:border-[var(--primary)] focus:outline-none"
                  />
                  <button
                    onClick={handleTrack}
                    className="px-6 py-3 bg-[var(--secondary)] text-[var(--on-secondary)] rounded-lg text-sm font-bold hover:brightness-110 transition-all"
                  >
                    Track
                  </button>
                </div>
                {trackResult && (
                  <div className="mt-4 p-4 technical-border rounded-lg">
                    <p className="text-sm text-[var(--text-primary)]">
                      Status: <strong className="text-[var(--primary)]">{trackResult.status}</strong>
                    </p>
                  </div>
                )}
              </div>

              {/* WhatsApp Help */}
              <div className="p-6 technical-border rounded-xl bg-[var(--surface)] flex items-center gap-4">
                <span className="material-symbols-outlined text-[var(--primary)] text-[24px]">
                  chat
                </span>
                <div>
                  <p className="text-sm font-bold text-[var(--text-primary)]">
                    Need Immediate Help?
                  </p>
                  <p className="text-xs text-[var(--text-muted)]">
                    Our engineers are available on WhatsApp for instant resolution.
                  </p>
                  <button className="text-sm font-medium text-[var(--secondary)] mt-1">
                    Start Chat Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
