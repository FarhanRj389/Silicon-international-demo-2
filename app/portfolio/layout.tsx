import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata({
  title: 'Portfolio',
  description:
    'View Silicon International project portfolio: PCB design, industrial card repair, crane SLI systems, and web & mobile apps — images and videos by service category.',
  path: '/portfolio',
  keywords: [
    'PCB design portfolio Pakistan',
    'industrial repair projects',
    'crane SLI portfolio',
    'B2B web development projects',
  ],
})

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return children
}
