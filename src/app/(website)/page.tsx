import Hero from "@/components/website/Hero";
import About from "@/components/website/About";
import Services from "@/components/website/Services";
import Gallery from "@/components/website/Gallery";
import FeaturedStories from "@/components/website/FeaturedStories";
import GoogleReviews from "@/components/website/GoogleReviews";
import Contact from "@/components/website/Contact";
import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Wedding Photography in Chirala | Ashwak Photography",
  description:
    "Chirala's premier wedding photography and videography studio. Candid, traditional, and cinematic wedding photography. 500+ weddings captured across Andhra Pradesh.",
  keywords: [
    "wedding photography Chirala",
    "best wedding photographer Chirala",
    "candid wedding photography",
    "cinematic wedding video Chirala",
    "pre-wedding shoot Chirala",
    "drone wedding coverage Andhra Pradesh",
    "Ashwak Photography",
    "Indian wedding photography",
    "wedding album design Chirala",
    "Andhra Pradesh wedding photographer",
    "traditional wedding photography",
    "bridal photography Chirala",
  ],
  openGraph: {
    title: "Ashwak Photography | Best Wedding Photography in Chirala",
    description:
      "Chirala's premier wedding photography and videography studio. Capturing timeless moments with artistry and emotion.",
    type: "website",
    locale: "en_IN",
    siteName: "Ashwak Photography",
    images: [
      {
        url: "/images/about1.png",
        width: 1200,
        height: 630,
        alt: "Ashwak Photography - Professional Wedding Photography in Chirala",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ashwak Photography | Best Wedding Photography in Chirala",
    description:
      "Chirala's premier wedding photography and videography studio. Capturing timeless moments with artistry and emotion.",
    images: ["/images/about1.png"],
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
      <FeaturedStories />
      <GoogleReviews />
      <Contact />
    </>
  );
}
