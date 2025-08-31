'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'
import { If } from '@/components/if'
import JSZip from 'jszip'
import { saveAs } from 'file-saver'
import { Archive, ArrowDownToLine, CircleX, Eye, X } from 'lucide-react'

const thumbnailVariants = [
  {
    key: 'maxresdefault',
    label: 'Maximum Resolution',
    resolution: '1280x720',
    quality: 'Full HD',
  },

  {
    key: 'sddefault',
    label: 'Standard Definition',
    resolution: '640x480',
    quality: 'SD+',
  },
  {
    key: 'hqdefault',
    label: 'High Quality',
    resolution: '480x360',
    quality: 'HD',
  },
  {
    key: '0',
    label: 'Thumbnail 0',
    resolution: '480x360',
    quality: 'HD (Static)',
  },
  {
    key: 'mqdefault',
    label: 'Medium Quality',
    resolution: '320x180',
    quality: 'SD',
  },
  { key: 'default', label: 'Default', resolution: '120x90', quality: 'Low' },
]

export default function Home() {
  const [url, setUrl] = useState('')
  const [videoId, setVideoId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [downloading, setDownloading] = useState(false)

  const extractVideoId = (youtubeUrl: string) => {
    const regex = /(?:youtube\.com\/.*v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    const match = youtubeUrl.match(regex)
    return match ? match[1] : null
  }

  const handleGenerate = (e?: React.FormEvent) => {
    e?.preventDefault()
    const id = extractVideoId(url)
    if (id) {
      setVideoId(id)
      setError(null)
    } else {
      setVideoId(null)
      setError('Invalid YouTube URL or ID')
    }
  }

  const handleDownloadAll = async () => {
    if (!videoId) return
    setDownloading(true)
    try {
      const zip = new JSZip()

      await Promise.all(
        thumbnailVariants.map(async ({ key, label }) => {
          const imageUrl = `https://img.youtube.com/vi/${videoId}/${key}.jpg`
          const res = await fetch(imageUrl)
          const blob = await res.blob()
          zip.file(`${label.replace(/\s+/g, '_')}.jpg`, blob)
        })
      )

      const content = await zip.generateAsync({ type: 'blob' })
      saveAs(content, `youtube-thumbnails-${videoId}.zip`)
    } catch (err) {
      console.error('Error downloading thumbnails:', err)
    } finally {
      setDownloading(false)
    }
  }

  return (
    <main className="min-h-screen p-10">
      <h1 className="text-2xl font-bold mb-4 text-center">
        🎬 YouTube Thumbnail Downloader
      </h1>
      <form
        onSubmit={handleGenerate}
        className="flex max-w-2xl mb-6 mx-auto space-x-2"
      >
        <div className="relative flex-1">
          <Input
            type="text"
            placeholder="Paste YouTube link here"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="pr-10"
          />
          <If condition={url}>
            <button
              type="button"
              onClick={() => setUrl('')}
              className="absolute cursor-pointer right-2 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-gray-200 text-gray-500 hover:text-black transition"
            >
              <X size={16} />
            </button>
          </If>
        </div>

        <Button type="submit" className="cursor-pointer">
          Get Thumbnail
        </Button>
      </form>

      <If condition={error}>
        <div className="flex items-center justify-center gap-2 text-red-500">
          <CircleX size={16} />
          <p className="text-sm">{error}</p>
        </div>
      </If>

      <If condition={videoId}>
        <Card className="w-full max-w-full lg:max-w-6xl mx-auto p-6">
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">Preview:</h2>
                <div className="flex justify-end">
                  <Button
                    onClick={handleDownloadAll}
                    disabled={downloading}
                    className="cursor-pointer"
                  >
                    {downloading ? (
                      'Downloading…'
                    ) : (
                      <>
                        <Archive size={16} /> Download All
                      </>
                    )}
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {thumbnailVariants.map(
                  ({ key, label, resolution, quality }) => (
                    <div
                      key={key}
                      className="border rounded-md p-2 flex flex-col justify-between"
                    >
                      <Image
                        src={`https://img.youtube.com/vi/${videoId}/${key}.jpg`}
                        alt={label}
                        width={480}
                        height={270}
                        className="w-full rounded-md"
                      />
                      <div className="mt-2 flex flex-col text-sm">
                        <p className="font-medium">{label}</p>
                        <p className="text-gray-500">
                          {resolution} • {quality}
                        </p>
                        <div className="flex justify-between">
                          <a
                            href={`https://img.youtube.com/vi/${videoId}/${key}.jpg`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 text-sm flex items-center gap-1"
                          >
                            <Eye size={16} />
                            <span>View</span>
                          </a>
                          <Button
                            variant="outline"
                            size="sm"
                            className="cursor-pointer"
                            onClick={async () => {
                              const url = `https://img.youtube.com/vi/${videoId}/${key}.jpg`
                              const res = await fetch(url)
                              const blob = await res.blob()
                              saveAs(blob, `${label.replace(/\s+/g, '_')}.jpg`)
                            }}
                          >
                            <ArrowDownToLine size={14} className="mr-1" />
                            Download
                          </Button>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </If>
    </main>
  )
}
