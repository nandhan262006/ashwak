import Services from "@/components/website/Services";
import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services",
  description: "Explore our wedding photography and videography services — candid, traditional, cinematic, pre-wedding, drone coverage, and album design in Nellore.",
  openGraph: {
    title: "Our Services - Wedding by Kranthi",
    description: "Wedding photography and videography services in Nellore. Candid, traditional, cinematic, pre-wedding, drone coverage, and album design.",
    images: ["/images/og-image.webp"],
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
