// app/api/goose/route.js
import { NextResponse } from "next/server";
import { adminDb } from "../../../../lib/firebaseAdmin";

export const runtime = "nodejs";

const DOC = "dogs/goose";

export async function GET() {
  const snap = await adminDb.doc(DOC).get();
  const data = snap.exists ? snap.data() : null;
  return NextResponse.json({ data });
}

export async function PATCH(req) {
  const body = await req.json();
  await adminDb.doc(DOC).set(body, { merge: true });
  return NextResponse.json({ ok: true });
}
