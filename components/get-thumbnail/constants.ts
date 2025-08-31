export const THUMBNAIL_VARIANTS = [
  {
    key: 'maxresdefault',
    label: 'Maximum Resolution',
    resolution: '1280x720',
    quality: 'Full HD',
  },

  {
    key: 'sddefault',
    label: 'Standard Definition',
    resolution: '640x480',
    quality: 'SD+',
  },
  {
    key: 'hqdefault',
    label: 'High Quality',
    resolution: '480x360',
    quality: 'HD',
  },
  {
    key: '0',
    label: 'Thumbnail 0',
    resolution: '480x360',
    quality: 'HD (Static)',
  },
  {
    key: 'mqdefault',
    label: 'Medium Quality',
    resolution: '320x180',
    quality: 'SD',
  },
  { key: 'default', label: 'Default', resolution: '120x90', quality: 'Low' },
] as const
