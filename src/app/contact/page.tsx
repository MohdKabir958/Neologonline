"use client";

import { useState } from "react";
import Link from "next/link";
import { submitContactForm } from "@/lib/api";
import { COMPANY } from "@/lib/constants";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    queryType: "New Connection Inquiries",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);
      await submitContactForm(formData);
      setSuccess(true);
      setFormData({ name: "", mobile: "", queryType: "New Connection Inquiries", message: "" });
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Breadcrumbs */}
      <div className="max-w-[1280px] mx-auto px-5 md:px-16 pt-4 pb-2 flex items-center gap-2 text-xs font-semibold text-[var(--text-muted)] select-none">
        <Link href="/" className="hover:text-[var(--primary)] transition-colors">Home</Link>
        <span className="material-symbols-outlined text-[14px] leading-none opacity-40">chevron_right</span>
        <span className="text-[var(--text-primary)]">Contact Us</span>
      </div>

      {/* Hero */}
      <section className="max-w-[1280px] mx-auto px-5 md:px-16 pt-6 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-8">
          <div className="lg:col-span-7">
            <h1 className="font-heading text-4xl md:text-[48px] font-bold text-[var(--text-primary)] mb-4">
              We&apos;re here to help
            </h1>
            <p className="text-base text-[var(--text-muted)] mb-8 leading-relaxed">
              Connect with Hyderabad&apos;s most reliable fiber network support
              team. We value your time and guarantee a response within 1 hour.
            </p>

            {/* Stats Banner */}
            <div className="flex flex-col sm:flex-row technical-border rounded-xl overflow-hidden bg-[var(--surface)]">
              <div className="flex-1 flex items-center gap-4 p-6 sm:border-r sm:border-[var(--border-cyan)]">
                <span className="material-symbols-outlined text-[var(--text-muted)] text-[28px]">
                  timer
                </span>
                <div>
                  <p className="font-heading text-xl font-bold text-[var(--primary)]">
                    45 min
                  </p>
                  <p className="text-xs text-[var(--text-muted)]">
                    Average response time today
                  </p>
                </div>
              </div>
              <div className="flex-1 flex items-center gap-4 p-6">
                <span className="material-symbols-outlined text-[var(--secondary)] text-[28px]">
                  star
                </span>
                <div>
                  <p className="font-heading text-xl font-bold text-[var(--primary)]">
                    4.8 / 5
                  </p>
                  <p className="text-xs text-[var(--text-muted)]">
                    Customer satisfaction rating
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden technical-border relative">
              <img
                src="/images/heroes/contact.png"
                alt="Neolog Priority NOC Support Helpdesk"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Grid */}
      <section className="max-w-[1280px] mx-auto px-5 md:px-16 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left: Contact Cards */}
          <div className="lg:w-[400px] space-y-4">
            {[
              { icon: "call", label: "Sales Hotline", value: COMPANY.phone },
              { icon: "headset_mic", label: "Technical Support", value: COMPANY.techSupport },
              { icon: "mail", label: "Email Inquiries", value: COMPANY.email },
            ].map((c) => (
              <div
                key={c.label}
                className="p-6 technical-border rounded-xl bg-[var(--surface)]"
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="material-symbols-outlined text-[var(--text-muted)] text-[20px]">
                    {c.icon}
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-[0.05em] text-[var(--text-muted)]">
                    {c.label}
                  </span>
                </div>
                <p className="font-heading text-xl font-bold text-[var(--text-primary)]">
                  {c.value}
                </p>
              </div>
            ))}

            {/* Offices */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 technical-border rounded-xl bg-[var(--surface)]">
                <p className="text-xs font-semibold uppercase tracking-[0.05em] text-[var(--primary)] mb-2">
                  Corporate Office
                </p>
                <p className="text-sm text-[var(--text-muted)]">
                  {COMPANY.offices.corporate.address}
                </p>
              </div>
              <div className="p-4 technical-border rounded-xl bg-[var(--surface)]">
                <p className="text-xs font-semibold uppercase tracking-[0.05em] text-[var(--primary)] mb-2">
                  Registered Office
                </p>
                <p className="text-sm text-[var(--text-muted)]">
                  {COMPANY.offices.registered.address}
                </p>
              </div>
            </div>

            {/* Social */}
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-4 py-2 technical-border rounded-lg text-sm text-[var(--primary)] hover:bg-[var(--surface)] transition-all">
                <span className="material-symbols-outlined text-[18px]">chat</span>
                WhatsApp Support
              </button>
              <button className="flex items-center gap-2 px-4 py-2 technical-border rounded-lg text-sm text-[var(--primary)] hover:bg-[var(--surface)] transition-all">
                <span className="material-symbols-outlined text-[18px]">public</span>
                Facebook
              </button>
            </div>
          </div>

          {/* Right: Contact Form + Map */}
          <div className="flex-1 space-y-6">
            <div className="p-8 technical-border rounded-xl bg-[var(--surface)]">
              <h2 className="font-heading text-2xl font-bold text-[var(--text-primary)] mb-6">
                Send us a message
              </h2>
              {success ? (
                <div className="text-center py-8">
                  <span className="material-symbols-outlined text-[48px] text-[var(--primary)] mb-4 block">
                    check_circle
                  </span>
                  <p className="font-heading text-lg font-bold text-[var(--text-primary)] mb-2">
                    Message sent!
                  </p>
                  <p className="text-sm text-[var(--text-muted)]">
                    We&apos;ll get back to you within 1 hour.
                  </p>
                  <button
                    onClick={() => setSuccess(false)}
                    className="mt-4 text-sm text-[var(--primary)] underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-[var(--text-muted)] mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-lg bg-[var(--background)] technical-border text-[var(--text-primary)] text-sm placeholder:text-[var(--text-muted)]/50 focus:border-[var(--primary)] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[var(--text-muted)] mb-2">
                        Mobile Number
                      </label>
                      <div className="flex">
                        <span className="px-3 py-3 bg-[var(--surface-container)] technical-border rounded-l-lg text-sm text-[var(--text-muted)] border-r-0">
                          +91
                        </span>
                        <input
                          type="tel"
                          required
                          placeholder="10-digit number"
                          value={formData.mobile}
                          onChange={(e) =>
                            setFormData({ ...formData, mobile: e.target.value })
                          }
                          className="flex-1 px-4 py-3 rounded-r-lg bg-[var(--background)] technical-border text-[var(--text-primary)] text-sm placeholder:text-[var(--text-muted)]/50 focus:border-[var(--primary)] focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--text-muted)] mb-2">
                      Query Type
                    </label>
                    <select
                      value={formData.queryType}
                      onChange={(e) =>
                        setFormData({ ...formData, queryType: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-lg bg-[var(--background)] technical-border text-[var(--text-primary)] text-sm focus:border-[var(--primary)] focus:outline-none appearance-none"
                    >
                      <option>New Connection Inquiries</option>
                      <option>Technical Support</option>
                      <option>Billing Issue</option>
                      <option>Plan Upgrade</option>
                      <option>General Feedback</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--text-muted)] mb-2">
                      Message
                    </label>
                    <textarea
                      required
                      placeholder="How can we help you?"
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      rows={5}
                      className="w-full px-4 py-3 rounded-lg bg-[var(--background)] technical-border text-[var(--text-primary)] text-sm placeholder:text-[var(--text-muted)]/50 focus:border-[var(--primary)] focus:outline-none resize-none"
                    />
                  </div>
                  {error && (
                    <p className="text-sm text-[var(--error)]">
                      Failed to send. Please try again.
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-[var(--primary)] text-[var(--on-primary)] rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:brightness-110 transition-all disabled:opacity-50"
                  >
                    {loading ? "Sending..." : "Send message"}
                    {!loading && (
                      <span className="material-symbols-outlined text-[18px]">
                        send
                      </span>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Google Map Embed */}
            <div className="technical-border rounded-xl overflow-hidden bg-[var(--surface)] h-[300px] relative pointer-events-auto">
              <iframe
                src="https://maps.google.com/maps?q=17.426008457974216,78.53420083680271&t=&z=16&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                frameBorder="0"
                style={{ border: 0 }}
                allowFullScreen
                aria-hidden="false"
                tabIndex={0}
                className="absolute inset-0"
              ></iframe>
              {/* Overlay Card */}
              <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 z-10 pointer-events-none bg-[var(--surface)]/90 backdrop-blur-md technical-border rounded-lg px-4 py-3 flex items-center gap-3 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                <span className="material-symbols-outlined text-[var(--primary)] text-[20px]">
                  location_on
                </span>
                <div>
                  <p className="text-sm font-bold text-[var(--text-primary)]">
                    NeoLog Regional Center
                  </p>
                  <p className="text-xs text-[var(--text-muted)]">
                    Tarnaka Area, Secunderabad
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
