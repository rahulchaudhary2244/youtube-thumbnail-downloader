import { GenerateThumbnail } from '@/components/generate-thumbnail/generate-thumbnail'
import { extractVideoId, getFullImageUrl } from '@/components/utils'
import { Metadata } from 'next'

type Props = {
  params: Promise<{ videoId: string }>
}

const getPageTitle = (title: string) => {
  return `YouTube Thumbnail Downloader - ${title}`
}

const fetchVideo = async (videoId: string) => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL
    const res = await fetch(`${baseUrl}/api/video?v=${videoId}`)
    const data = await res.json()
    return data as { title: string; video_id: string }
  } catch (err) {
    console.error('Error fetching video', err)
    return {
      title: 'Free best quality YouTube thumbnails',
      video_id: 'ygJcTggSQQU',
    }
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { videoId } = await params

  const id = extractVideoId(videoId)
  if (id === null) return {}

  const { title } = await fetchVideo(id)

  const description = `Download high-quality thumbnails from the YouTube video: ${title}`
  const pageTitle = getPageTitle(title)

  return {
    title: pageTitle,
    description,
    openGraph: {
      title: pageTitle,
      description,
      url: `https://youtube-thumbnail-downloader-easy.vercel.app/video/${id}`,
      images: [getFullImageUrl(id, 'hqdefault')],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [getFullImageUrl(id, 'hqdefault')],
    },
  }
}

export default async function Page({ params }: Props) {
  const { videoId } = await params

  const id = extractVideoId(videoId)

  if (id === null) return null

  const { title } = await fetchVideo(id)
  const pageTitle = getPageTitle(title)

  return (
    <>
      <h1 className="text-2xl font-bold mb-4 text-center">🎬 {pageTitle}</h1>
      <GenerateThumbnail videoId={id} />
    </>
  )
}
