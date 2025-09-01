import Head from 'next/head'

type Props = {
  videoId: string
  title: string
  description?: string
  uploadDate?: string
  thumbnailUrl?: string
  channelName?: string
}

export const VideoSchemaJsonLd = ({
  videoId,
  title,
  description = '',
  uploadDate = new Date().toISOString(),
  thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
  channelName = 'Your Channel Name',
}: Props) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: title,
    description: description,
    thumbnailUrl: [thumbnailUrl],
    uploadDate: uploadDate,
    embedUrl: `https://www.youtube.com/embed/${videoId}`,
    contentUrl: `https://www.youtube.com/watch?v=${videoId}`,
    author: {
      '@type': 'Person',
      name: channelName,
    },
    publisher: {
      '@type': 'Organization',
      name: channelName,
      logo: {
        '@type': 'ImageObject',
        url: '/logo.png',
      },
    },
  }

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </Head>
  )
}
