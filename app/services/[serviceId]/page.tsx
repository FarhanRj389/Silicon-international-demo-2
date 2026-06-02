import { notFound } from 'next/navigation'
import { ServiceDetailView } from '@/components/service-detail-view'
import { getServiceById } from '@/components/services-content'

type ServiceDetailPageProps = {
  params: Promise<{
    serviceId: string
  }>
}

export default async function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const { serviceId } = await params

  if (!getServiceById(serviceId)) {
    notFound()
  }

  return <ServiceDetailView serviceId={serviceId} />
}
