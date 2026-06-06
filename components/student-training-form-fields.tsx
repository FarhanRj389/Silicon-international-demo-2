'use client'

import { useId } from 'react'
import {
  CLASS_DAYS,
  CLASS_TIMES,
  PAYMENT_METHODS,
  TRAINING_COURSES,
  WEB_DEV_TRACKS,
  type PaymentMethodId,
  type StudentTrainingFields,
} from '@/lib/student-training-data'

type FieldClassName = string

type StudentTrainingFormFieldsProps = {
  fields: StudentTrainingFields
  onChange: (fields: StudentTrainingFields) => void
  paymentScreenshot: File | null
  onPaymentScreenshotChange: (file: File | null) => void
  selectClassName?: FieldClassName
  labelClassName?: FieldClassName
  sectionClassName?: FieldClassName
  idPrefix?: string
}

const defaultSelect =
  'w-full px-4 py-3 bg-secondary/50 border border-border rounded-xl text-foreground text-sm focus:border-primary outline-none'
const defaultLabel = 'block text-sm font-medium text-foreground mb-2'
const defaultSection = 'space-y-4 p-4 rounded-xl border border-primary/20 bg-primary/5'

function getPaymentDetails(methodId: string): string {
  const method = PAYMENT_METHODS.find((m) => m.id === methodId)
  return method?.fallback ?? ''
}

export function StudentTrainingFormFields({
  fields,
  onChange,
  paymentScreenshot,
  onPaymentScreenshotChange,
  selectClassName = defaultSelect,
  labelClassName = defaultLabel,
  sectionClassName = defaultSection,
  idPrefix = 'st',
}: StudentTrainingFormFieldsProps) {
  const uid = useId()
  const prefix = `${idPrefix}-${uid}`

  const update = (patch: Partial<StudentTrainingFields>) => {
    onChange({ ...fields, ...patch })
  }

  const toggleDay = (day: string) => {
    const current = fields.classDays
    if (current.includes(day)) {
      update({ classDays: current.filter((d) => d !== day) })
      return
    }
    if (current.length >= 2) return
    update({ classDays: [...current, day] })
  }

  const showWebDevTrack = fields.trainingCourse === 'Web Development'
  const showDays = Boolean(fields.trainingCourse) && (!showWebDevTrack || fields.webDevTrack)
  const showTime = showDays && fields.classDays.length === 2
  const showPayment = showTime && Boolean(fields.classTime)
  const showPaymentDetails = showPayment && Boolean(fields.paymentMethod)
  const showScreenshot = showPaymentDetails

  return (
    <div className={sectionClassName}>
      <p className="text-sm font-semibold text-primary">Student Training Enrollment</p>

      <div>
        <label htmlFor={`${prefix}-course`} className={labelClassName}>
          Select Training Course *
        </label>
        <select
          id={`${prefix}-course`}
          required
          value={fields.trainingCourse}
          onChange={(e) =>
            update({
              trainingCourse: e.target.value,
              webDevTrack: '',
              classDays: [],
              classTime: '',
              paymentMethod: '',
            })
          }
          className={selectClassName}
        >
          <option value="">Choose a course</option>
          {TRAINING_COURSES.map((course) => (
            <option key={course} value={course}>
              {course}
            </option>
          ))}
        </select>
      </div>

      {showWebDevTrack && (
        <div>
          <label htmlFor={`${prefix}-web-track`} className={labelClassName}>
            Web Development Track *
          </label>
          <select
            id={`${prefix}-web-track`}
            required
            value={fields.webDevTrack}
            onChange={(e) =>
              update({
                webDevTrack: e.target.value,
                classDays: [],
                classTime: '',
                paymentMethod: '',
              })
            }
            className={selectClassName}
          >
            <option value="">Select specialization</option>
            {WEB_DEV_TRACKS.map((track) => (
              <option key={track} value={track}>
                {track}
              </option>
            ))}
          </select>
        </div>
      )}

      {showDays && (
        <div>
          <p className={labelClassName}>
            Select 2 Class Days Per Week * ({fields.classDays.length}/2 selected)
          </p>
          <div className="flex flex-wrap gap-2">
            {CLASS_DAYS.map((day) => {
              const selected = fields.classDays.includes(day)
              const disabled = !selected && fields.classDays.length >= 2
              return (
                <button
                  key={day}
                  type="button"
                  disabled={disabled}
                  onClick={() => toggleDay(day)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium border transition-colors ${
                    selected
                      ? 'bg-primary text-primary-foreground border-primary'
                      : disabled
                        ? 'bg-secondary/30 text-muted-foreground border-border opacity-50 cursor-not-allowed'
                        : 'bg-secondary/50 text-foreground border-border hover:border-primary'
                  }`}
                >
                  {day}
                </button>
              )
            })}
          </div>
        </div>
      )}

      {showTime && (
        <div>
          <label htmlFor={`${prefix}-time`} className={labelClassName}>
            Select Class Time *
          </label>
          <select
            id={`${prefix}-time`}
            required
            value={fields.classTime}
            onChange={(e) => update({ classTime: e.target.value, paymentMethod: '' })}
            className={selectClassName}
          >
            <option value="">Choose time slot</option>
            {CLASS_TIMES.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>
      )}

      {showPayment && (
        <div>
          <label htmlFor={`${prefix}-payment`} className={labelClassName}>
            Payment Method *
          </label>
          <select
            id={`${prefix}-payment`}
            required
            value={fields.paymentMethod}
            onChange={(e) => update({ paymentMethod: e.target.value })}
            className={selectClassName}
          >
            <option value="">Select payment method</option>
            {PAYMENT_METHODS.map((method) => (
              <option key={method.id} value={method.id}>
                {method.label}
              </option>
            ))}
          </select>
        </div>
      )}

      {showPaymentDetails && (
        <div className="p-4 rounded-xl bg-secondary/50 border border-border">
          <p className="text-sm font-semibold text-foreground mb-2">
            Send payment to this account:
          </p>
          <p className="text-sm text-muted-foreground whitespace-pre-line">
            {getPaymentDetails(fields.paymentMethod)}
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            After sending payment, upload your payment screenshot below.
          </p>
        </div>
      )}

      {showScreenshot && (
        <div>
          <label htmlFor={`${prefix}-screenshot`} className={labelClassName}>
            Upload Payment Screenshot *
          </label>
          <input
            id={`${prefix}-screenshot`}
            type="file"
            required
            accept="image/jpeg,image/png,image/webp,image/jpg"
            onChange={(e) => {
              const file = e.target.files?.[0] ?? null
              onPaymentScreenshotChange(file)
            }}
            className="w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-primary file:text-primary-foreground file:font-medium hover:file:bg-primary/90"
          />
          {paymentScreenshot && (
            <p className="text-xs text-muted-foreground mt-1">{paymentScreenshot.name}</p>
          )}
        </div>
      )}
    </div>
  )
}

export function isStudentTrainingComplete(
  fields: StudentTrainingFields,
  paymentScreenshot: File | null
): boolean {
  if (!fields.trainingCourse) return false
  if (fields.trainingCourse === 'Web Development' && !fields.webDevTrack) return false
  if (fields.classDays.length !== 2) return false
  if (!fields.classTime) return false
  if (!fields.paymentMethod) return false
  if (!paymentScreenshot) return false
  return true
}

export type { PaymentMethodId }
