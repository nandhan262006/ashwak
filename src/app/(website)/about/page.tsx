import About from "@/components/website/About";
import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About",
  description: "With over a decade of experience capturing love stories across Nellore and beyond, Wedding by Kranthi brings artistry and emotion to every frame.",
  openGraph: {
    title: "About Wedding by Kranthi",
    description: "With over a decade of experience capturing love stories across Nellore and beyond. Wedding photography specialists in candid, traditional, and cinematic styles.",
    images: ["/images/og-image.webp"],
  },
  alternates: {
    canonical: "/about",
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

  return (
    <main className="min-h-screen bg-dark pt-24">
      <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <Image
          src="/images/unnamed (8).webp"
          alt="Wedding by Kranthi studio"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 pb-12 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-gold text-sm uppercase tracking-[0.3em] mb-3">Our Story</p>
            <h1 className="text-5xl md:text-6xl font-bold">
              <span className="text-gradient">About Us</span>
            </h1>
          </div>
        </div>
      </div>

      <About data={about} />

      <section className="py-24 bg-dark-surface">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-gold text-sm uppercase tracking-[0.3em] mb-3">Why Choose Us</p>
            <h2 className="text-4xl md:text-5xl font-bold">
              <span className="text-gradient">Our Promise</span>
            </h2>
            <div className="w-16 h-px bg-gold mx-auto mt-6" />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Artistic Vision",
                desc: "Every frame is composed with care, blending candid moments with cinematic artistry to create images that feel alive.",
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M14.31 8l5.74 9.94M9.69 8h11.48M7.38 12l5.74-9.94M9.69 16L3.95 6.06M14.31 16H2.83M16.62 12l-5.74 9.94" />
                  </svg>
                ),
              },
              {
                title: "Emotional Depth",
                desc: "We don't just capture faces — we capture feelings. The stolen glances, the tears of joy, the quiet moments between the celebrations.",
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5">
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                  </svg>
                ),
              },
              {
                title: "Timeless Quality",
                desc: "Your wedding photos should look as stunning in 50 years as they do today. We deliver images built to last generations.",
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                ),
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-dark-card border border-gold/10 p-8 text-center"
              >
                <div className="w-14 h-14 border border-gold/20 flex items-center justify-center mx-auto mb-5">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold text-cream mb-3">{item.title}</h3>
                <p className="text-cream/60 leading-relaxed text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-dark">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-gold text-sm uppercase tracking-[0.3em] mb-3">Timeline</p>
            <h2 className="text-4xl md:text-5xl font-bold">
              <span className="text-gradient">Our Journey</span>
            </h2>
            <div className="w-16 h-px bg-gold mx-auto mt-6" />
          </div>

          <div className="max-w-2xl mx-auto space-y-8">
            {[
              { year: "2014", title: "Started from Nellore", desc: "Began photographing weddings with a passion for storytelling and a keen eye for detail." },
              { year: "2017", title: "Expanded to Videography", desc: "Added cinematic videography to capture not just moments, but entire love stories in motion." },
              { year: "2020", title: "Drone Coverage Added", desc: "Introduced aerial photography to bring grand perspectives to wedding celebrations." },
              { year: "2024", title: "500+ Weddings", desc: "Reached the milestone of capturing over 500 beautiful weddings across Andhra Pradesh." },
            ].map((item, i) => (
              <div key={item.year} className="flex gap-6 items-start">
                <div className="shrink-0 w-16 text-right">
                  <span className="text-gold font-semibold">{item.year}</span>
                </div>
                <div className="relative">
                  <div className="absolute left-0 top-2 w-2 h-2 bg-gold -translate-x-[5px]" />
                  <div className="absolute left-0 top-4 w-px h-full bg-gold/20 -translate-x-[1px]" />
                </div>
                <div className="pb-8">
                  <h3 className="text-cream font-semibold mb-1">{item.title}</h3>
                  <p className="text-cream/50 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
