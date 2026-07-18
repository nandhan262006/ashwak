"use client";

import Image from "next/image";
import { useScrollReveal } from "./useScrollReveal";



interface AboutData {
  title?: string;
  content?: string;
  image?: string | null;
  tags?: string | null;
}

export default function About({ data }: { data?: AboutData | null }) {
  const sectionRef = useScrollReveal();

  const displayContent = data?.content || "With over a decade of experience capturing love stories across Chirala and beyond, Ashwak Photography brings artistry and emotion to every frame. We specialize in candid, traditional, and cinematic wedding photography that tells your unique story.";
  const displayImage = data?.image || "/images/about1.png";

  return (
    <section id="about" className="relative bg-dark-surface overflow-hidden">
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: "url('/images/ABOUT.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      />

      <div ref={sectionRef} className="fade-in-up relative z-10 grid md:grid-cols-2 gap-10 items-center max-w-5xl mx-auto px-4 pt-24 pb-16">
        <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-dark-card order-1">
          <Image
            src={displayImage}
            alt={data?.title || "Ashwak Photography"}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
          <div className="absolute bottom-0 right-0 bg-gradient-to-l from-black/70 to-transparent p-5 text-right">
            <p className="text-cream text-lg font-medium">Ashwak</p>
            <p className="text-gold text-xs">Founder, Ashwak Photography</p>
          </div>
        </div>

        <div className="order-2">
          <span className="text-gold font-semibold text-sm uppercase tracking-widest">About</span>
          <h2 className="text-4xl font-bold mt-3 mb-4 text-cream">Meet the Man Behind the Lens</h2>
          <div className="space-y-4 text-cream/60 leading-relaxed mb-6">
            <p>
              Before Ashwak Photography, I earned recognition as one of the <strong className="text-cream">Best Wedding Photographers</strong> in Chirala.
            </p>
            <p><strong className="text-cream">11+ Years of Excellence</strong></p>
            <p>
              {displayContent}
            </p>
            <p>
              If you&apos;re searching for the Best Wedding Photographers in Chirala, Wedding Photography
              in Chirala, Candid Wedding Photographers in Chirala, Traditional Wedding Photography,
              Bridal Photography, Groom Portraits, Pre Wedding Photography, Engagement Photography,
              or Wedding Cinematography, Ashwak Photography brings award-winning experience to every celebration.
            </p>
            <p>
              For over a decade, families across Chirala and beyond have trusted Ashwak Photography to preserve
              their most important memories through authentic wedding storytelling and timeless imagery.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
