import React from "react";
import SectionHeader from "@/components/ui/SectionHeader";
import Image from "next/image";

export default function CorporateClientsShowcase() {
  return (
    <section className="bg-[var(--surface-container-low)] py-20 border-b border-[var(--border-cyan)]/50">
      <div className="max-w-[1280px] mx-auto px-5 md:px-16">
        <SectionHeader 
          title="Mission-Critical Landmark Deployments" 
          subtitle="Powering resilient digital infrastructure for high-traffic, zero-downtime enterprise environments." 
        />

        {/* Highlighted Landmark Clients */}
        <div className="mb-16">
          <h3 className="text-sm font-bold uppercase tracking-widest text-[var(--secondary)] mb-6 text-center">
            Landmark Deployments
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[var(--surface)] rounded-2xl technical-border relative overflow-hidden group flex flex-col">
              <div className="h-48 w-full relative overflow-hidden border-b border-[var(--border-cyan)]/30">
                <Image src="/images/landmarks/stadium.png" alt="Rajiv Gandhi Stadium" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="p-6 md:p-8 flex-1 relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--primary)]/10 blur-3xl rounded-full group-hover:bg-[var(--primary)]/20 transition-all"></div>
                <span className="material-symbols-outlined text-[var(--primary)] text-4xl mb-4 block">stadium</span>
                <h4 className="font-heading text-xl font-bold text-[var(--text-primary)] mb-2">
                  Rajiv Gandhi Stadium, Uppal
                </h4>
                <div className="inline-block px-3 py-1 bg-[var(--surface-container)] rounded-full text-xs font-semibold text-[var(--text-muted)] mb-4">
                  Sports (Cricket)
                </div>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                  High-density mission-critical bandwidth supporting tens of thousands of concurrent connections and operations during international cricket matches.
                </p>
              </div>
            </div>

            <div className="bg-[var(--surface)] rounded-2xl technical-border relative overflow-hidden group flex flex-col">
              <div className="h-48 w-full relative overflow-hidden border-b border-[var(--border-cyan)]/30">
                <Image src="/images/landmarks/temple.png" alt="Yadagirigutta Devasthanam" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="p-6 md:p-8 flex-1 relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--secondary)]/10 blur-3xl rounded-full group-hover:bg-[var(--secondary)]/20 transition-all"></div>
                <span className="material-symbols-outlined text-[var(--secondary)] text-4xl mb-4 block">temple_hindu</span>
                <h4 className="font-heading text-xl font-bold text-[var(--text-primary)] mb-2">
                  Yadagirigutta Devasthanam
                </h4>
                <div className="inline-block px-3 py-1 bg-[var(--surface-container)] rounded-full text-xs font-semibold text-[var(--text-muted)] mb-4">
                  Religious Institution
                </div>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                  Core digital connectivity infrastructure for a high-traffic religious site, managing massive concurrent networking needs and security feeds securely.
                </p>
              </div>
            </div>

            <div className="bg-[var(--surface)] rounded-2xl technical-border relative overflow-hidden group flex flex-col">
              <div className="h-48 w-full relative overflow-hidden border-b border-[var(--border-cyan)]/30">
                <Image src="/images/landmarks/tv_studio.png" alt="Metro TV Channel" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="p-6 md:p-8 flex-1 relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--primary)]/10 blur-3xl rounded-full group-hover:bg-[var(--primary)]/20 transition-all"></div>
                <span className="material-symbols-outlined text-[var(--primary)] text-4xl mb-4 block">live_tv</span>
                <h4 className="font-heading text-xl font-bold text-[var(--text-primary)] mb-2">
                  Metro TV Channel
                </h4>
                <div className="inline-block px-3 py-1 bg-[var(--surface-container)] rounded-full text-xs font-semibold text-[var(--text-muted)] mb-4">
                  Media Broadcasting
                </div>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                  Low-latency dedicated pipeline ensuring zero downtime for continuous live 24/7 broadcasting and heavy media uploads.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}



