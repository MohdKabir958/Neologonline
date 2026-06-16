// API & Site Configuration
// All API base URLs come from environment variables — never hardcoded
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.neologonline.in";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.neologonline.in";

// Company information
export const COMPANY = {
  name: "NeoLog Online Services",
  legalName: "NeoLog Online Services Private Limited",
  tagline: "Providing high-performance fiber across Hyderabad since 2021.",
  phone: "040 45 25 69 60",
  techSupport: "040-27 00 00 00",
  email: "info@neologonline.in",
  enterpriseEmail: "enterprise@neolog.in",
  enterprisePhone: "+91 040-3000-3000",
  whatsapp: "+91 98765 43210",
  founded: 2021,
  subscribers: "5,000+",
  uptime: "99.9%",
  cin: "U72900TG2021PTC155410",
  gst: "36AAHCN1928B1Z6",
  ispLicense: "DOT-ISP/TG/NEOLOG/2021-V421",
  offices: {
    corporate: {
      label: "Corporate Office",
      address: "Plot No. 42, Hitech City Main Road, Cyberabad, Hyderabad - 500081",
    },
    registered: {
      label: "Registered Office",
      address: "Lane 4, Tarnaka, Secunderabad, Telangana - 500007",
    },
  },
} as const;

// Navigation links (main bar)
export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Plans", href: "/plans" },
  { label: "Corporate", href: "/corporate" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

// Extra navigation links (shown in "More" dropdown & mobile menu)
export const EXTRA_NAV_LINKS = [
  { label: "New Connection", href: "/new-connection", icon: "add_circle" },
  { label: "Support", href: "/support", icon: "support_agent" },
  { label: "Coverage", href: "/coverage", icon: "map" },
] as const;

// App Download
export const APP_DOWNLOAD_URL = "#"; // Replace with actual app store link

// Footer links
export const FOOTER_LINKS = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Refund", href: "/refund" },
  { label: "Cyber Crime Awareness", href: "/cyber-crime-awareness" },
] as const;

export const FOOTER_NAV_LINKS = [
  { label: "Support Center", href: "/support" },
  { label: "Coverage Area", href: "/coverage" },
  { label: "Corporate Plans", href: "/corporate" },
  { label: "Blog", href: "/blog" },
  { label: "New Connection", href: "/new-connection" },
] as const;

// Dashboard sidebar links
export const DASHBOARD_LINKS = [
  { label: "Dashboard", href: "/dashboard", icon: "dashboard" },
  { label: "Plan", href: "/dashboard/plan", icon: "wifi" },
  { label: "Usage", href: "/dashboard/usage", icon: "data_usage" },
  { label: "Bills", href: "/dashboard/bills", icon: "receipt_long" },
  { label: "Support", href: "/dashboard/support", icon: "support_agent" },
  { label: "Profile", href: "/dashboard/profile", icon: "person" },
  { label: "Referral", href: "/dashboard/referral", icon: "card_giftcard" },
] as const;
