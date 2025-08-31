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
  title: 'YouTube Thumbnail Downloader',
  description: 'Download YouTube video thumbnails easily.',
  openGraph: {},
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <Head>
        <meta
          property="og:description"
          content="Download YouTube video thumbnails easily."
        />
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
              description: 'Download YouTube video thumbnails easily.',
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
