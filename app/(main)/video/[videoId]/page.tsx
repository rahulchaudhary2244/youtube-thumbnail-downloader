import { GenerateThumbnail } from '@/components/generate-thumbnail/generate-thumbnail'

type Props = {
  params: Promise<{ videoId: string }>
}

export default async function Page({ params }: Props) {
  const { videoId } = await params

  console.log(videoId)

  return <GenerateThumbnail videoId={videoId} />
}
