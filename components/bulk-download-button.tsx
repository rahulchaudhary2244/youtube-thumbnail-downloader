import { Archive } from 'lucide-react'
import { If } from './if'
import { Button } from './ui/button'

type Props = {
  handleBulkDownload: () => Promise<void>
  downloading: boolean
}

export const BulkDownloadButton = ({
  handleBulkDownload,
  downloading,
}: Props) => {
  return (
    <Button
      onClick={handleBulkDownload}
      disabled={downloading}
      className="cursor-pointer"
    >
      <If condition={downloading}>
        <span>Downloading…</span>
      </If>
      <If condition={!downloading}>
        <Archive size={16} /> Download All
      </If>
    </Button>
  )
}
