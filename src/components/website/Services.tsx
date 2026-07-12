"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { useScrollReveal } from "./useScrollReveal";

const defaultServices = [
  { title: "Wedding Photography", image: "/images/gallery1.jpg", desc: "Capturing every precious moment of your special day with artistic excellence." },
  { title: "Pre-Wedding Shoots", image: "/images/gallery2.jpg", desc: "Romantic and creative pre-wedding sessions at stunning locations." },
  { title: "Cinematic Videography", image: "/images/gallery3.jpg", desc: "Movie-like wedding films that bring your story to life." },
  { title: "Drone Coverage", image: "/images/gallery4.jpg", desc: "Aerial perspectives that add a grand dimension to your celebrations." },
  { title: "Candid Photography", image: "/images/gallery5.jpg", desc: "Natural, unposed moments that reflect genuine emotions." },
  { title: "Album Design", image: "/images/gallery6.jpg", desc: "Beautifully crafted albums that preserve your memories forever." },
];

interface ServiceItem {
  title: string;
  image?: string | null;
  subtitle?: string | null;
  description?: string | null;
}

const RADIUS = 380;
const ANGLE_STEP = 60;

function getCardStyle(index: number, active: number, total: number) {
  const raw = ((index - active) % total + total) % total;
  const offset = raw > total / 2 ? raw - total : raw;
  const angle = offset * ANGLE_STEP;
  const abs = Math.abs(offset);
  const sc = abs === 0 ? 1 : abs === 1 ? 0.88 : 0.75;
  const op = abs <= 2 ? 1 - abs * 0.3 : 0;
  const z = abs === 0 ? 10 : 0;

  return {
    transform: `rotateY(${angle}deg) translateZ(${RADIUS}px) scale(${sc})`,
    opacity: op,
    zIndex: z,
  };
}

export default function Services({ initialServices }: { initialServices?: ServiceItem[] }) {
  const services = initialServices?.length
    ? initialServices.map((s) => ({
        title: s.title,
        image: s.image || "/images/gallery1.jpg",
        desc: s.description || s.subtitle || "",
      }))
    : defaultServices;
  const [active, setActive] = useState(0);
  const [dragStart, setDragStart] = useState<number | null>(null);
  const sectionRef = useScrollReveal();
  const total = services.length;

  const goTo = useCallback(
    (i: number) => setActive(((i % total) + total) % total),
    [total]
  );

  const handlePointerDown = (e: React.PointerEvent) => setDragStart(e.clientX);
  const handlePointerUp = (e: React.PointerEvent) => {
    if (dragStart === null) return;
    const diff = dragStart - e.clientX;
    if (Math.abs(diff) > 50) goTo(active + (diff > 0 ? 1 : -1));
    setDragStart(null);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goTo(active + 1);
      if (e.key === "ArrowLeft") goTo(active - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, goTo]);

  const lastWheelTime = useRef(0);

  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      const now = Date.now();
      if (now - lastWheelTime.current < 500) return;
      if (Math.abs(e.deltaY) > 30) {
        lastWheelTime.current = now;
        goTo(active + (e.deltaY > 0 ? 1 : -1));
      }
    },
    [active, goTo]
  );

  return (
    <section id="services" className="py-24 bg-dark overflow-hidden">
      <div ref={sectionRef} className="fade-in-up max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Our Services</span>
          </h2>
          <div className="w-20 h-0.5 bg-gold mx-auto" />
        </div>

        <div
          className="relative h-[540px] mx-auto max-w-4xl select-none"
          style={{ perspective: "1200px" }}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onWheel={handleWheel}
        >
          {services.map((service, i) => (
            <div
              key={i}
              className="absolute top-0 left-1/2 w-80 -ml-40 transition-all duration-500 ease-out cursor-grab active:cursor-grabbing"
              style={getCardStyle(i, active, total)}
              onClick={() => goTo(i)}
            >
              <div className="bg-dark-card/90 backdrop-blur-sm gold-border gold-glow overflow-hidden">
                <div className="relative h-80">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                    sizes="320px"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-gold mb-2">{service.title}</h3>
                  <p className="text-cream/60 text-sm leading-relaxed">{service.desc}</p>
                </div>
              </div>
            </div>
          ))}

          <button
            onClick={() => goTo(active - 1)}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center bg-dark-card/80 border border-gold/30 text-gold hover:bg-gold hover:text-dark transition-all"
            aria-label="Previous"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
          </button>
          <button
            onClick={() => goTo(active + 1)}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center bg-dark-card/80 border border-gold/30 text-gold hover:bg-gold hover:text-dark transition-all"
            aria-label="Next"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
          </button>
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {services.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                i === active ? "bg-gold w-8" : "bg-cream/30 hover:bg-cream/50"
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
