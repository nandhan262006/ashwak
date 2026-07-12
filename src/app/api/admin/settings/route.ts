import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const items = await prisma.siteSetting.findMany();
    return NextResponse.json(items);
  } catch {
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { key, value } = await request.json();
    if (!key) {
      return NextResponse.json({ error: "Key is required" }, { status: 400 });
    }
    const existing = await prisma.siteSetting.findUnique({ where: { key } });
    if (existing) {
      const updated = await prisma.siteSetting.update({ where: { key }, data: { value } });
      return NextResponse.json(updated);
    }
    const created = await prisma.siteSetting.create({ data: { key, value } });
    return NextResponse.json(created, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to upsert setting" }, { status: 500 });
  }
}
