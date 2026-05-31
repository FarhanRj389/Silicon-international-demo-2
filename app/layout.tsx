import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter'
});

export const metadata: Metadata = {
  title: 'Silicon International | Industrial Automation & Software Engineering',
  description: 'Next-Gen Industrial Automation, PCB Design, Card Repair & Software Engineering Solutions. Your trusted B2B partner for industrial excellence.',
  keywords: ['Industrial Automation', 'PCB Design', 'Card Repair', 'Software Engineering', 'Crane SLI', 'Web Development', 'Pakistan'],
  authors: [{ name: 'Silicon International' }],
  openGraph: {
    title: 'Silicon International | Industrial Automation & Software Engineering',
    description: 'Next-Gen Industrial Automation, PCB Design, Card Repair & Software Engineering Solutions.',
    url: 'https://siliconpk.com',
    siteName: 'Silicon International',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#0f172a',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
