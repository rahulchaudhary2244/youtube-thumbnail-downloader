'use client'
import { useState } from 'react'
import { InputForm } from './input-form'

export const HomePageInputForm = () => {
  const [url, setUrl] = useState('')

  return <InputForm url={url} setUrl={setUrl} />
}
