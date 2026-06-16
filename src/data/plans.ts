import { Plan, PlanAddon } from "@/lib/types";

export const plans6M: Plan[] = [
  {
    id: "plan-40",
    name: "40 Mbps",
    description: "Perfect for basic browsing and streaming.",
    price: 2799,
    billingCycle: "6M",
    speed: 40,
    speedUnit: "Mbps",
    features: ["Unlimited Data", "Free Wi-Fi Router", "Standard Support"],
    ctaLabel: "Select Plan",
    tier: "40mbps",
  },
  {
    id: "plan-60",
    name: "60 Mbps",
    description: "Optimized for high-definition streaming & gaming.",
    price: 3186,
    billingCycle: "6M",
    speed: 60,
    speedUnit: "Mbps",
    features: ["Unlimited Data", "Dual Band Router", "Priority Service"],
    isPopular: true,
    ctaLabel: "Select Plan",
    tier: "60mbps",
  },
  {
    id: "plan-100",
    name: "100 Mbps",
    description: "Designed for heavy multi-device usage & UHD.",
    price: 4248,
    billingCycle: "6M",
    speed: 100,
    speedUnit: "Mbps",
    features: ["Unlimited Data", "Premium Router Option", "24/7 Dedicated Support"],
    ctaLabel: "Select Plan",
    tier: "100mbps",
  }
];

export const plans12M: Plan[] = [
  { ...plans6M[0], billingCycle: "12M", price: 4999 },
  { ...plans6M[1], billingCycle: "12M", price: 5664 },
  { ...plans6M[2], billingCycle: "12M", price: 8496 },
];

export const plans18M: Plan[] = [
  { ...plans6M[0], billingCycle: "18M", price: -1 }, // 40 Mbps has no 18M plan
  { ...plans6M[1], billingCycle: "18M", price: 7434 },
  { ...plans6M[2], billingCycle: "18M", price: 11682 },
];

export const planAddons: PlanAddon[] = [
  {
    id: "static-ip",
    name: "Static IP",
    description: "Fixed IP for hosting & access.",
    price: 200,
  },
  {
    id: "business-email",
    name: "Business Email",
    description: "5 Secure corporate mailboxes.",
    price: 99,
  },
  {
    id: "cyber-safety",
    name: "Cyber Safety",
    description: "End-point protection suite.",
    price: 149,
  },
];

export const planComparisonFeatures = [
  {
    feature: "Download Speed",
    plan40: "40 Mbps",
    plan60: "60 Mbps",
    plan100: "100 Mbps",
  },
  {
    feature: "Monthly Data",
    plan40: "Unlimited",
    plan60: "Unlimited",
    plan100: "Unlimited",
  },
  {
    feature: "Router Type",
    plan40: "Standard",
    plan60: "Dual Band",
    plan100: "Premium Dual Band",
  },
  {
    feature: "Technical Support",
    plan40: "Standard",
    plan60: "Priority",
    plan100: "Premium",
  },
  {
    feature: "Static IP",
    plan40: "—",
    plan60: "Add-on Available",
    plan100: "Add-on Available",
  },
];
