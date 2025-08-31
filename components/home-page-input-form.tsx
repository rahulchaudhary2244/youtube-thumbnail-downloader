'use client'
import { useState } from 'react'
import { InputForm } from './input-form'

type Props = { initialUrl: string }

export const HomePageInputForm = ({ initialUrl }: Props) => {
  const [url, setUrl] = useState(initialUrl)

  return <InputForm url={url} setUrl={setUrl} />
}
