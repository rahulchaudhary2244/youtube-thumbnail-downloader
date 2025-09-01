import { MetadataRoute } from 'next'
import { supabase } from '@/lib/supabase'

const baseUrl = 'https://youtube-thumbnail-downloader-easy.vercel.app'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { data: videos } = await supabase
    .from('videos')
    .select('video_id, created_at')

  const videoEntries =
    videos?.map((v) => ({
      url: `${baseUrl}/video/${v.video_id}`,
      lastModified: v.created_at,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })) ?? []

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...videoEntries,
  ]
}

// Revalidate sitemap every 24 hours
export const revalidate = 86400
