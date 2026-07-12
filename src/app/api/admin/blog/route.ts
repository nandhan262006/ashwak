import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const items = await prisma.blogPost.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json(items);
  } catch {
    return NextResponse.json({ error: "Failed to fetch blog posts" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = {
      title: String(body.title || ""),
      slug: String(body.slug || ""),
      excerpt: body.excerpt ? String(body.excerpt) : null,
      content: body.content ? String(body.content) : null,
      coverImage: body.coverImage ? String(body.coverImage) : null,
      isPublished: Boolean(body.isPublished),
    };
    const post = await prisma.blogPost.create({ data });
    return NextResponse.json(post, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create blog post" }, { status: 500 });
  }
}
