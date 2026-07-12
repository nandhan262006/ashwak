"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { useScrollReveal } from "./useScrollReveal";

const defaultGalleryItems = [
  { src: "/images/gallery1.jpg", caption: "Wedding Ceremony" },
  { src: "/images/gallery2.jpg", caption: "Pre-Wedding Shoot" },
  { src: "/images/gallery3.jpg", caption: "Cinematic Moments" },
  { src: "/images/gallery4.jpg", caption: "Aerial Coverage" },
  { src: "/images/gallery5.jpg", caption: "Candid Photography" },
  { src: "/images/gallery6.jpg", caption: "Album Design" },
  { src: "/images/unnamed.webp", caption: "Wedding Moments" },
  { src: "/images/unnamed (1).webp", caption: "Beautiful Portraits" },
  { src: "/images/unnamed (2).webp", caption: "Celebrations" },
  { src: "/images/unnamed (3).webp", caption: "Traditional Ceremony" },
  { src: "/images/unnamed (4).webp", caption: "Joyful Moments" },
  { src: "/images/unnamed (5).webp", caption: "Elegant Details" },
];

interface GalleryImageItem {
  src: string;
  alt?: string | null;
  title?: string;
}

export default function Gallery({ initialImages }: { initialImages?: GalleryImageItem[] }) {
  const galleryItems = initialImages?.length
    ? initialImages.map((img) => ({
        src: img.src,
        caption: img.alt || img.title || "",
      }))
    : defaultGalleryItems;
  const [lightbox, setLightbox] = useState<number | null>(null);
  const sectionRef = useScrollReveal();

  const close = useCallback(() => setLightbox(null), []);
  const next = useCallback(() => setLightbox((p) => (p !== null ? (p + 1) % galleryItems.length : null)), []);
  const prev = useCallback(() => setLightbox((p) => (p !== null ? (p - 1 + galleryItems.length) % galleryItems.length : null)), []);

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox, close, next, prev]);

  return (
    <section id="gallery" className="py-24 bg-dark">
      <div ref={sectionRef} className="fade-in-up max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Gallery</span>
          </h2>
          <div className="w-20 h-0.5 bg-gold mx-auto" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 auto-rows-[200px] md:auto-rows-[260px]">
          {galleryItems.map((item, i) => (
            <div
              key={i}
              className="relative overflow-hidden group cursor-pointer"
              onClick={() => setLightbox(i)}
            >
              <Image
                src={item.src}
                alt={item.caption}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-dark/0 group-hover:bg-dark/60 transition-all duration-300 flex items-end p-4">
                <span className="text-cream text-sm font-medium opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                  {item.caption}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 bg-dark/95 flex items-center justify-center p-4"
          onClick={close}
        >
          <button
            onClick={close}
            className="absolute top-6 right-6 text-cream/60 hover:text-gold transition-colors"
            aria-label="Close"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-cream/60 hover:text-gold transition-colors"
            aria-label="Previous"
          >
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
          </button>

          <div className="relative w-full max-w-4xl h-[70vh]" onClick={(e) => e.stopPropagation()}>
            <Image
              src={galleryItems[lightbox].src}
              alt={galleryItems[lightbox].caption}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
            <div className="absolute bottom-4 left-0 right-0 text-center text-cream/70 text-sm">
              {galleryItems[lightbox].caption}
            </div>
          </div>

          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-cream/60 hover:text-gold transition-colors"
            aria-label="Next"
          >
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
          </button>
        </div>
      )}
    </section>
  );
}
