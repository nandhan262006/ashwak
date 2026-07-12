import Gallery from "@/components/website/Gallery";
import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Browse our stunning wedding photography gallery. Candid moments, grand celebrations, pre-wedding shoots, and cinematic highlights from Nellore.",
  openGraph: {
    title: "Gallery - Wedding by Kranthi",
    description: "Browse our stunning wedding photography gallery. Candid moments, grand celebrations, and cinematic highlights from Nellore.",
    images: ["/images/og-image.webp"],
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
