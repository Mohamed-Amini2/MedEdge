import { useState } from 'react'
import {
  Calendar, FileText, MessageSquare, RefreshCw, Heart, Activity,
  Droplet, Wind, TrendingUp, TrendingDown, Minus, ChevronRight,
  Clock, User, Pill, Bell, Plus, Eye,
} from 'lucide-react'

const TERRA = '#A33A10'

const STAT_CARDS = [
  {
    label: 'Total Appointments',
    value: '128',
    sub: '+4 this week',
    trend: 'up',
    action: 'Book New',
    icon: Calendar,
  },
  {
    label: 'Active Records',
    value: '34',
    sub: '2 updated today',
    trend: 'up',
    action: 'View Records',
    icon: FileText,
  },
  {
    label: 'Unread Messages',
    value: '7',
    sub: '3 from doctors',
    trend: 'down',
    action: 'Open Inbox',
    icon: MessageSquare,
  },
  {
    label: 'Prescriptions',
    value: '3',
    sub: '1 needs refill',
    trend: 'neutral',
    action: 'Request Refill',
    icon: RefreshCw,
  },
]

const VITALS = [
  { label: 'Heart Rate', value: '72', unit: 'bpm', recorded: '2h ago', trend: 'up', icon: Heart, status: 'normal' },
  { label: 'Blood Pressure', value: '118/76', unit: 'mmHg', recorded: '2h ago', trend: 'neutral', icon: Activity, status: 'normal' },
  { label: 'Weight', value: '74.2', unit: 'kg', recorded: '3d ago', trend: 'down', icon: Droplet, status: 'normal' },
  { label: 'Oxygen Saturation', value: '98', unit: '%', recorded: '2h ago', trend: 'neutral', icon: Wind, status: 'normal' },
]

const PRESCRIPTIONS = [
  { name: 'Metformin', dose: '500mg', freq: 'Twice daily', refillIn: '12 days', status: 'active' },
  { name: 'Lisinopril', dose: '10mg', freq: 'Once daily', refillIn: '4 days', status: 'refill' },
  { name: 'Atorvastatin', dose: '20mg', freq: 'Once at night', refillIn: '20 days', status: 'active' },
]

const UPCOMING = [
  { time: '09:00', label: 'Dr. Patel', specialty: 'Cardiology', tag: 'Today', isToday: true },
  { time: '14:30', label: 'Dr. Nguyen', specialty: 'Dermatology', tag: 'Tomorrow', isToday: false },
  { time: '10:00', label: 'Dr. Lee', specialty: 'General', tag: 'Thu', isToday: false },
]

const RECENT_RECORDS = [
  { id: 1, title: 'Blood Test Results', type: 'Lab Report', doctor: 'Dr. Anderson', date: 'Jan 20, 2026', status: 'New' },
  { id: 2, title: 'Annual Physical Exam', type: 'Checkup', doctor: 'Dr. Mitchell', date: 'Jan 15, 2026', status: 'Viewed' },
  { id: 3, title: 'Chest X-Ray', type: 'Imaging', doctor: 'Dr. Chen', date: 'Jan 10, 2026', status: 'Viewed' },
  { id: 4, title: 'Cardiology Report', type: 'Consultation', doctor: 'Dr. Anderson', date: 'Jan 8, 2026', status: 'Viewed' },
]

const TrendArrow = ({ trend }: { trend: string }) => {
  if (trend === 'up') return <TrendingUp className="w-4 h-4 text-green-500" />
  if (trend === 'down') return <TrendingDown className="w-4 h-4 text-red-400" />
  return <Minus className="w-4 h-4 text-[#A89080]" />
}

const SectionHeader = ({ label, action, onAction }: { label: string; action?: string; onAction?: () => void }) => (
  <div className="flex items-center justify-between mb-4">
    <div className="text-xs tracking-[0.15em] text-[#A89080] font-semibold uppercase">{label}</div>
    {action && (
      <button
        onClick={onAction}
        className="text-[11px] font-medium hover:underline flex items-center gap-1 transition-colors"
        style={{ color: TERRA }}
      >
        {action}
        <ChevronRight className="w-3 h-3" />
      </button>
    )}
  </div>
)

const Dashboard_Client = () => {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  }).toUpperCase()

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span
              className="text-[10px] tracking-[0.25em] font-semibold px-2.5 py-1 rounded-full"
              style={{ backgroundColor: `${TERRA}12`, color: TERRA }}
            >
              {today}
            </span>
            <span className="w-1 h-1 rounded-full bg-[#D6CCC2]" />
            <span className="text-[10px] tracking-[0.2em] text-[#A89080] font-medium">PATIENT PORTAL</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-[#1A0F0A]">
            Welcome back,{' '}
            <span className="relative inline-block" style={{ color: TERRA }}>
              Mohamed
              <span
                className="absolute -bottom-0.5 left-0 w-full h-0.5 rounded-full opacity-40"
                style={{ backgroundColor: TERRA }}
              />
            </span>
          </h1>
          <p className="text-sm text-[#7A6458] mt-2 flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            All systems normal · Here's what's happening with your health today.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="relative w-10 h-10 rounded-xl bg-white border border-[#D6CCC2] flex items-center justify-center shadow-sm hover:shadow-md transition-all">
            <Bell className="w-5 h-5 text-[#5C4A3E]" />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full border-2 border-white" style={{ backgroundColor: TERRA }} />
          </button>
          <button
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-white text-xs font-semibold tracking-wide shadow-sm hover:opacity-90 transition-all"
            style={{ backgroundColor: TERRA }}
          >
            <Plus className="w-4 h-4" />
            BOOK APPOINTMENT
          </button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-4 gap-4">
        {STAT_CARDS.map((card) => {
          const Icon = card.icon
          return (
            <button
              key={card.label}
              className="group bg-white rounded-xl border border-[#D6CCC2] shadow-sm p-5 text-left hover:shadow-md hover:border-[#C4A99A] transition-all duration-200 flex flex-col gap-3"
            >
              <div className="flex items-center justify-between">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${TERRA}10`, color: TERRA }}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <TrendArrow trend={card.trend} />
              </div>
              <div>
                <div className="text-2xl font-bold text-[#1A0F0A] leading-none">{card.value}</div>
                <div className="text-xs text-[#8A7568] mt-1">{card.label}</div>
                <div className="text-[11px] text-[#A89080] mt-0.5">{card.sub}</div>
              </div>
              <div
                className="text-[11px] font-semibold tracking-wide group-hover:underline flex items-center gap-1"
                style={{ color: TERRA }}
              >
                {card.action}
                <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </button>
          )
        })}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-3 gap-4">
        {/* Vitals */}
        <div className="col-span-2 bg-white rounded-xl border border-[#D6CCC2] shadow-sm p-5">
          <SectionHeader label="Health Vitals" action="View history" />
          <div className="grid grid-cols-2 gap-3">
            {VITALS.map((vital) => {
              const Icon = vital.icon
              return (
                <div
                  key={vital.label}
                  className="flex items-center gap-3 rounded-xl border border-[#EDE6DE] p-4 hover:border-[#C4A99A] hover:shadow-sm transition-all cursor-pointer"
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${TERRA}08`, color: TERRA }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[11px] text-[#8A7568]">{vital.label}</div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-xl font-bold text-[#1A0F0A] leading-none">{vital.value}</span>
                      <span className="text-[11px] text-[#A89080]">{vital.unit}</span>
                    </div>
                    <div className="flex items-center gap-1.5 mt-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                      <span className="text-[10px] text-green-600">Normal</span>
                      <span className="text-[10px] text-[#C4B8B0]">· {vital.recorded}</span>
                    </div>
                  </div>
                  <TrendArrow trend={vital.trend} />
                </div>
              )
            })}
          </div>
        </div>

        {/* Upcoming */}
        <div className="bg-white rounded-xl border border-[#D6CCC2] shadow-sm p-5">
          <SectionHeader label="Upcoming Appointments" action="View all" />
          <div className="relative">
            <div className="absolute left-[7px] top-2 bottom-2 w-px bg-[#EDE6DE]" />
            <div className="space-y-3 pl-6">
              {UPCOMING.map((appt, i) => (
                <div key={i} className="relative">
                  <div
                    className="absolute -left-6 top-1.5 w-3.5 h-3.5 rounded-full border-2 border-white"
                    style={{ backgroundColor: appt.isToday ? TERRA : '#D6CCC2' }}
                  />
                  <div
                    className="rounded-xl p-3.5 border transition-all hover:shadow-sm cursor-pointer"
                    style={
                      appt.isToday
                        ? { borderColor: `${TERRA}30`, backgroundColor: `${TERRA}06` }
                        : { borderColor: '#EDE6DE' }
                    }
                  >
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <div>
                        <div className="text-sm font-semibold text-[#1A0F0A]">{appt.label}</div>
                        <div className="text-[11px] text-[#8A7568]">{appt.specialty}</div>
                      </div>
                      <span
                        className="text-[10px] px-2 py-0.5 rounded-full font-medium flex-shrink-0"
                        style={
                          appt.isToday
                            ? { backgroundColor: `${TERRA}15`, color: TERRA }
                            : { backgroundColor: '#F0EBE5', color: '#8A7568' }
                        }
                      >
                        {appt.tag}
                      </span>
                    </div>
                    <div className="text-[11px] text-[#A89080] mb-2 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {appt.time}
                    </div>
                    {appt.isToday && (
                      <button
                        className="w-full text-[11px] font-semibold py-2 rounded-lg text-white hover:opacity-90 transition-opacity"
                        style={{ backgroundColor: TERRA }}
                      >
                        Join Call
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-3 gap-4">
        {/* Recent Records */}
        <div className="col-span-2 bg-white rounded-xl border border-[#D6CCC2] shadow-sm p-5">
          <SectionHeader label="Recent Medical Records" action="View all" />
          <div className="space-y-2">
            {RECENT_RECORDS.map((record) => (
              <div
                key={record.id}
                className="flex items-center gap-4 p-3 rounded-xl border border-[#EDE6DE] hover:border-[#C4A99A] hover:shadow-sm transition-all cursor-pointer group"
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${TERRA}08`, color: TERRA }}
                >
                  <FileText className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-[#1A0F0A] truncate">{record.title}</span>
                    {record.status === 'New' && (
                      <span className="text-[9px] px-1.5 py-0.5 rounded-full font-bold bg-blue-100 text-blue-600">NEW</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-[#8A7568] mt-0.5">
                    <span>{record.type}</span>
                    <span className="w-1 h-1 rounded-full bg-[#D6CCC2]" />
                    <span>{record.doctor}</span>
                    <span className="w-1 h-1 rounded-full bg-[#D6CCC2]" />
                    <span>{record.date}</span>
                  </div>
                </div>
                <button
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#D6CCC2] text-[11px] font-medium text-[#5C4A3E] opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#F5F0EB]"
                >
                  <Eye className="w-3 h-3" />
                  View
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Prescriptions */}
        <div className="bg-white rounded-xl border border-[#D6CCC2] shadow-sm p-5">
          <SectionHeader label="Prescriptions" action="View all" />
          <div className="space-y-2">
            {PRESCRIPTIONS.map((rx) => (
              <div
                key={rx.name}
                className="rounded-xl border border-[#EDE6DE] p-3.5 hover:border-[#C4A99A] hover:shadow-sm transition-all cursor-pointer"
              >
                <div className="flex items-start justify-between gap-2 mb-1">
                  <div className="flex items-center gap-2">
                    <Pill className="w-4 h-4" style={{ color: TERRA }} />
                    <span className="text-sm font-semibold text-[#1A0F0A]">{rx.name}</span>
                  </div>
                  <span
                    className="text-[10px] px-2 py-0.5 rounded-full font-medium flex-shrink-0"
                    style={
                      rx.status === 'refill'
                        ? { backgroundColor: '#FEF3C7', color: '#92400E' }
                        : { backgroundColor: `${TERRA}10`, color: TERRA }
                    }
                  >
                    {rx.status === 'refill' ? '⚠ Refill soon' : 'Active'}
                  </span>
                </div>
                <div className="text-[11px] text-[#8A7568]">
                  {rx.dose} · {rx.freq}
                </div>
                <div className="text-[11px] text-[#A89080] mt-1">Refill in {rx.refillIn}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard_Client