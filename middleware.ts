import { clerkMiddleware } from '@clerk/nextjs/server';
import createIntlMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

// Create the internationalization middleware
const intlMiddleware = createIntlMiddleware(routing);

export default clerkMiddleware((auth, req) => {
  // Run internationalization middleware first
  return intlMiddleware(req);
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
    // Include internationalization paths (excluding api, trpc, _next, _vercel, and files with dots)
    '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
  ],
};