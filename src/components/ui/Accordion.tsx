"use client";

import { useState } from "react";
import { FAQ } from "@/lib/types";

interface AccordionProps {
  items: FAQ[];
}

export default function Accordion({ items }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div
          key={index}
          className="technical-border rounded-xl overflow-hidden bg-[var(--surface)] transition-all"
        >
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full flex justify-between items-center px-6 py-5 text-left"
          >
            <span className="font-heading text-base font-bold text-[var(--text-primary)] pr-4">
              {item.question}
            </span>
            <span
              className={`material-symbols-outlined text-[var(--text-muted)] transition-transform duration-300 flex-shrink-0 ${
                openIndex === index ? "rotate-180" : ""
              }`}
            >
              expand_more
            </span>
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ${
              openIndex === index ? "max-h-96 pb-5" : "max-h-0"
            }`}
          >
            <p className="px-6 text-sm leading-relaxed text-[var(--text-muted)]">
              {item.answer}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
