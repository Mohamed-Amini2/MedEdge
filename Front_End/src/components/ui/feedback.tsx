import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'
import { CheckCircle, Mic, MicOff, PhoneOff, Video, VideoOff, X } from 'lucide-react'

const TERRA = '#A33A10'

type ToastItem = { id: number; text: string }

const ToastContext = createContext<(text: string) => void>(() => {})

export const useToast = () => useContext(ToastContext)

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<ToastItem[]>([])

  const push = useCallback((text: string) => {
    const id = Date.now() + Math.random()
    setItems((prev) => [...prev, { id, text }])
    setTimeout(() => setItems((prev) => prev.filter((i) => i.id !== id)), 3500)
  }, [])

  return (
    <ToastContext.Provider value={push}>
      {children}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[80] flex flex-col items-center gap-2">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-3 bg-white border border-[#D6CCC2] rounded-xl shadow-2xl px-4 py-3 text-sm text-[#1A0F0A]"
          >
            <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: TERRA }} />
            {item.text}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

type ModalProps = {
  title: string
  onClose: () => void
  children: ReactNode
  footer?: ReactNode
  wide?: boolean
}

export const Modal = ({ title, onClose, children, footer, wide }: ModalProps) => (
  <div
    className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
    onClick={onClose}
  >
    <div
      className={`bg-white rounded-2xl shadow-2xl w-full ${wide ? 'max-w-2xl' : 'max-w-md'} max-h-[90vh] overflow-y-auto`}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex items-center justify-between px-6 pt-5 pb-3">
        <h2 className="text-lg font-semibold text-[#1A0F0A]">{title}</h2>
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="p-2 rounded-lg hover:bg-[#F5F0EB] text-[#8A7568]"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
      <div className="px-6 pb-4 text-sm text-[#5C4A3E]">{children}</div>
      {footer && <div className="flex justify-end gap-3 px-6 pb-5">{footer}</div>}
    </div>
  </div>
)

export const PrimaryButton = ({
  children,
  onClick,
  disabled,
}: {
  children: ReactNode
  onClick: () => void
  disabled?: boolean
}) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    className="px-5 py-2.5 rounded-xl text-white text-sm font-semibold hover:opacity-90 transition-all disabled:opacity-40"
    style={{ backgroundColor: TERRA }}
  >
    {children}
  </button>
)

export const SecondaryButton = ({ children, onClick }: { children: ReactNode; onClick: () => void }) => (
  <button
    type="button"
    onClick={onClick}
    className="px-5 py-2.5 rounded-xl border border-[#D6CCC2] text-sm font-semibold text-[#5C4A3E] hover:bg-[#F5F0EB] transition-all"
  >
    {children}
  </button>
)

const initials = (name: string) =>
  name
    .replace(/^Dr\.?\s*/i, '')
    .split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

export const CallModal = ({
  doctor,
  withVideo = true,
  onClose,
}: {
  doctor: string
  withVideo?: boolean
  onClose: () => void
}) => {
  const [connected, setConnected] = useState(false)
  const [seconds, setSeconds] = useState(0)
  const [muted, setMuted] = useState(false)
  const [cameraOn, setCameraOn] = useState(withVideo)

  useEffect(() => {
    const t = setTimeout(() => setConnected(true), 1800)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (!connected) return
    const t = setInterval(() => setSeconds((s) => s + 1), 1000)
    return () => clearInterval(t)
  }, [connected])

  const clock = `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/70">
      <div className="bg-[#1A0F0A] rounded-2xl shadow-2xl w-full max-w-xl overflow-hidden text-white">
        <div className="relative h-80 flex flex-col items-center justify-center gap-3">
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center text-3xl font-bold"
            style={{ backgroundColor: TERRA }}
          >
            {initials(doctor)}
          </div>
          <div className="text-lg font-semibold">{doctor}</div>
          <div className="text-sm text-white/70">{connected ? `Connected · ${clock}` : 'Connecting…'}</div>
          {withVideo && cameraOn && (
            <div className="absolute bottom-4 right-4 w-28 h-20 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-xs text-white/70">
              You
            </div>
          )}
        </div>
        <div className="flex items-center justify-center gap-4 py-4 bg-black/30">
          <button
            type="button"
            aria-label={muted ? 'Unmute' : 'Mute'}
            onClick={() => setMuted((m) => !m)}
            className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center"
          >
            {muted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>
          {withVideo && (
            <button
              type="button"
              aria-label={cameraOn ? 'Camera off' : 'Camera on'}
              onClick={() => setCameraOn((c) => !c)}
              className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center"
            >
              {cameraOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
            </button>
          )}
          <button
            type="button"
            aria-label="End call"
            onClick={onClose}
            className="w-12 h-12 rounded-full bg-red-600 hover:bg-red-700 flex items-center justify-center"
          >
            <PhoneOff className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}

export const downloadFile = (name: string, content: string, type = 'text/plain') => {
  const url = URL.createObjectURL(new Blob([content], { type }))
  const a = document.createElement('a')
  a.href = url
  a.download = name
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}
