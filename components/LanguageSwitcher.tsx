// components/LanguageSwitcher.tsx
"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();

  // Available languages
  const locales = ["en", "ar"];

  // Get current locale from the URL
  const currentLocale = pathname.split("/")[1];

  // Change document direction based on locale
  useEffect(() => {
    if (currentLocale === "ar") {
      document.documentElement.dir = "rtl";
    } else {
      document.documentElement.dir = "ltr";
    }
  }, [currentLocale]);

  // Function to switch language
  const switchLanguage = (locale: string) => {
    if (locale === currentLocale) return;

    const segments = pathname.split("/");
    segments[1] = locale; // Replace locale in URL
    const newPath = segments.join("/");

    router.push(newPath);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="capitalize">
          {currentLocale}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {locales.map((locale) => (
          <DropdownMenuItem key={locale} onClick={() => switchLanguage(locale)}>
            {locale.toUpperCase()}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
