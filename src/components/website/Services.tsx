"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { useScrollReveal } from "./useScrollReveal";

const defaultServices = [
  { title: "Wedding Photography", image: "/images/unnamed.webp", desc: "Capturing every precious moment of your special day with artistic excellence." },
  { title: "Pre-Wedding Shoots", image: "/images/unnamed (1).webp", desc: "Romantic and creative pre-wedding sessions at stunning locations." },
  { title: "Cinematic Videography", image: "/images/unnamed (2).webp", desc: "Movie-like wedding films that bring your story to life." },
  { title: "Drone Coverage", image: "/images/unnamed (3).webp", desc: "Aerial perspectives that add a grand dimension to your celebrations." },
  { title: "Candid Photography", image: "/images/unnamed (4).webp", desc: "Natural, unposed moments that reflect genuine emotions." },
  { title: "Album Design", image: "/images/unnamed (5).webp", desc: "Beautifully crafted albums that preserve your memories forever." },
];

interface ServiceItem {
  title: string;
  image?: string | null;
  subtitle?: string | null;
  description?: string | null;
}

export default function Services({ initialServices }: { initialServices?: ServiceItem[] }) {
  const services = initialServices?.length
    ? initialServices.map((s) => ({
        title: s.title,
        image: s.image || "/images/unnamed.webp",
        desc: s.description || s.subtitle || "",
      }))
    : defaultServices;

  const [activeIdx, setActiveIdx] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef({ startX: 0, lastX: 0, velocity: 0, idx: 0, dragging: false, width: 0 });
  const sectionRef = useScrollReveal();

  const snap = useCallback(
    (idx: number) => {
      const s = stateRef.current;
      s.idx = Math.max(0, Math.min(services.length - 1, idx));
      setActiveIdx(s.idx);
    },
    [services.length]
  );

  useEffect(() => {
    const el = containerRef.current;
    if (!el || services.length === 0) return;
    const s = stateRef.current;
    s.width = el.clientWidth;
    s.idx = 0;

    const ro = new ResizeObserver(() => {
      s.width = el.clientWidth;
    });
    ro.observe(el);

    const onWheel = (e: WheelEvent) => {
      const isHorizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY);
      if (!isHorizontal) return;
      e.preventDefault();
      const idx = s.idx + (e.deltaX > 0 ? 1 : -1);
      snap(idx);
    };
    el.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      ro.disconnect();
      el.removeEventListener("wheel", onWheel);
    };
  }, [services.length, snap]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") snap(stateRef.current.idx + 1);
      if (e.key === "ArrowLeft") snap(stateRef.current.idx - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [snap]);

  const onPointerDown = (e: React.PointerEvent) => {
    const s = stateRef.current;
    s.startX = e.clientX;
    s.lastX = e.clientX;
    s.velocity = 0;
    s.dragging = true;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const s = stateRef.current;
    if (!s.dragging) return;
    const dx = e.clientX - s.lastX;
    s.lastX = e.clientX;
    s.velocity = dx * 0.4 + s.velocity * 0.6;
    const threshold = s.width * 0.2;
    if (Math.abs(dx) > threshold) {
      const dir = dx > 0 ? -1 : 1;
      s.dragging = false;
      e.currentTarget.releasePointerCapture(e.pointerId);
      snap(s.idx + dir);
    }
  };

  const onPointerUp = () => {
    const s = stateRef.current;
    if (!s.dragging) return;
    s.dragging = false;
    if (Math.abs(s.velocity) > 0.3) {
      snap(s.idx + (s.velocity > 0 ? -1 : 1));
    }
  };

  return (
    <section id="services" className="relative bg-dark-surface overflow-hidden z-0">
      <div ref={sectionRef} className="fade-in-up text-center pt-24 pb-8 px-4 max-w-7xl mx-auto">
        <p className="text-gold text-sm uppercase tracking-[0.3em] mb-3">What We Offer</p>
        <h2 className="text-4xl md:text-5xl font-bold">
          <span className="text-gradient">Our Services</span>
        </h2>
        <div className="w-16 h-px bg-gold mx-auto mt-6 mb-6" />
        <p className="text-cream/60 max-w-2xl mx-auto">
          Comprehensive wedding photography and cinematography services tailored to make your special day unforgettable.
        </p>
      </div>

      <div
        ref={containerRef}
        className="select-none pb-8 relative"
        style={{ perspective: "1200px", touchAction: "pan-y" }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div className="flex items-center justify-center min-h-[350px] sm:h-[600px] md:h-[700px] relative">
          {services.map((service, i) => {
            const diff = i - activeIdx;
            const abs = Math.abs(diff);
            const isActive = diff === 0;

            const rotateY = diff * -25;
            const translateZ = isActive ? 200 : abs === 1 ? 50 : -200;
            const translateX = diff * 120;
            const scale = 1 - abs * 0.12;
            const opacity = 1 - abs * 0.25;
            const zIndex = services.length - abs;

            return (
              <div
                key={i}
                className="absolute w-[65%] md:w-[500px] transition-all duration-500 ease-out cursor-grab active:cursor-grabbing"
                style={{
                  transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                  opacity: opacity < 0 ? 0 : opacity,
                  zIndex,
                  transformStyle: "preserve-3d",
                  pointerEvents: isActive ? "auto" : "none",
                }}
                onClick={() => !isActive && snap(i)}
              >
                <div className="relative w-full aspect-[4/5] md:aspect-[3/4] rounded-2xl overflow-hidden bg-transparent">
                  {service.image ? (
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover"
                      sizes="90vw"
                      draggable={false}
                    />
                  ) : (
                    <div className="absolute inset-0 bg-dark-card" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 text-cream">
                    <h3 className="text-2xl md:text-3xl font-bold mb-2">{service.title}</h3>
                    <p className="text-cream/80 text-sm md:text-base leading-relaxed line-clamp-2">
                      {service.desc}
                    </p>
                    <div className="mt-4 flex items-center gap-2 text-gold text-sm font-medium">
                      <span className="w-6 h-px bg-gold" />
                      Learn More
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="hidden sm:flex justify-between absolute top-1/2 left-4 right-4 -translate-y-1/2 pointer-events-none z-10">
        <button
          onClick={() => snap(activeIdx - 1)}
          disabled={activeIdx === 0}
          className="pointer-events-auto w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-dark-card/90 backdrop-blur border border-gold/30 text-gold hover:bg-gold hover:text-dark transition disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center"
          aria-label="Previous service"
        >
          <svg width="16" height="16" className="sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <button
          onClick={() => snap(activeIdx + 1)}
          disabled={activeIdx === services.length - 1}
          className="pointer-events-auto w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-dark-card/90 backdrop-blur border border-gold/30 text-gold hover:bg-gold hover:text-dark transition disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center"
          aria-label="Next service"
        >
          <svg width="16" height="16" className="sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>

      <div className="flex justify-center gap-2 pb-8">
        {services.map((_, i) => (
          <button
            key={i}
            onClick={() => snap(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === activeIdx ? "bg-gold w-6" : "bg-cream/20 hover:bg-cream/40 w-1.5"
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
