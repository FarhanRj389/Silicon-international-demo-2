import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata({
  title: 'Our Services',
  description:
    'PCB design & manufacturing, industrial card repair, crane SLI automation, and web & app development — comprehensive industrial engineering services in Pakistan.',
  path: '/services',
  keywords: [
    'PCB manufacturing services',
    'VFD PLC repair',
    'crane load indicator Pakistan',
    'industrial web development',
  ],
})

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children
}
