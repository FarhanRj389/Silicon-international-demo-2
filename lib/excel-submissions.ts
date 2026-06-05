import fs from 'fs'
import path from 'path'
import * as XLSX from 'xlsx'

export type SubmissionRow = {
  studentId: string
  submittedAt: string
  source: string
  fullName: string
  email: string
  phone: string
  company: string
  service: string
  course: string
  classDays: string
  classTime: string
  paymentMethod: string
  message: string
  status: string
}

const HEADERS: (keyof SubmissionRow)[] = [
  'studentId',
  'submittedAt',
  'source',
  'fullName',
  'email',
  'phone',
  'company',
  'service',
  'course',
  'classDays',
  'classTime',
  'paymentMethod',
  'message',
  'status',
]

const HEADER_LABELS: Record<keyof SubmissionRow, string> = {
  studentId: 'Student ID',
  submittedAt: 'Submitted At',
  source: 'Form Source',
  fullName: 'Full Name',
  email: 'Email',
  phone: 'Phone',
  company: 'Company',
  service: 'Service',
  course: 'Course',
  classDays: 'Class Days',
  classTime: 'Class Time',
  paymentMethod: 'Payment Method',
  message: 'Message',
  status: 'Status',
}

function getExcelPath(): string {
  const custom = process.env.EXCEL_STORAGE_PATH
  if (custom) return custom
  return path.join(process.cwd(), 'data', 'form-submissions.xlsx')
}

export async function appendSubmissionToExcel(row: SubmissionRow): Promise<void> {
  const filePath = getExcelPath()
  const dir = path.dirname(filePath)

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }

  let workbook: XLSX.WorkBook
  let sheetData: string[][]

  if (fs.existsSync(filePath)) {
    workbook = XLSX.readFile(filePath)
    const sheet = workbook.Sheets[workbook.SheetNames[0]]
    sheetData = XLSX.utils.sheet_to_json<string[]>(sheet, { header: 1, defval: '' }) as string[][]
    if (sheetData.length === 0) {
      sheetData = [HEADERS.map((h) => HEADER_LABELS[h])]
    }
  } else {
    workbook = XLSX.utils.book_new()
    sheetData = [HEADERS.map((h) => HEADER_LABELS[h])]
  }

  const dataRow = HEADERS.map((key) => String(row[key] ?? ''))
  sheetData.push(dataRow)

  const newSheet = XLSX.utils.aoa_to_sheet(sheetData)
  if (workbook.SheetNames.length === 0) {
    XLSX.utils.book_append_sheet(workbook, newSheet, 'Submissions')
  } else {
    workbook.Sheets[workbook.SheetNames[0]] = newSheet
  }

  XLSX.writeFile(workbook, filePath)
}
