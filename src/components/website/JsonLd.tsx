export default function JsonLd() {
  const siteUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://weddingbykranthi.vercel.app";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Ashwak Photography",
    alternateName: "Ashwak Photography",
    description: "Chirala's premier wedding photography and videography studio. Capturing timeless moments with artistry, elegance, and passion.",
    url: siteUrl,
    telephone: "+916301658390",
    email: "info@ashwakphotography.in",
    image: `${siteUrl}/images/og-image.png`,
    logo: `${siteUrl}/images/navibar.png`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Chirala",
      addressRegion: "Andhra Pradesh",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 14.4426,
      longitude: 79.9865,
    },
    areaServed: [
      { "@type": "City", name: "Chirala" },
      { "@type": "City", name: "Tirupati" },
      { "@type": "State", name: "Andhra Pradesh" },
    ],
    priceRange: "$$",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "09:00",
      closes: "21:00",
    },
    sameAs: [
      "https://www.facebook.com/krantiphotography",
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "500",
      bestRating: "5",
      worstRating: "1",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Wedding Photography Services",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Wedding Photography" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Pre-Wedding Shoots" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Cinematic Videography" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Drone Coverage" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Candid Photography" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Album Design" } },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
