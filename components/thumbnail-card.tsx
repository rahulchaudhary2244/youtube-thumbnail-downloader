import Image from 'next/image'
import { fetchImage, getFullImageUrl } from './utils'
import { ArrowDownToLine, Eye } from 'lucide-react'
import { Button } from './ui/button'
import Link from 'next/link'
import { useMemo } from 'react'

type Props = {
  videoId: string
  resolutionType: string
  label: string
  resolution: string
  quality: string
  handleSingleDownload: (label: string, resolutionType: string) => Promise<void>
}

export const ThumbnailCard = ({
  videoId,
  resolutionType,
  label,
  resolution,
  quality,
  handleSingleDownload,
}: Props) => {
  const fullImageUrl = useMemo(
    () => getFullImageUrl(videoId, resolutionType),
    [videoId, resolutionType]
  )

  return (
    <div className="border rounded-md p-2 flex flex-col justify-between">
      <Image
        src={fullImageUrl}
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
          <Link
            href={fullImageUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 text-sm flex items-center gap-1"
          >
            <Eye size={16} />
            <span>View</span>
          </Link>
          <Button
            variant="outline"
            size="sm"
            className="cursor-pointer"
            onClick={() => handleSingleDownload(label, resolutionType)}
          >
            <ArrowDownToLine size={14} className="mr-1" />
            Download
          </Button>
        </div>
      </div>
    </div>
  )
}
