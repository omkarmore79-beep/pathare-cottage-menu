import { NextResponse } from "next/server";
import { listR2Objects } from "@/lib/r2";

export const runtime = "nodejs";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    // examples:
    // /api/admin/r2-list?prefix=dishes/
    // /api/admin/r2-list?prefix=alcohol/
    // /api/admin/r2-list?prefix=pathare-new/alcohol/
    const prefix = searchParams.get("prefix") ?? "";

    const items = await listR2Objects(prefix);

    return NextResponse.json({ ok: true, items });
  } catch (err: any) {
    console.error("r2-list error:", err);
    return NextResponse.json(
      { ok: false, error: err?.message ?? "Unknown error" },
      { status: 500 }
    );
  }
}
