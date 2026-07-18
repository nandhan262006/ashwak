"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      if (imgRef.current) {
        const y = window.scrollY * 0.3;
        imgRef.current.style.transform = `translateY(${y}px) scale(${1 + window.scrollY * 0.0001})`;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="relative min-h-screen flex items-end overflow-hidden">
      <div ref={imgRef} className="absolute inset-0 will-change-transform">
        <Image
          src="/images/homepage1mobile.png"
          alt="Wedding photography"
          fill
          className="object-cover object-center md:hidden"
          priority
          sizes="100vw"
        />
        <Image
          src="/images/homepage1.png"
          alt="Wedding photography"
          fill
          className="object-cover object-center hidden md:block"
          priority
          sizes="100vw"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/20 to-transparent" />

      <div className="relative w-full pb-32 md:pb-40">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-4">
            <Link
              href="/contact"
              className="bg-gradient-to-r from-[#D4AF37] to-[#B8960E] text-[#0A0A0A] font-semibold px-8 py-3.5 rounded-xl hover:shadow-lg hover:shadow-[#D4AF37]/20 transition-all duration-300 text-sm"
            >
              Book a Consultation
            </Link>
            <Link
              href="/gallery"
              className="border border-[#D4AF37]/30 text-[#D4AF37] px-8 py-3.5 rounded-xl hover:bg-[#D4AF37]/10 transition-all duration-300 text-sm backdrop-blur-sm"
            >
              View Portfolio
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
        <div className="flex flex-col items-center gap-2 text-white/30">
          <span className="text-[10px] uppercase tracking-[0.3em] font-medium">Scroll</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="animate-bounce">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>
      </div>
    </section>
  );
}
