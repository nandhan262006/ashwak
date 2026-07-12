import Hero from "@/components/website/Hero";
import About from "@/components/website/About";
import Services from "@/components/website/Services";
import Gallery from "@/components/website/Gallery";
import GoogleReviews from "@/components/website/GoogleReviews";
import Contact from "@/components/website/Contact";
import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wedding Photography in Nellore | Wedding by Kranthi",
  description:
    "Nellore's premier wedding photography and videography studio. Candid, traditional, and cinematic wedding photography. 500+ weddings captured across Andhra Pradesh.",
  keywords: [
    "wedding photography Nellore",
    "best wedding photographer Nellore",
    "candid wedding photography",
    "cinematic wedding video Nellore",
    "pre-wedding shoot Nellore",
    "drone wedding coverage Andhra Pradesh",
    "Wedding by Kranthi",
    "Indian wedding photography",
    "wedding album design Nellore",
    "Andhra Pradesh wedding photographer",
    "traditional wedding photography",
    "bridal photography Nellore",
  ],
  openGraph: {
    title: "Wedding by Kranthi | Best Wedding Photography in Nellore",
    description:
      "Nellore's premier wedding photography and videography studio. Capturing timeless moments with artistry and emotion.",
    type: "website",
    locale: "en_IN",
    siteName: "Wedding by Kranthi",
    images: [
      {
        url: "/images/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Wedding by Kranthi - Professional Wedding Photography in Nellore",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wedding by Kranthi | Best Wedding Photography in Nellore",
    description:
      "Nellore's premier wedding photography and videography studio. Capturing timeless moments with artistry and emotion.",
    images: ["/images/og-image.webp"],
  },
  alternates: {
    canonical: "/",
  },
};

async function getServices() {
  try {
    const items = await prisma.service.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" },
    });
    return items.length > 0 ? items : null;
  } catch {
    return null;
  }
}

async function getGalleryImages() {
  try {
    const items = await prisma.galleryImage.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" },
    });
    return items.length > 0 ? items : null;
  } catch {
    return null;
  }
}

async function getAbout() {
  try {
    return await prisma.aboutSection.findFirst({ orderBy: { updatedAt: "desc" } });
  } catch {
    return null;
  }
}

export default async function HomePage() {
  const [services, gallery, about] = await Promise.all([
    getServices(),
    getGalleryImages(),
    getAbout(),
  ]);

  return (
    <>
      <Hero />
      <About data={about} />
      <Services initialServices={services ?? undefined} />
      <Gallery initialImages={gallery ?? undefined} />
      <GoogleReviews />
      <Contact />
    </>
  );
}
