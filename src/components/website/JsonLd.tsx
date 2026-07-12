export default function JsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Wedding by Kranthi",
    alternateName: "Kranthi Photography",
    description: "Nellore's premier wedding photography and videography studio. Capturing timeless moments with artistry, elegance, and passion.",
    url: "https://kranthiphotography.in",
    telephone: "+919885947958",
    email: "info@kranthiphotography.in",
    image: "https://kranthiphotography.in/images/og-image.webp",
    logo: "https://kranthiphotography.in/images/navibar.png",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Nellore",
      addressRegion: "Andhra Pradesh",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 14.4426,
      longitude: 79.9865,
    },
    areaServed: [
      { "@type": "City", name: "Nellore" },
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
