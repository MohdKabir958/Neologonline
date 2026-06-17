"use client";

import { useEffect, useRef, useState, ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  /** Animation variant: 'up' slides up, 'scale' fades+scales, 'left'/'right' slides horizontally */
  variant?: "up" | "scale" | "left" | "right" | "fade";
  /** Delay in ms before animation starts after becoming visible */
  delay?: number;
  /** Duration in ms */
  duration?: number;
  /** How much of the element must be visible to trigger (0-1) */
  threshold?: number;
  /** Whether to animate only once or every time it enters viewport */
  once?: boolean;
}

export default function ScrollReveal({
  children,
  className = "",
  variant = "up",
  delay = 0,
  duration = 600,
  threshold = 0.15,
  once = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.unobserve(el);
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, once]);

  const baseStyles: React.CSSProperties = {
    transitionProperty: "opacity, transform",
    transitionDuration: `${duration}ms`,
    transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
    transitionDelay: `${delay}ms`,
    willChange: "opacity, transform",
  };

  const hiddenStyles: Record<string, React.CSSProperties> = {
    up: { opacity: 0, transform: "translateY(40px)" },
    scale: { opacity: 0, transform: "scale(0.95)" },
    left: { opacity: 0, transform: "translateX(-40px)" },
    right: { opacity: 0, transform: "translateX(40px)" },
    fade: { opacity: 0, transform: "none" },
  };

  const visibleStyles: React.CSSProperties = {
    opacity: 1,
    transform: "none",
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...baseStyles,
        ...(isVisible ? visibleStyles : hiddenStyles[variant]),
      }}
    >
      {children}
    </div>
  );
}
