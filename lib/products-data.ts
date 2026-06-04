// portfolioItems import HATAO - ab zaroorat nahi
// import { portfolioItems } from '@/lib/portfolio-data'  ← DELETE THIS

export type ProductCategoryId = 'all' | 'crane-sli' | 'card-services' | 'websites'

export type ProductItem = {
  id: string
  name: string
  categoryId: Exclude<ProductCategoryId, 'all'>
  description: string
  image: string
  formLabel: string
  highlights: string[]
}

const crane200 = '/images/Sli-200.webp'
const crane300s = '/images/sli-300s.webp'
const crane500 = '/images/sli-500.webp'

export const productCategories: { id: ProductCategoryId; label: string }[] = [
  { id: 'all', label: 'All Products' },
  { id: 'crane-sli', label: 'Crane SLI' },
  { id: 'card-services', label: 'Card Services' },
  { id: 'websites', label: 'Websites' },
]

const craneSliProducts: ProductItem[] = [
  {
    id: 'sli-200',
    name: 'SLI-200',
    categoryId: 'crane-sli',
    description: 'Compact Safe Load Indicator for small cranes and hoists with real-time load monitoring.',
    image: crane200,
    formLabel: 'Crane SLI — SLI-200',
    highlights: ['2–20 ton capacity', 'LED display', 'Overload alarm'],
  },
  {
    id: 'sli-300s',
    name: 'SLI-300S',
    categoryId: 'crane-sli',
    description: 'Mid-range SLI system for industrial cranes with anti-two-block and data logging.',
    image: crane300s,
    formLabel: 'Crane SLI — SLI-300S',
    highlights: ['20–50 ton', 'RS485 output', 'Calibration support'],
  },
  {
    id: 'sli-500',
    name: 'SLI-500',
    categoryId: 'crane-sli',
    description: 'Heavy-duty SLI for ship-to-shore and large gantry cranes with full safety compliance.',
    image: crane500,
    formLabel: 'Crane SLI — SLI-500',
    highlights: ['100+ ton', 'PLC integration', 'On-site commissioning'],
  },
]

const cardServiceProducts: ProductItem[] = [
  {
    id: 'card-repair',
    name: 'Card Repairing',
    categoryId: 'card-services',
    description: 'VFD, PLC, servo drive, and control board repair with fast turnaround diagnostics.',
    image: '/images/card-repair.webp',
    formLabel: 'Industrial Card Repair',
    highlights: ['All major brands', '48hr turnaround', 'Warranty available'],
  },
  {
    id: 'card-design',
    name: 'Card Designing',
    categoryId: 'card-services',
    description: 'Custom PCB and control card design from schematic to production-ready Gerber files.',
    image: '/images/pcb-designig.webp',
    formLabel: 'PCB / Card Designing',
    highlights: ['Multi-layer PCB', 'DFM review', 'Prototype support'],
  },
  {
    id: 'card-manufacturing',
    name: 'Card Manufacturing',
    categoryId: 'card-services',
    description: 'Small to medium batch PCB fabrication and assembly for industrial automation panels.',
    image: '/images/pcb-assambly.webp',
    formLabel: 'PCB / Card Manufacturing',
    highlights: ['SMD assembly', 'Testing & QA', 'Industrial grade'],
  },
]

const websiteProducts: ProductItem[] = [
  {
    id: 'web-1',
    name: 'B2B E-Commerce Industrial Parts',
    categoryId: 'websites',
    description: 'Full-featured B2B store with inventory and payment integrations.',
    image: '/images/b2b-soulton.webp',
    formLabel: 'Web Project — B2B E-Commerce',
    highlights: ['UI/UX', 'Next.js', '300% Sales Growth'],
  },
  {
    id: 'web-2',
    name: 'Corporate Engineering Portfolio',
    categoryId: 'websites',
    description: 'Premium corporate site with SEO and lead capture.',
    image: '/images/port.webp',
    formLabel: 'Web Project — Corporate Portfolio',
    highlights: ['Design', 'Next.js', '150% More Leads'],
  },
  {
    id: 'web-3',
    name: 'Industrial HMI Dashboard',
    categoryId: 'websites',
    description: 'Real-time web dashboard for crane and automation monitoring.',
    image: '/images/Industrial.webp',
    formLabel: 'Web Project — HMI Dashboard',
    highlights: ['React', 'WebSocket', '60% Faster Monitoring'],
  },
  {
    id: 'web-4',
    name: 'Lead Generation Landing Page',
    categoryId: 'websites',
    description: 'High-converting landing page with contact form and full SEO setup.',
    image: '/images/Lead Generation.webp',
    formLabel: 'Web Project — Landing Page',
    highlights: ['SEO', 'Next.js', '200% More Inquiries'],
  },
]

export const productItems: ProductItem[] = [
  ...craneSliProducts,
  ...cardServiceProducts,
  ...websiteProducts,
]

export function getProductsByCategory(category: ProductCategoryId): ProductItem[] {
  if (category === 'all') return productItems
  return productItems.filter((p) => p.categoryId === category)
}

// Old version

// import { portfolioItems } from '@/lib/portfolio-data'

// export type ProductCategoryId = 'all' | 'crane-sli' | 'card-services' | 'websites'

// export type ProductItem = {
//   id: string
//   name: string
//   categoryId: Exclude<ProductCategoryId, 'all'>
//   description: string
//   image: string
//   formLabel: string
//   highlights: string[]
// }

// const crane200 = '/images/Sli-200.webp'
// const crane300s = '/images/sli-300s.webp'
// const crane500 = '/images/sli-500.webp'

// export const productCategories: { id: ProductCategoryId; label: string }[] = [
//   { id: 'all', label: 'All Products' },
//   { id: 'crane-sli', label: 'Crane SLI' },
//   { id: 'card-services', label: 'Card Services' },
//   { id: 'websites', label: 'Websites' },
// ]

// const craneSliProducts: ProductItem[] = [
//   {
//     id: 'sli-200',
//     name: 'SLI-200',
//     categoryId: 'crane-sli',
//     description:
//       'Compact Safe Load Indicator for small cranes and hoists with real-time load monitoring.',
//     image: crane200,
//     formLabel: 'Crane SLI — SLI-200',
//     highlights: ['2–20 ton capacity', 'LED display', 'Overload alarm'],
//   },
//   {
//     id: 'sli-300s',
//     name: 'SLI-300S',
//     categoryId: 'crane-sli',
//     description:
//       'Mid-range SLI system for industrial cranes with anti-two-block and data logging.',
//     image: crane300s,
//     formLabel: 'Crane SLI — SLI-300S',
//     highlights: ['20–50 ton', 'RS485 output', 'Calibration support'],
//   },
//   // {
//   //   id: 'sli-400',
//   //   name: 'SLI-400',
//   //   categoryId: 'crane-sli',
//   //   description:
//   //     'Advanced SLI for port and warehouse cranes with multi-sensor integration.',
//   //   image: crane200,
//   //   formLabel: 'Crane SLI — SLI-400',
//   //   highlights: ['50–100 ton', 'HMI ready', 'Anti-collision ready'],
//   // },
//   {
//     id: 'sli-500',
//     name: 'SLI-500',
//     categoryId: 'crane-sli',
//     description:
//       'Heavy-duty SLI for ship-to-shore and large gantry cranes with full safety compliance.',
//     image: crane500,
//     formLabel: 'Crane SLI — SLI-500',
//     highlights: ['100+ ton', 'PLC integration', 'On-site commissioning'],
//   },
// ]

// const cardServiceProducts: ProductItem[] = [
//   {
//     id: 'card-repair',
//     name: 'Card Repairing',
//     categoryId: 'card-services',
//     description:
//       'VFD, PLC, servo drive, and control board repair with fast turnaround diagnostics.',
//     image: '/images/card-repair.webp',
//     formLabel: 'Industrial Card Repair',
//     highlights: ['All major brands', '48hr turnaround', 'Warranty available'],
//   },
//   {
//     id: 'card-design',
//     name: 'Card Designing',
//     categoryId: 'card-services',
//     description:
//       'Custom PCB and control card design from schematic to production-ready Gerber files.',
//     image:
//       '/images/pcb-designig.webp',
//     formLabel: 'PCB / Card Designing',
//     highlights: ['Multi-layer PCB', 'DFM review', 'Prototype support'],
//   },
//   {
//     id: 'card-manufacturing',
//     name: 'Card Manufacturing',
//     categoryId: 'card-services',
//     description:
//       'Small to medium batch PCB fabrication and assembly for industrial automation panels.',
//     image:
//       '/images/pcb-assambly.webp',
//     formLabel: 'PCB / Card Manufacturing',
//     highlights: ['SMD assembly', 'Testing & QA', 'Industrial grade'],
//   },
// ]

// const websiteProducts: ProductItem[] = portfolioItems
//   .filter((item) => item.categoryId === 'web-dev')
//   .map((item) => ({
//     id: `web-${item.id}`,
//     name: item.title,
//     categoryId: 'websites' as const,
//     description: item.description,
//     image: item.thumbnailUrl ?? item.mediaUrl,
//     formLabel: `Web Project — ${item.title}`,
//     highlights: [item.scope.split(',')[0]?.trim() ?? 'Web & Apps', item.metrics],
//   }))

// export const productItems: ProductItem[] = [
//   ...craneSliProducts,
//   ...cardServiceProducts,
//   ...websiteProducts,
// ]

// export function getProductsByCategory(category: ProductCategoryId): ProductItem[] {
//   if (category === 'all') return productItems
//   return productItems.filter((p) => p.categoryId === category)
// }
