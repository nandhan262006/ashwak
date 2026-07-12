import Hero from "@/components/website/Hero";
import About from "@/components/website/About";
import Services from "@/components/website/Services";
import Gallery from "@/components/website/Gallery";
import GoogleReviews from "@/components/website/GoogleReviews";
import Contact from "@/components/website/Contact";
import { prisma } from "@/lib/prisma";

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
