import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, Outfit } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/ThemeProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "NeoLog Online | Hyderabad's High-Speed Fiber Internet",
    template: "%s | NeoLog Online",
  },
  description:
    "Experience ultra-stable fiber connectivity powered by a dedicated backbone. NeoLog Online provides high-speed broadband plans starting at ₹499/month across Hyderabad.",
  keywords: [
    "NeoLog",
    "fiber internet",
    "broadband",
    "Hyderabad",
    "ISP",
    "high-speed internet",
    "FTTH",
  ],
  openGraph: {
    title: "NeoLog Online | Hyderabad's High-Speed Fiber Internet",
    description:
      "Experience ultra-stable fiber connectivity. Plans starting at ₹499/month.",
    url: "https://www.neologonline.in",
    siteName: "NeoLog Online",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NeoLog Online",
    description: "Hyderabad's High-Speed Fiber Internet",
  },
  metadataBase: new URL("https://www.neologonline.in"),
};

// Ensure a publishable key is always present during build/render to prevent Clerk hook crashes
const clerkKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || "pk_test_PLACEHOLDER";

function ConditionalClerkProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ClerkProvider publishableKey={clerkKey}>{children}</ClerkProvider>;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ConditionalClerkProvider>
      <html lang="en" className={`${inter.variable} ${plusJakartaSans.variable} ${outfit.variable}`}>
        <head>
          <link
            href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
            rel="stylesheet"
          />
        </head>
        <body className="min-h-screen flex flex-col">
          <ThemeProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </ThemeProvider>
        </body>
      </html>
    </ConditionalClerkProvider>
  );
}
