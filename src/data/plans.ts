import { Plan, PlanAddon } from "@/lib/types";

export const plansData: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    description: "Perfect for basic browsing and streaming.",
    price: 499,
    billingCycle: "monthly",
    speed: 50,
    speedUnit: "Mbps",
    features: ["Unlimited Data", "Free Wi-Fi Router", "Premium Support"],
    ctaLabel: "Select Plan",
    tier: "starter",
  },
  {
    id: "home-pro",
    name: "Home Pro",
    description: "Optimized for high-definition streaming.",
    price: 799,
    billingCycle: "monthly",
    speed: 100,
    speedUnit: "Mbps",
    features: ["Unlimited Data", "Dual Band Router", "Priority Service"],
    isPopular: true,
    ctaLabel: "Select Plan",
    tier: "home-pro",
  },
  {
    id: "ultra",
    name: "Ultra",
    description: "Designed for heavy gamers & UHD.",
    price: 1299,
    billingCycle: "monthly",
    speed: 200,
    speedUnit: "Mbps",
    features: ["Unlimited Data", "Premium Mesh Option", "24/7 Dedicated Support"],
    ctaLabel: "Select Plan",
    tier: "ultra",
  },
  {
    id: "business",
    name: "Business",
    description: "For offices & enterprises.",
    price: 2499,
    billingCycle: "monthly",
    speed: 500,
    speedUnit: "Mbps",
    features: ["Unlimited Data", "Static IP Included", "Enterprise SLA 99.9%"],
    ctaLabel: "Select Plan",
    tier: "business",
  },
];

export const quarterlyPlans: Plan[] = plansData.map((p) => ({
  ...p,
  billingCycle: "quarterly" as const,
  price: Math.round(p.price * 0.94),
}));

export const annualPlans: Plan[] = plansData.map((p) => ({
  ...p,
  billingCycle: "annual" as const,
  price: Math.round(p.price * 0.7),
}));

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
    starter: "50 Mbps",
    homePro: "100 Mbps",
    ultra: "200 Mbps",
    business: "500 Mbps",
  },
  {
    feature: "Monthly Data",
    starter: "Unlimited",
    homePro: "Unlimited",
    ultra: "Unlimited",
    business: "Unlimited",
  },
  {
    feature: "Router Type",
    starter: "Standard",
    homePro: "Dual Band",
    ultra: "Premium Dual Band",
    business: "Gigabit Router",
  },
  {
    feature: "Technical Support",
    starter: "Standard",
    homePro: "Priority",
    ultra: "Premium",
    business: "24/7 Enterprise",
  },
  {
    feature: "Static IP",
    starter: "—",
    homePro: "Add-on Available",
    ultra: "Add-on Available",
    business: "1 Free Included",
  },
];
