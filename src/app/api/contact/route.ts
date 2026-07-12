import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const submissions = new Map<string, number[]>();
const RATE_LIMIT = 5; // max submissions
const WINDOW = 60 * 60 * 1000; // 1 hour

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const times = (submissions.get(ip) || []).filter((t) => now - t < WINDOW);
  submissions.set(ip, times);
  return times.length >= RATE_LIMIT;
}

function sanitize(str: unknown, max = 500): string {
  if (typeof str !== "string") return "";
  return str.replace(/[<>"'&]/g, "").trim().slice(0, max);
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many submissions. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const name = sanitize(body.name, 100);
    const email = sanitize(body.email, 200);
    const phone = sanitize(body.phone, 20);
    const date = sanitize(body.date, 20);
    const eventType = sanitize(body.eventType, 50);
    const message = sanitize(body.message, 2000);

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    // Basic email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    submissions.get(ip)?.push(Date.now());

    const submission = await prisma.contactSubmission.create({
      data: { name, email, phone, date, eventType, message },
    });

    return NextResponse.json(submission, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create submission" }, { status: 500 });
  }
}
