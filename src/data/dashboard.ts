import { DashboardData, Invoice } from "@/lib/types";

export const dashboardData: DashboardData = {
  currentPlan: {
    name: "Home Pro",
    speed: "100",
    description: "100Mbps Symmetrical",
  },
  dataUsage: {
    used: 312,
    total: "Unlimited",
    unit: "GB",
  },
  billStatus: {
    status: "Paid",
    message: "No outstanding dues",
  },
  nextRenewal: {
    date: "28 Jul",
    description: "Auto-debit scheduled",
  },
  dailyUsage: [
    { day: "Mon", usage: 28 },
    { day: "Tue", usage: 35 },
    { day: "Wed", usage: 42 },
    { day: "Thu", usage: 55 },
    { day: "Fri", usage: 48 },
    { day: "Sat", usage: 62 },
    { day: "Sun", usage: 38 },
  ],
  planDetails: {
    name: "Home Pro",
    series: "Home Pro Fiber Series",
    speed: "100 Mbps (Up/Down)",
    fupLimit: "Unlimited Data",
    router: "Dual-Band Wi-Fi 6",
    staticIp: "Not Included",
  },
  contactDetails: {
    fullName: "Arjun Reddy",
    phone: "+91 98765 43210",
    email: "arjun.reddy@neolog.in",
    installationAddress: "H.No 4-21, Jubilee Hills, Hyderabad, Telangana - 500033",
  },
};

export const invoicesData: Invoice[] = [
  { id: "INV-2406", month: "June 2024", amount: 999.0, status: "PAID" },
  { id: "INV-2405", month: "May 2024", amount: 999.0, status: "PAID" },
  { id: "INV-2404", month: "April 2024", amount: 1249.0, status: "PAID" },
];
