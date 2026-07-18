import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Stories",
  description: "Browse through our collection of beautiful wedding stories captured by Ashwak Photography.",
  openGraph: {
    title: "Wedding Stories | Ashwak Photography",
    description: "Browse through our collection of beautiful wedding stories.",
  },
  alternates: {
    canonical: "/stories",
  },
};

const stories = [
  {
    id: 1,
    image: "/images/story1.png",
    couple: "Deeraj & Yasawi",
    title: "A Royal Affair",
    description: "A grand wedding celebration that beautifully blended traditional rituals with modern elegance.",
  },
  {
    id: 2,
    image: "/images/story2.png",
    couple: "Deeraj & Yasawi",
    title: "Garden of Love",
    description: "An intimate garden ceremony surrounded by flowers and close family.",
  },
  {
    id: 3,
    image: "/images/story3.png",
    couple: "Deeraj & Yasawi",
    title: "Timeless Traditions",
    description: "A beautiful traditional wedding honoring centuries-old customs with a modern touch.",
  },
  {
    id: 4,
    image: "/images/story4.png",
    couple: "Deeraj & Yasawi",
    title: "Sunset Vows",
    description: "A breathtaking beachside ceremony as the sun set over the ocean.",
  },
  {
    id: 5,
    image: "/images/story5.png",
    couple: "Deeraj & Yasawi",
    title: "City of Dreams",
    description: "A glamorous city wedding with stunning urban backdrops and nightlife celebrations.",
  },
  {
    id: 6,
    image: "/images/story6.png",
    couple: "Deeraj & Yasawi",
    title: "Mountain Magic",
    description: "A destination wedding in the hills with misty mornings and starlit evenings.",
  },
];

export default function StoriesPage() {
  return (
    <main className="min-h-screen bg-dark pt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <p className="text-gold text-sm uppercase tracking-[0.3em] mb-3">Love Stories</p>
          <h1 className="text-4xl md:text-5xl font-bold">
            <span className="text-gradient">Our Stories</span>
          </h1>
          <div className="w-16 h-px bg-gold mx-auto mt-6" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((story) => (
            <div
              key={story.id}
              className="bg-dark-card border border-gold/10 rounded-2xl overflow-hidden hover:border-gold/30 transition-colors group"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={story.image}
                  alt={story.couple}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-gold text-sm font-medium mb-1">{story.couple}</p>
                  <h3 className="text-xl font-bold text-cream">{story.title}</h3>
                </div>
              </div>
              <div className="p-5">
                <p className="text-cream/60 text-sm leading-relaxed">{story.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/"
            className="inline-block border border-gold/30 text-gold hover:bg-gold/10 px-8 py-3 rounded-xl transition-all duration-300 text-sm font-semibold"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
