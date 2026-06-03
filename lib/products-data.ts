import { portfolioItems } from '@/lib/portfolio-data'

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

const craneImage =
  'https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg'
const cardImage =
  'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg'

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
    description:
      'Compact Safe Load Indicator for small cranes and hoists with real-time load monitoring.',
    image: craneImage,
    formLabel: 'Crane SLI — SLI-200',
    highlights: ['2–20 ton capacity', 'LED display', 'Overload alarm'],
  },
  {
    id: 'sli-300',
    name: 'SLI-300',
    categoryId: 'crane-sli',
    description:
      'Mid-range SLI system for industrial cranes with anti-two-block and data logging.',
    image: craneImage,
    formLabel: 'Crane SLI — SLI-300',
    highlights: ['20–50 ton', 'RS485 output', 'Calibration support'],
  },
  {
    id: 'sli-400',
    name: 'SLI-400',
    categoryId: 'crane-sli',
    description:
      'Advanced SLI for port and warehouse cranes with multi-sensor integration.',
    image: craneImage,
    formLabel: 'Crane SLI — SLI-400',
    highlights: ['50–100 ton', 'HMI ready', 'Anti-collision ready'],
  },
  {
    id: 'sli-600',
    name: 'SLI-600',
    categoryId: 'crane-sli',
    description:
      'Heavy-duty SLI for ship-to-shore and large gantry cranes with full safety compliance.',
    image: craneImage,
    formLabel: 'Crane SLI — SLI-600',
    highlights: ['100+ ton', 'PLC integration', 'On-site commissioning'],
  },
  {
    id: 'charkhi',
    name: 'Charkhi (Winch SLI)',
    categoryId: 'crane-sli',
    description:
      'Dedicated winch/charkhi load monitoring with drum speed and tension safety limits.',
    image: craneImage,
    formLabel: 'Crane SLI — Charkhi (Winch)',
    highlights: ['Winch monitoring', 'Tension limits', 'Custom mounting'],
  },
]

const cardServiceProducts: ProductItem[] = [
  {
    id: 'card-repair',
    name: 'Card Repairing',
    categoryId: 'card-services',
    description:
      'VFD, PLC, servo drive, and control board repair with fast turnaround diagnostics.',
    image: cardImage,
    formLabel: 'Industrial Card Repair',
    highlights: ['All major brands', '48hr turnaround', 'Warranty available'],
  },
  {
    id: 'card-design',
    name: 'Card Designing',
    categoryId: 'card-services',
    description:
      'Custom PCB and control card design from schematic to production-ready Gerber files.',
    image:
      'https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg',
    formLabel: 'PCB / Card Designing',
    highlights: ['Multi-layer PCB', 'DFM review', 'Prototype support'],
  },
  {
    id: 'card-manufacturing',
    name: 'Card Manufacturing',
    categoryId: 'card-services',
    description:
      'Small to medium batch PCB fabrication and assembly for industrial automation panels.',
    image:
      'https://images.pexels.com/photos/159275/machine-technology-computer-board-159275.jpeg',
    formLabel: 'PCB / Card Manufacturing',
    highlights: ['SMD assembly', 'Testing & QA', 'Industrial grade'],
  },
]

const websiteProducts: ProductItem[] = portfolioItems
  .filter((item) => item.categoryId === 'web-dev')
  .map((item) => ({
    id: `web-${item.id}`,
    name: item.title,
    categoryId: 'websites' as const,
    description: item.description,
    image: item.thumbnailUrl ?? item.mediaUrl,
    formLabel: `Web Project — ${item.title}`,
    highlights: [item.scope.split(',')[0]?.trim() ?? 'Web & Apps', item.metrics],
  }))

export const productItems: ProductItem[] = [
  ...craneSliProducts,
  ...cardServiceProducts,
  ...websiteProducts,
]

export function getProductsByCategory(category: ProductCategoryId): ProductItem[] {
  if (category === 'all') return productItems
  return productItems.filter((p) => p.categoryId === category)
}
