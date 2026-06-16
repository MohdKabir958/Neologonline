import { SupportCategory, SupportArticle } from "@/lib/types";

export const supportCategories: SupportCategory[] = [
  {
    id: "billing",
    name: "Billing",
    description: "Manage your invoices, update payment methods, and view payment history.",
    icon: "receipt_long",
  },
  {
    id: "account",
    name: "Account",
    description: "Update profile details, change plans, and manage account security settings.",
    icon: "group",
  },
  {
    id: "hardware",
    name: "Hardware",
    description: "Troubleshoot routers, setup mesh systems, and understand hardware lights.",
    icon: "devices",
  },
  {
    id: "performance",
    name: "Performance",
    description: "Optimize your Wi-Fi signals, reduce latency for gaming, and fix drops.",
    icon: "speed",
  },
  {
    id: "installation",
    name: "Installation",
    description: "New connection guides, fiber cabling information, and relocation requests.",
    icon: "construction",
  },
  {
    id: "cyber-safety",
    name: "Cyber Safety",
    description: "Safe browsing tips, parental controls, and cyber-crime awareness portals.",
    icon: "shield",
  },
];

export const popularGuides: SupportArticle[] = [
  {
    id: "restart-router",
    title: "How to Restart and Optimize Your Dual-Band Router",
    excerpt:
      "Learn the proper sequence for a hard reset and how to leverage 5GHz vs 2.4GHz bands for maximum speed.",
    category: "Essentials",
    isEssential: true,
  },
  {
    id: "slow-speeds",
    title: "Resolving Slow Internet Speeds",
    excerpt:
      "A step-by-step diagnostic guide for Hyderabad urban zones.",
    category: "Performance",
  },
  {
    id: "bill-payment",
    title: "Online Bill Payment Methods",
    excerpt: "Learn how to pay using UPI, Credit Card, or NeoLog Wallet.",
    category: "Billing",
  },
  {
    id: "upgrade-plan",
    title: "Upgrade Your Current Plan",
    excerpt: "Switch to Fiber Max for ultra-low gaming latency.",
    category: "Account",
  },
  {
    id: "cyber-crime",
    title: "Contacting Cyber Crime Support",
    excerpt: "Reporting phishing or malicious activity on your line.",
    category: "Cyber Safety",
  },
];

export const quickSearchTags = [
  { label: "Speed test", icon: "speed" },
  { label: "Billing", icon: "receipt_long" },
  { label: "Router Reset", icon: "restart_alt" },
  { label: "Outage map", icon: "map" },
];
