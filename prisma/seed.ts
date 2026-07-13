import "dotenv/config";
import path from "node:path";
import { PrismaClient } from "@prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";

const rawUrl = process.env.TURSO_DATABASE_URL || process.env.DATABASE_URL!;
const authToken = process.env.TURSO_AUTH_TOKEN;
// Convert relative file: URL to absolute
const url = rawUrl.startsWith("file:")
  ? "file:" + path.resolve(process.cwd(), rawUrl.slice("file:".length))
  : rawUrl;
const adapter = new PrismaLibSql({ url, ...(authToken ? { authToken } : {}) });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding database...");

  await prisma.siteSetting.deleteMany();
  await prisma.service.deleteMany();
  await prisma.galleryImage.deleteMany();
  await prisma.googleReview.deleteMany();
  await prisma.aboutSection.deleteMany();
  await prisma.contactSubmission.deleteMany();

  // ── Services ──
  const services = [
    { title: "Wedding Photography", subtitle: "Traditional & Modern", description: "We capture every precious moment of your special day — from the bridal preparations to the final farewell. Our blend of traditional and modern photography ensures your wedding story is told with elegance and authenticity.", image: "/images/unnamed.webp", sortOrder: 1 },
    { title: "Pre-Wedding Shoots", subtitle: "Romantic & Creative", description: "Celebrate your love story before the big day. Our pre-wedding shoots are designed to reflect your personality — whether it's a dreamy outdoor session or a fun urban adventure across Nellore's iconic locations.", image: "/images/unnamed (1).webp", sortOrder: 2 },
    { title: "Cinematic Videography", subtitle: "Movie-Like Wedding Films", description: "From highlight reels to full-length wedding films, our cinematic approach transforms your wedding into a visual masterpiece. Drone aerials, slow-motion, and storytelling edits that bring your memories to life.", image: "/images/unnamed (2).webp", sortOrder: 3 },
    { title: "Candid Photography", subtitle: "Natural & Unposed", description: "The best moments are the ones you don't pose for. Our candid photography captures genuine emotions — laughter, tears, joy — creating a raw and authentic visual narrative of your celebration.", image: "/images/unnamed (4).webp", sortOrder: 4 },
    { title: "Drone Coverage", subtitle: "Aerial Perspectives", description: "Add a grand dimension to your wedding with stunning aerial shots. Our licensed drone operators capture sweeping views of your venue, baraat procession, and outdoor celebrations.", image: "/images/unnamed (3).webp", sortOrder: 5 },
    { title: "Album Design", subtitle: "Timeless Keepsakes", description: "Beautifully crafted wedding albums that become family heirlooms. We design custom layouts with premium printing, ensuring your favourite moments are preserved for generations.", image: "/images/unnamed (5).webp", sortOrder: 6 },
  ];

  for (const s of services) {
    await prisma.service.create({ data: s });
  }
  console.log(`✓ Seeded ${services.length} services`);

  // ── Gallery Images ──
  const galleryImages = [
    { title: "Wedding Moments", src: "/images/unnamed.webp", alt: "Wedding Moments", sortOrder: 1 },
    { title: "Beautiful Portraits", src: "/images/unnamed (1).webp", alt: "Beautiful Portraits", sortOrder: 2 },
    { title: "Celebrations", src: "/images/unnamed (2).webp", alt: "Celebrations", sortOrder: 3 },
    { title: "Traditional Ceremony", src: "/images/unnamed (3).webp", alt: "Traditional Ceremony", sortOrder: 4 },
    { title: "Joyful Moments", src: "/images/unnamed (4).webp", alt: "Joyful Moments", sortOrder: 5 },
    { title: "Elegant Details", src: "/images/unnamed (5).webp", alt: "Elegant Details", sortOrder: 6 },
    { title: "Grand Celebrations", src: "/images/unnamed (7).webp", alt: "Grand Celebrations", sortOrder: 7 },
    { title: "Timeless Memories", src: "/images/unnamed (8).webp", alt: "Timeless Memories", sortOrder: 8 },
  ];

  for (const g of galleryImages) {
    await prisma.galleryImage.create({ data: g });
  }
  console.log(`✓ Seeded ${galleryImages.length} gallery images`);

  // ── About Section ──
  await prisma.aboutSection.create({
    data: {
      title: "About Wedding by Kranthi",
      content: "With over a decade of experience capturing love stories across Nellore and beyond, Wedding by Kranthi brings artistry and emotion to every frame. We specialize in candid, traditional, and cinematic wedding photography that tells your unique story. From intimate ceremonies to grand celebrations, we believe every couple deserves a timeless visual narrative of their most cherished day. Our team combines technical expertise with a deep understanding of Indian wedding traditions to deliver photographs and films that you'll treasure for generations.",
      image: "/images/unnamed.webp",
      tags: "Candid,Traditional,Cinematic,Pre-Wedding,Drone",
    },
  });
  console.log("✓ Seeded about section");

  // ── Google Reviews ──
  const reviews = [
    { name: "Priya & Rahul", text: "Kranthi captured our wedding beautifully. Every photo tells a story. The candid shots were absolutely stunning!", rating: 5, date: "December 2025", sortOrder: 1 },
    { name: "Ananya & Vikram", text: "Best wedding photographer in Nellore! The cinematic video was beyond our expectations. Highly recommend!", rating: 5, date: "November 2025", sortOrder: 2 },
    { name: "Meera & Arjun", text: "The pre-wedding shoot was magical. Kranthi has an incredible eye for detail and makes you feel so comfortable.", rating: 5, date: "October 2025", sortOrder: 3 },
    { name: "Divya & Sanjay", text: "From candid moments to grand portraits, every frame was perfect. The drone shots added a whole new dimension!", rating: 5, date: "September 2025", sortOrder: 4 },
    { name: "Lakshmi & Ravi", text: "Our wedding album is absolutely gorgeous. Kranthi truly knows how to capture emotions and beautiful moments.", rating: 5, date: "August 2025", sortOrder: 5 },
    { name: "Swathi & Kiran", text: "Professional, creative, and passionate. The reception coverage was fantastic. We love every single photo!", rating: 5, date: "July 2025", sortOrder: 6 },
    { name: "Nisha & Karthik", text: "The engagement shoot was so much fun! Kranthi made us feel like models. Beautiful timeless photos.", rating: 5, date: "June 2025", sortOrder: 7 },
    { name: "Revathi & Suresh", text: "Incredible service from start to finish. The traditional ceremony coverage was breathtaking. Worth every rupee!", rating: 5, date: "May 2025", sortOrder: 8 },
  ];

  for (const r of reviews) {
    await prisma.googleReview.create({ data: r });
  }
  console.log(`✓ Seeded ${reviews.length} Google reviews`);

  // ── Site Settings ──
  const settings = [
    { key: "phone", value: "+91 98859 47958" },
    { key: "email", value: "info@kranthiphotography.in" },
    { key: "address", value: "Nellore, Andhra Pradesh, India" },
    { key: "facebook", value: "https://www.facebook.com/krantiphotography" },
    { key: "instagram", value: "" },
    { key: "heroTitle", value: "Capturing Timeless Moments" },
    { key: "heroSubtitle", value: "Nellore's Premier Wedding Photography & Videography Studio" },
    { key: "seoTitle", value: "Wedding by Kranthi | Professional Wedding Photography in Nellore" },
    { key: "seoDescription", value: "Nellore's premier wedding photography and videography studio. Capturing timeless moments with artistry, elegance, and passion." },
    { key: "seoKeywords", value: "wedding photography Nellore, wedding videography Nellore, candid wedding photography, cinematic wedding video, pre-wedding shoot Nellore" },
    { key: "footerText", value: "© 2026 Wedding by Kranthi. All rights reserved." },
  ];

  for (const s of settings) {
    await prisma.siteSetting.create({ data: s });
  }
  console.log(`✓ Seeded ${settings.length} site settings`);

  console.log("\n✅ Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error("Seed failed:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
