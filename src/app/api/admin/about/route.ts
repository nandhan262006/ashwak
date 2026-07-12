import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const item = await prisma.aboutSection.findFirst();
    return NextResponse.json(item || null);
  } catch {
    return NextResponse.json({ error: "Failed to fetch about section" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = {
      title: String(body.title || ""),
      content: String(body.content || ""),
      image: body.image ? String(body.image) : null,
      tags: body.tags ? String(body.tags) : null,
    };
    const existing = await prisma.aboutSection.findFirst();
    if (existing) {
      const updated = await prisma.aboutSection.update({ where: { id: existing.id }, data });
      return NextResponse.json(updated);
    }
    const created = await prisma.aboutSection.create({ data });
    return NextResponse.json(created, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to upsert about section" }, { status: 500 });
  }
}
