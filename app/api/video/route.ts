import { supabase } from '@/lib/supabase'
import { NextResponse } from 'next/server'

const fetchVideoData = async (videoId: string) => {
  const url = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`

  try {
    const res = await fetch(url, { next: { revalidate: 86400 } }) // cache for 1 day
    if (!res.ok) throw new Error('Failed to fetch video metadata')
    return res.json()
  } catch {
    return null
  }
}

// Example GET /api/video?v=videoId
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const videoId = searchParams.get('v')

  if (!videoId)
    return NextResponse.json({ error: 'No videoId' }, { status: 400 })

  // Check if already exists
  const { data } = await supabase
    .from('videos')
    .select('*')
    .eq('video_id', videoId)
    .maybeSingle()

  if (data) {
    return NextResponse.json(data)
  }

  // Fetch video title via YouTube API
  const ytData = await fetchVideoData(videoId)
  const title = ytData?.title ?? null

  // Insert into DB
  const { data: inserted } = await supabase
    .from('videos')
    .insert([{ video_id: videoId, title }])
    .select()
    .single()

  return NextResponse.json(inserted)
}
