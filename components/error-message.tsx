import { CircleX } from 'lucide-react'
import { If } from './if'

type Props = { message: string | null }

export const ErrorMessage = ({ message }: Props) => {
  return (
    <If condition={message}>
      <div className="absolute md:w-1/2 left-1/2 -translate-x-1/2 bg-red-200 border border-red-500 p-3 rounded">
        <div className="flex items-center justify-center gap-2">
          <CircleX size={16} className="text-red-500" />
          <p className="text-sm">{message}</p>
        </div>
      </div>
    </If>
  )
}
