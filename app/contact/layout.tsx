import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata({
  title: 'Contact Us',
  description:
    'Contact Silicon International for PCB design quotes, industrial card repair, crane SLI consultation, and software projects. Lahore, Pakistan — phone, email, WhatsApp.',
  path: '/contact',
  keywords: [
    'contact Silicon International',
    'industrial engineering quote Lahore',
    'PCB design quote Pakistan',
  ],
})

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
