import type { Metadata } from "next";
import { DM_Sans as RootFont } from "next/font/google";
import { ParticleBackgroundLazy } from "@/components/particle-background-lazy";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/features/theme/theme-provider";
import { LocaleProvider } from "@/features/i18n/locale-provider";
import { ReactQueryProvider } from "@/features/react-query/react-query-provider";

import { cn } from "@/lib/utils";
import { siteMetadata } from "@/lib/site";
import { getLocale, getMessages } from "next-intl/server";

import Script from "next/script";

import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const geistSans = RootFont({
  variable: "--font-root-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
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
        {/* Google AdSense */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1213830257600237"
          crossOrigin="anonymous"
          strategy="lazyOnload"
        />
        {/* Monetag Ad Tag — zone 214518 */}
        <Script
          src="https://quge5.com/88/tag.min.js"
          data-zone="214518"
          data-cfasync="false"
          strategy="lazyOnload"
        />
        {/* Monetag Push Notifications — sw.js at root handles zone 10655560 */}
        <Script
          src="https://3nbf4.com/tag.min.js?r=sw"
          data-zone="10655560"
          strategy="lazyOnload"
        />

        <LocaleProvider locale={locale} messages={messages}>
          <ThemeProvider>
            <ReactQueryProvider>
              <ParticleBackgroundLazy />
              <div className="relative z-10">
                {children}
                <Toaster closeButton />
                <SpeedInsights />
                <Analytics />
              </div>
            </ReactQueryProvider>
          </ThemeProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
