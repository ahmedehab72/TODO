import type { Metadata } from "next";
import "../globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { Inter } from 'next/font/google';
import Navbar from "@/components/Navbar";
import { ClerkProvider } from "@clerk/nextjs";
import { routing } from "@/i18n/routing";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { FooterFixed } from "@/components/Footer";
import { arSA, enUS } from '@clerk/localizations'


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Todo App",
  description: "Create a full stack todo application with Next.js, TypeScript, Prisma, and MongoDB",
  keywords: ["Next.js", "TypeScript", "Prisma", "MongoDB", "Server Actions", "Server Components"],
};

export default async function RootLayout({
  children, params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;

}>) {

  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <ClerkProvider localization={locale === "ar" ? arSA : enUS}>
      <html lang={locale} suppressHydrationWarning>
        <body className={`${inter.className}`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {/* Main container with flexbox layout */}
            <div className="min-h-screen flex flex-col">

              {/* Navbar */}
              <NextIntlClientProvider>
                {/* Main content area - grows to fill space */}
                <main className="flex-1">
                  <Navbar />
                  {children}
                </main>
              </NextIntlClientProvider>

              {/* Footer - stays at bottom */}
              <footer className="mt-10 pt-10 pb-14 px-10 dark:bg-[#1F1F1F] bg-[oklch(0.95_0_0)]">
                <FooterFixed />
              </footer>

            </div>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
