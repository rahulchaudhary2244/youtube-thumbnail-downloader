import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function Loading() {
  return (
    <form className="flex max-w-2xl mb-6 mx-auto space-x-2">
      <div className="relative flex-1">
        <Input
          type="text"
          placeholder="Paste YouTube link here"
          className="pr-10"
        />
      </div>
      <Button type="submit" className="cursor-pointer">
        Get Thumbnail
      </Button>
    </form>
  )
}
