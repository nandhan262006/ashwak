import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const items = await prisma.galleryImage.findMany({ orderBy: { sortOrder: "asc" } });
    return NextResponse.json(items);
  } catch {
    return NextResponse.json({ error: "Failed to fetch gallery" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = {
      title: String(body.title || ""),
      src: String(body.src || ""),
      alt: body.alt ? String(body.alt) : null,
      span: body.span ? String(body.span) : null,
      sortOrder: Number(body.sortOrder || 0),
      isActive: body.isActive !== undefined ? Boolean(body.isActive) : true,
    };
    const image = await prisma.galleryImage.create({ data });
    return NextResponse.json(image, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create gallery image" }, { status: 500 });
  }
}
