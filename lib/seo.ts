import type { Metadata } from 'next'

export const SITE_URL = 'https://siliconpk.com'
export const SITE_NAME = 'Silicon International'

export const BASE_KEYWORDS = [
  'Silicon International',
  'industrial automation Pakistan',
  'PCB design Lahore',
  'PCB manufacturing Pakistan',
  'industrial card repair',
  'VFD repair Pakistan',
  'PLC repair services',
  'crane SLI systems',
  'safe load indicator',
  'industrial engineering solutions',
  'web development for industry',
  'B2B software development',
  'Silicon Parts Hub',
  'electronic components Pakistan',
  'factory automation',
  'SCADA HMI development',
]

type BuildMetadataOptions = {
  title: string
  description: string
  path?: string
  keywords?: string[]
  image?: string
}

export function buildMetadata({
  title,
  description,
  path = '',
  keywords = [],
  image = '/silicon_int_1.jpeg',
}: BuildMetadataOptions): Metadata {
  const url = `${SITE_URL}${path}`
  const fullTitle = path === '' || path === '/' ? title : `${title} | ${SITE_NAME}`

  return {
    metadataBase: new URL(SITE_URL),
    title: fullTitle,
    description,
    keywords: [...BASE_KEYWORDS, ...keywords],
    authors: [{ name: SITE_NAME }],
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      type: 'website',
      locale: 'en_PK',
      images: [{ url: image, alt: SITE_NAME }],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [image],
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}
