import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Geist, Geist_Mono } from "next/font/google";
import { AppProviders } from "@/components/providers/AppProviders";
import {
  isRtl,
  LOCALE_STORAGE_KEY,
  type Locale,
} from "@/lib/i18n/translations";
import { parseLocale } from "@/lib/i18n/localeCookie";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AegisSOC · Dashboard",
  description: "AI-powered cybersecurity operations dashboard",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isStaticHost = process.env.NEXT_PUBLIC_STATIC_HOST === "true";
  let locale: Locale = "en";
  if (!isStaticHost) {
    const cookieStore = await cookies();
    locale = parseLocale(cookieStore.get(LOCALE_STORAGE_KEY)?.value);
  }

  return (
    <html
      lang={locale}
      dir={isRtl(locale) ? "rtl" : "ltr"}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body
        className="min-h-screen overflow-x-clip"
        suppressHydrationWarning
      >
        <AppProviders initialLocale={locale}>{children}</AppProviders>
      </body>
    </html>
  );
}
