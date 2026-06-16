"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { DASHBOARD_LINKS } from "@/lib/constants";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { user } = useUser();

  return (
    <div className="max-w-[1280px] mx-auto px-5 md:px-16 py-8 flex flex-col lg:flex-row gap-6">
      {/* Sidebar */}
      <aside className="lg:w-[240px] flex-shrink-0">
        {/* User Info */}
        {user && (
          <div className="flex items-center gap-3 mb-6 lg:mb-8">
            <div className="w-10 h-10 rounded-full bg-[var(--primary)]/20 flex items-center justify-center overflow-hidden">
              {user.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={user.imageUrl}
                  alt={user.firstName || "User"}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="material-symbols-outlined text-[var(--primary)]">
                  person
                </span>
              )}
            </div>
            <div>
              <p className="text-sm font-bold text-[var(--text-primary)]">
                {user.firstName || "User"} {user.lastName || ""}
              </p>
              <span className="text-xs font-semibold text-[var(--secondary)] uppercase tracking-wider">
                Premium User
              </span>
            </div>
          </div>
        )}

        {/* Nav */}
        <nav className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
          {DASHBOARD_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                  isActive
                    ? "bg-[var(--primary)]/10 text-[var(--primary)] border border-[var(--border-cyan)]"
                    : "text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface)]"
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">
                  {link.icon}
                </span>
                {link.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Content */}
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  );
}
