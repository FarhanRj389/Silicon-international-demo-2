import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/seo'
import { serviceIds } from '@/components/services-content'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ['', '/about', '/portfolio', '/services', '/contact'].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: path === '' ? 1 : 0.8,
  }))

  const serviceRoutes = serviceIds.map((id) => ({
    url: `${SITE_URL}/services/${id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticRoutes, ...serviceRoutes]
}
