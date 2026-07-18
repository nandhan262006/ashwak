import Gallery from "@/components/website/Gallery";
import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Browse Ashwak Photography's stunning wedding photography gallery featuring candid moments, traditional ceremonies, grand celebrations, pre-wedding shoots, engagement sessions, and cinematic highlights from weddings across Chirala and Andhra Pradesh.",
  openGraph: {
    title: "Gallery - Ashwak Photography",
    description: "Browse our stunning wedding photography gallery. Candid moments, grand celebrations, and cinematic highlights from Chirala.",
    images: ["/images/og-image.png"],
  },
  alternates: {
    canonical: "/gallery",
  },
};

async function getGallery() {
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

export default async function GalleryPage() {
  const images = await getGallery();
  return (
    <div className="pt-20">
      <Gallery initialImages={images ?? undefined} />
    </div>
  );
}
