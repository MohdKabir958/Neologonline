import { CorporatePlan, LeaseLineFeature } from "@/lib/types";

export const corporatePlans: CorporatePlan[] = [
  {
    id: "corp-starter",
    name: "Starter",
    speed: "10 Mbps",
    price: 4999,
    billingCycle: "monthly",
    features: ["1:1 Dedicated", "3 Static IPs", "99.5% Uptime"],
    ctaLabel: "Select Plan",
    tier: "starter",
  },
  {
    id: "corp-growth",
    name: "Growth",
    speed: "50 Mbps",
    price: 14999,
    billingCycle: "monthly",
    features: ["Managed Router", "4 Static IPs", "4hr Fault Resolution"],
    ctaLabel: "Select Plan",
    tier: "growth",
  },
  {
    id: "corp-power",
    name: "Power",
    speed: "100 Mbps",
    price: 24999,
    billingCycle: "monthly",
    features: ["Priority Routing", "8 Static IPs", "Proactive Monitoring"],
    isPopular: true,
    ctaLabel: "Select Plan",
    tier: "power",
  },
  {
    id: "corp-custom",
    name: "Custom",
    speed: "1 Gbps +",
    price: 0,
    billingCycle: "monthly",
    features: ["Dual-Path Fiber", "Custom Hardware Specs", "24/7 Dedicated Team"],
    ctaLabel: "Contact Sales",
    tier: "custom",
  },
];

export const leaseLineFeatures: LeaseLineFeature[] = [
  {
    feature: "Contention Ratio",
    standardBroadband: "Shared (up to 1:50)",
    neologLeasedLine: "Dedicated 1(Strict 1:1)",
  },
  {
    feature: "Bandwidth Delivery",
    standardBroadband: '"Up to" Asymmetric speeds',
    neologLeasedLine: "Guaranteed Symmetric Pipe",
  },
  {
    feature: "IP Allocation",
    standardBroadband: "Dynamic / Single Static",
    neologLeasedLine: "Pool of Static IPs Included",
  },
  {
    feature: "Hardware",
    standardBroadband: "Standard Router",
    neologLeasedLine: "Enterprise Managed Cisco/Juniper",
  },
  {
    feature: "Support Ticket Priority",
    standardBroadband: "Best Effort (24-48 hours)",
    neologLeasedLine: "Premium (Immediate Response)",
  },
];

export const enterpriseFeatures = [
  {
    icon: "swap_horiz",
    title: "1:1 Symmetric Bandwidth",
    description:
      "Experience identical upload and download speeds, essential for seamless cloud operations, large-scale backups, and high-definition video conferencing.",
  },
  {
    icon: "verified",
    title: "Strict Service Level Agreement",
    description:
      "A legally binding SLA ensures 99.9% availability with a proactive 4-hour fault resolution window, keeping your business operational around the clock.",
    isHighlighted: true,
  },
  {
    icon: "headset_mic",
    title: "24/7 Priority NOC Support",
    description:
      "Skip the queue with a dedicated bypass to our Network Operations Center. Technical experts are available instantly for any enterprise-grade concern.",
  },
];

export const infrastructureFeatures = [
  {
    icon: "monitoring",
    title: "Proactive 24/7 Monitoring",
    description:
      "We see problems before you do. Our automated systems alert our NOC the millisecond a deviation in performance is detected.",
  },
  {
    icon: "security",
    title: "Dual-Path Fiber Redundancy",
    description:
      "Our infrastructure uses physically diverse paths, ensuring that a single cable cut doesn't take your business offline. True carrier-grade resilience.",
  },
  {
    icon: "person",
    title: "Relationship Manager",
    description: "A single point of contact for all your business needs.",
  },
  {
    icon: "receipt",
    title: "1:1 Dedicated Rate",
    description: "No sharing. No slowdowns. Your pipe is yours alone.",
  },
];
