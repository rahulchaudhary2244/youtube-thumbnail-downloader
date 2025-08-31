import { PropsWithChildren } from 'react'

type Props = PropsWithChildren<{
  condition: boolean | string | number | undefined | null
}>

export const If = ({ condition, children }: Props) => {
  if (!condition) return null

  return <>{children}</>
}
