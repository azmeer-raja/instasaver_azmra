import { Metadata } from "next";

export const siteConfig = {
  name: "Insta Saver — Free Instagram Video & Reel Downloader",
  domain: "instasaver-azmra.vercel.app",
  shortName: "Insta Saver",
  creator: "azmeer raja m",
  description:
    "Insta Saver is a free Instagram video downloader. Download Instagram Reels, Videos, and Stories in HD quality — no login required. Fast and easy!",
  ogDescription:
    "Download Instagram Reels, Videos & Stories for free in HD. No login, no watermark, no limits. Try Insta Saver now!",
  url: "https://instasaver-azmra.vercel.app/",
  keywords: [
    "insta saver",
    "instagram video downloader",
    "instagram reel downloader",
    "download instagram videos",
    "instagram story downloader",
    "free instagram downloader",
    "save instagram reels",
    "insta downloader",
    "ig downloader",
    "reel saver",
  ],
};

export const siteMetadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | Insta Saver`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  creator: siteConfig.creator,
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: "/",
  },
  verification: {
    google: "uyI-pjUMDr4PzFM9ihPCQco8nRQRthXkE4ZFJrDNmGk",
  },
  other: {
    "google-adsense-account": "ca-pub-1213830257600237",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    title: siteConfig.name,
    description: siteConfig.ogDescription,
    url: siteConfig.url,
    siteName: siteConfig.shortName,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.ogDescription,
    creator: "@azmeeraja",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" }, // fallback for older browsers
    ],
  },
  manifest: "/webmanifest.json",
};
