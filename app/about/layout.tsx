import { OrganizationJsonLd } from '@/components/json-ld'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata({
  title: 'About Us | Silicon International Since 1975',
  description:
    'Silicon International — founded in 1975 by Chief Engineer Nasir Ahmed. UK & Japan trained electronic engineering, R&D, reverse engineering, crane safe load indicators, fire alarm systems, load cells, and industrial electronics repair in Pakistan.',
  path: '/about',
  keywords: [
    'Silicon International Pakistan',
    'Nasir Ahmed Chief Engineer',
    'electronic engineering company since 1975',
    'reverse engineering defence crane CNC',
    'crane safe load indicator manufacturer',
    'fire alarm systems Pakistan',
    'load cell weighing scales',
    'smoke sensor Minerva compatible',
    'central clock system industrial',
    'R&D electronic systems Pakistan',
    'DSP processing systems',
    'wind anemometer industrial',
  ],
})

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <OrganizationJsonLd />
      {children}
    </>
  )
}
