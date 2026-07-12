import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const review = await prisma.googleReview.findUnique({ where: { id } });
    if (!review) {
      return NextResponse.json({ error: "Review not found" }, { status: 404 });
    }
    return NextResponse.json(review);
  } catch {
    return NextResponse.json({ error: "Failed to fetch review" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const data = {
      name: String(body.name || ""),
      text: String(body.text || ""),
      rating: Number(body.rating || 5),
      date: body.date ? String(body.date) : null,
      isActive: body.isActive !== undefined ? Boolean(body.isActive) : true,
      sortOrder: Number(body.sortOrder || 0),
    };
    const review = await prisma.googleReview.update({ where: { id }, data });
    return NextResponse.json(review);
  } catch {
    return NextResponse.json({ error: "Failed to update review" }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await prisma.googleReview.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete review" }, { status: 500 });
  }
}
