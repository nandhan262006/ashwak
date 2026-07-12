import type { Metadata } from "next";
import { Inter } from "next/font/google";
import JsonLd from "@/components/website/JsonLd";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });

const siteUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://weddingbykranthi.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Wedding by Kranthi | Professional Wedding Photography in Nellore",
    template: "%s | Wedding by Kranthi",
  },
  description: "Nellore's premier wedding photography and videography studio. Capturing timeless moments with artistry, elegance, and passion. Candid, traditional, cinematic wedding photography.",
  keywords: [
    "wedding photography Nellore",
    "wedding videography Nellore",
    "candid wedding photography",
    "cinematic wedding video",
    "pre-wedding shoot Nellore",
    "drone wedding coverage",
    "Wedding by Kranthi",
    "Kranthi Photography",
    "best wedding photographer Nellore",
    "Indian wedding photography",
    "wedding album design Nellore",
    "Andhra Pradesh wedding photographer",
  ],
  authors: [{ name: "Wedding by Kranthi" }],
  creator: "Wedding by Kranthi",
  publisher: "Wedding by Kranthi",
  formatDetection: { telephone: true, email: true },
  openGraph: {
    title: "Wedding by Kranthi | Wedding Photography in Nellore",
    description: "Nellore's premier wedding photography and videography studio. Capturing timeless moments with artistry, elegance, and passion.",
    url: siteUrl,
    siteName: "Wedding by Kranthi",
    images: [
      {
        url: "/images/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Wedding by Kranthi - Professional Wedding Photography in Nellore",
        type: "image/webp",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wedding by Kranthi | Wedding Photography in Nellore",
    description: "Nellore's premier wedding photography and videography studio. Capturing timeless moments with artistry, elegance, and passion.",
    images: ["/images/og-image.webp"],
    creator: "@krantiphotography",
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
        <link rel="apple-touch-icon" href="/images/unnamed.webp" />
        <meta name="theme-color" content="#0A0A0A" />
      </head>
      <body>
        <JsonLd />
        {children}
      </body>
    </html>
  );
}
