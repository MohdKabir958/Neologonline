import {
  Plan,
  PlanAddon,
  BlogPost,
  FAQ,
  SupportCategory,
  SupportArticle,
  CoverageResult,
  Neighborhood,
  ExpansionPhase,
  DashboardData,
  Invoice,
  ConnectionRequest,
  ContactFormData,
  SupportTicket,
  EnterpriseQuote,
  CorporatePlan,
  LeaseLineFeature,
} from "./types";
import { API_BASE_URL } from "./constants";
import {
  plansData,
  planAddons,
  quarterlyPlans,
  annualPlans,
} from "@/data/plans";
import { blogPosts } from "@/data/blog-posts";
import { homeFaqs, plansFaqs, supportFaqs } from "@/data/faqs";
import { supportCategories, popularGuides } from "@/data/support-categories";
import { neighborhoods, expansionPhases } from "@/data/neighborhoods";
import { corporatePlans, leaseLineFeatures } from "@/data/corporate";
import { dashboardData, invoicesData } from "@/data/dashboard";

// Simulated network delay for realistic loading states
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// ─── Plans API ──────────────────────────────────────────

/** Fetch all broadband plans */
export async function fetchPlans(
  billing: "monthly" | "quarterly" | "annual" = "monthly"
): Promise<Plan[]> {
  // TODO: connect to backend API
  // const res = await fetch(`${API_BASE_URL}/plans?billing=${billing}`);
  await delay(400);
  if (billing === "quarterly") return quarterlyPlans;
  if (billing === "annual") return annualPlans;
  return plansData;
}

/** Fetch a single plan by ID */
export async function fetchPlanById(id: string): Promise<Plan | undefined> {
  // TODO: connect to backend API
  // const res = await fetch(`${API_BASE_URL}/plans/${id}`);
  await delay(200);
  return plansData.find((p) => p.id === id);
}

/** Fetch plan add-ons */
export async function fetchPlanAddons(): Promise<PlanAddon[]> {
  // TODO: connect to backend API
  await delay(300);
  return planAddons;
}

// ─── Blog API ───────────────────────────────────────────

/** Fetch all blog posts, optionally filtered by category */
export async function fetchBlogPosts(
  category?: string
): Promise<BlogPost[]> {
  // TODO: connect to backend API
  // const res = await fetch(`${API_BASE_URL}/blog?category=${category}`);
  await delay(500);
  if (category && category !== "All Insights") {
    return blogPosts.filter((p) => p.category === category);
  }
  return blogPosts;
}

/** Fetch a single blog post by slug */
export async function fetchBlogPost(
  slug: string
): Promise<BlogPost | undefined> {
  // TODO: connect to backend API
  // const res = await fetch(`${API_BASE_URL}/blog/${slug}`);
  await delay(300);
  return blogPosts.find((p) => p.slug === slug);
}

// ─── FAQ API ────────────────────────────────────────────

/** Fetch FAQs for a given page context */
export async function fetchFAQs(
  context: "home" | "plans" | "support" = "support"
): Promise<FAQ[]> {
  // TODO: connect to backend API
  await delay(200);
  if (context === "home") return homeFaqs;
  if (context === "plans") return plansFaqs;
  return supportFaqs;
}

// ─── Support API ────────────────────────────────────────

/** Fetch support categories */
export async function fetchSupportCategories(): Promise<SupportCategory[]> {
  // TODO: connect to backend API
  await delay(300);
  return supportCategories;
}

/** Fetch popular support guides */
export async function fetchPopularGuides(): Promise<SupportArticle[]> {
  // TODO: connect to backend API
  await delay(300);
  return popularGuides;
}

/** Submit a support ticket */
export async function submitSupportTicket(
  data: SupportTicket
): Promise<{ success: boolean; ticketId: string }> {
  // TODO: connect to backend API
  // const res = await fetch(`${API_BASE_URL}/support/tickets`, { method: 'POST', body: JSON.stringify(data) });
  await delay(800);
  console.log("Support ticket submitted:", data);
  return { success: true, ticketId: `TKT-${Math.floor(Math.random() * 90000 + 10000)}` };
}

/** Track a support ticket by ID */
export async function trackTicket(
  ticketId: string
): Promise<{ status: string; lastUpdate: string }> {
  // TODO: connect to backend API
  await delay(500);
  return {
    status: "In Progress",
    lastUpdate: "2024-06-15T10:30:00Z",
  };
}

// ─── Coverage API ───────────────────────────────────────

/** Check coverage availability by pincode or area name */
export async function checkCoverage(
  query: string
): Promise<CoverageResult> {
  // TODO: connect to backend API
  // const res = await fetch(`${API_BASE_URL}/coverage/check?q=${query}`);
  await delay(1000);
  const activePincodes = ["500081", "500003", "500034", "500008", "500016", "500033"];
  const isAvailable = activePincodes.includes(query) || query.toLowerCase().includes("hitech");
  return {
    available: isAvailable,
    area: query,
    message: isAvailable
      ? "NeoLog fiber is available in your area! Get connected today."
      : "We're expanding to your area soon. Register your interest to get notified.",
    estimatedDate: isAvailable ? undefined : "Q1 2025",
  };
}

/** Fetch active neighborhoods */
export async function fetchActiveNeighborhoods(): Promise<Neighborhood[]> {
  // TODO: connect to backend API
  await delay(300);
  return neighborhoods;
}

/** Fetch expansion roadmap phases */
export async function fetchExpansionPhases(): Promise<ExpansionPhase[]> {
  // TODO: connect to backend API
  await delay(300);
  return expansionPhases;
}

// ─── Dashboard API ──────────────────────────────────────

/** Fetch dashboard overview data for the authenticated user */
export async function fetchDashboardData(): Promise<DashboardData> {
  // TODO: connect to backend API — use Clerk user ID
  // const res = await fetch(`${API_BASE_URL}/dashboard`, { headers: { Authorization: `Bearer ${token}` } });
  await delay(600);
  return dashboardData;
}

/** Fetch user invoices */
export async function fetchInvoices(): Promise<Invoice[]> {
  // TODO: connect to backend API
  await delay(400);
  return invoicesData;
}

// ─── Connection Request API ─────────────────────────────

/** Submit a new connection request */
export async function submitConnectionRequest(
  data: ConnectionRequest
): Promise<{ success: boolean; referenceId: string }> {
  // TODO: connect to backend API
  // const res = await fetch(`${API_BASE_URL}/connections/request`, { method: 'POST', body: JSON.stringify(data) });
  await delay(1200);
  console.log("Connection request submitted:", data);
  return {
    success: true,
    referenceId: `NL-${Math.floor(Math.random() * 900000 + 100000)}`,
  };
}

// ─── Contact API ────────────────────────────────────────

/** Submit a contact form message */
export async function submitContactForm(
  data: ContactFormData
): Promise<{ success: boolean }> {
  // TODO: connect to backend API
  // const res = await fetch(`${API_BASE_URL}/contact`, { method: 'POST', body: JSON.stringify(data) });
  await delay(800);
  console.log("Contact form submitted:", data);
  return { success: true };
}

// ─── Corporate API ──────────────────────────────────────

/** Fetch corporate/leased line plans */
export async function fetchCorporatePlans(
  billing: "monthly" | "annual" = "monthly"
): Promise<CorporatePlan[]> {
  // TODO: connect to backend API
  await delay(400);
  return corporatePlans.map((p) => ({
    ...p,
    billingCycle: billing,
    price: billing === "annual" ? Math.round(p.price * 0.7) : p.price,
  }));
}

/** Fetch leased line feature comparison */
export async function fetchLeaseLineFeatures(): Promise<LeaseLineFeature[]> {
  // TODO: connect to backend API
  await delay(300);
  return leaseLineFeatures;
}

/** Submit an enterprise quote request */
export async function submitEnterpriseQuote(
  data: EnterpriseQuote
): Promise<{ success: boolean }> {
  // TODO: connect to backend API
  // const res = await fetch(`${API_BASE_URL}/corporate/quote`, { method: 'POST', body: JSON.stringify(data) });
  await delay(1000);
  console.log("Enterprise quote requested:", data);
  return { success: true };
}

// ─── Newsletter API ─────────────────────────────────────

/** Subscribe to the newsletter */
export async function subscribeNewsletter(
  email: string
): Promise<{ success: boolean }> {
  // TODO: connect to backend API
  // const res = await fetch(`${API_BASE_URL}/newsletter`, { method: 'POST', body: JSON.stringify({ email }) });
  await delay(600);
  console.log("Newsletter subscription:", email);
  return { success: true };
}
