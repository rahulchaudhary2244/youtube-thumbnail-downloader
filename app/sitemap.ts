import { MetadataRoute } from 'next'

export const revalidate = 60 * 60

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://youtube-thumbnail-downloader-easy.vercel.app'

  const videoIds = ['dQw4w9WgXcQ', '9bZkp7q19f0']

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    ...(videoIds.map((id) => ({
      url: `${baseUrl}/video/${id}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    })) satisfies MetadataRoute.Sitemap),
    ...(videoIds.map((id) => ({
      url: `${baseUrl}/?v=${id}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    })) satisfies MetadataRoute.Sitemap),
  ]
}
