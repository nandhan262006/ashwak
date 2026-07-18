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
    { title: "Wedding Photography", subtitle: "Traditional & Modern", description: "We capture every precious moment of your special day — from the bridal preparations to the final farewell. Our blend of traditional and modern photography ensures your wedding story is told with elegance and authenticity.", image: "/images/WEDDING-SERV.png", sortOrder: 1 },
    { title: "Engagement Photography", subtitle: "Romantic & Creative", description: "Celebrate your love story before the big day. Our engagement shoots are designed to reflect your personality — whether it's a dreamy outdoor session or a fun urban adventure across Chirala's iconic locations.", image: "/images/ENGAGEMENT-SERV.png", sortOrder: 2 },
    { title: "Family Photography", subtitle: "Warm & Candid", description: "From intimate family gatherings to big reunions, we capture the warmth and love that makes your family unique. Natural poses, genuine smiles, and timeless portraits.", image: "/images/FAMILY-SERV.png", sortOrder: 3 },
    { title: "Kids Photography", subtitle: "Playful & Joyful", description: "Kids grow up fast — preserve their playful energy and innocent expressions with vibrant, fun-filled photo sessions they'll love.", image: "/images/KIDS-SERV.png", sortOrder: 4 },
    { title: "Maternity Photography", subtitle: "Graceful & Elegant", description: "Celebrate the beauty of motherhood with elegant maternity portraits. Soft lighting, flowing fabrics, and tender moments captured forever.", image: "/images/MATERNITY-SERV.png", sortOrder: 5 },
    { title: "Model Photography", subtitle: "Professional & Stylish", description: "High-quality portfolio shoots for aspiring and professional models. Creative direction, stunning backdrops, and magazine-worthy results.", image: "/images/MODEL-SERV.png", sortOrder: 6 },
  ];

  for (const s of services) {
    await prisma.service.create({ data: s });
  }
  console.log(`✓ Seeded ${services.length} services`);

  // ── Gallery Images ──
  const galleryImages = [
    { title: "Gallery 1", src: "/images/GALLERY1.png", alt: "Gallery 1", sortOrder: 1 },
    { title: "Gallery 2", src: "/images/GALLERY2.png", alt: "Gallery 2", sortOrder: 2 },
    { title: "Gallery 3", src: "/images/GALLERY3.png", alt: "Gallery 3", sortOrder: 3 },
    { title: "Gallery 4", src: "/images/GALLERY4.png", alt: "Gallery 4", sortOrder: 4 },
    { title: "Gallery 5", src: "/images/GALLERY5.png", alt: "Gallery 5", sortOrder: 5 },
    { title: "Gallery 6", src: "/images/GALLERY6.png", alt: "Gallery 6", sortOrder: 6 },
    { title: "Gallery 7", src: "/images/GALLERY7.png", alt: "Gallery 7", sortOrder: 7 },
    { title: "Gallery 8", src: "/images/GALLERY8.png", alt: "Gallery 8", sortOrder: 8 },
  ];

  for (const g of galleryImages) {
    await prisma.galleryImage.create({ data: g });
  }
  console.log(`✓ Seeded ${galleryImages.length} gallery images`);

  // ── About Section ──
  await prisma.aboutSection.create({
    data: {
      title: "About Ashwak Photography",
      content: "With over a decade of experience capturing love stories across Chirala and beyond, Ashwak Photography brings artistry and emotion to every frame. We specialize in candid, traditional, and cinematic wedding photography that tells your unique story. From intimate ceremonies to grand celebrations, we believe every couple deserves a timeless visual narrative of their most cherished day. Our team combines technical expertise with a deep understanding of Indian wedding traditions to deliver photographs and films that you'll treasure for generations.",
      image: "/images/about1.png",
      tags: "Candid,Traditional,Cinematic,Pre-Wedding,Drone",
    },
  });
  console.log("✓ Seeded about section");

  // ── Google Reviews ──
  const reviews = [
    { name: "Priya & Rahul", text: "Ashwak captured our wedding beautifully. Every photo tells a story. The candid shots were absolutely stunning!", rating: 5, date: "December 2025", sortOrder: 1 },
    { name: "Ananya & Vikram", text: "Best wedding photographer in Chirala! The cinematic video was beyond our expectations. Highly recommend!", rating: 5, date: "November 2025", sortOrder: 2 },
    { name: "Meera & Arjun", text: "The pre-wedding shoot was magical. Ashwak has an incredible eye for detail and makes you feel so comfortable.", rating: 5, date: "October 2025", sortOrder: 3 },
    { name: "Divya & Sanjay", text: "From candid moments to grand portraits, every frame was perfect. The drone shots added a whole new dimension!", rating: 5, date: "September 2025", sortOrder: 4 },
    { name: "Lakshmi & Ravi", text: "Our wedding album is absolutely gorgeous. Ashwak truly knows how to capture emotions and beautiful moments.", rating: 5, date: "August 2025", sortOrder: 5 },
    { name: "Swathi & Kiran", text: "Professional, creative, and passionate. The reception coverage was fantastic. We love every single photo!", rating: 5, date: "July 2025", sortOrder: 6 },
    { name: "Nisha & Karthik", text: "The engagement shoot was so much fun! Ashwak made us feel like models. Beautiful timeless photos.", rating: 5, date: "June 2025", sortOrder: 7 },
    { name: "Revathi & Suresh", text: "Incredible service from start to finish. The traditional ceremony coverage was breathtaking. Worth every rupee!", rating: 5, date: "May 2025", sortOrder: 8 },
  ];

  for (const r of reviews) {
    await prisma.googleReview.create({ data: r });
  }
  console.log(`✓ Seeded ${reviews.length} Google reviews`);

  // ── Site Settings ──
  const settings = [
    { key: "phone", value: "+91 63016 58390" },
    { key: "email", value: "info@ashwakphotography.in" },
    { key: "address", value: "Peralal, Chirala, Andhra Pradesh, India" },
    { key: "facebook", value: "https://www.facebook.com/ashwakphotography" },
    { key: "instagram", value: "" },
    { key: "heroTitle", value: "Capturing Timeless Moments" },
    { key: "heroSubtitle", value: "Chirala's Premier Wedding Photography & Videography Studio" },
    { key: "seoTitle", value: "Ashwak Photography | Professional Wedding Photography in Chirala" },
    { key: "seoDescription", value: "Chirala's premier wedding photography and videography studio. Capturing timeless moments with artistry, elegance, and passion." },
    { key: "seoKeywords", value: "wedding photography Chirala, wedding videography Chirala, candid wedding photography, cinematic wedding video, pre-wedding shoot Chirala" },
    { key: "footerText", value: "© 2026 Ashwak Photography. All rights reserved." },
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
