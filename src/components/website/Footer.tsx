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
    <footer className="bg-dark-card border-t border-gold/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-12">
          <div>
            <Image
              src="/images/navibar.png"
              alt="Wedding by Kranthi"
              width={160}
              height={40}
              className="h-10 w-auto mb-4"
            />
            <p className="text-cream/60 leading-relaxed text-sm">
              Capturing timeless moments with artistry, elegance, and passion.
              Nellore&apos;s premier wedding photography and videography studio.
            </p>
          </div>

          <div>
            <h3 className="text-gold font-semibold mb-4 uppercase tracking-wider text-sm">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-cream/60 hover:text-gold transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-gold font-semibold mb-4 uppercase tracking-wider text-sm">
              Services
            </h3>
            <ul className="space-y-2">
              {serviceList.map((service) => (
                <li key={service}>
                  <span className="text-cream/60 text-sm">{service}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-gold/10 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-cream/40 text-sm">
          &copy; {new Date().getFullYear()} Wedding by Kranthi. All rights reserved. Made with{" "}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="#D4AF37" className="inline-block mx-0.5 -mt-0.5">
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
          </svg>
          in Nellore
        </div>
      </div>
    </footer>
  );
}
