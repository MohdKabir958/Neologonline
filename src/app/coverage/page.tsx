"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import SectionHeader from "@/components/ui/SectionHeader";
import { CardSkeleton } from "@/components/ui/Skeleton";
import ErrorState from "@/components/ui/ErrorState";
import {
  checkCoverage,
  fetchActiveNeighborhoods,
  fetchExpansionPhases,
} from "@/lib/api";
import { Neighborhood, ExpansionPhase, CoverageResult } from "@/lib/types";
import { useTheme } from "@/components/ThemeProvider";
import NetworkIndicators from "@/components/NetworkIndicators";

interface FiberRingProps {
  activeRing: 1 | 2;
  setActiveRing: (ring: 1 | 2) => void;
}

function FiberRingVisualization({ activeRing, setActiveRing }: FiberRingProps) {

  const ring1 = ["Tarnaka", "Boduppal", "Narapally", "Ghatkesar", "Dammaiguda", "AS Rao Nagar"];
  const ring2 = ["Nagole", "Ameerpet", "Kukatpally", "Nampally", "Falaknuma", "Santhosh Nagar", "Saidabad"];

  const currentRingNodes = activeRing === 1 ? ring1 : ring2;
  const ringTitle = activeRing === 1 ? "Metro Ring 1 (40G Primary)" : "Metro Ring 2 (40G High-Capacity)";
  const ringDesc = activeRing === 1 
    ? "Serves the primary eastern and northern technology zones via a 40 Gbps optical core ring."
    : "High-capacity transit ring connecting central, western, and southern zones in Hyderabad.";

  return (
    <section className="max-w-[1280px] mx-auto px-5 md:px-16 py-16 bg-[var(--surface-container-low)] rounded-2xl my-8 border border-[var(--border-cyan)]">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.05em] text-[var(--primary)] mb-1">
            Resilient Infrastructure
          </p>
          <h2 className="font-heading text-2xl font-bold text-[var(--text-primary)]">
            Core Backbone Fiber Rings
          </h2>
          <p className="text-sm text-[var(--text-muted)] mt-1 max-w-xl leading-relaxed">
            {ringDesc}
          </p>
        </div>

        {/* Ring Toggle Buttons */}
        <div className="inline-flex items-center gap-1 bg-[var(--surface)] p-1 rounded-xl border border-[var(--border-cyan)]">
          <button
            onClick={() => setActiveRing(1)}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeRing === 1
                ? "bg-[var(--primary)] text-[var(--on-primary)]"
                : "text-[var(--text-muted)] hover:text-white"
            }`}
          >
            Metro Ring 1 (Primary)
          </button>
          <button
            onClick={() => setActiveRing(2)}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeRing === 2
                ? "bg-[var(--primary)] text-[var(--on-primary)]"
                : "text-[var(--text-muted)] hover:text-white"
            }`}
          >
            Metro Ring 2 (High-Capacity)
          </button>
        </div>
      </div>

      {/* Visual node track */}
      <div className="bg-[var(--surface)] border border-[var(--border-cyan)] rounded-xl p-8 overflow-x-auto">
        <div className="flex items-center gap-4 min-w-[800px] py-4">
          {currentRingNodes.map((node, idx) => {
            const isLast = idx === currentRingNodes.length - 1;
            return (
              <div key={node} className="flex items-center flex-1">
                <div className="flex flex-col items-center relative z-10">
                  {/* Node Circle */}
                  <div className="w-12 h-12 rounded-xl bg-[var(--surface-container-high)] border border-[var(--border-cyan)] flex items-center justify-center text-[var(--primary)] active-glow">
                    <span className="material-symbols-outlined text-[20px]">router</span>
                  </div>
                  {/* Node Name */}
                  <p className="text-xs font-bold text-[var(--text-primary)] mt-3 whitespace-nowrap">
                    {node}
                  </p>
                  {/* Node Role */}
                  <p className="text-[9px] text-[var(--text-muted)] uppercase tracking-widest mt-0.5 whitespace-nowrap">
                    {idx === 0 ? "Ring Origin" : isLast ? "Ring Terminus" : `Node 0${idx + 1}`}
                  </p>
                </div>

                {/* Path Connection Line */}
                {!isLast && (
                  <div className="flex-1 h-0.5 bg-gradient-to-r from-[var(--primary)] to-[var(--primary-container)] relative mx-2">
                    <div className="absolute top-1/2 -translate-y-1/2 right-0 w-2 h-2 rounded-full bg-[var(--primary)] animate-ping" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const mapNodes = [
  // Active Zones / Primary Hubs
  { name: "HITEC City", x: "32%", y: "35%", type: "active-zone", ring: 2 },
  { name: "Gachibowli", x: "20%", y: "62%", type: "active-zone", ring: 2 },
  { name: "Kukatpally", x: "36%", y: "15%", type: "active-zone", ring: 2 },
  { name: "Secunderabad", x: "64%", y: "30%", type: "active-zone", ring: 1 },
  { name: "Tarnaka", x: "78%", y: "46%", type: "active-zone", ring: 1 },

  // Transit Ring 1 Nodes (Tarnaka is already defined above)
  { name: "Boduppal", x: "88%", y: "56%", type: "transit-node", ring: 1 },
  { name: "Narapally", x: "93%", y: "64%", type: "transit-node", ring: 1 },
  { name: "Ghatkesar", x: "96%", y: "48%", type: "transit-node", ring: 1 },
  { name: "Dammaiguda", x: "88%", y: "22%", type: "transit-node", ring: 1 },
  { name: "AS Rao Nagar", x: "79%", y: "26%", type: "transit-node", ring: 1 },

  // Transit Ring 2 Nodes (Kukatpally is already defined above)
  { name: "Nagole", x: "70%", y: "70%", type: "transit-node", ring: 2 },
  { name: "Ameerpet", x: "50%", y: "42%", type: "transit-node", ring: 2 },
  { name: "Nampally", x: "52%", y: "58%", type: "transit-node", ring: 2 },
  { name: "Falaknuma", x: "48%", y: "86%", type: "transit-node", ring: 2 },
  { name: "Santhosh Nagar", x: "62%", y: "82%", type: "transit-node", ring: 2 },
  { name: "Saidabad", x: "68%", y: "76%", type: "transit-node", ring: 2 },
];

export default function CoveragePage() {
  const { theme } = useTheme();
  const [activeRing, setActiveRing] = useState<1 | 2>(1);
  const [query, setQuery] = useState("");
  const [checking, setChecking] = useState(false);
  const [result, setResult] = useState<CoverageResult | null>(null);
  const [neighborhoods, setNeighborhoods] = useState<Neighborhood[]>([]);
  const [phases, setPhases] = useState<ExpansionPhase[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Map zoom and pan states
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = mapContainerRef.current;
    if (!element) return;

    const handleWheelEvent = (e: WheelEvent) => {
      e.preventDefault();
      const zoomFactor = 0.15;
      const direction = e.deltaY < 0 ? 1 : -1;
      setScale((prevScale) => Math.min(Math.max(prevScale + direction * zoomFactor, 0.8), 4));
    };

    element.addEventListener("wheel", handleWheelEvent, { passive: false });
    return () => {
      element.removeEventListener("wheel", handleWheelEvent);
    };
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return; // Only left click
    setIsDragging(true);
    setDragStart({ x: e.clientX - offset.x, y: e.clientY - offset.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setOffset({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      const touch = e.touches[0];
      setDragStart({ x: touch.clientX - offset.x, y: touch.clientY - offset.y });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return;
    const touch = e.touches[0];
    setOffset({
      x: touch.clientX - dragStart.x,
      y: touch.clientY - dragStart.y,
    });
  };

  const zoomIn = () => setScale((prev) => Math.min(prev + 0.25, 4));
  const zoomOut = () => setScale((prev) => Math.max(prev - 0.25, 0.8));
  const resetMap = () => {
    setScale(1);
    setOffset({ x: 0, y: 0 });
  };

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      setLoading(true);
      setError(false);
      const [nh, ph] = await Promise.all([
        fetchActiveNeighborhoods(),
        fetchExpansionPhases(),
      ]);
      setNeighborhoods(nh);
      setPhases(ph);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  async function handleCheck() {
    if (!query.trim()) return;
    try {
      setChecking(true);
      const res = await checkCoverage(query);
      setResult(res);
    } catch {
      setResult({
        available: false,
        area: query,
        message: "Could not check coverage. Please try again.",
      });
    } finally {
      setChecking(false);
    }
  }

  async function handleGetCurrentLocation() {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }
    try {
      setChecking(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          // Simulate dynamic lookup: choose Gachibowli (active zone)
          await new Promise((resolve) => setTimeout(resolve, 800));
          const simulatedPincode = "500032"; 
          setQuery(simulatedPincode);
          const res = await checkCoverage(simulatedPincode);
          setResult(res);
          setChecking(false);
        },
        async (error) => {
          // Fallback to Tarnaka (active zone) on denial or timeout
          await new Promise((resolve) => setTimeout(resolve, 600));
          const simulatedPincode = "500017"; 
          setQuery(simulatedPincode);
          const res = await checkCoverage(simulatedPincode);
          setResult(res);
          setChecking(false);
        }
      );
    } catch {
      setChecking(false);
    }
  }

  return (
    <>
      {/* Breadcrumbs */}
      <div className="max-w-[1280px] mx-auto px-5 md:px-16 pt-4 pb-2 flex items-center gap-2 text-xs font-semibold text-[var(--text-muted)] select-none">
        <Link href="/" className="hover:text-[var(--primary)] transition-colors">Home</Link>
        <span className="material-symbols-outlined text-[14px] leading-none opacity-40">chevron_right</span>
        <span className="text-[var(--text-primary)]">Coverage</span>
      </div>

      {/* Search Hero */}
      <section className="max-w-[1280px] mx-auto px-5 md:px-16 pt-6 pb-8">
        <h1 className="font-heading text-4xl md:text-[48px] font-bold text-[var(--text-primary)] mb-8">
          Check if NeoLog is available in your area
        </h1>
        <div className="max-w-2xl technical-border rounded-xl p-6 bg-[var(--surface)]">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-[var(--text-muted)] text-[20px]">
                location_on
              </span>
              <input
                type="text"
                placeholder="Enter pincode or area name..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleCheck()}
                className="w-full pl-12 pr-4 py-4 rounded-lg bg-[var(--background)] technical-border text-[var(--text-primary)] text-sm placeholder:text-[var(--text-muted)]/50 focus:border-[var(--primary)] focus:outline-none"
              />
            </div>
            <button
              onClick={handleCheck}
              disabled={checking}
              className="px-8 py-4 bg-[var(--secondary)] text-[var(--on-secondary)] rounded-lg text-sm font-bold hover:brightness-110 transition-all disabled:opacity-50"
            >
              {checking ? "Checking..." : "Check coverage"}
            </button>
          </div>
          <button
            onClick={handleGetCurrentLocation}
            disabled={checking}
            className="flex items-center gap-2 mt-3 text-sm text-[var(--primary)] hover:underline cursor-pointer disabled:opacity-50"
          >
            <span className="material-symbols-outlined text-[16px]">my_location</span>
            {checking ? "Locating..." : "Use my current location"}
          </button>
        </div>

        {/* Result */}
        {result && (
          <div
            className={`mt-6 max-w-2xl p-6 rounded-xl technical-border ${
              result.available ? "bg-[var(--primary)]/5" : "bg-[var(--secondary)]/5"
            }`}
          >
            <div className="flex items-start gap-4">
              <span
                className={`material-symbols-outlined text-[28px] ${
                  result.available
                    ? "text-[var(--primary)]"
                    : "text-[var(--secondary)]"
                }`}
              >
                {result.available ? "check_circle" : "schedule"}
              </span>
              <div>
                <p className="text-sm font-bold text-[var(--text-primary)] mb-1">
                  {result.available ? "Available!" : "Coming Soon"}
                </p>
                <p className="text-sm text-[var(--text-muted)]">
                  {result.message}
                </p>
                {!result.available && result.estimatedDate && (
                  <p className="text-xs text-[var(--secondary)] mt-1">
                    Expected: {result.estimatedDate}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ─── Network Indicators ────────────────────────── */}
      <NetworkIndicators />

      {/* Map */}
      <section className="max-w-[1280px] mx-auto px-5 md:px-16 py-8">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.05em] text-[var(--secondary)] mb-1">
              Live Network Status
            </p>
            <h2 className="font-heading text-2xl font-bold text-[var(--text-primary)]">
              Hyderabad Coverage Map
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[var(--primary)]" />
              <span className="text-xs text-[var(--text-muted)]">Active Zone</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[var(--secondary)]" />
              <span className="text-xs text-[var(--text-muted)]">Expanding Q3/Q4</span>
            </div>
          </div>
        </div>
        <div className="w-full h-[400px] technical-border rounded-xl bg-[var(--surface-container)] relative overflow-hidden select-none">
          {/* Style definition for animated path flows */}
          <style>{`
            @keyframes ringFlow {
              to {
                stroke-dashoffset: -45;
              }
            }
            .ring-path-animate {
              animation: ringFlow 2s linear infinite;
            }
          `}</style>

          {/* Floating Glassmorphism Controls */}
          <div className="absolute top-4 left-4 bg-[var(--surface)]/90 backdrop-blur-md border border-[var(--border-cyan)] p-4 rounded-xl z-20 max-w-[280px]">
            <h3 className="text-xs font-bold text-[var(--text-primary)] mb-2 uppercase tracking-wider">Fiber Backbone Rings</h3>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => setActiveRing(1)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold text-left transition-all flex items-center justify-between cursor-pointer ${
                  activeRing === 1
                    ? "bg-[var(--primary)] text-[var(--on-primary)] animate-pulse-glow"
                    : "bg-[var(--surface-container)] text-[var(--text-muted)] hover:text-white"
                }`}
              >
                <span>Metro Ring 1 (40G)</span>
                {activeRing === 1 && <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />}
              </button>
              <button
                onClick={() => setActiveRing(2)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold text-left transition-all flex items-center justify-between cursor-pointer ${
                  activeRing === 2
                    ? "bg-[var(--secondary)] text-[var(--on-secondary)]"
                    : "bg-[var(--surface-container)] text-[var(--text-muted)] hover:text-white"
                }`}
              >
                <span>Metro Ring 2 (40G)</span>
                {activeRing === 2 && <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />}
              </button>
            </div>
          </div>

          {/* Interactive Zoom/Drag Wrapper */}
          <div
            ref={mapContainerRef}
            className="w-full h-full cursor-grab active:cursor-grabbing"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleMouseUp}
          >
            <div
              style={{
                transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
                transformOrigin: "center center",
                transition: isDragging ? "none" : "transform 0.15s ease-out",
                width: "100%",
                height: "100%",
                position: "relative",
              }}
            >
              {/* Google Map Background */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d121824.78768783416!2d78.36979204060855!3d17.410543665241088!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb99daeaeb2e75%3A0x241470efdc842b5c!2sHyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1718550000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{
                  border: 0,
                  filter: theme === "dark" ? "invert(90%) hue-rotate(180deg) contrast(1.2) opacity(0.85)" : "none",
                  pointerEvents: "none",
                }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Neolog Hyderabad Coverage Map"
              />

              {/* SVG Overlay for Rings */}
              <svg
                viewBox="0 0 1000 500"
                className="absolute inset-0 w-full h-full pointer-events-none z-10"
                preserveAspectRatio="none"
              >
                {/* Metro Ring 1 Path */}
                <path
                  d="M 780 230 L 880 280 L 930 320 L 960 240 L 880 110 L 790 130 Z"
                  fill="none"
                  stroke="var(--primary)"
                  strokeWidth={activeRing === 1 ? "4" : "1.5"}
                  strokeOpacity={activeRing === 1 ? "0.9" : "0.2"}
                  className={`transition-all duration-300 ${activeRing === 1 ? "ring-path-animate" : ""}`}
                  style={{
                    strokeDasharray: activeRing === 1 ? "10, 5" : "none",
                    filter: activeRing === 1 ? "drop-shadow(0 0 6px var(--primary))" : "none"
                  }}
                />

                {/* Metro Ring 2 Path */}
                <path
                  d="M 700 350 L 500 210 L 360 75 L 520 290 L 480 430 L 620 410 L 680 380 Z"
                  fill="none"
                  stroke="var(--secondary)"
                  strokeWidth={activeRing === 2 ? "4" : "1.5"}
                  strokeOpacity={activeRing === 2 ? "0.9" : "0.2"}
                  className={`transition-all duration-300 ${activeRing === 2 ? "ring-path-animate" : ""}`}
                  style={{
                    strokeDasharray: activeRing === 2 ? "10, 5" : "none",
                    filter: activeRing === 2 ? "drop-shadow(0 0 6px var(--secondary))" : "none"
                  }}
                />
              </svg>

              {/* Absolute Pins on top of the Map */}
              {mapNodes.map((node) => {
                const isTransit = node.type === "transit-node";
                const isRingMatch = activeRing === node.ring;
                
                // Show all active zones, but transit nodes only show if their ring is active
                const isVisible = !isTransit || isRingMatch;
                if (!isVisible) return null;

                return (
                  <div
                    key={node.name}
                    style={{ left: node.x, top: node.y }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-15 group transition-all duration-300"
                  >
                    {node.type === "active-zone" ? (
                      <>
                        <span className="material-symbols-outlined text-[var(--primary)] text-[26px] active-glow group-hover:scale-115 transition-transform cursor-pointer drop-shadow-md">
                          location_on
                        </span>
                        <span className="bg-slate-950/90 border border-[var(--border-cyan)] px-2 py-0.5 rounded text-[9px] font-bold text-white whitespace-nowrap mt-1 opacity-90 group-hover:opacity-100 transition-opacity">
                          {node.name}
                        </span>
                      </>
                    ) : (
                      <>
                        <span className={`w-3.5 h-3.5 rounded-full border-2 ${
                          activeRing === 1 ? "border-[var(--primary)] bg-[var(--background)]" : "border-[var(--secondary)] bg-[var(--background)]"
                        } group-hover:scale-125 transition-transform cursor-pointer shadow-md`} />
                        <span className="bg-slate-950/90 border border-[var(--border-cyan)] px-1.5 py-0.5 rounded text-[8px] font-medium text-white whitespace-nowrap mt-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                          {node.name}
                        </span>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Controls in the Bottom-Right */}
          <div className="absolute bottom-6 right-6 flex flex-col gap-2 z-20">
            <button
              onClick={zoomIn}
              title="Zoom In"
              className="w-8 h-8 bg-[var(--surface)] hover:bg-[var(--surface-variant)] technical-border rounded text-[var(--text-primary)] flex items-center justify-center text-lg font-bold cursor-pointer transition-all hover:scale-105 active:scale-95"
            >
              +
            </button>
            <button
              onClick={zoomOut}
              title="Zoom Out"
              className="w-8 h-8 bg-[var(--surface)] hover:bg-[var(--surface-variant)] technical-border rounded text-[var(--text-primary)] flex items-center justify-center text-lg font-bold cursor-pointer transition-all hover:scale-105 active:scale-95"
            >
              −
            </button>
            <button
              onClick={resetMap}
              title="Reset View"
              className="w-8 h-8 bg-[var(--surface)] hover:bg-[var(--surface-variant)] technical-border rounded text-[var(--text-primary)] flex items-center justify-center cursor-pointer transition-all hover:scale-105 active:scale-95"
            >
              <span className="material-symbols-outlined text-[16px]">restart_alt</span>
            </button>
          </div>
        </div>
      </section>

      {/* Fiber Ring Visualization Section */}
      <FiberRingVisualization activeRing={activeRing} setActiveRing={setActiveRing} />

      {/* Active Neighborhoods */}
      <section className="max-w-[1280px] mx-auto px-5 md:px-16 py-16">
        <h2 className="font-heading text-2xl font-bold text-[var(--text-primary)] mb-6">
          Active Coverage Zones
        </h2>
        {loading ? (
          <div className="flex flex-wrap gap-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="animate-pulse h-10 w-32 bg-[var(--surface-variant)] rounded-lg"
              />
            ))}
          </div>
        ) : error ? (
          <ErrorState onRetry={loadData} />
        ) : (
          <div className="flex flex-wrap gap-3">
            {neighborhoods.map((n) => (
              <div
                key={n.name}
                className="flex items-center gap-2 px-4 py-2 technical-border rounded-lg bg-[var(--surface)]"
              >
                <span className="text-sm font-medium text-[var(--text-primary)]">
                  {n.name}
                </span>
                <span
                  className={`w-2 h-2 rounded-full ${
                    n.status === "active"
                      ? "bg-[var(--primary)]"
                      : "bg-[var(--secondary)]"
                  }`}
                />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Expansion Roadmap */}
      <section className="max-w-[1280px] mx-auto px-5 md:px-16 py-16">
        <SectionHeader
          title="Expansion Roadmap"
          subtitle="We are aggressively scaling our fiber infrastructure across the city."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {phases.map((phase) => (
            <div
              key={phase.area}
              className="p-6 technical-border rounded-xl bg-[var(--surface)]"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 bg-[var(--secondary)]/10 text-[var(--secondary)] text-xs font-semibold rounded-full">
                  {phase.phase}
                </span>
                <span className="material-symbols-outlined text-[var(--text-muted)] text-[24px]">
                  {phase.icon}
                </span>
              </div>
              <h3 className="font-heading text-xl font-bold text-[var(--text-primary)] mb-2">
                {phase.area}
              </h3>
              <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                {phase.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-[1280px] mx-auto px-5 md:px-16 py-16 text-center">
        <h2 className="font-heading text-3xl font-bold text-[var(--text-primary)] mb-4">
          Ready to upgrade your experience?
        </h2>
        <p className="text-base text-[var(--text-muted)] max-w-xl mx-auto mb-8 leading-relaxed">
          Even if your area isn&apos;t listed, your request helps us prioritize
          where we build next.
        </p>
        <Link
          href="/new-connection"
          className="inline-block px-8 py-4 bg-[var(--secondary)] text-[var(--on-secondary)] rounded-xl text-sm font-bold hover:brightness-110 transition-all uppercase tracking-wide"
        >
          Request new connection
        </Link>
      </section>
    </>
  );
}
