import Contact from "@/components/website/Contact";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Wedding by Kranthi for your wedding photography and videography needs in Nellore. Call +91 98859 47958.",
  openGraph: {
    title: "Contact Wedding by Kranthi",
    description: "Get in touch for your wedding photography and videography needs in Nellore. Call +91 98859 47958.",
    images: ["/images/og-image.webp"],
  },
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <div className="pt-20">
      <Contact />
    </div>
  );
}
