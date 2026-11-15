import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { BookOpen, Boxes, Command, Github, Monitor, Search } from 'lucide-react'
import type { Section } from './MenuBar'
import { REPO_URL } from '../lib/icons'

const ITEMS = [
  { id: 'overview', label: '概览', icon: Monitor, from: '#5ac8fa', to: '#007aff' },
  { id: 'tools', label: '工具推荐', icon: Boxes, from: '#bf5af2', to: '#6e3bd0' },
  { id: 'tips', label: '快捷键与技巧', icon: Command, from: '#ffd60a', to: '#ff9f0a' },
  { id: 'docs', label: '文档', icon: BookOpen, from: '#30d158', to: '#0a8f4a' },
  { id: 'search', label: '搜索  ⌘K', icon: Search, from: '#e5e5ea', to: '#8e8e93' },
  { id: 'github', label: 'GitHub', icon: Github, from: '#636366', to: '#1c1c1e' },
] as const

export function Dock({
  section,
  onNavigate,
  onSearch,
}: {
  section: Section
  onNavigate: (s: Section) => void
  onSearch: () => void
}) {
  const [hovered, setHovered] = useState<number | null>(null)

  const scaleFor = (i: number) => {
    if (hovered === null) return 1
    const d = Math.abs(i - hovered)
    if (d === 0) return 1.42
    if (d === 1) return 1.2
    if (d === 2) return 1.07
    return 1
  }

  return (
    <motion.div
      initial={{ y: 90, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 190, damping: 24, delay: 0.45 }}
      className="fixed bottom-3 left-1/2 z-40 -translate-x-1/2"
    >
      <div
        className="flex items-end gap-1.5 rounded-2xl border border-white/12 bg-white/10 px-2.5 pb-2 pt-1.5 shadow-[0_18px_50px_-12px_rgba(0,0,0,0.7)] backdrop-blur-2xl"
        onMouseLeave={() => setHovered(null)}
      >
        {ITEMS.map((item, i) => {
          const active = section === item.id
          const Icon = item.icon
          return (
            <div key={item.id} className="relative flex flex-col items-center">
              <AnimatePresence>
                {hovered === i && (
                  <motion.span
                    initial={{ opacity: 0, y: 6, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.9 }}
                    transition={{ duration: 0.14 }}
                    className="pointer-events-none absolute -top-8 whitespace-nowrap rounded-md border border-white/15 bg-black/80 px-2 py-1 text-[11px] text-white/90 backdrop-blur"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>

              <motion.button
                onMouseEnter={() => setHovered(i)}
                onFocus={() => setHovered(i)}
                onClick={() => {
                  if (item.id === 'search') onSearch()
                  else if (item.id === 'github') window.open(REPO_URL, '_blank')
                  else onNavigate(item.id as Section)
                }}
                whileTap={{ scale: 0.88 }}
                animate={{ scale: scaleFor(i), y: hovered === i ? -7 : 0 }}
                transition={{ type: 'spring', stiffness: 380, damping: 24 }}
                style={{ transformOrigin: 'bottom center' }}
                aria-label={item.label}
                aria-current={active ? 'page' : undefined}
                className="group relative h-[46px] w-[46px] shrink-0 rounded-[12px] outline-none sm:h-[52px] sm:w-[52px] sm:rounded-[14px]"
              >
                <span
                  className="absolute inset-0 overflow-hidden rounded-[inherit] shadow-[0_6px_14px_-4px_rgba(0,0,0,0.6)] ring-1 ring-white/25"
                  style={{ background: `linear-gradient(160deg, ${item.from}, ${item.to})` }}
                >
                  <span className="absolute inset-x-0 top-0 h-1/2 rounded-t-[inherit] bg-gradient-to-b from-white/35 to-transparent" />
                  <Icon
                    className="absolute left-1/2 top-1/2 h-[24px] w-[24px] -translate-x-1/2 -translate-y-1/2 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.45)] sm:h-[27px] sm:w-[27px]"
                    strokeWidth={1.9}
                  />
                </span>
                {active && (
                  <span className="absolute -bottom-[7px] left-1/2 h-[4px] w-[4px] -translate-x-1/2 rounded-full bg-white/85" />
                )}
              </motion.button>
            </div>
          )
        })}
      </div>
    </motion.div>
  )
}
