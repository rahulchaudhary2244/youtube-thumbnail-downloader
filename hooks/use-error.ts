import { useEffect, useState } from 'react'

const HIDE_ERROR_AFTER_MS = 3000

export const useError = (initialState: string | null) => {
  const [error, setError] = useState<string | null>(initialState)

  useEffect(() => {
    if (error) {
      const timerId = setTimeout(() => {
        setError(null)
      }, HIDE_ERROR_AFTER_MS)

      return () => clearTimeout(timerId)
    }
  }, [error])

  return [error, setError] as const
}
