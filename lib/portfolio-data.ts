export type PortfolioCategoryId = 'pcb' | 'card-repair' | 'crane-sli' | 'web-dev'

export type PortfolioMediaType = 'image' | 'video'

export type PortfolioItem = {
  id: number
  title: string
  categoryId: PortfolioCategoryId
  categoryLabel: string
  mediaType: PortfolioMediaType
  mediaUrl: string
  thumbnailUrl?: string
  description: string
  scope: string
  metrics: string
}

export const portfolioFilters: { id: 'all' | PortfolioCategoryId; label: string }[] = [
  { id: 'all', label: 'All Projects' },
  { id: 'pcb', label: 'PCB Design' },
  { id: 'card-repair', label: 'Card Repair' },
  { id: 'crane-sli', label: 'Crane SLI' },
  { id: 'web-dev', label: 'Web & Apps' },
]

/** Replace mediaUrl with your uploaded files in /public/portfolio/ */
export const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    title: 'Multi-Layer PCB for Automation Controller',
    categoryId: 'pcb',
    categoryLabel: 'PCB Design',
    mediaType: 'image',
    mediaUrl: 'https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg',
    description: 'High-density 8-layer PCB design for industrial automation with EMI shielding.',
    scope: 'Schematic, Layout, Prototyping, Production',
    metrics: '99.8% First Pass Yield',
  },
  {
    id: 2,
    title: 'VFD Drive Repair — Siemens Series',
    categoryId: 'card-repair',
    categoryLabel: 'Card Repair',
    mediaType: 'image',
    mediaUrl: 'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg',
    description: 'Board-level repair including IGBT replacement and control board refurbishment.',
    scope: 'Diagnostics, Component Replacement, Testing',
    metrics: '48hr Turnaround',
  },
  {
    id: 3,
    title: 'B2B E-Commerce Industrial Parts',
    categoryId: 'web-dev',
    categoryLabel: 'Web & Apps',
    mediaType: 'image',
    mediaUrl: 'https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg',
    description: 'Full-featured B2B store with inventory and payment integrations.',
    scope: 'UI/UX, Next.js, Backend, Payments',
    metrics: '300% Sales Growth',
  },
  {
    id: 4,
    title: 'Port Crane SLI Installation',
    categoryId: 'crane-sli',
    categoryLabel: 'Crane SLI',
    mediaType: 'image',
    mediaUrl: 'https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg',
    description: 'Safe Load Indicator system with real-time monitoring dashboard.',
    scope: 'Hardware, Software, Installation, Training',
    metrics: 'Zero Safety Incidents',
  },
  {
    id: 5,
    title: 'Medical Grade Power Supply PCB',
    categoryId: 'pcb',
    categoryLabel: 'PCB Design',
    mediaType: 'image',
    mediaUrl: 'https://images.pexels.com/photos/159275/machine-technology-computer-board-159275.jpeg',
    description: 'Isolated power supply with strict compliance and noise filtering.',
    scope: 'Design, Compliance Testing, Certification',
    metrics: 'IEC 60601 Ready',
  },
  {
    id: 6,
    title: 'Allen Bradley PLC Emergency Repair',
    categoryId: 'card-repair',
    categoryLabel: 'Card Repair',
    mediaType: 'video',
    mediaUrl: 'https://videos.pexels.com/video-files/4426266/4426266-sd_640_360_25fps.mp4',
    thumbnailUrl: 'https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg',
    description: 'Emergency PLC module repair for continuous production lines.',
    scope: 'Emergency Service, Repair, Warranty',
    metrics: '24hr Emergency SLA',
  },
  {
    id: 7,
    title: 'Corporate Engineering Portfolio Website',
    categoryId: 'web-dev',
    categoryLabel: 'Web & Apps',
    mediaType: 'video',
    mediaUrl: 'https://videos.pexels.com/video-files/3129957/3129957-sd_640_360_30fps.mp4',
    thumbnailUrl: 'https://images.pexels.com/photos/3184357/pexels-photo-3184357.jpeg',
    description: 'Premium corporate site with SEO and lead capture.',
    scope: 'Design, Development, SEO, Analytics',
    metrics: '150% More Leads',
  },
  {
    id: 8,
    title: 'Warehouse Crane Automation',
    categoryId: 'crane-sli',
    categoryLabel: 'Crane SLI',
    mediaType: 'video',
    mediaUrl: 'https://videos.pexels.com/video-files/4489742/4489742-sd_640_360_25fps.mp4',
    thumbnailUrl: 'https://images.pexels.com/photos/4489742/pexels-photo-4489742.jpeg',
    description: 'Load cells, anti-collision, and PLC integration for warehouse cranes.',
    scope: 'PLC, HMI, Commissioning',
    metrics: '40% Efficiency Gain',
  },
]
