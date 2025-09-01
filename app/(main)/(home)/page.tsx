import { HomePageInputForm } from '@/components/home-page-input-form'
import { extractVideoId } from '@/components/utils'
import Head from 'next/head'
import { redirect } from 'next/navigation'

type Props = {
  searchParams: Promise<{ v?: string }>
}

export default async function Page({ searchParams }: Props) {
  const { v } = await searchParams

  const videoId = extractVideoId(v ?? '')

  if (videoId) {
    redirect(`/video/${videoId}`)
  }

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: 'YouTube Thumbnail Downloader',
              url: 'https://youtube-thumbnail-downloader-easy.vercel.app/',
              applicationCategory: 'Utilities',
              operatingSystem: 'All',
              description: 'Instantly download YouTube video thumbnails.',
              creator: {
                '@type': 'Person',
                name: 'Rahul Chaudhary',
              },
            }),
          }}
        />
      </Head>
      <h1 className="text-2xl font-bold mb-4 text-center">
        🎬 YouTube Thumbnail Downloader
      </h1>
      <HomePageInputForm initialUrl={v ?? ''} />
    </>
  )
}
