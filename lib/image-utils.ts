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
    if (url.hostname.includes('pexels.com')) {
      return src.replace(/uhd_2560_1440/, 'hd_1280_720').replace(/w=\d+/, `w=${width}`)
    }
  } catch {
    return src
  }
  return src
}
