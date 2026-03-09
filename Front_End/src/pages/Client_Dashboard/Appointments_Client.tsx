import { useState, useEffect, type JSX } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

const TERRA = '#A33A10'

const SpecialtyIcons: Record<string, JSX.Element> = {
  cardiology: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
    </svg>
  ),
  dermatology: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75s.168-.75.375-.75.375.336.375.75Zm4.875 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Z" />
    </svg>
  ),
  general: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25Z" />
    </svg>
  ),
  neurology: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
    </svg>
  ),
  pediatrics: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
    </svg>
  ),
  psychiatry: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
    </svg>
  ),
}

const SPECIALTIES = [
  { id: 'cardiology',  label: 'Cardiology',      desc: 'Heart & vascular'   },
  { id: 'dermatology', label: 'Dermatology',      desc: 'Skin & hair'        },
  { id: 'general',     label: 'General Practice', desc: 'Primary care'       },
  { id: 'neurology',   label: 'Neurology',        desc: 'Brain & nerves'     },
  { id: 'pediatrics',  label: 'Pediatrics',       desc: "Children's health"  },
  { id: 'psychiatry',  label: 'Psychiatry',       desc: 'Mental wellness'    },
]

const DOCTORS: Record<string, {
  id: number; name: string; experience: string; rating: number;
  reviews: number; available: string; languages: string[]; duration: string; bio: string
}[]> = {
  cardiology: [
    { id: 1, name: 'Dr. James Anderson', experience: '15+ years', rating: 4.9, reviews: 234, available: 'Today',    languages: ['English', 'Spanish'],    duration: '30 min', bio: 'Specialist in preventive cardiology and heart failure management.' },
    { id: 2, name: 'Dr. Priya Patel',    experience: '10+ years', rating: 4.8, reviews: 189, available: 'Tomorrow', languages: ['English', 'Hindi'],       duration: '45 min', bio: "Focuses on interventional cardiology and women's heart health." },
  ],
  dermatology: [
    { id: 3, name: 'Dr. Michael Chen',   experience: '10+ years', rating: 4.7, reviews: 156, available: 'Today',    languages: ['English', 'Mandarin'],    duration: '20 min', bio: 'Expert in medical dermatology, acne, and skin cancer screening.' },
    { id: 4, name: 'Dr. Lisa Nguyen',    experience: '8+ years',  rating: 4.8, reviews: 120, available: 'Jan 27',   languages: ['English', 'Vietnamese'],  duration: '30 min', bio: 'Specializes in cosmetic dermatology and laser treatments.' },
  ],
  general: [
    { id: 5, name: 'Dr. Sarah Mitchell', experience: '12+ years', rating: 4.8, reviews: 189, available: 'Today',    languages: ['English'],                duration: '20 min', bio: 'Comprehensive primary care with a focus on preventive medicine.' },
    { id: 6, name: 'Dr. Omar Lee',       experience: '7+ years',  rating: 4.6, reviews: 98,  available: 'Tomorrow', languages: ['English', 'Arabic'],       duration: '20 min', bio: 'Family medicine physician with expertise in chronic disease management.' },
  ],
  neurology: [
    { id: 7, name: 'Dr. Emily Brown',    experience: '18+ years', rating: 4.9, reviews: 201, available: 'Jan 26',   languages: ['English', 'French'],       duration: '45 min', bio: 'Expert in headache disorders, epilepsy, and stroke rehabilitation.' },
  ],
  pediatrics: [
    { id: 8, name: 'Dr. Robert Wilson',  experience: '14+ years', rating: 4.8, reviews: 167, available: 'Today',    languages: ['English', 'Spanish'],     duration: '30 min', bio: "Dedicated to children's wellness, vaccinations, and developmental health." },
  ],
  psychiatry: [
    { id: 9, name: 'Dr. Lisa Taylor',    experience: '16+ years', rating: 4.9, reviews: 178, available: 'Tomorrow', languages: ['English'],                duration: '50 min', bio: 'Specializes in anxiety, depression, and cognitive behavioral therapy.' },
  ],
}

const TIME_SLOTS = [
  '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
  '11:00 AM', '11:30 AM', '02:00 PM', '02:30 PM',
  '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM',
]

const APPOINTMENT_TYPES = [
  {
    id: 'video', label: 'Video Call', desc: 'Consult from home via secure video link',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
      </svg>
    ),
  },
  {
    id: 'in-person', label: 'In-Person', desc: 'Visit the clinic in person',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
      </svg>
    ),
  },
]

const REMINDER_OPTIONS = [
  { id: 'email', label: 'Email',  desc: 'Confirmation & reminder to your inbox' },
  { id: 'sms',   label: 'SMS',    desc: 'Text reminder 1 hour before'           },
  { id: 'both',  label: 'Both',   desc: 'Email + SMS for full coverage'         },
]

const getNext7Days = () =>
  Array.from({ length: 7 }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() + i)
    return {
      key:   d.toISOString().split('T')[0],
      day:   d.toLocaleDateString('en-US', { weekday: 'short' }),
      date:  d.getDate(),
      month: d.toLocaleDateString('en-US', { month: 'short' }),
    }
  })

// ── Step indicator ───────────────────────────────────────────
const STEP_LABELS = ['Specialty', 'Doctor', 'Schedule', 'Confirm']

const StepIndicator = ({ current }: { current: number }) => (
  <div className="flex items-center gap-1 mt-3">
    {STEP_LABELS.map((label, i) => {
      const done   = i + 1 < current
      const active = i + 1 === current
      return (
        <div key={label} className="flex items-center gap-1 flex-1 last:flex-none">
          <div className="flex flex-col items-center gap-1">
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all"
              style={done ? { backgroundColor: `${TERRA}18`, color: TERRA } : active ? { backgroundColor: TERRA, color: '#fff' } : { backgroundColor: '#F0EBE5', color: '#C4B8B0' }}
            >
              {done ? (
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
              ) : i + 1}
            </div>
            <span className="text-[10px] font-medium whitespace-nowrap" style={{ color: active ? TERRA : '#A89080' }}>{label}</span>
          </div>
          {i < STEP_LABELS.length - 1 && (
            <div className="flex-1 h-px mb-4 mx-1 transition-all" style={{ backgroundColor: done ? TERRA : '#EDE6DE' }} />
          )}
        </div>
      )
    })}
  </div>
)

// ── Success screen ───────────────────────────────────────────
const SuccessScreen = ({ booking, onClose }: { booking: BookingState; onClose: () => void }) => {
  const specialty  = SPECIALTIES.find(s => s.id === booking.specialty)
  const apptType   = APPOINTMENT_TYPES.find(t => t.id === booking.type)
  const formattedDate = booking.date
    ? new Date(booking.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
    : ''

  const NOTIFICATION_STEPS = [
    {
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
        </svg>
      ),
      title: 'Confirmation sent to you',
      desc:  'A booking confirmation has been sent to your email and/or phone based on your reminder preference.',
      done:  true,
    },
    {
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
        </svg>
      ),
      title: `${booking.doctor?.name} has been notified`,
      desc:  'Your doctor has received your appointment request and your reason for visit. They will review it before your session.',
      done:  true,
    },
    {
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
        </svg>
      ),
      title: 'Reminder scheduled',
      desc:  `You'll receive a reminder 1 hour before your appointment on ${formattedDate} at ${booking.time}.`,
      done:  true,
    },
    {
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
        </svg>
      ),
      title: booking.type === 'video' ? 'Video link will be sent 15 min before' : 'Clinic address sent to your email',
      desc:  booking.type === 'video'
        ? 'A secure video call link will be sent to you 15 minutes before your session starts.'
        : 'Directions to the clinic and check-in instructions have been sent to your registered email.',
      done: false,
    },
  ]

  return (
    <div className="flex flex-col items-center">
      {/* Big success icon */}
      <div className="relative mb-6 mt-2">
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center"
          style={{ backgroundColor: `${TERRA}12` }}
        >
          <svg className="w-10 h-10" fill="none" stroke={TERRA} strokeWidth={1.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
        </div>
        {/* Pulse rings */}
        <div className="absolute inset-0 rounded-full animate-ping opacity-10" style={{ backgroundColor: TERRA }} />
      </div>

      <h2 className="text-2xl font-bold text-[#1A0F0A] mb-1">Appointment Confirmed!</h2>
      <p className="text-sm text-[#8A7568] mb-6 text-center max-w-md">
        Your appointment has been successfully booked. Here's a summary of what happens next.
      </p>

      {/* Appointment pill */}
      <div
        className="flex items-center gap-4 px-5 py-3.5 rounded-2xl border mb-8 w-full max-w-lg"
        style={{ borderColor: `${TERRA}30`, backgroundColor: `${TERRA}07` }}
      >
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
          style={{ backgroundColor: TERRA }}
        >
          {booking.doctor?.name.split(' ').slice(1).map(n => n[0]).join('')}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-semibold text-[#1A0F0A]">{booking.doctor?.name}</div>
          <div className="text-xs text-[#8A7568]">{specialty?.label}</div>
        </div>
        <div className="text-right">
          <div className="text-xs font-semibold text-[#1A0F0A]">{formattedDate}</div>
          <div className="text-xs text-[#8A7568]">{booking.time} · {apptType?.label}</div>
        </div>
      </div>

      {/* Notification steps */}
      <div className="w-full max-w-lg space-y-3 mb-8">
        <p className="text-xs font-semibold text-[#7A6458] uppercase tracking-widest mb-3">What happens next</p>
        {NOTIFICATION_STEPS.map((step, i) => (
          <div key={i} className="flex items-start gap-3 p-3.5 rounded-xl border border-[#EDE6DE] bg-[#FDFCFA]">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
              style={step.done ? { backgroundColor: `${TERRA}12`, color: TERRA } : { backgroundColor: '#F0EBE5', color: '#A89080' }}
            >
              {step.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-xs font-semibold text-[#1A0F0A]">{step.title}</span>
                {step.done && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full font-medium" style={{ backgroundColor: '#F0FDF4', color: '#16A34A' }}>
                    Done
                  </span>
                )}
                {!step.done && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full font-medium" style={{ backgroundColor: '#FFF7ED', color: '#EA580C' }}>
                    Pending
                  </span>
                )}
              </div>
              <p className="text-[11px] text-[#A89080] leading-relaxed">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Close CTA */}
      <button
        onClick={onClose}
        className="px-8 py-3 rounded-xl text-white text-sm font-semibold hover:opacity-90 transition-all"
        style={{ backgroundColor: TERRA }}
      >
        Back to Appointments
      </button>
    </div>
  )
}

// ── Booking types ────────────────────────────────────────────
interface BookingState {
  specialty: string | null
  doctor:    typeof DOCTORS[string][0] | null
  date:      string | null
  time:      string | null
  type:      string | null
  reason:    string
  reminder:  string
}

// ── Booking modal ────────────────────────────────────────────
const BookingModal = ({
  open, onClose, onConfirm,
}: {
  open: boolean; onClose: () => void; onConfirm: (b: BookingState) => void
}) => {
  const [step,      setStep    ] = useState(1)
  const [confirmed, setConfirmed] = useState(false)
  const [booking,   setBooking ] = useState<BookingState>({
    specialty: null, doctor: null, date: null, time: null, type: null, reason: '', reminder: 'email',
  })

  const days    = getNext7Days()
  const doctors = booking.specialty ? DOCTORS[booking.specialty] ?? [] : []

  const reset = () => {
    setStep(1)
    setConfirmed(false)
    setBooking({ specialty: null, doctor: null, date: null, time: null, type: null, reason: '', reminder: 'email' })
  }

  const handleClose    = () => { reset(); onClose() }
  const handleConfirm  = () => { onConfirm(booking); setConfirmed(true) }

  const canNext = () => {
    if (step === 1) return !!booking.specialty
    if (step === 2) return !!booking.doctor
    if (step === 3) return !!booking.date && !!booking.time && !!booking.type
    return true
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent 
  style={{ maxWidth: '50vw', width: '50vw' }}
  className="bg-white border border-[#D6CCC2] rounded-2xl p-0 overflow-hidden"
>

        {/* Header — hidden on success screen */}
        {!confirmed && (
          <DialogHeader className="px-10 pt-7 pb-5 border-b border-[#EDE6DE]">
            <div className="flex items-center gap-3 mb-1">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${TERRA}12`, color: TERRA }}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                </svg>
              </div>
              <div>
                <DialogTitle className="text-lg font-bold text-[#1A0F0A] leading-none">Book an Appointment</DialogTitle>
                <p className="text-xs text-[#A89080] mt-0.5">Complete the steps below to schedule your consultation.</p>
              </div>
            </div>
            <StepIndicator current={step} />
          </DialogHeader>
        )}

        {/* Body */}
        <div className={`px-10 overflow-y-auto ${confirmed ? 'py-10 flex flex-col items-center max-h-[80vh]' : 'py-7 max-h-[60vh]'}`}>

          {/* ── Success screen ── */}
          {confirmed && <SuccessScreen booking={booking} onClose={handleClose} />}

          {/* ── Step 1: Specialty ── */}
          {!confirmed && step === 1 && (
            <div>
              <p className="text-sm font-semibold text-[#1A0F0A] mb-1">Select a specialty</p>
              <p className="text-xs text-[#A89080] mb-5">What type of doctor are you looking for?</p>
              <div className="grid grid-cols-3 gap-3">
                {SPECIALTIES.map((s) => {
                  const active = booking.specialty === s.id
                  return (
                    <button
                      key={s.id}
                      onClick={() => setBooking((b) => ({ ...b, specialty: s.id, doctor: null }))}
                      className="relative flex flex-col items-start gap-3 p-5 rounded-xl border text-left transition-all hover:border-[#C4A99A]"
                      style={active ? { borderColor: TERRA, backgroundColor: `${TERRA}07` } : { borderColor: '#EDE6DE', backgroundColor: '#FDFCFA' }}
                    >
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center transition-all"
                        style={active ? { backgroundColor: TERRA, color: '#fff' } : { backgroundColor: '#F0EBE5', color: '#7A6458' }}
                      >
                        {SpecialtyIcons[s.id]}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-[#1A0F0A]">{s.label}</div>
                        <div className="text-[11px] text-[#A89080] mt-0.5">{s.desc}</div>
                      </div>
                      {active && (
                        <div className="absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: TERRA }}>
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                          </svg>
                        </div>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* ── Step 2: Doctor ── */}
          {!confirmed && step === 2 && (
            <div>
              <p className="text-sm font-semibold text-[#1A0F0A] mb-1">Choose your doctor</p>
              <p className="text-xs text-[#A89080] mb-5">
                Available {SPECIALTIES.find(s => s.id === booking.specialty)?.label} specialists
              </p>
              <div className="grid grid-cols-2 gap-3">
                {doctors.map((doc) => {
                  const active = booking.doctor?.id === doc.id
                  return (
                    <button
                      key={doc.id}
                      onClick={() => setBooking((b) => ({ ...b, doctor: doc }))}
                      className="p-5 rounded-xl border text-left transition-all hover:border-[#C4A99A]"
                      style={active ? { borderColor: TERRA, backgroundColor: `${TERRA}07` } : { borderColor: '#EDE6DE', backgroundColor: '#FDFCFA' }}
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className="w-12 h-12 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                          style={{ backgroundColor: active ? TERRA : '#C4B8B0' }}
                        >
                          {doc.name.split(' ').slice(1).map(n => n[0]).join('')}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <span className="text-sm font-semibold text-[#1A0F0A]">{doc.name}</span>
                            <span className="text-[10px] px-2 py-0.5 rounded-full font-medium" style={{ backgroundColor: `${TERRA}12`, color: TERRA }}>{doc.available}</span>
                          </div>
                          <p className="text-[11px] text-[#8A7568] mb-2 leading-relaxed">{doc.bio}</p>
                          <div className="flex items-center gap-3 flex-wrap">
                            <span className="flex items-center gap-1 text-[11px] text-amber-500 font-semibold">
                              <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 0 0 .95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 0 0-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 0 0-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 0 0-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 0 0 .951-.69l1.07-3.292Z" />
                              </svg>
                              {doc.rating} <span className="text-[#A89080] font-normal">({doc.reviews})</span>
                            </span>
                            <span className="text-[11px] text-[#8A7568]">{doc.duration} · {doc.experience}</span>
                            <span className="text-[11px] text-[#8A7568]">{doc.languages.join(', ')}</span>
                          </div>
                        </div>
                        {active && (
                          <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: TERRA }}>
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                            </svg>
                          </div>
                        )}
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* ── Step 3: Schedule ── */}
          {!confirmed && step === 3 && (
            <div className="space-y-7">

              {/* Type */}
              <div>
                <p className="text-sm font-semibold text-[#1A0F0A] mb-1">Appointment type</p>
                <p className="text-xs text-[#A89080] mb-3">How would you like to meet with your doctor?</p>
                <div className="grid grid-cols-2 gap-3">
                  {APPOINTMENT_TYPES.map((t) => {
                    const active = booking.type === t.id
                    return (
                      <button
                        key={t.id}
                        onClick={() => setBooking((b) => ({ ...b, type: t.id }))}
                        className="flex items-center gap-4 p-5 rounded-xl border text-left transition-all hover:border-[#C4A99A]"
                        style={active ? { borderColor: TERRA, backgroundColor: `${TERRA}07` } : { borderColor: '#EDE6DE', backgroundColor: '#FDFCFA' }}
                      >
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-all"
                          style={active ? { backgroundColor: TERRA, color: '#fff' } : { backgroundColor: '#F0EBE5', color: '#7A6458' }}
                        >
                          {t.icon}
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-[#1A0F0A]">{t.label}</div>
                          <div className="text-[11px] text-[#A89080] mt-0.5">{t.desc}</div>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Date */}
              <div>
                <p className="text-sm font-semibold text-[#1A0F0A] mb-1">Select a date</p>
                <p className="text-xs text-[#A89080] mb-3">Choose from the next 7 available days.</p>
                <div className="flex gap-2">
                  {days.map((d) => {
                    const active = booking.date === d.key
                    return (
                      <button
                        key={d.key}
                        onClick={() => setBooking((b) => ({ ...b, date: d.key }))}
                        className="flex flex-col items-center px-4 py-3 rounded-xl border flex-1 transition-all"
                        style={active ? { borderColor: TERRA, backgroundColor: TERRA, color: '#fff' } : { borderColor: '#EDE6DE', backgroundColor: '#FDFCFA', color: '#7A6458' }}
                      >
                        <span className="text-[10px] font-medium">{d.day}</span>
                        <span className="text-lg font-bold leading-tight">{d.date}</span>
                        <span className="text-[10px]">{d.month}</span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Time */}
              <div>
                <p className="text-sm font-semibold text-[#1A0F0A] mb-1">Select a time</p>
                <p className="text-xs text-[#A89080] mb-3">All times shown in your local timezone.</p>
                <div className="grid grid-cols-6 gap-2">
                  {TIME_SLOTS.map((slot) => {
                    const active = booking.time === slot
                    return (
                      <button
                        key={slot}
                        onClick={() => setBooking((b) => ({ ...b, time: slot }))}
                        className="py-3 rounded-xl border text-[11px] font-medium transition-all"
                        style={active ? { borderColor: TERRA, backgroundColor: TERRA, color: '#fff' } : { borderColor: '#EDE6DE', backgroundColor: '#FDFCFA', color: '#7A6458' }}
                      >
                        {slot}
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          )}

          {/* ── Step 4: Confirm ── */}
          {!confirmed && step === 4 && (
            <div className="grid grid-cols-2 gap-8">

              {/* Left: Summary */}
              <div>
                <p className="text-sm font-semibold text-[#1A0F0A] mb-3">Appointment summary</p>
                <div className="rounded-xl border border-[#EDE6DE] bg-[#FDFCFA] overflow-hidden">
                  <div className="p-4 border-b border-[#EDE6DE] flex items-center gap-3" style={{ backgroundColor: `${TERRA}07` }}>
                    <div className="w-11 h-11 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0" style={{ backgroundColor: TERRA }}>
                      {booking.doctor?.name.split(' ').slice(1).map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-[#1A0F0A]">{booking.doctor?.name}</div>
                      <div className="text-[11px] text-[#8A7568]">{SPECIALTIES.find(s => s.id === booking.specialty)?.label}</div>
                    </div>
                  </div>
                  <div className="divide-y divide-[#EDE6DE]">
                    {[
                      { label: 'Date',     value: booking.date ? new Date(booking.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }) : '' },
                      { label: 'Time',     value: booking.time ?? '' },
                      { label: 'Type',     value: APPOINTMENT_TYPES.find(t => t.id === booking.type)?.label ?? '' },
                      { label: 'Duration', value: booking.doctor?.duration ?? '' },
                      { label: 'Reminder', value: REMINDER_OPTIONS.find(r => r.id === booking.reminder)?.label ?? '' },
                    ].map((row) => (
                      <div key={row.label} className="flex items-center justify-between px-4 py-3">
                        <span className="text-[11px] text-[#A89080]">{row.label}</span>
                        <span className="text-xs font-semibold text-[#1A0F0A]">{row.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: Reason + Reminders */}
              <div className="space-y-5">
                <div>
                  <label className="text-sm font-semibold text-[#1A0F0A] block mb-1">
                    Reason for visit <span className="text-[#A89080] font-normal text-xs ml-1">(optional)</span>
                  </label>
                  <p className="text-xs text-[#A89080] mb-2">Help your doctor prepare by describing your symptoms.</p>
                  <textarea
                    rows={4}
                    placeholder="e.g. Chest discomfort for the past week, shortness of breath..."
                    value={booking.reason}
                    onChange={(e) => setBooking((b) => ({ ...b, reason: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border border-[#EDE6DE] bg-[#FDFCFA] text-xs text-[#1A0F0A] placeholder-[#C4B8B0] resize-none focus:outline-none focus:border-[#C4A99A] transition-colors"
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#1A0F0A] mb-1">Reminder preference</p>
                  <p className="text-xs text-[#A89080] mb-3">How should we remind you before your appointment?</p>
                  <div className="space-y-2">
                    {REMINDER_OPTIONS.map((r) => {
                      const active = booking.reminder === r.id
                      return (
                        <button
                          key={r.id}
                          onClick={() => setBooking((b) => ({ ...b, reminder: r.id }))}
                          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border text-left transition-all"
                          style={active ? { borderColor: TERRA, backgroundColor: `${TERRA}07` } : { borderColor: '#EDE6DE', backgroundColor: '#FDFCFA' }}
                        >
                          <div className="w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all" style={active ? { borderColor: TERRA } : { borderColor: '#C4B8B0' }}>
                            {active && <div className="w-2 h-2 rounded-full" style={{ backgroundColor: TERRA }} />}
                          </div>
                          <div>
                            <div className="text-xs font-semibold text-[#1A0F0A]">{r.label}</div>
                            <div className="text-[11px] text-[#A89080]">{r.desc}</div>
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer — hidden on success screen */}
        {!confirmed && (
          <div className="px-10 py-5 border-t border-[#EDE6DE] flex items-center justify-between">
            <button
              onClick={step === 1 ? handleClose : () => setStep((s) => s - 1)}
              className="px-5 py-2.5 rounded-xl border border-[#D6CCC2] text-xs font-semibold text-[#7A6458] hover:border-[#C4A99A] hover:text-[#1A0F0A] transition-all"
            >
              {step === 1 ? 'Cancel' : '← Back'}
            </button>
            <div className="flex items-center gap-3">
              <span className="text-[11px] text-[#C4B8B0]">Step {step} of 4</span>
              {step < 4 ? (
                <button
                  onClick={() => setStep((s) => s + 1)}
                  disabled={!canNext()}
                  className="px-6 py-2.5 rounded-xl text-white text-xs font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90"
                  style={{ backgroundColor: TERRA }}
                >
                  Continue →
                </button>
              ) : (
                <button
                  onClick={handleConfirm}
                  className="px-6 py-2.5 rounded-xl text-white text-xs font-semibold hover:opacity-90 transition-all flex items-center gap-2"
                  style={{ backgroundColor: TERRA }}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                  Confirm Booking
                </button>
              )}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

// ── Rest of the file (stat cards, list, unchanged) ───────────
const STAT_CARDS = [
  { label: 'Upcoming',   sub: 'Next: Jan 25, 10:00 AM', icon: (<svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>) },
  { label: 'Completed',  sub: 'This year',               icon: (<svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>) },
  { label: 'Video Calls', sub: 'Remote consultations',   icon: (<svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" /></svg>) },
]

const INITIAL_APPOINTMENTS = [
  { id: 1, doctor: 'Dr. James Anderson', specialty: 'Cardiologist',         date: 'Jan 25, 2026', time: '10:00 AM', type: 'Video',     status: 'Upcoming',  reason: 'Annual heart checkup',   target: new Date('2026-01-25T10:00:00') },
  { id: 2, doctor: 'Dr. Sarah Mitchell', specialty: 'General Practitioner', date: 'Jan 28, 2026', time: '2:30 PM',  type: 'In-person', status: 'Upcoming',  reason: 'Follow-up consultation', target: new Date('2026-01-28T14:30:00') },
  { id: 3, doctor: 'Dr. Michael Chen',   specialty: 'Dermatologist',        date: 'Jan 20, 2026', time: '11:00 AM', type: 'Video',     status: 'Completed', reason: 'Skin condition review',  target: null },
  { id: 4, doctor: 'Dr. Emily Brown',    specialty: 'Neurologist',          date: 'Jan 18, 2026', time: '3:00 PM',  type: 'In-person', status: 'Completed', reason: 'Headache evaluation',    target: null },
]

const TABS = ['All', 'Upcoming', 'Completed']

const useCountdown = (target: Date | null) => {
  const calc = () => {
    if (!target) return null
    const diff = target.getTime() - Date.now()
    if (diff <= 0) return null
    return { days: Math.floor(diff / 86400000), hours: Math.floor((diff % 86400000) / 3600000), minutes: Math.floor((diff % 3600000) / 60000) }
  }
  const [time, setTime] = useState(calc)
  useEffect(() => {
    if (!target) return
    const id = setInterval(() => setTime(calc()), 60000)
    return () => clearInterval(id)
  }, [target])
  return time
}

const Countdown = ({ target }: { target: Date | null }) => {
  const time = useCountdown(target)
  if (!time) return null
  const isImminent = time.days === 0 && time.hours < 3
  return (
    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-semibold" style={isImminent ? { backgroundColor: `${TERRA}15`, color: TERRA } : { backgroundColor: '#F0F9FF', color: '#0369A1' }}>
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
      {time.days > 0 ? `In ${time.days}d ${time.hours}h` : time.hours > 0 ? `In ${time.hours}h ${time.minutes}m` : `In ${time.minutes}m`}
      {isImminent && ' · Starting soon'}
    </div>
  )
}

const CancelModal = ({ doctor, onConfirm, onClose }: { doctor: string; onConfirm: () => void; onClose: () => void }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
    <div className="bg-white rounded-2xl border border-[#D6CCC2] shadow-2xl p-8 w-full max-w-md mx-4">
      <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: '#FEF2F2' }}>
        <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" /></svg>
      </div>
      <h3 className="text-lg font-bold text-[#1A0F0A] mb-1">Cancel Appointment</h3>
      <p className="text-sm text-[#7A6458] mb-6">Are you sure you want to cancel your appointment with <span className="font-semibold text-[#1A0F0A]">{doctor}</span>?</p>
      <div className="flex gap-3">
        <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-[#D6CCC2] text-sm font-semibold text-[#7A6458] hover:border-[#C4A99A] transition-all">Keep it</button>
        <button onClick={onConfirm} className="flex-1 py-2.5 rounded-xl bg-red-500 text-white text-sm font-semibold hover:bg-red-600 transition-all">Yes, cancel</button>
      </div>
    </div>
  </div>
)

const SuccessToast = ({ doctor, date, time }: { doctor: string; date: string; time: string }) => (
  <div className="fixed bottom-6 right-6 z-50 bg-white border border-[#D6CCC2] rounded-2xl shadow-2xl p-4 flex items-center gap-4 max-w-sm">
    <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${TERRA}12` }}>
      <svg className="w-5 h-5" fill="none" stroke={TERRA} strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
    </div>
    <div>
      <div className="text-sm font-bold text-[#1A0F0A]">Appointment Booked!</div>
      <div className="text-xs text-[#8A7568]">{doctor} · {date} at {time}</div>
    </div>
  </div>
)

const Appointments_Client = () => {
  const [activeTab,    setActiveTab   ] = useState('All')
  const [appointments, setAppointments] = useState(INITIAL_APPOINTMENTS)
  const [cancelTarget, setCancelTarget] = useState<number | null>(null)
  const [bookingOpen,  setBookingOpen ] = useState(false)
  const [toast,        setToast       ] = useState<{ doctor: string; date: string; time: string } | null>(null)

  const filtered = appointments.filter((a) => activeTab === 'All' ? true : a.status === activeTab)

  const handleCancel = (id: number) => {
    setAppointments((prev) => prev.map((a) => a.id === id ? { ...a, status: 'Cancelled' } : a))
    setCancelTarget(null)
  }

  const handleBookingConfirm = (booking: BookingState) => {
    const newAppt = {
      id:        Date.now(),
      doctor:    booking.doctor?.name ?? '',
      specialty: SPECIALTIES.find(s => s.id === booking.specialty)?.label ?? '',
      date:      booking.date ? new Date(booking.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '',
      time:      booking.time ?? '',
      type:      APPOINTMENT_TYPES.find(t => t.id === booking.type)?.label ?? '',
      status:    'Upcoming',
      reason:    booking.reason || 'General consultation',
      target:    null as Date | null,
    }
    setAppointments((prev) => [newAppt, ...prev])
    setToast({ doctor: newAppt.doctor, date: newAppt.date, time: newAppt.time })
    setTimeout(() => setToast(null), 4000)
  }

  const upcomingCount  = appointments.filter(a => a.status === 'Upcoming').length
  const completedCount = appointments.filter(a => a.status === 'Completed').length

  return (
    <>
      {cancelTarget !== null && (() => {
        const appt = appointments.find(a => a.id === cancelTarget)!
        return <CancelModal doctor={appt.doctor} onConfirm={() => handleCancel(cancelTarget)} onClose={() => setCancelTarget(null)} />
      })()}
      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} onConfirm={handleBookingConfirm} />
      {toast && <SuccessToast doctor={toast.doctor} date={toast.date} time={toast.time} />}

      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] tracking-[0.25em] font-semibold px-2.5 py-1 rounded-full" style={{ backgroundColor: `${TERRA}12`, color: TERRA }}>APPOINTMENTS</span>
            <span className="w-1 h-1 rounded-full bg-[#D6CCC2] inline-block" />
            <span className="text-[10px] tracking-[0.2em] text-[#A89080] font-medium">PATIENT PORTAL</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-[#1A0F0A]">
            My <span className="relative inline-block" style={{ color: TERRA }}>Appointments<span className="absolute -bottom-0.5 left-0 w-full h-0.5 rounded-full opacity-40" style={{ backgroundColor: TERRA }} /></span>
          </h1>
          <p className="text-sm text-[#7A6458] mt-2">Manage and view all your scheduled consultations.</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => setBookingOpen(true)} className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-white text-xs font-semibold tracking-wide shadow-sm hover:opacity-90 transition-all" style={{ backgroundColor: TERRA }}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
            BOOK APPOINTMENT
          </button>
          <button className="relative w-10 h-10 rounded-xl bg-white border border-[#D6CCC2] flex items-center justify-center shadow-sm hover:shadow-md transition-all">
            <svg className="w-5 h-5 text-[#5C4A3E]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" /></svg>
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full border-2 border-white" style={{ backgroundColor: TERRA }} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        {[{ ...STAT_CARDS[0], value: String(upcomingCount) }, { ...STAT_CARDS[1], value: String(completedCount) }, { ...STAT_CARDS[2], value: '8' }].map((card) => (
          <div key={card.label} className="bg-white rounded-xl border border-[#D6CCC2] shadow-sm p-5 flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(163,58,16,0.08)', color: TERRA }}>{card.icon}</div>
            <div>
              <div className="text-2xl font-bold text-[#1A0F0A] leading-none">{card.value}</div>
              <div className="text-xs text-[#8A7568] mt-0.5">{card.label}</div>
              <div className="text-[11px] text-[#A89080] mt-0.5">{card.sub}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-1 mb-5 bg-white border border-[#D6CCC2] rounded-xl p-1 w-fit shadow-sm">
        {TABS.map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)} className="px-5 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all duration-200" style={activeTab === tab ? { backgroundColor: TERRA, color: '#fff' } : { color: '#7A6458' }}>
            {tab.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((appt) => (
          <div key={appt.id} className={`bg-white rounded-xl border shadow-sm p-5 transition-all ${appt.status === 'Cancelled' ? 'border-red-100 opacity-60' : 'border-[#D6CCC2] hover:shadow-md hover:border-[#C4A99A]'}`}>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-semibold text-white mt-0.5" style={{ backgroundColor: appt.status === 'Cancelled' ? '#C4B8B0' : TERRA }}>
                {appt.doctor.split(' ').slice(1).map((n) => n[0]).join('')}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                  <div className="text-sm font-semibold text-[#1A0F0A]">{appt.doctor}</div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-medium" style={appt.status === 'Upcoming' ? { backgroundColor: `${TERRA}12`, color: TERRA } : appt.status === 'Completed' ? { backgroundColor: '#F0FDF4', color: '#16A34A' } : { backgroundColor: '#FEF2F2', color: '#EF4444' }}>{appt.status}</span>
                  {appt.status === 'Upcoming' && <Countdown target={appt.target} />}
                </div>
                <div className="text-xs text-[#8A7568] mb-1">{appt.specialty}</div>
                <div className="text-[11px] text-[#A89080] mb-2 flex items-center gap-1">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" /></svg>
                  {appt.reason}
                </div>
                <div className="flex items-center gap-4 text-[11px] text-[#A89080]">
                  <span className="flex items-center gap-1"><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" /></svg>{appt.date}</span>
                  <span className="flex items-center gap-1"><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>{appt.time}</span>
                  <span className="flex items-center gap-1"><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" /></svg>{appt.type}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0 mt-0.5">
                {appt.status === 'Upcoming' && (
                  <>
                    <button className="px-4 py-2 rounded-lg text-xs font-semibold text-white hover:opacity-90 transition-all" style={{ backgroundColor: TERRA }}>Join Call</button>
                    <button className="px-4 py-2 rounded-lg text-xs font-semibold border border-[#D6CCC2] text-[#7A6458] hover:border-[#C4A99A] hover:text-[#1A0F0A] transition-all">Reschedule</button>
                    <button onClick={() => setCancelTarget(appt.id)} className="px-4 py-2 rounded-lg text-xs font-semibold border border-red-200 text-red-400 hover:bg-red-50 hover:border-red-300 transition-all">Cancel</button>
                  </>
                )}
                {appt.status === 'Completed' && (
                  <>
                    <button className="px-4 py-2 rounded-lg text-xs font-semibold border border-[#D6CCC2] text-[#7A6458] hover:border-[#C4A99A] hover:text-[#1A0F0A] transition-all">View Summary</button>
                    <button onClick={() => setBookingOpen(true)} className="px-4 py-2 rounded-lg text-xs font-semibold text-white hover:opacity-90 transition-all flex items-center gap-1.5" style={{ backgroundColor: TERRA }}>
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" /></svg>
                      Book Again
                    </button>
                  </>
                )}
                {appt.status === 'Cancelled' && <span className="text-[11px] text-red-400 font-medium">Appointment cancelled</span>}
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="bg-white rounded-xl border border-[#D6CCC2] p-12 text-center">
            <div className="text-[#A89080] text-sm mb-4">No {activeTab.toLowerCase()} appointments found.</div>
            <button onClick={() => setBookingOpen(true)} className="px-5 py-2.5 rounded-xl text-white text-xs font-semibold hover:opacity-90 transition-all" style={{ backgroundColor: TERRA }}>Book an Appointment</button>
          </div>
        )}
      </div>
    </>
  )
}

export default Appointments_Client