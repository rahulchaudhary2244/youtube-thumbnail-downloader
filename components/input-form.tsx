'use client'

import { useError } from '@/hooks/use-error'
import { extractVideoId } from './utils'
import { useRouter } from 'next/navigation'
import { Input } from './ui/input'
import { If } from './if'
import { Button } from './ui/button'
import { X } from 'lucide-react'
import { ErrorMessage } from './error-message'
import { Dispatch, SetStateAction } from 'react'

type Props = {
  url: string
  setUrl: Dispatch<SetStateAction<string>>
}

export const InputForm = ({ url, setUrl }: Props) => {
  const [error, setError] = useError(null)
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    try {
      e.preventDefault()
      const id = extractVideoId(url)
      if (id) {
        router.push(`/video/${id}`)
      } else {
        setError('Invalid YouTube URL or ID')
      }
    } catch {
      setError('Something went wrong!')
    }
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
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

      <ErrorMessage message={error} />
    </>
  )
}
