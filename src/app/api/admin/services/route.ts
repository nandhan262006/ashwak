import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const items = await prisma.service.findMany({ orderBy: { sortOrder: "asc" } });
    return NextResponse.json(items);
  } catch {
    return NextResponse.json({ error: "Failed to fetch services" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = {
      title: String(body.title || ""),
      subtitle: body.subtitle ? String(body.subtitle) : null,
      description: body.description ? String(body.description) : null,
      image: body.image ? String(body.image) : null,
      sortOrder: Number(body.sortOrder || 0),
      isActive: body.isActive !== undefined ? Boolean(body.isActive) : true,
    };
    const service = await prisma.service.create({ data });
    return NextResponse.json(service, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create service" }, { status: 500 });
  }
}
