import About from "@/components/website/About";
import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "With over a decade of experience capturing love stories across Nellore and beyond, Wedding by Kranthi brings artistry and emotion to every frame.",
  openGraph: {
    title: "About Wedding by Kranthi",
    description: "With over a decade of experience capturing love stories across Nellore and beyond. Wedding photography specialists in candid, traditional, and cinematic styles.",
    images: ["/images/og-image.webp"],
  },
};

async function getAbout() {
  try {
    return await prisma.aboutSection.findFirst({ orderBy: { updatedAt: "desc" } });
  } catch {
    return null;
  }
}

export default async function AboutPage() {
  const about = await getAbout();
  return <About data={about} />;
}
