import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const clerkKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || "";
const secretKey = process.env.CLERK_SECRET_KEY || "";

const isClerkConfigured =
  clerkKey.length > 0 &&
  !clerkKey.includes("PLACEHOLDER") &&
  secretKey.length > 0 &&
  !secretKey.includes("PLACEHOLDER");

const isProtectedRoute = createRouteMatcher(["/dashboard(.*)"]);

const mainMiddleware = clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});

// Safe pass-through middleware when Clerk keys are not configured yet
export default isClerkConfigured
  ? mainMiddleware
  : () => NextResponse.next();

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
