import { useState, useEffect, type JSX } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Heart,
  Smile,
  ClipboardList,
  Brain,
  User,
  Lightbulb,
  Video,
  MapPin,
  Calendar,
  Clock,
  CheckCircle,
  Bell,
  Shield,
  Mail,
  Check,
  AlertTriangle,
  Plus,
  FileText,
  RefreshCw,
  ChevronRight,
} from 'lucide-react'

const TERRA = '#A33A10'

const SpecialtyIcons: Record<string, JSX.Element> = {
  cardiology:  <Heart className="w-5 h-5" />,
  dermatology: <Smile className="w-5 h-5" />,
  general:     <ClipboardList className="w-5 h-5" />,
  neurology:   <Brain className="w-5 h-5" />,
  pediatrics:  <User className="w-5 h-5" />,
  psychiatry:  <Lightbulb className="w-5 h-5" />,
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
  { id: 'video',     label: 'Video Call',  desc: 'Consult from home via secure video link', icon: <Video className="w-5 h-5" /> },
  { id: 'in-person', label: 'In-Person',   desc: 'Visit the clinic in person',              icon: <MapPin className="w-5 h-5" /> },
]

const REMINDER_OPTIONS = [
  { id: 'email', label: 'Email', desc: 'Confirmation & reminder to your inbox' },
  { id: 'sms',   label: 'SMS',   desc: 'Text reminder 1 hour before'           },
  { id: 'both',  label: 'Both',  desc: 'Email + SMS for full coverage'         },
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
              {done ? <Check className="w-3.5 h-3.5" /> : i + 1}
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
      icon: <Mail className="w-4 h-4" />,
      title: 'Confirmation sent to you',
      desc:  'A booking confirmation has been sent to your email and/or phone based on your reminder preference.',
      done:  true,
    },
    {
      icon: <User className="w-4 h-4" />,
      title: `${booking.doctor?.name} has been notified`,
      desc:  'Your doctor has received your appointment request and your reason for visit. They will review it before your session.',
      done:  true,
    },
    {
      icon: <Bell className="w-4 h-4" />,
      title: 'Reminder scheduled',
      desc:  `You'll receive a reminder 1 hour before your appointment on ${formattedDate} at ${booking.time}.`,
      done:  true,
    },
    {
      icon: <Shield className="w-4 h-4" />,
      title: booking.type === 'video' ? 'Video link will be sent 15 min before' : 'Clinic address sent to your email',
      desc:  booking.type === 'video'
        ? 'A secure video call link will be sent to you 15 minutes before your session starts.'
        : 'Directions to the clinic and check-in instructions have been sent to your registered email.',
      done: false,
    },
  ]

  return (
    <div className="flex flex-col items-center">
      <div className="relative mb-6 mt-2">
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center"
          style={{ backgroundColor: `${TERRA}12` }}
        >
          <CheckCircle className="w-10 h-10" style={{ color: TERRA }} />
        </div>
        <div className="absolute inset-0 rounded-full animate-ping opacity-10" style={{ backgroundColor: TERRA }} />
      </div>

      <h2 className="text-2xl font-bold text-[#1A0F0A] mb-1">Appointment Confirmed!</h2>
      <p className="text-sm text-[#8A7568] mb-6 text-center max-w-md">
        Your appointment has been successfully booked. Here's a summary of what happens next.
      </p>

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

  const handleClose   = () => { reset(); onClose() }
  const handleConfirm = () => { onConfirm(booking); setConfirmed(true) }

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
        {!confirmed && (
          <DialogHeader className="px-10 pt-7 pb-5 border-b border-[#EDE6DE]">
            <div className="flex items-center gap-3 mb-1">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${TERRA}12`, color: TERRA }}>
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <DialogTitle className="text-lg font-bold text-[#1A0F0A] leading-none">Book an Appointment</DialogTitle>
                <p className="text-xs text-[#A89080] mt-0.5">Complete the steps below to schedule your consultation.</p>
              </div>
            </div>
            <StepIndicator current={step} />
          </DialogHeader>
        )}

        <div className={`px-10 overflow-y-auto ${confirmed ? 'py-10 flex flex-col items-center max-h-[80vh]' : 'py-7 max-h-[60vh]'}`}>
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
                          <Check className="w-3 h-3 text-white" strokeWidth={3} />
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
                              ★ {doc.rating} <span className="text-[#A89080] font-normal">({doc.reviews})</span>
                            </span>
                            <span className="text-[11px] text-[#8A7568]">{doc.duration} · {doc.experience}</span>
                            <span className="text-[11px] text-[#8A7568]">{doc.languages.join(', ')}</span>
                          </div>
                        </div>
                        {active && (
                          <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: TERRA }}>
                            <Check className="w-3 h-3 text-white" strokeWidth={3} />
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

        {/* Footer */}
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
                  className="px-6 py-2.5 rounded-xl text-white text-xs font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 flex items-center gap-1.5"
                  style={{ backgroundColor: TERRA }}
                >
                  Continue <ChevronRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  onClick={handleConfirm}
                  className="px-6 py-2.5 rounded-xl text-white text-xs font-semibold hover:opacity-90 transition-all flex items-center gap-2"
                  style={{ backgroundColor: TERRA }}
                >
                  <CheckCircle className="w-4 h-4" />
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

// ── Stat cards ───────────────────────────────────────────────
const STAT_CARDS = [
  { label: 'Upcoming',    sub: 'Next: Jan 25, 10:00 AM', icon: <Clock className="w-5 h-5" />    },
  { label: 'Completed',   sub: 'This year',               icon: <CheckCircle className="w-5 h-5" /> },
  { label: 'Video Calls', sub: 'Remote consultations',    icon: <Video className="w-5 h-5" />   },
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
      <Clock className="w-3.5 h-3.5" />
      {time.days > 0 ? `In ${time.days}d ${time.hours}h` : time.hours > 0 ? `In ${time.hours}h ${time.minutes}m` : `In ${time.minutes}m`}
      {isImminent && ' · Starting soon'}
    </div>
  )
}

const CancelModal = ({ doctor, onConfirm, onClose }: { doctor: string; onConfirm: () => void; onClose: () => void }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
    <div className="bg-white rounded-2xl border border-[#D6CCC2] shadow-2xl p-8 w-full max-w-md mx-4">
      <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: '#FEF2F2' }}>
        <AlertTriangle className="w-6 h-6 text-red-500" />
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
      <CheckCircle className="w-5 h-5" style={{ color: TERRA }} />
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
            <Plus className="w-4 h-4" />
            BOOK APPOINTMENT
          </button>
          <button className="relative w-10 h-10 rounded-xl bg-white border border-[#D6CCC2] flex items-center justify-center shadow-sm hover:shadow-md transition-all">
            <Bell className="w-5 h-5 text-[#5C4A3E]" />
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
                  <FileText className="w-3 h-3" />
                  {appt.reason}
                </div>
                <div className="flex items-center gap-4 text-[11px] text-[#A89080]">
                  <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{appt.date}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{appt.time}</span>
                  <span className="flex items-center gap-1"><Video className="w-3.5 h-3.5" />{appt.type}</span>
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
                      <RefreshCw className="w-3.5 h-3.5" />
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