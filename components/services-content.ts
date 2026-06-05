import { IconType } from 'react-icons'
import {
  FaBolt,
  FaDesktop,
  FaGear,
  FaMicrochip,
} from 'react-icons/fa6'

export type ServiceItem = {
  id: 'pcb' | 'card-repair' | 'crane-sli' | 'web-dev'
  icon: IconType
  label: string
  title: string
  tagline: string
  description: string
  image: string
  features: string[]
  industries: string[]
  ctaType: 'store' | 'consult'
  ctaText: string
  ctaHref: string
  buyHref?: string
  buyText?: string
}

export const serviceTabs: ServiceItem[] = [
  {
    id: 'pcb',
    icon: FaMicrochip,
    label: 'PCB Designing',
    title: 'PCB Designing & Manufacturing',
    tagline: 'Precision from Schematic to Silicon',
    description:
      'Our PCB design and manufacturing service covers the full lifecycle from initial schematic capture and component selection to Gerber file production and prototype fabrication. We work with single-layer, double-layer, and complex multi-layer boards designed for industrial-grade reliability.',
    image:
      '/images/Our services PCB design.webp',
    features: [
      'Single, double & multi-layer PCB design',
      'Altium Designer & KiCad expertise',
      'SMD & through-hole component placement',
      'High-frequency & EMI-shielded layouts',
      'BGA, QFP, and fine-pitch component routing',
      'Design for Manufacturability (DFM) review',
      'Gerber & BOM file delivery',
      'PCB prototyping & small batch production',
    ],
    industries: [
      'Industrial Controllers',
      'Power Electronics',
      'Embedded Systems',
      'Automation Panels',
      'Telecom Equipment',
    ],
    ctaType: 'consult',
    ctaText: 'Book a PCB Design Consultation',
    ctaHref: '/contact',
    buyHref: 'https://siliconpartshub.com',
    buyText: 'Buy PCB Components',
  },
  {
    id: 'card-repair',
    icon: FaGear,
    label: 'Card Repair',
    title: 'Industrial Electronics Card Troubleshooting & Repair',
    tagline: 'Restore. Repower. Resume Production.',
    description:
      'Minimize costly downtime with our expert industrial electronics card repair service. We diagnose and repair control boards, drive cards, inverter circuits, and PLC modules from all major brands. Our engineers use advanced diagnostic equipment to identify root causes.',
    image:
      'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg',
    features: [
      'VFD (Variable Frequency Drive) card repair',
      'Servo drive & motor controller repair',
      'PLC CPU and I/O module repair',
      'HMI touchscreen panel restoration',
      'IGBT module testing & replacement',
      'Power supply card repair & rebuild',
      'PCB-level component-level fault diagnosis',
      'All major brands: Siemens, ABB, Mitsubishi, Schneider',
    ],
    industries: [
      'Cement Plants',
      'Textile Mills',
      'Steel Industry',
      'Petrochemicals',
      'Port Equipment',
    ],
    ctaType: 'consult',
    ctaText: 'Request Card Repair Service',
    ctaHref: '/contact',
    buyHref: 'https://siliconpartshub.com',
    buyText: 'Buy Repair Parts',
  },
  {
    id: 'crane-sli',
    icon: FaBolt,
    label: 'Crane SLI',
    title: 'Crane SLI & Industrial Automation Solutions',
    tagline: 'Safe Operations. Intelligent Automation.',
    description:
      'We specialize in Safe Load Indication (SLI) systems for cranes, hoists, and lifting equipment ensuring workplace safety and regulatory compliance. Beyond SLI, we deliver complete industrial automation solutions including PLC programming, SCADA integration, and custom control panel design.',
    image:
      'https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg',
    features: [
      'Safe Load Indication (SLI) system design & installation',
      'Load cell calibration & replacement',
      'Anti-collision system integration',
      'PLC programming (Siemens, Allen-Bradley, Mitsubishi)',
      'SCADA & HMI development',
      'Custom control panel design & fabrication',
      'Motor control center (MCC) integration',
      'On-site commissioning & maintenance',
    ],
    industries: [
      'Port Cranes',
      'Construction Hoists',
      'Warehouse Cranes',
      'Ship-to-Shore Cranes',
      'Tower Cranes',
    ],
    ctaType: 'consult',
    ctaText: 'Get a Crane SLI Quote',
    ctaHref: '/contact',
  },
  {
    id: 'web-dev',
    icon: FaDesktop,
    label: 'Web & Apps',
    title: 'Web Design & Web App / Mobile App Development',
    tagline: 'Digital Solutions for Industrial Businesses',
    description:
      'We build modern, scalable web and mobile applications tailored for industrial and B2B businesses. From enterprise portals and real-time monitoring dashboards to e-commerce platforms and custom ERPs.',
    image:
      'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg',
    features: [
      'React, Next.js & TypeScript development',
      'Industrial SCADA & monitoring dashboards',
      'B2B portal & supplier management systems',
      'Mobile apps (React Native & Flutter)',
      'E-commerce & inventory management',
      'REST API & backend development (Node.js)',
      'Database design & cloud deployment',
      'SEO optimization & performance tuning',
    ],
    industries: [
      'Industrial Portals',
      'Manufacturing ERPs',
      'Fleet Management',
      'Procurement Platforms',
      'IoT Dashboards',
    ],
    ctaType: 'consult',
    ctaText: 'Discuss Your Project',
    ctaHref: '/contact',
  },
]

export const serviceIds = serviceTabs.map((s) => s.id)

export const getServiceById = (id: string) =>
  serviceTabs.find((service) => service.id === id)
