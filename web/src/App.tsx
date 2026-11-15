import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import { MenuBar, type Section } from './components/MenuBar'
import { Dock } from './components/Dock'
import { WindowFrame } from './components/WindowFrame'
import { Spotlight } from './components/Spotlight'
import { Overview } from './components/views/Overview'
import { ToolsView } from './components/views/ToolsView'
import { TipsView } from './components/views/TipsView'
import { DocsView, DocReader } from './components/views/DocsView'

export default function App() {
  const [section, setSection] = useState<Section>('overview')
  const [docSlug, setDocSlug] = useState<string | null>(null)
  const [spotlight, setSpotlight] = useState(false)
  const [toast, setToast] = useState<string | null>(null)
  const toastTimer = useRef<number | undefined>(undefined)

  const notify = useCallback((message: string) => {
    setToast(message)
    window.clearTimeout(toastTimer.current)
    toastTimer.current = window.setTimeout(() => setToast(null), 1800)
  }, [])

  const navigate = useCallback((s: Section) => {
    setSection(s)
    setDocSlug(null)
  }, [])

  const openDoc = useCallback((slug: string) => {
    setSection('docs')
    setDocSlug(slug)
    setSpotlight(false)
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setSpotlight((v) => !v)
      }
      if (e.key === 'Escape') setSpotlight(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const viewKey = `${section}:${docSlug ?? ''}`

  const view =
    section === 'tools' ? (
      <ToolsView />
    ) : section === 'tips' ? (
      <TipsView onToast={notify} />
    ) : section === 'docs' ? (
      docSlug ? (
        <DocReader slug={docSlug} onBack={() => setDocSlug(null)} onOpenDoc={openDoc} onToast={notify} />
      ) : (
        <DocsView onOpenDoc={openDoc} />
      )
    ) : (
      <Overview onNavigate={navigate} onOpenDoc={openDoc} />
    )

  return (
    <div className="relative h-full w-full overflow-hidden">
      <div className="wallpaper" aria-hidden />
      <div className="grain" aria-hidden />

      <MenuBar section={section} onNavigate={navigate} onSearch={() => setSpotlight(true)} />

      <div className="relative flex h-full items-center justify-center px-2 pb-[88px] pt-11 sm:px-6 sm:pb-24">
        <WindowFrame section={section} docSlug={docSlug} onNavigate={navigate}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={viewKey}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
            >
              {view}
            </motion.div>
          </AnimatePresence>
        </WindowFrame>
      </div>

      <Dock section={section} onNavigate={navigate} onSearch={() => setSpotlight(true)} />

      <Spotlight
        open={spotlight}
        onClose={() => setSpotlight(false)}
        onOpenDoc={openDoc}
        onToast={notify}
      />

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 420, damping: 30 }}
            className="glass fixed bottom-[92px] left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-full px-4 py-2 text-[12.5px] text-white/85"
          >
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
