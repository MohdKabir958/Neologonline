"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect, startTransition } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS, EXTRA_NAV_LINKS } from "@/lib/constants";
import { useTheme } from "@/components/ThemeProvider";

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const moreRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        startTransition(() => setMoreOpen(false));
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Check if any extra link is active
  const isExtraActive = EXTRA_NAV_LINKS.some((l) => pathname === l.href || pathname.startsWith(l.href + "/"));

  return (
    <nav className="sticky top-0 z-50 bg-[var(--surface)]/95 backdrop-blur-md border-b border-[var(--border-cyan)] h-20">
      <div className="max-w-[1280px] mx-auto px-5 md:px-16 h-full flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/LOGO-1-removebg-preview.png"
            alt="NeoLog Broadband"
            width={160}
            height={64}
            priority
            className="h-12 md:h-16 w-auto object-contain"
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium tracking-[0.01em] transition-colors ${
                  isActive
                    ? "text-[var(--primary)] font-bold border-b-2 border-[var(--primary)] pb-1"
                    : "text-[var(--on-surface-variant)] hover:text-[var(--primary)]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}

          {/* More Dropdown */}
          <div ref={moreRef} className="relative">
            <button
              onClick={() => startTransition(() => setMoreOpen(!moreOpen))}
              className={`flex items-center gap-1 text-sm font-medium tracking-[0.01em] transition-colors ${
                isExtraActive
                  ? "text-[var(--primary)] font-bold"
                  : "text-[var(--on-surface-variant)] hover:text-[var(--primary)]"
              }`}
            >
              More
              <span
                className={`material-symbols-outlined text-[18px] transition-transform duration-200 ${
                  moreOpen ? "rotate-180" : ""
                }`}
              >
                expand_more
              </span>
            </button>

            {/* Dropdown Menu */}
            {moreOpen && (
              <div className="absolute top-full right-0 mt-3 w-56 py-2 bg-[var(--surface)] technical-border rounded-xl shadow-lg shadow-black/20 z-50">
                {EXTRA_NAV_LINKS.map((link) => {
                  const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => startTransition(() => setMoreOpen(false))}
                      className={`flex items-center gap-3 px-4 py-3 text-sm transition-colors ${
                        isActive
                          ? "text-[var(--primary)] bg-[var(--primary)]/5 font-bold"
                          : "text-[var(--on-surface-variant)] hover:text-[var(--primary)] hover:bg-[var(--surface-variant)]"
                      }`}
                    >
                      <span className="material-symbols-outlined text-[20px]">
                        {link.icon}
                      </span>
                      {link.label}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right side: Theme Toggle + Download App + Auth */}
        <div className="hidden md:flex items-center gap-3">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="relative w-10 h-10 flex items-center justify-center rounded-lg technical-border text-[var(--text-muted)] hover:text-[var(--primary)] hover:border-[var(--primary)] transition-all"
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            <span
              className={`material-symbols-outlined text-[20px] absolute transition-all duration-300 ${
                theme === "dark"
                  ? "opacity-100 rotate-0 scale-100"
                  : "opacity-0 rotate-90 scale-50"
              }`}
            >
              light_mode
            </span>
            <span
              className={`material-symbols-outlined text-[20px] absolute transition-all duration-300 ${
                theme === "light"
                  ? "opacity-100 rotate-0 scale-100"
                  : "opacity-0 -rotate-90 scale-50"
              }`}
            >
              dark_mode
            </span>
          </button>

          {/* Download App */}
          <a
            href="#"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--primary)]/10 text-[var(--primary)] text-sm font-medium hover:bg-[var(--primary)]/20 transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">
              phone_android
            </span>
            Get App
          </a>

          <Link
            href="/sign-in"
            className="text-[var(--primary)] border border-[var(--border-cyan)] px-4 py-2 rounded-lg text-sm font-medium hover:border-[var(--primary)] transition-all"
          >
            Login
          </Link>
          <Link
            href="/dashboard"
            className="bg-[var(--secondary)] text-[var(--on-secondary)] px-5 py-2 rounded-lg text-sm font-bold hover:brightness-110 transition-all"
          >
            My Account
          </Link>
        </div>

        {/* Mobile: Theme Toggle + Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="w-10 h-10 flex items-center justify-center rounded-lg text-[var(--text-muted)] hover:text-[var(--primary)] transition-all"
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            <span className="material-symbols-outlined text-[22px]">
              {theme === "dark" ? "light_mode" : "dark_mode"}
            </span>
          </button>
          <button
            onClick={() => startTransition(() => setMobileOpen(!mobileOpen))}
            className="text-[var(--text-primary)] p-2"
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined text-[28px]">
              {mobileOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-[var(--surface)] border-t border-[var(--border-cyan)] absolute top-20 left-0 right-0 z-50 overflow-hidden shadow-2xl"
          >
            <div className="max-h-[calc(100vh-80px)] overflow-y-auto">
              <div className="px-5 py-6 space-y-1">
            {/* Main Links */}
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => startTransition(() => setMobileOpen(false))}
                  className={`block text-base font-medium py-3 px-3 rounded-lg ${
                    isActive
                      ? "text-[var(--primary)] bg-[var(--primary)]/5"
                      : "text-[var(--on-surface-variant)]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            {/* Divider */}
            <div className="border-t border-[var(--border-cyan)] my-3" />

            {/* Extra Links */}
            <p className="px-3 text-xs font-semibold uppercase tracking-[0.05em] text-[var(--text-muted)] pt-2">
              Explore
            </p>
            {EXTRA_NAV_LINKS.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => startTransition(() => setMobileOpen(false))}
                  className={`flex items-center gap-3 text-base font-medium py-3 px-3 rounded-lg ${
                    isActive
                      ? "text-[var(--primary)] bg-[var(--primary)]/5"
                      : "text-[var(--on-surface-variant)]"
                  }`}
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {link.icon}
                  </span>
                  {link.label}
                </Link>
              );
            })}

            {/* Divider */}
            <div className="border-t border-[var(--border-cyan)] my-3" />

            {/* Download App */}
            <a
              href="#"
              className="flex items-center justify-center gap-2 py-3 px-3 rounded-lg bg-[var(--primary)]/10 text-[var(--primary)] text-sm font-bold"
            >
              <span className="material-symbols-outlined text-[20px]">
                phone_android
              </span>
              Download NeoLog App
            </a>

            {/* Auth buttons */}
            <div className="pt-2 flex flex-col gap-3">
              <Link
                href="/sign-in"
                onClick={() => startTransition(() => setMobileOpen(false))}
                className="text-center text-[var(--primary)] border border-[var(--border-cyan)] px-4 py-3 rounded-lg text-sm font-medium"
              >
                Login
              </Link>
              <Link
                href="/dashboard"
                onClick={() => startTransition(() => setMobileOpen(false))}
                className="text-center bg-[var(--secondary)] text-[var(--on-secondary)] px-6 py-3 rounded-lg text-sm font-bold"
              >
                My Account
              </Link>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
    </nav>
  );
}
