export const STUDENT_TRAINING_SERVICE = 'Student Training'

export const TRAINING_COURSES = [
  'PCB Design',
  'Card Repairing',
  'PLC Programming',
  'Web Development',
  'N8N Automations',
] as const

export const WEB_DEV_TRACKS = [
  'Shopify Store',
  'Shopify Store Theme Development',
  'WordPress',
  'Advance WordPress',
  'React',
  'Next.js',
  'Mobile App',
] as const

export const CLASS_DAYS = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
] as const

export const CLASS_TIMES = [
  '10:00 AM – 12:00 PM',
  '12:00 PM – 2:00 PM',
  '2:00 PM – 4:00 PM',
  '4:00 PM – 6:00 PM',
  '6:00 PM – 8:00 PM',
  '8:00 PM – 10:00 PM',
] as const

export type PaymentMethodId = 'jazzcash' | 'easypaisa' | 'bank'

export const PAYMENT_METHODS: Array<{
  id: PaymentMethodId
  label: string
  envKey: string
  fallback: string
}> = [
  {
    id: 'jazzcash',
    label: 'JazzCash',
    envKey: 'PAYMENT_JAZZCASH_DETAILS',
    fallback: 'JazzCash: 0300 1234567 (Account Name: Silicon International)',
  },
  {
    id: 'easypaisa',
    label: 'Easypaisa',
    envKey: 'PAYMENT_EASYPAISA_DETAILS',
    fallback: 'Easypaisa: 0300 1234567 (Account Name: Silicon International)',
  },
  {
    id: 'bank',
    label: 'Bank Account',
    envKey: 'PAYMENT_BANK_DETAILS',
    fallback:
      'Bank: MCB Bank | Account Title: Silicon International | Account #: 1234567890 | IBAN: PK00MCB0123456789012345',
  },
]

export function getPaymentAccountDetails(methodId: PaymentMethodId): string {
  const method = PAYMENT_METHODS.find((m) => m.id === methodId)
  if (!method) return ''
  return process.env[method.envKey] || method.fallback
}

export function getPaymentLabel(methodId: string): string {
  return PAYMENT_METHODS.find((m) => m.id === methodId)?.label || methodId
}

export function isStudentTrainingService(service: string): boolean {
  return service === STUDENT_TRAINING_SERVICE
}

export type StudentTrainingFields = {
  trainingCourse: string
  webDevTrack: string
  classDays: string[]
  classTime: string
  paymentMethod: string
}

export const emptyStudentTrainingFields: StudentTrainingFields = {
  trainingCourse: '',
  webDevTrack: '',
  classDays: [],
  classTime: '',
  paymentMethod: '',
}

export function buildStudentCourseLabel(fields: StudentTrainingFields): string {
  if (!fields.trainingCourse) return ''
  if (fields.trainingCourse === 'Web Development' && fields.webDevTrack) {
    return `${fields.trainingCourse} — ${fields.webDevTrack}`
  }
  return fields.trainingCourse
}

export function buildStudentTrainingMessage(fields: StudentTrainingFields): string {
  const course = buildStudentCourseLabel(fields)
  const days = fields.classDays.join(', ')
  return [
    'Student Training Enrollment',
    course ? `Course: ${course}` : '',
    days ? `Class Days (2/week): ${days}` : '',
    fields.classTime ? `Class Time: ${fields.classTime}` : '',
    fields.paymentMethod ? `Payment Method: ${getPaymentLabel(fields.paymentMethod)}` : '',
  ]
    .filter(Boolean)
    .join('\n')
}

export const STUDENT_TRAINING_PROGRAMS = [
  {
    title: 'PCB Design',
    description: 'Altium Designer, KiCad, schematic capture, multi-layer layouts, and Gerber delivery.',
  },
  {
    title: 'Card Repairing',
    description: 'Industrial electronics card diagnosis, component-level repair, and VFD/PLC modules.',
  },
  {
    title: 'PLC Programming',
    description: 'Siemens, Allen-Bradley, Mitsubishi PLC logic, HMI integration, and commissioning.',
  },
  {
    title: 'Web Development',
    description: 'Shopify, WordPress, React, Next.js, and mobile apps — full-stack career training.',
    tracks: [...WEB_DEV_TRACKS],
  },
  {
    title: 'N8N Automations',
    description: 'Workflow automation, API integrations, webhooks, and no-code business automations.',
  },
] as const
