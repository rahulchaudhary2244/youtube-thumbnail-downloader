'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { If } from '@/components/if'
import JSZip from 'jszip'
import { saveAs } from 'file-saver'
import { THUMBNAIL_VARIANTS } from './constants'
import { fetchImage } from '../utils'
import { InputForm } from '../input-form'
import { ThumbnailCard } from '../thumbnail-card'
import { BulkDownloadButton } from '../bulk-download-button'

type Props = {
  videoId: string
}

export const GenerateThumbnail = ({ videoId }: Props) => {
  const [url, setUrl] = useState(videoId)
  const [downloading, setDownloading] = useState(false)

  const handleSingleDownload = async (
    label: string,
    resolutionType: string
  ) => {
    if (!videoId) return
    const blob = await fetchImage(videoId, resolutionType)
    saveAs(blob, `${label.replace(/\s+/g, '_')}.jpg`)
  }

  const handleBulkDownload = async () => {
    if (!videoId) return
    setDownloading(true)
    try {
      const zip = new JSZip()

      await Promise.all(
        THUMBNAIL_VARIANTS.map(async ({ resolutionType, label }) => {
          const blob = await fetchImage(videoId, resolutionType)
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
    <>
      <InputForm url={url} setUrl={setUrl} />

      <If condition={videoId}>
        <Card className="w-full max-w-full lg:max-w-6xl mx-auto p-6">
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">Preview:</h2>
                <div className="flex justify-end">
                  <BulkDownloadButton
                    downloading={downloading}
                    handleBulkDownload={handleBulkDownload}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {THUMBNAIL_VARIANTS.map(
                  ({ resolutionType, label, resolution, quality }) => (
                    <ThumbnailCard
                      key={resolutionType}
                      resolutionType={resolutionType}
                      videoId={videoId}
                      label={label}
                      resolution={resolution}
                      quality={quality}
                      handleSingleDownload={handleSingleDownload}
                    />
                  )
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </If>
    </>
  )
}
