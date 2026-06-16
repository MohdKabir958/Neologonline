import { CorporatePlan, LeaseLineFeature } from "@/lib/types";

export const corporatePlans: CorporatePlan[] = [
  {
    id: "corp-starter",
    name: "ILL Starter",
    speed: "40 Mbps",
    price: 9999,
    billingCycle: "monthly",
    features: ["Symmetrical Bandwidth", "Pool of Static IPs", "99.99% SLA Guarantee"],
    ctaLabel: "Get Started",
    tier: "starter",
  },
  {
    id: "corp-growth",
    name: "Business Growth",
    speed: "60 Mbps",
    price: 14999,
    billingCycle: "monthly",
    features: ["1:1 Dedicated link", "BGP Routing Support", "4hr MTTR SLA commitment"],
    ctaLabel: "Select Plan",
    tier: "growth",
  },
  {
    id: "corp-power",
    name: "Enterprise Power",
    speed: "100 Mbps",
    price: 19999,
    billingCycle: "monthly",
    features: ["Dual path protection", "Direct peering circuits", "24/7 dedicated support"],
    isPopular: true,
    ctaLabel: "Select Plan",
    tier: "power",
  },
  {
    id: "corp-custom",
    name: "Custom Infrastructure",
    speed: "1 Gbps +",
    price: 0,
    billingCycle: "monthly",
    features: ["Bespoke optical route", "Tailored SLA commitments", "Hybrid cloud links"],
    ctaLabel: "Request Feasibility",
    tier: "custom",
  },
];

export const leaseLineFeatures: LeaseLineFeature[] = [
  {
    feature: "NOC Support Desk",
    standardBroadband: "Centralized support team / Call centers",
    neologLeasedLine: "Local Hyderabad NOC (Direct engineer support)",
  },
  {
    feature: "Provisioning speed",
    standardBroadband: "Long provisioning cycles (15-30 days)",
    neologLeasedLine: "Faster deployment (within 72-96 hours)",
  },
  {
    feature: "Service Contracts",
    standardBroadband: "Rigid SLAs (Best effort uptime)",
    neologLeasedLine: "Custom enterprise SLAs (99.99% guaranteed)",
  },
  {
    feature: "Routing Policy",
    standardBroadband: "Standard static routing paths",
    neologLeasedLine: "Custom traffic engineering / BGP peer paths",
  },
  {
    feature: "Hardware Architecture",
    standardBroadband: "Limited flexibility / Locked CPE devices",
    neologLeasedLine: "Tailored network architecture & routing gear",
  },
];

export const enterpriseFeatures = [
  {
    icon: "settings_input_hdmi",
    title: "Dedicated ILL",
    description: "Symmetrical bandwidth, Static IP allocation, native BGP routing support, and custom legally-backed uptime SLAs.",
  },
  {
    icon: "hub",
    title: "Corporate Campus",
    description: "Multi-site L2/L3 private networks, SD-WAN compatibility, physical fiber redundancy, and strict VLAN traffic segmentation.",
  },
  {
    icon: "dns",
    title: "Data Center & DR",
    description: "Low-latency datacenter cross-connects, high-throughput pipelines, path protection, and seamless Disaster Recovery links.",
  },
  {
    icon: "school",
    title: "Institutional Infrastructure",
    description: "Secure campus segmentation, Google/FB CDN-optimized media streaming, firewall rules, and QoS bandwidth prioritization.",
  },
  {
    icon: "storefront",
    title: "Bulk & Wholesale Transit",
    description: "Tailored transit feeds for local operators, upcountry franchisee partners, bandwidth scaling, and revenue-share billing.",
  },
];

export const infrastructureFeatures = [
  {
    icon: "bolt",
    title: "Agility",
    description: "Rapid response times to deploy, scale, or modify your company's network routes as your operational needs evolve.",
  },
  {
    icon: "location_city",
    title: "Local Presence",
    description: "A fully equipped Hyderabad NOC staffed with real network engineers rather than distant centralized call centers.",
  },
  {
    icon: "center_focus_strong",
    title: "Enterprise Focus",
    description: "We focus exclusively on mission-critical business connectivity, keeping your enterprise online under all grid circumstances.",
  },
];
