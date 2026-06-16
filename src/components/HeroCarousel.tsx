"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { FloatingPaths } from "@/components/ui/background-paths";

interface SlideData {
  id: number;
  bgGradient: string;
  title: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  image: string;
}

const SLIDES: SlideData[] = [
  {
    id: 1,
    bgGradient: "from-[#071325] via-[#10243e] to-[#0d1e35]",
    title: "Experience Neolog Home Pro",
    description: "Get 1 month FREE with every annual fiber subscription. Plus, receive a complimentary Dual-Band Wi-Fi 6 Router for seamless gigabit coverage.",
    ctaText: "Explore plans",
    ctaLink: "/plans",
    image: "/images/blog/wifi-optimization.png",
  },
  {
    id: 2,
    bgGradient: "from-[#081a33] via-[#122e54] to-[#0c1f38]",
    title: "Let's Build Resilient Infrastructure",
    description: "Connect your enterprise with Neolog Leased Lines. Powered by a dual-ring 40G topology and strict SLA-backed 99.99% uptime guarantees.",
    ctaText: "Explore corporate",
    ctaLink: "/corporate",
    image: "/images/heroes/corporate.png",
  },
  {
    id: 3,
    bgGradient: "from-[#030e20] via-[#0d1d36] to-[#081529]",
    title: "Fast Fiber Coverage in Hyderabad",
    description: "We've expanded our engineered metro ring infrastructure across HITEC City, Gachibowli, Kukatpally, and Secunderabad. Check availability.",
    ctaText: "Check availability",
    ctaLink: "/coverage",
    image: "/images/heroes/about.png",
  },
];

export default function HeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-scroll effect
  useEffect(() => {
    if (paused) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % SLIDES.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [paused]);

  // Handle manual interaction (pauses auto-scroll and schedules resume after 6s)
  const handleInteraction = () => {
    setPaused(true);
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
    }
    inactivityTimerRef.current = setTimeout(() => {
      setPaused(false);
    }, 6000);
  };

  const handleNext = () => {
    handleInteraction();
    setActiveIndex((prev) => (prev + 1) % SLIDES.length);
  };

  const handlePrev = () => {
    handleInteraction();
    setActiveIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  // Touch handlers for mobile swipe gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;

    if (diff > 50) {
      handleNext();
    } else if (diff < -50) {
      handlePrev();
    }
    setTouchStart(null);
  };

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
      }
    };
  }, []);

  return (
    <section
      className="relative w-full h-[600px] md:h-[calc(100vh-80px)] overflow-hidden bg-[var(--surface-container-lowest)]"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slider track wrapper */}
      <div
        className="w-full h-full flex"
        style={{ 
          transform: `translate3d(-${activeIndex * 100}%, 0, 0)`,
          transition: "transform 700ms cubic-bezier(0.16, 1, 0.3, 1)",
          willChange: "transform"
        }}
      >
        {SLIDES.map((slide) => (
          <div
            key={slide.id}
            className={`w-full h-full flex-shrink-0 bg-gradient-to-br ${slide.bgGradient} relative flex items-center`}
            style={{ 
              transform: "translate3d(0, 0, 0)",
              willChange: "transform" 
            }}
          >
            {/* Background Paths Overlay */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20 z-0">
              <FloatingPaths position={1} className="text-[var(--primary)]" />
              <FloatingPaths position={-1} className="text-white" />
            </div>

            {/* Slide content container */}
            <div className="max-w-[1280px] w-full mx-auto px-5 md:px-16 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center py-12 relative z-10">
              
              {/* Text column (left-aligned) */}
              <div className="space-y-6 text-left order-2 md:order-1">
                <h2 className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                  {slide.title}
                </h2>
                <p className="text-sm md:text-lg text-slate-300 max-w-xl leading-relaxed">
                  {slide.description}
                </p>
                <div className="pt-2">
                  <Link
                    href={slide.ctaLink}
                    className="inline-block px-8 py-3.5 bg-[var(--primary)] text-[var(--on-primary)] rounded-full text-sm font-bold shadow-lg hover:brightness-110 transition-all hover:scale-105 duration-200"
                  >
                    {slide.ctaText}
                  </Link>
                </div>
              </div>

              {/* Card visual column (right on desktop, top on mobile) */}
              <div className="order-1 md:order-2 flex justify-center">
                <div
                  onMouseEnter={() => setPaused(true)}
                  onMouseLeave={() => setPaused(false)}
                  className="w-full max-w-[480px] aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-[var(--surface-container-low)]/50 relative hover:scale-105 transition-all duration-300"
                >
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* Slide dots and counter pill indicator (bottom right) */}
      <div className="absolute bottom-8 right-5 md:right-16 z-30 flex items-center gap-4">
        {/* Dots */}
        <div className="hidden sm:flex gap-1.5">
          {SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                handleInteraction();
                setActiveIndex(idx);
              }}
              className={`w-2 h-2 rounded-full transition-all ${
                activeIndex === idx ? "bg-[var(--primary)] w-5" : "bg-white/40"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Pill control navigation ( <- 2/3 -> ) */}
        <div className="flex items-center gap-3 bg-[var(--surface)]/90 backdrop-blur-md px-4 py-2 rounded-full border border-[var(--border-cyan)] text-[var(--text-primary)] shadow-lg select-none text-xs font-semibold">
          <button
            onClick={handlePrev}
            className="w-6 h-6 flex items-center justify-center hover:text-[var(--primary)] transition-colors"
            aria-label="Previous slide"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          </button>
          <span>
            {activeIndex + 1} / {SLIDES.length}
          </span>
          <button
            onClick={handleNext}
            className="w-6 h-6 flex items-center justify-center hover:text-[var(--primary)] transition-colors"
            aria-label="Next slide"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </div>
      </div>
    </section>
  );
}
