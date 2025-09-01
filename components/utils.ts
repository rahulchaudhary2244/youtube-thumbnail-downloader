export const extractVideoId = (input: string) => {
  if (/^[a-zA-Z0-9_-]{11}$/.test(input)) {
    return input
  }
  const regex =
    /(?:v=|\/(?:shorts|live|embed|watch)\/|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  const match = input.match(regex)
  return match ? match[1] : null
}

export const getFullImageUrl = (videoId: string, resolutionType: string) => {
  return `https://img.youtube.com/vi/${videoId}/${resolutionType}.jpg` as const
}

export const fetchImage = async (videoId: string, resolutionType: string) => {
  const url = getFullImageUrl(videoId, resolutionType)
  const res = await fetch(url)
  const blob = await res.blob()
  return blob
}
