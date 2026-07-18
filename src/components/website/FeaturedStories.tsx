"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useScrollReveal } from "./useScrollReveal";

const storyImages = [
  "/images/story1.png",
  "/images/story2.png",
  "/images/story3.png",
  "/images/story4.png",
  "/images/story5.png",
  "/images/story6.png",
];

export default function FeaturedStories() {
  const [current, setCurrent] = useState(0);
  const sectionRef = useScrollReveal();

  const next = useCallback(() => {
    setCurrent((p) => (p + 1) % storyImages.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((p) => (p - 1 + storyImages.length) % storyImages.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="py-24 bg-dark-surface overflow-hidden">
      <div ref={sectionRef} className="fade-in-up max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="text-center">
          <p className="text-gold text-sm uppercase tracking-[0.3em] mb-3">Love Stories</p>
          <h2 className="text-4xl md:text-5xl font-bold">
            <span className="text-gradient">Featured Story</span>
          </h2>
          <div className="w-16 h-px bg-gold mx-auto mt-6" />
        </div>
      </div>

      <div ref={sectionRef} className="fade-in-up max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-dark-card">
            <Image
              src={storyImages[current]}
              alt="Featured wedding story"
              fill
              className="object-cover transition-opacity duration-500"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-gold transition-colors"
              aria-label="Previous photo"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-gold transition-colors"
              aria-label="Next photo"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>

            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
              {storyImages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === current ? "w-6 bg-gold" : "w-1.5 bg-white/30"
                  }`}
                  aria-label={`Go to photo ${i + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <p className="text-gold text-sm uppercase tracking-[0.2em] mb-3">A Love Story</p>
            <h3 className="text-3xl md:text-4xl font-bold text-cream mb-4">Deeraj & Yasawi</h3>
            <p className="text-cream/60 leading-relaxed text-lg mb-4">
              A grand wedding celebration that beautifully blended traditional rituals with modern elegance. From the vibrant mehendi ceremony to the breathtaking beachside reception, every moment was a testament to their love story.
            </p>
            <p className="text-cream/60 leading-relaxed text-lg mb-8">
              The three-day celebration featured intricate floral arrangements, traditional South Indian customs, and a stunning sunset ceremony that left everyone in awe. Every frame captured the genuine emotions and joy of two families coming together.
            </p>

            <div className="flex items-center gap-2 text-gold text-sm font-medium">
              <span className="w-8 h-px bg-gold" />
              <span>{current + 1} / {storyImages.length}</span>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <Link
            href="/stories"
            className="inline-block border border-gold/30 text-gold hover:bg-gold/10 px-8 py-3 rounded-xl transition-all duration-300 text-sm font-semibold"
          >
            View More Stories
          </Link>
        </div>
      </div>
    </section>
  );
}
