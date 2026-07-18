import Contact from "@/components/website/Contact";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Ashwak Photography for your wedding, engagement, family, maternity, or model photography needs in Chirala and across Andhra Pradesh. Call +91 63016 58390 or send us an inquiry. We'd love to capture your special moments.",
  openGraph: {
    title: "Contact Ashwak Photography",
    description: "Get in touch for your wedding photography and videography needs in Chirala. Call +91 63016 58390.",
    images: ["/images/og-image.png"],
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
