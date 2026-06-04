/** Resize external CDN images to reduce payload on mobile */
export function optimizeImageUrl(src: string, width = 800): string {
  if (!src) return src
  try {
    const url = new URL(src)
    if (url.hostname.includes('unsplash.com') || url.hostname.includes('images.unsplash.com')) {
      url.searchParams.set('w', String(width))
      url.searchParams.set('q', '75')
      url.searchParams.set('auto', 'format')
      return url.toString()
    }
    if (url.hostname.includes('images.pexels.com')) {
      url.searchParams.set('auto', 'compress')
      url.searchParams.set('cs', 'tinysrgb')
      url.searchParams.set('w', String(width))
      url.searchParams.set('dpr', '1')
      return url.toString()
    }
    if (url.hostname.includes('videos.pexels.com')) {
      return src
        .replace(/uhd_2560_1440/, 'sd_640_360')
        .replace(/hd_1920_1080/, 'sd_640_360')
        .replace(/hd_1280_720/, 'sd_640_360')
    }
  } catch {
    return src
  }
  return src
}

export function optimizeVideoUrl(src: string): string {
  if (!src) return src
  return src
    .replace(/uhd_2560_1440/, 'sd_640_360')
    .replace(/hd_1920_1080/, 'sd_640_360')
    .replace(/hd_1280_720/, 'sd_640_360')
}
