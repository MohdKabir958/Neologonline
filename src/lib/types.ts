// ─── Plan Types ─────────────────────────────────────────
export interface Plan {
  id: string;
  name: string;
  description: string;
  price: number;
  billingCycle: "monthly" | "quarterly" | "annual";
  speed: number;
  speedUnit: string;
  features: string[];
  isPopular?: boolean;
  ctaLabel: string;
  tier: "starter" | "home-pro" | "ultra" | "business";
}

export interface PlanAddon {
  id: string;
  name: string;
  description: string;
  price: number;
}

// ─── Blog Types ─────────────────────────────────────────
export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: BlogCategory;
  date: string;
  image: string;
  readTime: string;
  author: string;
}

export type BlogCategory =
  | "All Insights"
  | "Network Tech"
  | "Tech Tips"
  | "Community"
  | "Announcements"
  | "Company News";

// ─── Support Types ──────────────────────────────────────
export interface SupportCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface SupportArticle {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  isEssential?: boolean;
}

export interface FAQ {
  question: string;
  answer: string;
}

// ─── Coverage Types ─────────────────────────────────────
export interface Neighborhood {
  name: string;
  status: "active" | "expanding";
}

export interface ExpansionPhase {
  phase: string;
  date: string;
  area: string;
  description: string;
  progress?: number;
  icon: string;
}

export interface CoverageResult {
  available: boolean;
  area: string;
  message: string;
  estimatedDate?: string;
}

// ─── Corporate Types ────────────────────────────────────
export interface CorporatePlan {
  id: string;
  name: string;
  speed: string;
  price: number;
  billingCycle: "monthly" | "annual";
  features: string[];
  isPopular?: boolean;
  ctaLabel: string;
  tier: "starter" | "growth" | "power" | "custom";
}

export interface LeaseLineFeature {
  feature: string;
  standardBroadband: string;
  neologLeasedLine: string;
}

// ─── Dashboard Types ────────────────────────────────────
export interface DashboardData {
  currentPlan: {
    name: string;
    speed: string;
    description: string;
  };
  dataUsage: {
    used: number;
    total: string;
    unit: string;
  };
  billStatus: {
    status: "Paid" | "Pending" | "Overdue";
    message: string;
  };
  nextRenewal: {
    date: string;
    description: string;
  };
  dailyUsage: DailyUsage[];
  planDetails: {
    name: string;
    series: string;
    speed: string;
    fupLimit: string;
    router: string;
    staticIp: string;
  };
  contactDetails: {
    fullName: string;
    phone: string;
    email: string;
    installationAddress: string;
  };
}

export interface DailyUsage {
  day: string;
  usage: number;
}

export interface Invoice {
  id: string;
  month: string;
  amount: number;
  status: "PAID" | "PENDING" | "OVERDUE";
}

// ─── Form Types ─────────────────────────────────────────
export interface ConnectionRequest {
  fullName: string;
  mobile: string;
  email: string;
  selectedPlan?: string;
  address?: string;
  pincode?: string;
  landmark?: string;
}

export interface ContactFormData {
  name: string;
  mobile: string;
  queryType: string;
  message: string;
}

export interface SupportTicket {
  subject: string;
  customerId: string;
  description: string;
}

export interface EnterpriseQuote {
  companyName: string;
  employeeCount: string;
  contactNumber: string;
  message: string;
}
