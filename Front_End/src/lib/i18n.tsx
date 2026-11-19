import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { RU, RU_PATTERNS } from './ru'

export type Lang = 'en' | 'ru'

type LangContextValue = { lang: Lang; setLang: (lang: Lang) => void }

const LangContext = createContext<LangContextValue>({ lang: 'en', setLang: () => {} })

export const useLang = () => useContext(LangContext)

const ATTRS = ['placeholder', 'aria-label', 'title', 'alt']
const SKIP = new Set(['SCRIPT', 'STYLE', 'TEXTAREA', 'CODE'])

type Rec = { orig: string; out: string }

const textRecs = new WeakMap<Node, Rec>()
const attrRecs = new WeakMap<Element, Map<string, Rec>>()

const RU_LOWER: Record<string, string> = {}
for (const [key, value] of Object.entries(RU)) RU_LOWER[key.toLowerCase()] = value

const translate = (raw: string): string | null => {
  const trimmed = raw.trim()
  if (!trimmed) return null
  let out: string | undefined = RU[trimmed]
  if (out === undefined) {
    const lower = RU_LOWER[trimmed.toLowerCase()]
    if (lower !== undefined) out = trimmed === trimmed.toUpperCase() ? lower.toUpperCase() : lower
  }
  if (out === undefined) {
    for (const [pattern, replacement] of RU_PATTERNS) {
      if (pattern.test(trimmed)) {
        out = trimmed.replace(pattern, replacement as unknown as string)
        break
      }
    }
  }
  if (out === undefined) return null
  const lead = raw.match(/^\s*/)?.[0] ?? ''
  const trail = raw.match(/\s*$/)?.[0] ?? ''
  return lead + out + trail
}

const applyText = (node: Text) => {
  const parent = node.parentElement
  if (!parent || SKIP.has(parent.tagName)) return
  const current = node.nodeValue ?? ''
  const rec = textRecs.get(node)
  if (rec && current === rec.out) return
  const out = translate(current)
  if (out === null) {
    textRecs.delete(node)
    return
  }
  textRecs.set(node, { orig: current, out })
  node.nodeValue = out
}

const applyAttrs = (el: Element) => {
  for (const attr of ATTRS) {
    const value = el.getAttribute(attr)
    if (!value) continue
    let map = attrRecs.get(el)
    const rec = map?.get(attr)
    if (rec && value === rec.out) continue
    const out = translate(value)
    if (out === null) {
      map?.delete(attr)
      continue
    }
    if (!map) {
      map = new Map()
      attrRecs.set(el, map)
    }
    map.set(attr, { orig: value, out })
    el.setAttribute(attr, out)
  }
}

const applyTree = (root: Node) => {
  if (root.nodeType === Node.TEXT_NODE) {
    applyText(root as Text)
    return
  }
  if (root.nodeType !== Node.ELEMENT_NODE) return
  const el = root as Element
  applyAttrs(el)
  el.querySelectorAll('[placeholder],[aria-label],[title],[alt]').forEach(applyAttrs)
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT)
  let node = walker.nextNode()
  while (node) {
    applyText(node as Text)
    node = walker.nextNode()
  }
}

const restoreTree = () => {
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT)
  let node = walker.nextNode()
  while (node) {
    const rec = textRecs.get(node)
    if (rec && node.nodeValue === rec.out) node.nodeValue = rec.orig
    textRecs.delete(node)
    node = walker.nextNode()
  }
  document.querySelectorAll('[placeholder],[aria-label],[title],[alt]').forEach((el) => {
    const map = attrRecs.get(el)
    if (!map) return
    map.forEach((rec, attr) => {
      if (el.getAttribute(attr) === rec.out) el.setAttribute(attr, rec.orig)
    })
    attrRecs.delete(el)
  })
}

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Lang>(() => {
    try {
      return localStorage.getItem('lang') === 'ru' ? 'ru' : 'en'
    } catch {
      return 'en'
    }
  })

  const setLang = (next: Lang) => {
    try {
      localStorage.setItem('lang', next)
    } catch {
      setLangState(next)
    }
    setLangState(next)
  }

  useEffect(() => {
    document.documentElement.lang = lang
    if (lang !== 'ru') return

    applyTree(document.body)
    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.type === 'characterData') applyText(m.target as Text)
        else if (m.type === 'attributes') applyAttrs(m.target as Element)
        else m.addedNodes.forEach(applyTree)
      }
    })
    observer.observe(document.body, {
      subtree: true,
      childList: true,
      characterData: true,
      attributes: true,
      attributeFilter: ATTRS,
    })
    return () => {
      observer.disconnect()
      restoreTree()
    }
  }, [lang])

  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>
}

export const LanguageSwitch = () => {
  const { lang, setLang } = useLang()
  const base = 'px-2.5 py-1 text-[11px] font-semibold rounded-full transition-colors'
  const on = { backgroundColor: '#A33A10', color: '#fff' }
  return (
    <div
      className="fixed bottom-4 right-4 z-40 flex items-center gap-1 bg-white/95 border border-[#D6CCC2] rounded-full p-1 shadow-lg"
      translate="no"
    >
      <button type="button" aria-label="English" className={base} style={lang === 'en' ? on : { color: '#7A6458' }} onClick={() => setLang('en')}>
        EN
      </button>
      <button type="button" aria-label="Русский" className={base} style={lang === 'ru' ? on : { color: '#7A6458' }} onClick={() => setLang('ru')}>
        RU
      </button>
    </div>
  )
}
