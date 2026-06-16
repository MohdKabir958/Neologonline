"use client";

import { useState } from "react";
import { dashboardData } from "@/data/dashboard";

export default function DashboardProfilePage() {
  const { contactDetails } = dashboardData;
  const [formData, setFormData] = useState({
    fullName: contactDetails.fullName,
    phone: contactDetails.phone,
    email: contactDetails.email,
    address: contactDetails.installationAddress,
  });
  const [updating, setUpdating] = useState(false);

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setUpdating(true);
    setTimeout(() => {
      setUpdating(false);
      alert("Account credentials and configuration saved successfully!");
    }, 1000);
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-heading text-2xl font-bold text-[var(--text-primary)] mb-2">My Account Profile</h1>
        <p className="text-sm text-[var(--text-muted)]">Manage your personal details, connection addresses, and verification parameters.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Profile Card */}
        <div className="lg:col-span-8 p-6 technical-border rounded-xl bg-[var(--surface)]">
          <h3 className="font-heading text-lg font-bold text-[var(--text-primary)] mb-6">Contact Details</h3>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-[var(--text-muted)] uppercase tracking-wider font-semibold mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-[var(--background)] technical-border text-[var(--text-primary)] text-sm focus:border-[var(--primary)] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs text-[var(--text-muted)] uppercase tracking-wider font-semibold mb-2">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-[var(--background)] technical-border text-[var(--text-primary)] text-sm focus:border-[var(--primary)] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-[var(--text-muted)] uppercase tracking-wider font-semibold mb-2">
                Registered Email
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-[var(--background)] technical-border text-[var(--text-primary)] text-sm focus:border-[var(--primary)] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs text-[var(--text-muted)] uppercase tracking-wider font-semibold mb-2">
                Installation Address
              </label>
              <textarea
                required
                rows={3}
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-[var(--background)] technical-border text-[var(--text-primary)] text-sm focus:border-[var(--primary)] focus:outline-none resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={updating}
              className="px-6 py-3 bg-[var(--primary)] text-[var(--on-primary)] rounded-lg text-xs font-bold hover:brightness-110 transition-all disabled:opacity-50"
            >
              {updating ? "Saving Changes..." : "Save Configuration"}
            </button>
          </form>
        </div>

        {/* Security Parameters */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 technical-border rounded-xl bg-[var(--surface)]">
            <h3 className="font-heading text-base font-bold text-[var(--text-primary)] mb-4">Verification Status</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-emerald-400">check_circle</span>
                <div>
                  <p className="text-xs font-bold text-[var(--text-primary)]">KYC Checked</p>
                  <p className="text-[10px] text-[var(--text-muted)]">Aadhaar verified in 2021</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-emerald-400">check_circle</span>
                <div>
                  <p className="text-xs font-bold text-[var(--text-primary)]">Email Confirmed</p>
                  <p className="text-[10px] text-[var(--text-muted)]">OTPs verified successfully</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
