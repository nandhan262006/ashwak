import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const items = await prisma.googleReview.findMany({ orderBy: { sortOrder: "asc" } });
    return NextResponse.json(items);
  } catch {
    return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = {
      name: String(body.name || ""),
      text: String(body.text || ""),
      rating: Number(body.rating || 5),
      date: body.date ? String(body.date) : null,
      isActive: body.isActive !== undefined ? Boolean(body.isActive) : true,
      sortOrder: Number(body.sortOrder || 0),
    };
    const review = await prisma.googleReview.create({ data });
    return NextResponse.json(review, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create review" }, { status: 500 });
  }
}
