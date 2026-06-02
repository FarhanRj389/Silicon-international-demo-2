import type { Metadata } from 'next'
import { getServiceById, serviceIds } from '@/components/services-content'
import { buildMetadata } from '@/lib/seo'

type LayoutProps = {
  children: React.ReactNode
  params: Promise<{ serviceId: string }>
}

export function generateStaticParams() {
  return serviceIds.map((serviceId) => ({ serviceId }))
}

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
  const { serviceId } = await params
  const service = getServiceById(serviceId)

  if (!service) {
    return buildMetadata({
      title: 'Service Not Found',
      description: 'The requested service could not be found.',
      path: `/services/${serviceId}`,
    })
  }

  return buildMetadata({
    title: service.title,
    description: `${service.tagline}. ${service.description.slice(0, 140)}…`,
    path: `/services/${serviceId}`,
    keywords: [
      service.label,
      service.title,
      'Silicon International',
      'industrial services Pakistan',
      ...service.industries.slice(0, 3),
    ],
    image: service.image,
  })
}

export default function ServiceDetailLayout({ children }: LayoutProps) {
  return children
}
