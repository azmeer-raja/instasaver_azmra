import type { Metadata } from "next";
import { DM_Sans as RootFont } from "next/font/google";

import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/features/theme/theme-provider";
import { LocaleProvider } from "@/features/i18n/locale-provider";
import { ReactQueryProvider } from "@/features/react-query/react-query-provider";
import { ParticleBackground } from "@/components/particle-background";

import { cn } from "@/lib/utils";
import { siteMetadata } from "@/lib/site";
import { getLocale, getMessages } from "next-intl/server";

import Script from "next/script";

import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const geistSans = RootFont({
  variable: "--font-root-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = siteMetadata;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} className="scroll-smooth" suppressHydrationWarning>
      <body className={cn("antialiased", geistSans.className)}>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1213830257600237"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <Script
          src="https://quge5.com/88/tag.min.js"
          data-zone="214518"
          async
          data-cfasync="false"
          strategy="afterInteractive"
        />
        <LocaleProvider locale={locale} messages={messages}>
          <ThemeProvider>
            <ReactQueryProvider>
              <ParticleBackground />
              <div className="relative z-10">
                {children}
                <Toaster closeButton />
                <SpeedInsights />
              </div>
            </ReactQueryProvider>
          </ThemeProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
