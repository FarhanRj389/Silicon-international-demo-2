  import { HomePageClient } from '@/components/home-page-client'
  import { OrganizationJsonLd } from '@/components/json-ld'
  import { buildMetadata } from '@/lib/seo'

  export const metadata = buildMetadata({
    title: 'Silicon International | Industrial Automation, PCB Design & Software Engineering',
    description:
      'Silicon International delivers PCB design & manufacturing, industrial card repair, crane SLI automation, and web/app development for B2B clients across Pakistan.',
    path: '/',
    keywords: [
      'industrial automation Lahore',
      'PCB design company Pakistan',
      'crane safe load indicator',
      'industrial electronics repair',
    ],
  })

  export default function HomePage() {
    return (
      <>
        <OrganizationJsonLd />
        <HomePageClient />
      </>
    )
  }
