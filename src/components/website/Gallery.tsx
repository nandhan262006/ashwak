"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useScrollReveal } from "./useScrollReveal";

const defaultGalleryItems = [
  { src: "/images/GALLERY1.png", caption: "Gallery 1" },
  { src: "/images/GALLERY2.png", caption: "Gallery 2" },
  { src: "/images/GALLERY3.png", caption: "Gallery 3" },
  { src: "/images/GALLERY4.png", caption: "Gallery 4" },
  { src: "/images/GALLERY5.png", caption: "Gallery 5" },
  { src: "/images/GALLERY6.png", caption: "Gallery 6" },
  { src: "/images/GALLERY7.png", caption: "Gallery 7" },
  { src: "/images/GALLERY8.png", caption: "Gallery 8" },
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
  const next = useCallback(() => setLightbox((p) => (p !== null ? (p + 1) % galleryItems.length : null)), [galleryItems.length]);
  const prev = useCallback(() => setLightbox((p) => (p !== null ? (p - 1 + galleryItems.length) % galleryItems.length : null)), [galleryItems.length]);

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
      <div ref={sectionRef} className="fade-in-up max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-gold text-sm uppercase tracking-[0.3em] mb-3">Portfolio</p>
          <h2 className="text-4xl md:text-5xl font-bold">
            <span className="text-gradient">Gallery</span>
          </h2>
          <div className="w-16 h-px bg-gold mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-0">
          {galleryItems.map((item, i) => (
            <div
              key={i}
              className="relative overflow-hidden group cursor-pointer"
              onClick={() => setLightbox(i)}
            >
              <Image
                src={item.src}
                alt={item.caption}
                width={600}
                height={400}
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <span className="text-cream text-sm font-medium">
                  {item.caption}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/gallery"
            className="inline-block bg-gradient-to-r from-[#D4AF37] to-[#B8960E] text-[#0A0A0A] px-8 py-3 rounded-xl hover:shadow-lg hover:shadow-[#D4AF37]/20 transition-all duration-300 text-sm font-semibold"
          >
            View Full Gallery
          </Link>
        </div>

      </div>

      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 bg-dark/95 flex items-center justify-center p-4"
          onClick={close}
        >
          <button
            onClick={close}
            className="absolute top-6 right-6 text-cream/50 hover:text-gold transition-colors z-10"
            aria-label="Close"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-cream/50 hover:text-gold transition-colors z-10"
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
            <div className="absolute bottom-4 left-0 right-0 text-center text-cream/60 text-sm">
              {galleryItems[lightbox].caption}
            </div>
          </div>

          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-cream/50 hover:text-gold transition-colors z-10"
            aria-label="Next"
          >
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
          </button>
        </div>
      )}
    </section>
  );
}
