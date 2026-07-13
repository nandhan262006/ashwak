import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/api-auth";

export async function GET() {
  const auth = await requireAuth();
  if (auth) return auth;

  try {
    const [
      services,
      servicesCount,
      gallery,
      galleryCount,
      googleReviews,
      reviewsCount,
      about,
      contacts,
      unreadContacts,
    ] = await Promise.all([
      prisma.service.findMany({ orderBy: { sortOrder: "asc" }, take: 6 }),
      prisma.service.count(),
      prisma.galleryImage.findMany({ orderBy: { sortOrder: "asc" }, take: 6 }),
      prisma.galleryImage.count(),
      prisma.googleReview.findMany({ orderBy: { sortOrder: "asc" }, take: 4 }),
      prisma.googleReview.count(),
      prisma.aboutSection.findFirst({ orderBy: { updatedAt: "desc" } }),
      prisma.contactSubmission.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
      prisma.contactSubmission.count({ where: { isRead: false } }),
    ]);

    return NextResponse.json({
      services,
      servicesCount,
      gallery,
      galleryCount,
      googleReviews,
      reviewsCount,
      about,
      contacts,
      unreadContacts,
    });
  } catch {
    return NextResponse.json({ error: "Failed to fetch dashboard data" }, { status: 500 });
  }
}
