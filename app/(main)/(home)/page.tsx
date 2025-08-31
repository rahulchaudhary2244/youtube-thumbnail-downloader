import { HomePageInputForm } from '@/components/home-page-input-form'
import { extractVideoId } from '@/components/utils'
import { redirect } from 'next/navigation'

type Props = {
  searchParams: { v?: string }
}

export default async function Page({ searchParams }: Props) {
  const { v } = searchParams
  const videoId = extractVideoId(v ?? '')

  if (videoId) {
    redirect(`/video/${videoId}`)
  }

  return <HomePageInputForm />
}
