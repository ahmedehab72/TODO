import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Full Stack Todo App with Next.js",
  description: "Create a full stack todo application with Next.js, TypeScript, Prisma, and MongoDB",
  keywords: ["Next.js", "TypeScript", "Prisma", "MongoDB", "Server Actions", "Server Components"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning >
      <body className={inter.className}>

        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
