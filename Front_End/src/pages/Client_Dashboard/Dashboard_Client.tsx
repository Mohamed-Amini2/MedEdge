import LineInteractive from '../../components/charts/line-interactive'

const TERRA = '#A33A10'

const STAT_CARDS = [
  {
    label: 'Total Appointments', value: '128', sub: '+4 this week',   trend: 'up',      action: 'Book New',
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" /></svg>,
  },
  {
    label: 'Active Records',      value: '34',  sub: '2 updated today', trend: 'up',      action: 'View Records',
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" /></svg>,
  },
  {
    label: 'Unread Messages',     value: '7',   sub: '3 from doctors',  trend: 'down',    action: 'Open Inbox',
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" /></svg>,
  },
  {
    label: 'Prescriptions',       value: '3',   sub: '1 needs refill',  trend: 'neutral', action: 'Request Refill',
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" /></svg>,
  },
]

const VITALS = [
  { label: 'Heart Rate',        value: '72',     unit: 'bpm',  recorded: '2h ago', trend: 'up',      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" /></svg> },
  { label: 'Blood Pressure',    value: '118/76', unit: 'mmHg', recorded: '2h ago', trend: 'neutral', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg> },
  { label: 'Weight',            value: '74.2',   unit: 'kg',   recorded: '3d ago', trend: 'down',    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3c-1.2 5.4-6 7.8-6 12a6 6 0 0 0 12 0c0-4.2-4.8-6.6-6-12Z" /></svg> },
  { label: 'Oxygen Saturation', value: '98',     unit: '%',    recorded: '2h ago', trend: 'neutral', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" /></svg> },
]

const PRESCRIPTIONS = [
  { name: 'Metformin',    dose: '500mg', freq: 'Twice daily',   refillIn: '12 days', status: 'active' },
  { name: 'Lisinopril',   dose: '10mg',  freq: 'Once daily',    refillIn: '4 days',  status: 'refill' },
  { name: 'Atorvastatin', dose: '20mg',  freq: 'Once at night', refillIn: '20 days', status: 'active' },
]

const UPCOMING = [
  { time: '09:00', label: 'Dr. Patel',  specialty: 'Cardiology',  tag: 'Today',    isToday: true  },
  { time: '14:30', label: 'Dr. Nguyen', specialty: 'Dermatology', tag: 'Tomorrow', isToday: false },
  { time: '10:00', label: 'Dr. Lee',    specialty: 'General',     tag: 'Thu',      isToday: false },
]

const TrendArrow = ({ trend }: { trend: string }) => {
  if (trend === 'up')   return <span className="text-green-500 text-xs font-bold">↑</span>
  if (trend === 'down') return <span className="text-red-400 text-xs font-bold">↓</span>
  return <span className="text-[#A89080] text-xs font-bold">→</span>
}

const SectionHeader = ({ label, action }: { label: string; action?: string }) => (
  <div className="flex items-center justify-between mb-4">
    <div className="text-xs tracking-[0.15em] text-[#A89080] font-semibold">{label}</div>
    {action && (
      <button className="text-[11px] font-medium hover:underline" style={{ color: TERRA }}>
        {action}
      </button>
    )}
  </div>
)

const Dashboard_Client = () => {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric',
  }).toUpperCase()

  return (
    <>
      {/* ── Heading ── */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span
              className="text-[10px] tracking-[0.25em] font-semibold px-2.5 py-1 rounded-full"
              style={{ backgroundColor: `${TERRA}12`, color: TERRA }}
            >
              {today}
            </span>
            <span className="w-1 h-1 rounded-full bg-[#D6CCC2] inline-block" />
            <span className="text-[10px] tracking-[0.2em] text-[#A89080] font-medium">PATIENT PORTAL</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-[#1A0F0A]">
            Welcome back,{' '}
            <span className="relative inline-block" style={{ color: TERRA }}>
              Mohamed
              <span className="absolute -bottom-0.5 left-0 w-full h-0.5 rounded-full opacity-40" style={{ backgroundColor: TERRA }} />
            </span>
          </h1>
          <p className="text-sm text-[#7A6458] mt-2 flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-400" />
            All systems normal · Here's what's happening with your health today.
          </p>
        </div>
        <button className="relative w-10 h-10 rounded-xl bg-white border border-[#D6CCC2] flex items-center justify-center shadow-sm hover:shadow-md transition-all">
          <svg className="w-5 h-5 text-[#5C4A3E]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
          </svg>
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full border-2 border-white" style={{ backgroundColor: TERRA }} />
        </button>
      </div>

      {/* ── Stat Cards ── */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {STAT_CARDS.map((card) => (
          <button
            key={card.label}
            className="group bg-white rounded-xl border border-[#D6CCC2] shadow-sm p-5 text-left hover:shadow-md hover:border-[#C4A99A] transition-all duration-200 flex flex-col gap-3"
          >
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(163,58,16,0.08)', color: TERRA }}>
                {card.icon}
              </div>
              <TrendArrow trend={card.trend} />
            </div>
            <div>
              <div className="text-2xl font-bold text-[#1A0F0A] leading-none">{card.value}</div>
              <div className="text-xs text-[#8A7568] mt-0.5">{card.label}</div>
              <div className="text-[11px] text-[#A89080] mt-0.5">{card.sub}</div>
            </div>
            <div className="text-[11px] font-semibold tracking-wide group-hover:underline" style={{ color: TERRA }}>
              {card.action} →
            </div>
          </button>
        ))}
      </div>

      {/* ── Chart + Upcoming ── */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="col-span-2 bg-white rounded-xl border border-[#D6CCC2] shadow-sm">
          <LineInteractive />
        </div>
        <div className="col-span-1 bg-white rounded-xl border border-[#D6CCC2] shadow-sm p-5">
          <SectionHeader label="UPCOMING APPOINTMENTS" action="View all" />
          <div className="relative">
            <div className="absolute left-[7px] top-2 bottom-2 w-px" style={{ backgroundColor: '#EDE6DE' }} />
            <div className="space-y-4 pl-6">
              {UPCOMING.map((appt) => (
                <div key={appt.label} className="relative">
                  <div
                    className="absolute -left-6 top-1 w-3.5 h-3.5 rounded-full border-2 border-white"
                    style={{ backgroundColor: appt.isToday ? TERRA : '#D6CCC2' }}
                  />
                  <div
                    className="rounded-lg p-3 border"
                    style={appt.isToday ? { borderColor: `${TERRA}30`, backgroundColor: `${TERRA}06` } : { borderColor: '#EDE6DE' }}
                  >
                    <div className="flex items-start justify-between gap-1 mb-1">
                      <div>
                        <div className="text-xs font-semibold text-[#1A0F0A]">{appt.label}</div>
                        <div className="text-[11px] text-[#8A7568]">{appt.specialty}</div>
                      </div>
                      <span
                        className="text-[10px] px-1.5 py-0.5 rounded-full font-medium flex-shrink-0"
                        style={appt.isToday ? { backgroundColor: `${TERRA}15`, color: TERRA } : { backgroundColor: '#F0EBE5', color: '#8A7568' }}
                      >
                        {appt.tag}
                      </span>
                    </div>
                    <div className="text-[11px] text-[#A89080] mb-2">{appt.time}</div>
                    {appt.isToday && (
                      <button className="w-full text-[11px] font-semibold py-1.5 rounded-md text-white hover:opacity-90 transition-opacity" style={{ backgroundColor: TERRA }}>
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

      {/* ── Vitals + Prescriptions ── */}
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 bg-white rounded-xl border border-[#D6CCC2] shadow-sm p-5">
          <SectionHeader label="HEALTH VITALS" action="View history" />
          <div className="grid grid-cols-2 gap-3">
            {VITALS.map((vital) => (
              <div key={vital.label} className="flex items-center gap-3 rounded-lg border border-[#EDE6DE] p-4 hover:border-[#C4A99A] transition-colors">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(163,58,16,0.07)', color: TERRA }}>
                  {vital.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[11px] text-[#8A7568]">{vital.label}</div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-lg font-bold text-[#1A0F0A] leading-none">{vital.value}</span>
                    <span className="text-[11px] text-[#A89080]">{vital.unit}</span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
                    <span className="text-[10px] text-green-600">Normal</span>
                    <span className="text-[10px] text-[#C4B8B0]">· {vital.recorded}</span>
                  </div>
                </div>
                <TrendArrow trend={vital.trend} />
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-1 bg-white rounded-xl border border-[#D6CCC2] shadow-sm p-5">
          <SectionHeader label="PRESCRIPTIONS" action="View all" />
          <div className="space-y-3">
            {PRESCRIPTIONS.map((rx) => (
              <div key={rx.name} className="rounded-lg border border-[#EDE6DE] p-3 hover:border-[#C4A99A] transition-colors">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <div className="text-xs font-semibold text-[#1A0F0A]">{rx.name}</div>
                  <span
                    className="text-[10px] px-2 py-0.5 rounded-full font-medium flex-shrink-0"
                    style={rx.status === 'refill' ? { backgroundColor: '#FEF3C7', color: '#92400E' } : { backgroundColor: 'rgba(163,58,16,0.08)', color: TERRA }}
                  >
                    {rx.status === 'refill' ? '⚠ Refill soon' : 'Active'}
                  </span>
                </div>
                <div className="text-[11px] text-[#8A7568]">{rx.dose} · {rx.freq}</div>
                <div className="text-[11px] text-[#A89080] mt-1">Refill in {rx.refillIn}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard_Client