import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret')
  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ ok: false, error: 'Invalid secret' }, { status: 401 })
  }

  // Revalidate paths you care about
  try {
    revalidatePath('/')              // homepage
    // revalidatePath('/blog')       // add others if you have them
    return NextResponse.json({ ok: true, revalidated: ['/', /* '/blog' */] })
  } catch (e) {
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 })
  }
}
