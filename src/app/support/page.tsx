"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
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
      {/* Breadcrumbs */}
      <div className="bg-[var(--surface)] relative z-20">
        <div className="max-w-[1280px] mx-auto px-5 md:px-16 pt-4 pb-2 flex items-center gap-2 text-xs font-semibold text-[var(--text-muted)] select-none">
          <Link href="/" className="hover:text-[var(--primary)] transition-colors">Home</Link>
          <span className="material-symbols-outlined text-[14px] leading-none opacity-40">chevron_right</span>
          <span className="text-[var(--text-primary)]">Support Center</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative bg-[var(--surface)] border-b border-[var(--border-cyan)] overflow-hidden">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0 select-none pointer-events-none">
          <img
            src="/images/support_noc_hero.png"
            alt="Neolog Network Operations Center"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--surface)]/90 via-[var(--surface)]/70 to-[var(--surface)]" />
        </div>

        <div className="relative max-w-[1280px] mx-auto px-5 md:px-16 pt-16 pb-24 z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[var(--primary)]/10 technical-border rounded-full mb-6">
            <span className="w-2 h-2 rounded-full bg-[var(--primary)] animate-pulse" />
            <span className="text-[var(--primary)] text-xs font-bold tracking-widest uppercase">
              NOC Active • All Systems Operational
            </span>
          </div>

          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-black text-[var(--text-primary)] mb-6 tracking-tight drop-shadow-xl">
            24/7 Enterprise Support
          </h1>
          <p className="text-lg text-[var(--on-surface-variant)] max-w-2xl mx-auto mb-12">
            Instant troubleshooting, real-time ticket tracking, and immediate access to our specialized network engineering team.
          </p>

          {/* Search Box */}
          <div className="max-w-2xl mx-auto relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] rounded-full blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative">
              <span className="absolute left-6 top-1/2 -translate-y-1/2 material-symbols-outlined text-[var(--primary)] text-[28px]">
                search
              </span>
              <input
                type="text"
                placeholder="Search for hardware setup, connectivity issues, billing..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-16 pr-6 py-5 rounded-full bg-[var(--surface-container-low)] technical-border text-[var(--text-primary)] text-base placeholder:text-[var(--text-muted)]/60 focus:border-[var(--primary)] focus:bg-[var(--surface)] focus:outline-none transition-all shadow-xl"
              />
            </div>
          </div>

          {/* Quick Tags */}
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {quickSearchTags.map((tag) => (
              <button
                key={tag.label}
                onClick={() => setSearch(tag.label)}
                className="flex items-center gap-1.5 px-4 py-2 technical-border bg-[var(--surface-container)]/80 backdrop-blur-md rounded-full text-xs font-semibold text-[var(--text-primary)] hover:border-[var(--primary)] hover:bg-[var(--primary)]/10 transition-all"
              >
                <span className="material-symbols-outlined text-[16px] text-[var(--primary)]">
                  {tag.icon}
                </span>
                {tag.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Support Channels Grid */}
      <section className="relative z-20 max-w-[1280px] mx-auto px-5 md:px-16 -mt-10 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: "support_agent", title: "NOC Priority Hotline", desc: "Speak directly with engineers.", link: "#quote", cta: "040 45 25 69 60" },
            { icon: "chat", title: "Live WhatsApp Chat", desc: "Instant text resolution.", link: "#", cta: "Start Chat" },
            { icon: "confirmation_number", title: "Ticketing Portal", desc: "Raise or track complex requests.", link: "#ticketing", cta: "Open Portal" },
            { icon: "library_books", title: "Knowledge Base", desc: "Self-service technical guides.", link: "#knowledge-base", cta: "Browse Guides" },
          ].map((channel, i) => (
            <a
              key={i}
              href={channel.link}
              className="bg-[var(--surface)] p-6 rounded-2xl technical-border hover:border-[var(--primary)] shadow-xl group transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                <span className="material-symbols-outlined text-[var(--primary)] text-4xl mb-4 group-hover:scale-110 transition-transform">
                  {channel.icon}
                </span>
                <h3 className="font-heading text-lg font-bold text-[var(--text-primary)] mb-2">
                  {channel.title}
                </h3>
                <p className="text-xs text-[var(--text-muted)] mb-4 leading-relaxed">
                  {channel.desc}
                </p>
              </div>
              <span className="text-sm font-bold text-[var(--secondary)] flex items-center gap-1">
                {channel.cta}
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* SLA Metrics for Support */}
      <section className="max-w-[1280px] mx-auto px-5 md:px-16 mb-20 text-center">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-[var(--surface-container-low)] technical-border rounded-2xl">
          {[
            { metric: "2 Mins", label: "Avg Response Time" },
            { metric: "< 4 Hrs", label: "MTTR for Fiber Cuts" },
            { metric: "100%", label: "L2/L3 Engineers" },
            { metric: "24/7/365", label: "NOC Operations Active" },
          ].map((sla, i) => (
            <div key={i} className="flex flex-col">
              <span className="font-outfit text-2xl font-black text-[var(--primary)] mb-1">{sla.metric}</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)]">{sla.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Knowledge Base & Troubleshooting */}
      <section id="knowledge-base" className="max-w-[1280px] mx-auto px-5 md:px-16 py-16 border-t border-[var(--border-cyan)]/30">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Categories Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div>
              <h2 className="font-heading text-2xl font-bold text-[var(--text-primary)] mb-2">
                Knowledge Base
              </h2>
              <p className="text-sm text-[var(--text-muted)]">
                Select a category to browse specific technical documentation and setup guides.
              </p>
            </div>
            
            {error ? (
              <ErrorState onRetry={loadData} />
            ) : loading ? (
              <div className="space-y-3">
                {[1, 2, 3, 4].map(i => <CardSkeleton key={i} className="h-16" />)}
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {categories.map((cat) => (
                  <div
                    key={cat.id}
                    className="flex items-center gap-4 p-4 technical-border rounded-xl bg-[var(--surface-container-low)] hover:bg-[var(--surface)] hover:border-[var(--primary)] transition-colors cursor-pointer group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[var(--primary)]/10 flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[var(--primary)] text-[20px]">
                        {cat.icon}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-[var(--text-primary)] group-hover:text-[var(--primary)] transition-colors">
                        {cat.name}
                      </h3>
                      <p className="text-[11px] text-[var(--text-muted)] truncate max-w-[200px]">
                        {cat.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Popular Guides Main Area */}
          <div className="lg:col-span-8">
            <h2 className="font-heading text-2xl font-bold text-[var(--text-primary)] mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-[var(--secondary)]">local_fire_department</span>
              Trending Guides & Solutions
            </h2>
            
            <div className="space-y-4">
              {loading ? (
                 <div className="space-y-3">
                 {[1, 2, 3].map(i => <CardSkeleton key={i} className="h-24" />)}
               </div>
              ) : (
                guides.map((guide) => (
                  <div
                    key={guide.id}
                    className="p-6 technical-border rounded-xl bg-[var(--surface)] hover:border-[var(--primary)] transition-all cursor-pointer group flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {guide.isEssential && (
                          <span className="px-2 py-0.5 bg-[var(--error)]/10 text-[var(--error)] text-[10px] font-bold uppercase tracking-wider rounded">
                            Essential
                          </span>
                        )}
                        <h3 className="font-heading text-base font-bold text-[var(--text-primary)] group-hover:text-[var(--primary)] transition-colors">
                          {guide.title}
                        </h3>
                      </div>
                      <p className="text-sm text-[var(--text-muted)] line-clamp-2 leading-relaxed">
                        {guide.excerpt}
                      </p>
                    </div>
                    <span className="w-10 h-10 rounded-full bg-[var(--surface-container)] flex items-center justify-center shrink-0 group-hover:bg-[var(--primary)] group-hover:text-[var(--on-primary)] transition-colors">
                      <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Ticketing & Tracking Dashboard */}
      <section id="ticketing" className="bg-[var(--surface-container-lowest)] py-20 border-y border-[var(--border-cyan)]">
        <div className="max-w-[1280px] mx-auto px-5 md:px-16">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl font-bold text-[var(--text-primary)] mb-4">
              Support Desk Portal
            </h2>
            <p className="text-sm text-[var(--text-muted)] max-w-xl mx-auto">
              Our engineering team is ready to assist. Raise a new ticket for complex issues or track the real-time status of an existing request.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Raise Ticket Panel */}
            <div className="p-8 technical-border rounded-2xl bg-[var(--surface)] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-[var(--primary)]/5 blur-3xl rounded-full"></div>
              
              <div className="flex items-center gap-3 mb-6">
                <span className="w-12 h-12 rounded-xl bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)]">
                  <span className="material-symbols-outlined text-[24px]">add_box</span>
                </span>
                <div>
                  <h3 className="font-heading text-xl font-bold text-[var(--text-primary)]">
                    Create New Ticket
                  </h3>
                  <p className="text-xs text-[var(--text-muted)]">Priority routing to NOC engineers</p>
                </div>
              </div>

              {ticketSuccess ? (
                <div className="text-center py-12 bg-[var(--surface-container-low)] rounded-xl technical-border">
                  <span className="material-symbols-outlined text-[48px] text-[var(--primary)] mb-4 block">
                    check_circle
                  </span>
                  <p className="text-lg font-bold text-[var(--text-primary)] mb-2">
                    Ticket successfully logged
                  </p>
                  <p className="text-sm text-[var(--text-muted)] mb-6">
                    Reference ID: <strong className="text-[var(--primary)] text-lg bg-[var(--primary)]/10 px-3 py-1 rounded ml-2">{ticketSuccess}</strong>
                  </p>
                  <button
                    onClick={() => setTicketSuccess("")}
                    className="text-sm font-bold text-[var(--secondary)] hover:underline"
                  >
                    Raise another ticket
                  </button>
                </div>
              ) : (
                <form onSubmit={handleTicketSubmit} className="space-y-5 relative z-10">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-2">Nature of Issue</label>
                    <select
                      value={ticketForm.subject}
                      onChange={(e) => setTicketForm({ ...ticketForm, subject: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl bg-[var(--surface-container-low)] technical-border text-[var(--text-primary)] text-sm focus:border-[var(--primary)] focus:outline-none appearance-none cursor-pointer"
                    >
                      <option>Technical Issue / Fiber Cut</option>
                      <option>Billing & Invoices</option>
                      <option>Plan Upgrade / Downgrade</option>
                      <option>Hardware Setup & Router</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-2">Customer ID or Mobile</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. NL10245 or +91..."
                      value={ticketForm.customerId}
                      onChange={(e) => setTicketForm({ ...ticketForm, customerId: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl bg-[var(--surface-container-low)] technical-border text-[var(--text-primary)] text-sm placeholder:text-[var(--text-muted)]/50 focus:border-[var(--primary)] focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-2">Detailed Description</label>
                    <textarea
                      required
                      placeholder="Please provide steps to reproduce, error codes, or specific issues..."
                      value={ticketForm.description}
                      onChange={(e) => setTicketForm({ ...ticketForm, description: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-3.5 rounded-xl bg-[var(--surface-container-low)] technical-border text-[var(--text-primary)] text-sm placeholder:text-[var(--text-muted)]/50 focus:border-[var(--primary)] focus:outline-none resize-none transition-colors"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={ticketLoading}
                    className="w-full py-4 bg-[var(--primary)] text-[var(--on-primary)] rounded-xl text-sm font-bold hover:brightness-110 transition-all shadow-lg active-glow disabled:opacity-50"
                  >
                    {ticketLoading ? "Submitting to NOC..." : "Submit Support Request"}
                  </button>
                </form>
              )}
            </div>

            {/* Track Ticket Panel */}
            <div className="space-y-6">
              <div className="p-8 technical-border rounded-2xl bg-[var(--surface-container-low)] h-full relative overflow-hidden flex flex-col">
                <div className="absolute top-0 right-0 w-40 h-40 bg-[var(--secondary)]/5 blur-3xl rounded-full"></div>
                
                <div className="flex items-center gap-3 mb-6 relative z-10">
                  <span className="w-12 h-12 rounded-xl bg-[var(--secondary)]/10 flex items-center justify-center text-[var(--secondary)]">
                    <span className="material-symbols-outlined text-[24px]">troubleshoot</span>
                  </span>
                  <div>
                    <h3 className="font-heading text-xl font-bold text-[var(--text-primary)]">
                      Track Ticket Status
                    </h3>
                    <p className="text-xs text-[var(--text-muted)]">Real-time updates from our engineering team</p>
                  </div>
                </div>

                <div className="relative z-10 mb-8">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-2">Reference ID</label>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="text"
                      placeholder="e.g. TKT-88211"
                      value={trackId}
                      onChange={(e) => setTrackId(e.target.value)}
                      className="flex-1 px-4 py-3.5 rounded-xl bg-[var(--surface)] technical-border text-[var(--text-primary)] text-sm placeholder:text-[var(--text-muted)]/50 focus:border-[var(--secondary)] focus:outline-none transition-colors"
                    />
                    <button
                      onClick={handleTrack}
                      className="px-8 py-3.5 bg-[var(--secondary)] text-[var(--on-secondary)] rounded-xl text-sm font-bold hover:brightness-110 transition-all shadow-md"
                    >
                      Check Status
                    </button>
                  </div>
                </div>

                {trackResult && (
                  <div className="mt-auto p-6 technical-border rounded-xl bg-[var(--surface)] border-l-4 border-l-[var(--secondary)] relative z-10 animate-fade-in-up">
                    <div className="flex items-start gap-4">
                      <span className="material-symbols-outlined text-[32px] text-[var(--secondary)]">
                        info
                      </span>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-1">Current Status</p>
                        <p className="text-xl font-bold text-[var(--text-primary)] mb-2">
                          {trackResult.status}
                        </p>
                        <p className="text-xs text-[var(--text-muted)]">
                          Last Updated: {trackResult.lastUpdate}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Visual filler if no result */}
                {!trackResult && (
                  <div className="mt-auto opacity-30 flex flex-col items-center justify-center p-8 border-2 border-dashed border-[var(--border-cyan)] rounded-xl relative z-10">
                    <span className="material-symbols-outlined text-4xl mb-2">query_stats</span>
                    <p className="text-xs font-semibold">Enter ID to view timeline</p>
                  </div>
                )}

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-[1280px] mx-auto px-5 md:px-16 py-20">
        <div className="text-center mb-12">
          <SectionHeader title="Frequently Asked Questions" subtitle="Quick answers to common inquiries regarding our support processes and policies." />
        </div>
        <div className="max-w-4xl mx-auto bg-[var(--surface-container-low)] p-8 md:p-12 rounded-3xl technical-border shadow-2xl">
          <Accordion items={faqs} />
        </div>
      </section>
    </>
  );
}
