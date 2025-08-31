import { GenerateThumbnail } from '@/components/generate-thumbnail/generate-thumbnail'

type Props = {
  params: Promise<{ videoId: string }>
}

const fetchVideoData = async (videoId: string) => {
  const url = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`

  try {
    const res = await fetch(url, { next: { revalidate: 86400 } }) // cache for 1 day
    if (!res.ok) throw new Error('Failed to fetch video metadata')
    return res.json()
  } catch (error) {
    return null
  }
}

export const generateMetadata = async ({ params }: Props) => {
  const { videoId } = await params
  const data = await fetchVideoData(videoId)

  if (!data) {
    return {
      title: 'YouTube Thumbnail Downloader',
      description: 'Download YouTube video thumbnails in HD.',
    }
  }

  return {
    title: `${data.title} - YouTube Thumbnail Downloader`,
    description: `Download the thumbnail of "${data.title}" from ${data.author_name} in best quality.`,
    openGraph: {
      title: `${data.title} - YouTube Thumbnail Downloader`,
      description: `Download the thumbnail of "${data.title}" in best quality.`,
      url: `https://youtube-thumbnail-downloader-easy.vercel.app/video/${videoId}`,
      type: 'website',
    },
  }
}

export default async function Page({ params }: Props) {
  const { videoId } = await params

  return <GenerateThumbnail videoId={videoId} />
}
