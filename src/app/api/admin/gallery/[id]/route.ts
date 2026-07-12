import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const image = await prisma.galleryImage.findUnique({ where: { id } });
    if (!image) {
      return NextResponse.json({ error: "Image not found" }, { status: 404 });
    }
    return NextResponse.json(image);
  } catch {
    return NextResponse.json({ error: "Failed to fetch image" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const data = {
      title: String(body.title || ""),
      src: String(body.src || ""),
      alt: body.alt ? String(body.alt) : null,
      span: body.span ? String(body.span) : null,
      sortOrder: Number(body.sortOrder || 0),
      isActive: body.isActive !== undefined ? Boolean(body.isActive) : true,
    };
    const image = await prisma.galleryImage.update({ where: { id }, data });
    return NextResponse.json(image);
  } catch {
    return NextResponse.json({ error: "Failed to update gallery image" }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await prisma.galleryImage.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete gallery image" }, { status: 500 });
  }
}
