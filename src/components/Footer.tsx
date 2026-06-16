import Link from "next/link";
import { COMPANY, FOOTER_LINKS, FOOTER_NAV_LINKS } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-[var(--surface-container-low)] border-t border-[var(--border-cyan)] text-[var(--text-primary)]">
      {/* Top Footer Segment */}
      <div className="max-w-[1280px] mx-auto px-5 md:px-16 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          {/* Column 1: Brand Identity & Regulatory Compliance */}
          <div className="space-y-6">
            <Link href="/" className="inline-block transition-transform hover:scale-[1.02]">
              <img
                src="/LOGO-1-removebg-preview.png"
                alt="NeoLog Broadband Logo"
                className="h-14 md:h-16 w-auto object-contain"
              />
            </Link>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed">
              {COMPANY.tagline} Powered by high-speed resilient optical transit fiber rings.
            </p>
            
            {/* Regulatory Meta Credentials */}
            <div className="space-y-2 text-xs text-[var(--text-muted)] pt-2 border-t border-[var(--border-cyan)]/30 font-mono">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[14px] text-[var(--primary)]">verified</span>
                <span>DoT ISP License: <span className="text-[var(--text-primary)]">{COMPANY.ispLicense}</span></span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[14px] text-[var(--primary)]">fingerprint</span>
                <span>CIN: <span className="text-[var(--text-primary)]">{COMPANY.cin}</span></span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[14px] text-[var(--primary)]">receipt</span>
                <span>GSTIN: <span className="text-[var(--text-primary)]">{COMPANY.gst}</span></span>
              </div>
            </div>
          </div>

          {/* Column 2: Directory & Site Navigation */}
          <div>
            <h4 className="font-heading text-xs font-bold uppercase tracking-[0.1em] text-[var(--primary)] mb-6">
              Services & Directory
            </h4>
            <ul className="space-y-3.5">
              <li>
                <Link
                  href="/plans"
                  className="text-sm text-[var(--text-muted)] hover:text-[var(--primary)] transition-all hover:translate-x-1 duration-200 inline-flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)]/50" />
                  Broadband Plans
                </Link>
              </li>
              {FOOTER_NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--text-muted)] hover:text-[var(--primary)] transition-all hover:translate-x-1 duration-200 inline-flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)]/50" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: NOC Priority Desk & Helplines */}
          <div>
            <h4 className="font-heading text-xs font-bold uppercase tracking-[0.1em] text-[var(--primary)] mb-6">
              NOC Operations & Support
            </h4>
            <div className="space-y-5">
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-[var(--primary)] text-[20px] mt-0.5">
                  headset_mic
                </span>
                <div>
                  <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider font-semibold">24x7 Help Desk</p>
                  <a href={`tel:${COMPANY.techSupport.replace(/\s+/g, "")}`} className="text-sm font-bold hover:text-[var(--primary)] transition-colors">
                    {COMPANY.techSupport}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-[var(--secondary)] text-[20px] mt-0.5">
                  business
                </span>
                <div>
                  <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider font-semibold">Corporate Sales NOC</p>
                  <a href={`tel:${COMPANY.phone.replace(/\s+/g, "")}`} className="text-sm font-bold hover:text-[var(--secondary)] transition-colors">
                    {COMPANY.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-[var(--primary)] text-[20px] mt-0.5">
                  mail
                </span>
                <div>
                  <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider font-semibold">Technical Queries</p>
                  <a href={`mailto:${COMPANY.email}`} className="text-sm font-semibold hover:text-[var(--primary)] transition-colors break-all">
                    {COMPANY.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-[#25D366] text-[20px] mt-0.5">
                  chat
                </span>
                <div>
                  <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider font-semibold">WhatsApp Desk</p>
                  <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-[#25D366] hover:underline">
                    Instant WhatsApp Ping
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Column 4: App Download & Security Desk */}
          <div className="space-y-6">
            <div>
              <h4 className="font-heading text-xs font-bold uppercase tracking-[0.1em] text-[var(--primary)] mb-4">
                Download Client Portal
              </h4>
              <p className="text-xs text-[var(--text-muted)] mb-4 leading-relaxed">
                Check real-time usage graphs, pay invoices, and open prioritised tickets from our mobile client.
              </p>
              
              <div className="flex flex-col gap-3">
                {/* Google Play CSS Badge */}
                <a
                  href="#"
                  className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-[var(--surface)] technical-border hover:border-[var(--primary)] transition-all group"
                >
                  <span className="material-symbols-outlined text-[24px] text-[var(--primary)] group-hover:scale-110 transition-transform">
                    play_arrow
                  </span>
                  <div className="text-left">
                    <p className="text-[9px] uppercase text-[var(--text-muted)] tracking-wider leading-none">Get it on</p>
                    <p className="font-heading text-xs font-bold text-[var(--text-primary)] mt-0.5">Google Play</p>
                  </div>
                </a>

                {/* Apple Store CSS Badge */}
                <a
                  href="#"
                  className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-[var(--surface)] technical-border hover:border-[var(--primary)] transition-all group"
                >
                  <span className="material-symbols-outlined text-[24px] text-[var(--primary)] group-hover:scale-110 transition-transform">
                    laptop_mac
                  </span>
                  <div className="text-left">
                    <p className="text-[9px] uppercase text-[var(--text-muted)] tracking-wider leading-none">Download on the</p>
                    <p className="font-heading text-xs font-bold text-[var(--text-primary)] mt-0.5">App Store</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.1em] text-[var(--primary)] mb-3">Follow NOC Updates</p>
              <div className="flex gap-2">
                {[
                  { icon: "public", label: "Facebook" },
                  { icon: "flutter_dash", label: "Twitter" },
                  { icon: "domain", label: "LinkedIn" },
                  { icon: "play_circle", label: "YouTube" }
                ].map((s) => (
                  <button
                    key={s.label}
                    title={s.label}
                    className="w-9 h-9 rounded-lg technical-border bg-[var(--surface)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--primary)] hover:border-[var(--primary)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px]">{s.icon}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Footer Segment */}
      <div className="border-t border-[var(--border-cyan)]/20">
        <div className="max-w-[1280px] mx-auto px-5 md:px-16 py-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          
          {/* Rights Statement & ISP Status Disclaimer */}
          <div className="space-y-1">
            <p className="text-xs text-[var(--text-muted)]">
              © {new Date().getFullYear()} <span className="font-bold text-[var(--text-primary)]">{COMPANY.legalName}</span>. All rights reserved.
            </p>
            <p className="text-[10px] text-[var(--text-muted)] max-w-xl">
              NeoLog Online Services Pvt. Ltd. is a registered Class B Internet Service Provider (ISP) licensee authorized by the Department of Telecommunications (DoT), Ministry of Communications, Government of India.
            </p>
          </div>

          {/* Legal Pages links */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {FOOTER_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs text-[var(--text-muted)] hover:text-[var(--primary)] hover:underline transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

        </div>
      </div>
    </footer>
  );
}
