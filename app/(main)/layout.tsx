import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import '@/app/globals.css'
import Head from 'next/head'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Download YouTube Thumbnails in HD | Free Online Tool',
  description:
    'Easily download YouTube thumbnails in HD and 4K. Just paste the video URL to get instant images.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-zinc-50`}
      >
        <main className="min-h-screen p-10">
          <h1 className="text-2xl font-bold mb-4 text-center">
            🎬 YouTube Thumbnail Downloader
          </h1>
          {children}
        </main>
      </body>
    </html>
  )
}
