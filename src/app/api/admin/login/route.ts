import { NextRequest, NextResponse } from "next/server";
import { getSettings } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { pin } = await req.json();
    const settings = getSettings();

    if (!pin || pin !== settings.adminPin) {
      return NextResponse.json({ error: "Invalid Admin PIN. Access denied." }, { status: 401 });
    }

    const response = NextResponse.json({
      success: true,
      message: "Authentication successful",
      role: "admin",
    });

    // Set secure cookie
    response.cookies.set("sankalp_admin_token", "admin_authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Admin login error:", error);
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 });
  }
}
