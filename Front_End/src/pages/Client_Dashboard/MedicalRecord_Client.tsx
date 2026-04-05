import { useState } from 'react'
import {
  FileText,
  Search,
  Download,
  Share2,
  Eye,
  Filter,
  Activity,
  Pill,
  Camera,
  Stethoscope,
  FlaskConical,
  ShieldCheck,
  ChevronRight,
  Calendar,
  User,
  Tag,
  UploadCloud,
  Clock,
  MoreHorizontal,
  X,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react'

// ── Types ────────────────────────────────────────────────────
interface MedicalRecord {
  id: number
  title: string
  type: 'Lab Report' | 'Imaging' | 'Prescription' | 'Consultation' | 'Checkup' | 'Certificate' | 'Vaccination'
  doctor: string
  department: string
  date: string
  size: string
  status: 'Available' | 'Pending' | 'Processing'
  tags: string[]
  summary: string
  urgent?: boolean
}

// ── Data ─────────────────────────────────────────────────────
const RECORDS: MedicalRecord[] = [
  {
    id: 1,
    title: 'Annual Physical Examination',
    type: 'Checkup',
    doctor: 'Dr. Sarah Mitchell',
    department: 'General Practice',
    date: '2026-01-15',
    size: '2.4 MB',
    status: 'Available',
    tags: ['Annual', 'Physical'],
    summary: 'Comprehensive yearly physical. All vitals normal. Recommended follow-up for cholesterol levels.',
  },
  {
    id: 2,
    title: 'Complete Blood Count (CBC)',
    type: 'Lab Report',
    doctor: 'Dr. James Anderson',
    department: 'Cardiology',
    date: '2026-01-10',
    size: '1.1 MB',
    status: 'Available',
    tags: ['Blood Work', 'Routine'],
    summary: 'CBC panel within normal ranges. Slight elevation in white blood cell count noted.',
    urgent: true,
  },
  {
    id: 3,
    title: 'Chest X-Ray',
    type: 'Imaging',
    doctor: 'Dr. Michael Chen',
    department: 'Radiology',
    date: '2025-12-20',
    size: '8.7 MB',
    status: 'Available',
    tags: ['Imaging', 'Thoracic'],
    summary: 'No abnormalities detected in lung fields. Cardiac silhouette within normal limits.',
  },
  {
    id: 4,
    title: 'Cardiology Consultation Report',
    type: 'Consultation',
    doctor: 'Dr. James Anderson',
    department: 'Cardiology',
    date: '2025-12-15',
    size: '0.8 MB',
    status: 'Available',
    tags: ['Cardiology', 'Follow-up'],
    summary: 'Follow-up consultation for hypertension management. Medication dosage adjusted.',
  },
  {
    id: 5,
    title: 'Allergy Panel Results',
    type: 'Lab Report',
    doctor: 'Dr. Emily Brown',
    department: 'Immunology',
    date: '2025-11-28',
    size: '1.5 MB',
    status: 'Available',
    tags: ['Allergy', 'Immunology'],
    summary: 'Positive reaction to dust mites and pollen. Negative for food allergens.',
  },
  {
    id: 6,
    title: 'COVID-19 Vaccination Record',
    type: 'Vaccination',
    doctor: 'Dr. Sarah Mitchell',
    department: 'General Practice',
    date: '2025-11-10',
    size: '0.3 MB',
    status: 'Available',
    tags: ['Vaccination', 'COVID-19'],
    summary: 'Booster dose administered. Full vaccination record updated.',
  },
  {
    id: 7,
    title: 'MRI Brain Scan',
    type: 'Imaging',
    doctor: 'Dr. Emily Brown',
    department: 'Neurology',
    date: '2025-10-22',
    size: '24.3 MB',
    status: 'Processing',
    tags: ['Imaging', 'Neurology', 'MRI'],
    summary: 'Scan ordered for recurring headaches. Results under review.',
  },
  {
    id: 8,
    title: 'Dermatology Skin Assessment',
    type: 'Consultation',
    doctor: 'Dr. Michael Chen',
    department: 'Dermatology',
    date: '2025-10-05',
    size: '3.2 MB',
    status: 'Available',
    tags: ['Dermatology', 'Skin'],
    summary: 'Routine skin check. Benign mole documented. Annual follow-up recommended.',
  },
]

const TYPE_CONFIG: Record<MedicalRecord['type'], { icon: React.ComponentType<{ className?: string }>; color: string; bg: string }> = {
  'Lab Report':   { icon: FlaskConical,  color: 'text-secondary',    bg: 'bg-secondary/10'  },
  'Imaging':      { icon: Camera,        color: 'text-accent-teal',   bg: 'bg-accent-teal/10'},
  'Prescription': { icon: Pill,          color: 'text-primary',       bg: 'bg-primary/10'    },
  'Consultation': { icon: Stethoscope,   color: 'text-text-secondary',bg: 'bg-surface-elevated'},
  'Checkup':      { icon: Activity,      color: 'text-accent-red',    bg: 'bg-accent-red/10' },
  'Certificate':  { icon: ShieldCheck,   color: 'text-secondary',     bg: 'bg-secondary/10'  },
  'Vaccination':  { icon: ShieldCheck,   color: 'text-accent-teal',   bg: 'bg-accent-teal/10'},
}

const FILTERS = ['All Records', 'Lab Report', 'Imaging', 'Prescription', 'Consultation', 'Checkup', 'Vaccination']

const STATS = [
  { label: 'Total Records',  value: '24', icon: FileText,    color: 'text-primary'     },
  { label: 'Lab Reports',    value: '8',  icon: FlaskConical,color: 'text-secondary'   },
  { label: 'Imaging',        value: '6',  icon: Camera,      color: 'text-accent-teal' },
  { label: 'Prescriptions',  value: '10', icon: Pill,        color: 'text-accent-red'  },
]

// ── Detail drawer ────────────────────────────────────────────
const RecordDrawer = ({ record, onClose }: { record: MedicalRecord; onClose: () => void }) => {
  const cfg = TYPE_CONFIG[record.type]
  const Icon = cfg.icon

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-text-primary/20 backdrop-blur-sm" onClick={onClose} />

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-surface border-l border-border h-full overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-surface border-b border-border px-6 py-5 flex items-center justify-between">
          <h3 className="serif text-xl text-text-primary">Record Details</h3>
          <button
            onClick={onClose}
            className="p-2 rounded-md hover:bg-surface-hover transition-colors"
          >
            <X className="w-5 h-5 text-text-secondary" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Type + title */}
          <div>
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs mb-3 ${cfg.bg} ${cfg.color}`}>
              <Icon className="w-3.5 h-3.5" />
              {record.type}
            </div>
            <h2 className="serif text-2xl text-text-primary leading-snug mb-2">{record.title}</h2>
            {record.urgent && (
              <div className="flex items-center gap-1.5 text-xs text-accent-red">
                <AlertCircle className="w-3.5 h-3.5" />
                Requires attention
              </div>
            )}
          </div>

          {/* Summary */}
          <div className="bg-surface-elevated border border-border rounded-lg p-4">
            <p className="text-xs text-text-muted uppercase tracking-widest mb-2">Summary</p>
            <p className="text-sm text-text-secondary leading-relaxed">{record.summary}</p>
          </div>

          {/* Meta */}
          <div className="space-y-3">
            {[
              { icon: User,     label: 'Doctor',     value: record.doctor     },
              { icon: Activity, label: 'Department', value: record.department },
              { icon: Calendar, label: 'Date',       value: record.date       },
              { icon: FileText, label: 'File Size',  value: record.size       },
            ].map((row) => (
              <div key={row.label} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-md bg-surface-elevated border border-border flex items-center justify-center flex-shrink-0">
                  <row.icon className="w-4 h-4 text-text-muted" />
                </div>
                <div>
                  <p className="text-xs text-text-muted">{row.label}</p>
                  <p className="text-sm text-text-primary">{row.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Tags */}
          <div>
            <p className="text-xs text-text-muted uppercase tracking-widest mb-2">Tags</p>
            <div className="flex flex-wrap gap-2">
              {record.tags.map((tag) => (
                <span key={tag} className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs border border-border text-text-secondary">
                  <Tag className="w-3 h-3" />
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Status */}
          <div className="flex items-center gap-2">
            {record.status === 'Available' ? (
              <CheckCircle2 className="w-4 h-4 text-secondary" />
            ) : (
              <Clock className="w-4 h-4 text-status-warning" />
            )}
            <span className={`text-sm ${record.status === 'Available' ? 'text-secondary' : 'text-status-warning'}`}>
              {record.status}
            </span>
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-border space-y-2">
            <button className="w-full btn-primary flex items-center justify-center gap-2">
              <Eye className="w-4 h-4" />
              VIEW DOCUMENT
            </button>
            <div className="grid grid-cols-2 gap-2">
              <button className="flex items-center justify-center gap-2 px-4 py-2.5 border border-border rounded-md text-sm text-text-secondary hover:bg-surface-hover hover:text-text-primary transition-all">
                <Download className="w-4 h-4" />
                Download
              </button>
              <button className="flex items-center justify-center gap-2 px-4 py-2.5 border border-border rounded-md text-sm text-text-secondary hover:bg-surface-hover hover:text-text-primary transition-all">
                <Share2 className="w-4 h-4" />
                Share
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Record card ──────────────────────────────────────────────
const RecordCard = ({ record, onClick }: { record: MedicalRecord; onClick: () => void }) => {
  const cfg = TYPE_CONFIG[record.type]
  const Icon = cfg.icon

  return (
    <div
      className="bg-surface border border-border rounded-lg p-6 hover:shadow-md hover:border-primary/30 transition-all cursor-pointer group"
      onClick={onClick}
    >
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className={`w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0 ${cfg.bg}`}>
          <Icon className={`w-5 h-5 ${cfg.color}`} />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="text-text-primary text-sm font-medium leading-snug group-hover:text-primary transition-colors">
              {record.title}
            </h3>
            {record.urgent && (
              <AlertCircle className="w-4 h-4 text-accent-red flex-shrink-0 mt-0.5" />
            )}
          </div>

          <p className="text-xs text-text-secondary mb-3 line-clamp-1">{record.summary}</p>

          <div className="flex items-center gap-4 text-xs text-text-muted flex-wrap">
            <span className="flex items-center gap-1">
              <User className="w-3.5 h-3.5" />
              {record.doctor}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {record.date}
            </span>
            <span className="flex items-center gap-1">
              <FileText className="w-3.5 h-3.5" />
              {record.size}
            </span>
          </div>
        </div>

        {/* Right side */}
        <div className="flex flex-col items-end gap-2 flex-shrink-0">
          <span className={`px-2.5 py-1 rounded-full text-xs ${
            record.status === 'Available'  ? 'bg-secondary/10 text-secondary' :
            record.status === 'Processing' ? 'bg-status-warning/10 text-status-warning' :
            'bg-surface-elevated text-text-muted'
          }`}>
            {record.status}
          </span>
          <ChevronRight className="w-4 h-4 text-text-muted group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
        </div>
      </div>

      {/* Tags */}
      {record.tags.length > 0 && (
        <div className="flex gap-1.5 mt-4 pt-4 border-t border-border">
          {record.tags.map((tag) => (
            <span key={tag} className="px-2 py-0.5 rounded-full text-[11px] border border-border text-text-muted">
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

// ── Main component ───────────────────────────────────────────
export const MedicalRecords = () => {
  const [search,        setSearch       ] = useState('')
  const [activeFilter,  setActiveFilter  ] = useState('All Records')
  const [activeRecord,  setActiveRecord  ] = useState<MedicalRecord | null>(null)
  const [view,          setView          ] = useState<'grid' | 'list'>('grid')

  const filtered = RECORDS.filter((r) => {
    const matchFilter = activeFilter === 'All Records' || r.type === activeFilter
    const matchSearch = !search || [r.title, r.doctor, r.type, ...r.tags]
      .some((s) => s.toLowerCase().includes(search.toLowerCase()))
    return matchFilter && matchSearch
  })

  return (
    <div className="space-y-8">
      {activeRecord && (
        <RecordDrawer record={activeRecord} onClose={() => setActiveRecord(null)} />
      )}

      {/* ── Heading ── */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="serif text-4xl text-text-primary mb-2">Medical Records</h1>
          <p className="text-text-secondary">Access, download, and share your health documents securely.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 border border-border rounded-md text-sm text-text-secondary hover:bg-surface-hover hover:text-text-primary transition-all">
            <UploadCloud className="w-4 h-4" />
            Upload
          </button>
          <button className="btn-primary flex items-center gap-2">
            <FileText className="w-4 h-4" />
            REQUEST RECORDS
          </button>
        </div>
      </div>

      {/* ── Stats ── */}
      <div className="grid grid-cols-4 gap-5">
        {STATS.map((s) => (
          <div key={s.label} className="bg-surface border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-text-muted">{s.label}</span>
              <s.icon className={`w-4 h-4 ${s.color}`} />
            </div>
            <p className="text-3xl text-text-primary">{s.value}</p>
          </div>
        ))}
      </div>

      {/* ── Search + controls ── */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title, doctor, type, or tag..."
            className="w-full pl-11 pr-4 py-3 bg-surface border border-border rounded-md focus:outline-none focus:border-primary transition-colors text-text-primary placeholder-text-muted text-sm"
          />
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-4 top-1/2 -translate-y-1/2">
              <X className="w-4 h-4 text-text-muted hover:text-text-primary" />
            </button>
          )}
        </div>

        {/* View toggle */}
        <div className="flex items-center border border-border rounded-md overflow-hidden bg-surface">
          <button
            onClick={() => setView('grid')}
            className={`p-2.5 transition-colors ${view === 'grid' ? 'bg-primary/10 text-primary' : 'text-text-muted hover:text-text-primary'}`}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
              <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zm8 0A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm-8 8A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm8 0A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3z"/>
            </svg>
          </button>
          <button
            onClick={() => setView('list')}
            className={`p-2.5 transition-colors ${view === 'list' ? 'bg-primary/10 text-primary' : 'text-text-muted hover:text-text-primary'}`}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
            </svg>
          </button>
        </div>

        <button className="flex items-center gap-2 px-3 py-2.5 border border-border rounded-md text-sm text-text-secondary hover:bg-surface-hover transition-all">
          <Filter className="w-4 h-4" />
          Filter
        </button>
      </div>

      {/* ── Filter pills ── */}
      <div className="flex gap-2 overflow-x-auto pb-1 -mt-4">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all border ${
              activeFilter === f
                ? 'bg-primary text-white border-primary'
                : 'bg-surface border-border text-text-secondary hover:border-primary/40 hover:text-text-primary'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* ── Results count ── */}
      <div className="flex items-center justify-between -mt-4">
        <p className="text-sm text-text-muted">
          Showing <span className="text-text-primary">{filtered.length}</span> record{filtered.length !== 1 ? 's' : ''}
          {activeFilter !== 'All Records' && <> in <span className="text-primary">{activeFilter}</span></>}
        </p>
        {search && (
          <button onClick={() => setSearch('')} className="text-xs text-primary hover:underline">
            Clear search
          </button>
        )}
      </div>

      {/* ── Records ── */}
      {filtered.length === 0 ? (
        <div className="bg-surface border border-border rounded-lg p-16 text-center">
          <FileText className="w-10 h-10 text-text-muted mx-auto mb-4" />
          <h3 className="serif text-xl text-text-primary mb-2">No records found</h3>
          <p className="text-sm text-text-secondary">Try adjusting your search or filter.</p>
        </div>
      ) : view === 'grid' ? (
        <div className="grid md:grid-cols-2 gap-4">
          {filtered.map((r) => (
            <RecordCard key={r.id} record={r} onClick={() => setActiveRecord(r)} />
          ))}
        </div>
      ) : (
        /* List view */
        <div className="bg-surface border border-border rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-surface-elevated border-b border-border">
              <tr>
                {['Document', 'Type', 'Doctor', 'Date', 'Size', 'Status', ''].map((h) => (
                  <th key={h} className="px-6 py-4 text-left text-xs text-text-muted uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((r) => {
                const cfg = TYPE_CONFIG[r.type]
                const Icon = cfg.icon
                return (
                  <tr
                    key={r.id}
                    onClick={() => setActiveRecord(r)}
                    className="hover:bg-surface-hover transition-colors cursor-pointer group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0 ${cfg.bg}`}>
                          <Icon className={`w-4 h-4 ${cfg.color}`} />
                        </div>
                        <div>
                          <p className="text-sm text-text-primary group-hover:text-primary transition-colors">{r.title}</p>
                          {r.urgent && <p className="text-xs text-accent-red flex items-center gap-1 mt-0.5"><AlertCircle className="w-3 h-3" /> Requires attention</p>}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs px-2 py-1 rounded-full ${cfg.bg} ${cfg.color}`}>{r.type}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-text-secondary">{r.doctor}</td>
                    <td className="px-6 py-4 text-sm text-text-muted">{r.date}</td>
                    <td className="px-6 py-4 text-sm text-text-muted">{r.size}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs ${
                        r.status === 'Available'  ? 'bg-secondary/10 text-secondary' :
                        r.status === 'Processing' ? 'bg-status-warning/10 text-status-warning' :
                        'bg-surface-elevated text-text-muted'
                      }`}>
                        {r.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-1.5 hover:bg-primary/10 rounded-md transition-colors" onClick={(e) => e.stopPropagation()}>
                          <Eye className="w-4 h-4 text-primary" />
                        </button>
                        <button className="p-1.5 hover:bg-surface-elevated rounded-md transition-colors" onClick={(e) => e.stopPropagation()}>
                          <Download className="w-4 h-4 text-text-secondary" />
                        </button>
                        <button className="p-1.5 hover:bg-surface-elevated rounded-md transition-colors" onClick={(e) => e.stopPropagation()}>
                          <MoreHorizontal className="w-4 h-4 text-text-secondary" />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default MedicalRecords