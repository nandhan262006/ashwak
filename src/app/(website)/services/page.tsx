import Services from "@/components/website/Services";
import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services",
  description: "Explore Ashwak Photography's full range of wedding photography and videography services in Chirala — including wedding photography, engagement shoots, family portraits, kids and maternity photography, model portfolios, cinematic videography, drone aerial coverage, and premium album design.",
  openGraph: {
    title: "Our Services - Ashwak Photography",
    description: "Wedding photography and videography services in Chirala. Candid, traditional, cinematic, pre-wedding, drone coverage, and album design.",
    images: ["/images/og-image.png"],
  },
  alternates: {
    canonical: "/services",
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

export default async function ServicesPage() {
  const services = await getServices();
  return (
    <div className="pt-20">
      <Services initialServices={services ?? undefined} />
    </div>
  );
}
