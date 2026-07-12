import { NextRequest, NextResponse } from "next/server";
import { createToken, validatePassword } from "@/lib/auth";

const loginAttempts = new Map<string, number[]>();
const MAX_ATTEMPTS = 5;
const WINDOW = 15 * 60 * 1000; // 15 minutes

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const times = (loginAttempts.get(ip) || []).filter((t) => now - t < WINDOW);
  loginAttempts.set(ip, times);
  return times.length >= MAX_ATTEMPTS;
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many login attempts. Please try again later." },
        { status: 429 }
      );
    }

    const { password } = await request.json();
    if (!password) {
      return NextResponse.json({ error: "Password required" }, { status: 400 });
    }
    const valid = await validatePassword(password);
    if (!valid) {
      loginAttempts.get(ip)?.push(Date.now());
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }
    loginAttempts.delete(ip);
    const token = await createToken();
    const response = NextResponse.json({ success: true });
    response.cookies.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24,
    });
    return response;
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
