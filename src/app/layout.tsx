import type { Metadata } from "next";
import { Inter } from "next/font/google";
import JsonLd from "@/components/website/JsonLd";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });

const siteUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://ashwak.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Ashwak Photography | Professional Wedding Photography in Chirala",
    template: "%s | Ashwak Photography",
  },
  description: "Chirala's premier wedding photography and videography studio. Capturing timeless moments with artistry, elegance, and passion. Candid, traditional, cinematic wedding photography.",
  keywords: [
    "wedding photography Chirala",
    "wedding videography Chirala",
    "candid wedding photography",
    "cinematic wedding video",
    "pre-wedding shoot Chirala",
    "drone wedding coverage",
    "Ashwak Photography",
    "Ashwak Photography",
    "best wedding photographer Chirala",
    "Indian wedding photography",
    "wedding album design Chirala",
    "Andhra Pradesh wedding photographer",
  ],
  authors: [{ name: "Ashwak Photography" }],
  creator: "Ashwak Photography",
  publisher: "Ashwak Photography",
  formatDetection: { telephone: true, email: true },
  openGraph: {
    title: "Ashwak Photography | Wedding Photography in Chirala",
    description: "Chirala's premier wedding photography and videography studio. Capturing timeless moments with artistry, elegance, and passion.",
    url: siteUrl,
    siteName: "Ashwak Photography",
    images: [
      {
        url: "/images/about1.png",
        width: 1200,
        height: 630,
        alt: "Ashwak Photography - Professional Wedding Photography in Chirala",
        type: "image/webp",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ashwak Photography | Wedding Photography in Chirala",
    description: "Chirala's premier wedding photography and videography studio. Capturing timeless moments with artistry, elegance, and passion.",
    images: ["/images/about1.png"],
    creator: "@ashwakphotography",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} antialiased dark`}>
      <head>
        <link rel="icon" href="/images/navibar.png" />
        <link rel="apple-touch-icon" href="/images/navibar.png" />
        <meta name="theme-color" content="#0A0A0A" />
      </head>
      <body>
        <JsonLd />
        {children}
      </body>
    </html>
  );
}
