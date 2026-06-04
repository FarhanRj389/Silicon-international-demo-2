import { SITE_NAME, SITE_URL } from '@/lib/seo'

type JsonLdProps = {
  data: Record<string, unknown>
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export function OrganizationJsonLd() {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: SITE_NAME,
        url: SITE_URL,
        logo: `${SITE_URL}/sologen.webp`,
        foundingDate: '1975',
        founder: {
          '@type': 'Person',
          name: 'Nasir Ahmed',
          jobTitle: 'Chief Engineer',
        },
        description:
          'Founded in 1975. Electronic engineering, R&D, reverse engineering, crane safe load indicators, fire alarm systems, load cells, and industrial electronics in Pakistan.',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Lahore',
          addressCountry: 'PK',
        },
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+92-344-2279244',
          contactType: 'customer service',
          email: 'info@siliconpk.com',
        },
        sameAs: [
          'https://www.facebook.com/siliconpartshub/',
          'https://siliconpartshub.com',
        ],
      }}
    />
  )
}
