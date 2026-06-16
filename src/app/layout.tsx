import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/ThemeProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
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

// Check if Clerk keys are configured (not placeholder)
const clerkKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || "";
const isClerkConfigured =
  clerkKey.length > 0 && !clerkKey.includes("PLACEHOLDER");

function ConditionalClerkProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  if (isClerkConfigured) {
    return <ClerkProvider>{children}</ClerkProvider>;
  }
  return <>{children}</>;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ConditionalClerkProvider>
      <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
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
