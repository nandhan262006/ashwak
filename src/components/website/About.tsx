"use client";

import Image from "next/image";
import { useScrollReveal } from "./useScrollReveal";

const tags = ["Candid", "Traditional", "Cinematic", "Pre-Wedding", "Drone"];

const stats = [
  { value: "500+", label: "Weddings" },
  { value: "11+", label: "Years" },
  { value: "4.9", label: "Rating" },
  { value: "100%", label: "Happy" },
];

interface AboutData {
  title?: string;
  content?: string;
  image?: string | null;
  tags?: string | null;
}

export default function About({ data }: { data?: AboutData | null }) {
  const headingRef = useScrollReveal();
  const contentRef = useScrollReveal();
  const imageRef = useScrollReveal();
  const statsRef = useScrollReveal();

  const displayTags = data?.tags
    ? data.tags.split(",").map((t) => t.trim()).filter(Boolean)
    : tags;
  const displayContent = data?.content || "With over a decade of experience capturing love stories across Nellore and beyond, Wedding by Kranthi brings artistry and emotion to every frame. We specialize in candid, traditional, and cinematic wedding photography that tells your unique story. From intimate ceremonies to grand celebrations, we believe every couple deserves a timeless visual narrative of their most cherished day. Our team combines technical expertise with a deep understanding of Indian wedding traditions to deliver photographs and films that you'll treasure for generations.";
  const displayImage = data?.image || "/images/unnamed.webp";

  return (
    <section
      id="about"
      className="relative py-24 overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage: "url('/images/unnamed%20(8).webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={headingRef} className="fade-in-up text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">About Us</span>
          </h2>
          <div className="w-20 h-0.5 bg-gold mx-auto" />
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div ref={contentRef} className="fade-in-up space-y-6">
            <p className="text-cream/70 leading-relaxed">
              {displayContent}
            </p>

            <div className="flex flex-wrap gap-3">
              {displayTags.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 border border-gold/30 text-gold text-sm uppercase tracking-wider"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div ref={imageRef} className="fade-in-up">
            <div className="relative overflow-hidden gold-border">
                <Image
                  src={displayImage}
                  alt={data?.title || "About Wedding by Kranthi"}
                width={600}
                height={400}
                className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
          </div>
        </div>

        <div ref={statsRef} className="fade-in-up grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="text-center p-6"
            >
              <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">
                {stat.value}
              </div>
              <div className="text-cream/60 text-sm uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
