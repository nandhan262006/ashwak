"use client";

import Link from "next/link";
import Image from "next/image";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

const serviceList = [
  "Wedding Photography",
  "Pre-Wedding Shoots",
  "Cinematic Videography",
  "Drone Coverage",
  "Candid Photography",
  "Album Design",
];

export default function Footer() {
  return (
    <footer className="bg-[#0A0A0A] border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-12 gap-12">
          <div className="md:col-span-5">
            <Image
              src="/images/navibar.png"
              alt="Ashwak Photography"
              width={160}
              height={40}
              className="h-9 w-auto mb-5"
            />
            <p className="text-white/30 leading-relaxed text-sm max-w-sm">
              Capturing timeless moments with artistry, elegance, and passion.
              Chirala&apos;s premier wedding photography and videography studio since 2015.
            </p>
          </div>

          <div className="md:col-span-3">
            <h3 className="text-white/40 font-semibold mb-5 uppercase tracking-[0.2em] text-[11px]">
              Navigation
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/30 hover:text-[#D4AF37] transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <h3 className="text-white/40 font-semibold mb-5 uppercase tracking-[0.2em] text-[11px]">
              Services
            </h3>
            <ul className="space-y-3">
              {serviceList.map((service) => (
                <li key={service}>
                  <span className="text-white/20 text-sm">{service}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/[0.04] py-6">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/15 text-xs">
            &copy; {new Date().getFullYear()} Ashwak Photography. All rights reserved.
          </p>
          <p className="text-white/10 text-xs">
            Made with passion in Chirala, Andhra Pradesh
          </p>
        </div>
      </div>
    </footer>
  );
}
