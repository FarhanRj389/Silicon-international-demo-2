export type ReviewMediaType = 'image' | 'video' | 'none'

export type ClientReview = {
  id: number
  name: string
  role: string
  company: string
  avatar: string
  rating: number
  description: string
  mediaType: ReviewMediaType
  mediaUrl?: string
  date: string
}

/** Replace avatar/mediaUrl with uploads in /public/reviews/ */
export const clientReviews: ClientReview[] = [
  {
    id: 1,
    name: 'Ahmed Hassan',
    role: 'Plant Manager',
    company: 'Cement Industries Ltd.',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
    rating: 5,
    description:
      'Silicon International repaired our VFD cards within 48 hours and production was back online. Exceptional diagnostics and transparent communication throughout.',
    mediaType: 'image',
    mediaUrl: 'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg',
    date: 'January 2026',
  },
  {
    id: 2,
    name: 'Sara Malik',
    role: 'Operations Director',
    company: 'Port Logistics PK',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
    rating: 5,
    description:
      'Their Crane SLI installation was flawless. Load monitoring is accurate and our safety compliance audits passed without issues.',
    mediaType: 'video',
    mediaUrl: 'https://videos.pexels.com/video-files/4489742/4489742-uhd_2560_1440_25fps.mp4',
    date: 'December 2025',
  },
  {
    id: 3,
    name: 'Imran Qureshi',
    role: 'CTO',
    company: 'AutoParts B2B',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg',
    rating: 5,
    description:
      'The Next.js e-commerce platform they built scaled our online sales dramatically. Clean code, fast performance, and ongoing support.',
    mediaType: 'image',
    mediaUrl: 'https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg',
    date: 'November 2025',
  },
  {
    id: 4,
    name: 'Fatima Noor',
    role: 'Engineering Lead',
    company: 'Textile Automation Co.',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
    rating: 4,
    description:
      'Multi-layer PCB designs were delivered on schedule with full Gerber and BOM packages. DFM review saved us costly rework.',
    mediaType: 'none',
    date: 'October 2025',
  },
  {
    id: 5,
    name: 'Bilal Raza',
    role: 'Maintenance Head',
    company: 'Steel Works Pakistan',
    avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg',
    rating: 5,
    description:
      'PLC and servo drive repairs from Siemens and ABB brands — all tested and warranted. Highly recommend for industrial electronics.',
    mediaType: 'image',
    mediaUrl: 'https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg',
    date: 'September 2025',
  },
]
