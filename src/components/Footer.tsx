import Link from "next/link";
import { COMPANY, FOOTER_LINKS, FOOTER_NAV_LINKS } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-[var(--surface)] border-t border-[var(--border-cyan)]">
      <div className="max-w-[1280px] mx-auto px-5 md:px-16 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-block mb-3">
              <img
                src="/LOGO-1-removebg-preview.png"
                alt="NeoLog Broadband"
                className="h-16 w-auto object-contain"
              />
            </Link>
            <p className="text-sm text-[var(--text-muted)] mt-3 mb-6">
              {COMPANY.tagline}
            </p>
            {/* Download App CTA */}
            <a
              href="#"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[var(--primary)]/10 technical-border text-[var(--primary)] text-sm font-bold hover:bg-[var(--primary)]/20 transition-all"
            >
              <span className="material-symbols-outlined text-[20px]">
                phone_android
              </span>
              Download NeoLog App
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.05em] text-[var(--primary)] mb-4">
              Quick Links
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {FOOTER_NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors py-1"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.05em] text-[var(--primary)] mb-4">
              Legal
            </h4>
            <div className="space-y-2">
              {FOOTER_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-sm text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors py-1"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-[1280px] mx-auto px-5 md:px-16 py-4 text-center border-t border-[var(--border-cyan)]/50">
        <p className="text-sm text-[var(--text-muted)]">
          © {new Date().getFullYear()} {COMPANY.legalName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
