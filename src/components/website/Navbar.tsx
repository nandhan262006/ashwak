"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMobile();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [mobileOpen, closeMobile]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#0A0A0A]/80 backdrop-blur-xl border-b border-white/[0.06]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-[72px]">
          <Link href="/" className="flex items-center">
            <Image
              src="/images/navibar.png"
              alt="Ashwak Photography"
              width={200}
              height={50}
              className="h-28 w-auto"
              priority
            />
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-4 py-2 text-white/50 hover:text-white transition-colors duration-300 text-sm font-medium group"
              >
                {link.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1.5px] bg-[#D4AF37] transition-all duration-300 group-hover:w-3/4" />
              </Link>
            ))}
            <Link
              href="/admin"
              className="ml-6 px-5 py-2 border border-[#D4AF37]/20 text-[#D4AF37]/80 hover:text-[#D4AF37] hover:border-[#D4AF37]/40 hover:bg-[#D4AF37]/[0.04] transition-all duration-300 text-xs font-semibold uppercase tracking-wider rounded-lg"
            >
              Admin
            </Link>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-white/60 p-2 hover:text-white transition-colors"
            aria-label="Toggle menu"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              {mobileOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <>
                  <path d="M4 6h16" />
                  <path d="M4 12h16" />
                  <path d="M4 18h16" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <>
          <div className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40" onClick={closeMobile} />
          <div className="md:hidden fixed top-[72px] left-0 right-0 bg-[#0A0A0A]/95 backdrop-blur-xl border-b border-white/[0.06] z-50">
            <div className="px-6 py-8 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMobile}
                  className="block py-3 text-white/50 hover:text-white transition-colors text-base font-medium"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4">
                <Link
                  href="/admin"
                  onClick={closeMobile}
                  className="inline-block px-5 py-2.5 border border-[#D4AF37]/20 text-[#D4AF37]/80 hover:text-[#D4AF37] hover:border-[#D4AF37]/40 transition-colors text-xs font-semibold uppercase tracking-wider rounded-lg"
                >
                  Admin Panel
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </nav>
  );
}
