import { useEffect, useState } from 'react'
import { Search, SlidersHorizontal, Wifi } from 'lucide-react'

export type Section = 'overview' | 'tools' | 'tips' | 'docs'

const MENUS: { id: Section | 'github'; label: string }[] = [
  { id: 'overview', label: '概览' },
  { id: 'tools', label: '工具' },
  { id: 'tips', label: '技巧' },
  { id: 'docs', label: '文档' },
  { id: 'github', label: 'GitHub' },
]

function AppleLogo() {
  return (
    <svg viewBox="0 0 24 24" className="h-[15px] w-[15px] fill-current" aria-hidden>
      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
    </svg>
  )
}

function useClock() {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 20_000)
    return () => clearInterval(t)
  }, [])
  const date = now.toLocaleDateString('zh-CN', { month: 'numeric', day: 'numeric', weekday: 'short' })
  const time = now.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit', hour12: false })
  return `${date} ${time}`
}

export function MenuBar({
  section,
  onNavigate,
  onSearch,
}: {
  section: Section
  onNavigate: (s: Section) => void
  onSearch: () => void
}) {
  const clock = useClock()

  return (
    <header className="menubar-glass fixed inset-x-0 top-0 z-40 flex h-7 items-center gap-1 px-3 text-[12.5px] text-white/85 select-none">
      <button
        className="flex items-center gap-2 rounded px-2 py-0.5 transition hover:bg-white/12"
        onClick={() => onNavigate('overview')}
        aria-label="回到概览"
      >
        <AppleLogo />
        <span className="font-semibold tracking-tight">Mac-Tips</span>
      </button>

      <nav className="ml-1 hidden items-center gap-0.5 sm:flex">
        {MENUS.map((m) => (
          <button
            key={m.id}
            onClick={() => {
              if (m.id === 'github') window.open('https://github.com/selierlin/Mac-Tips', '_blank')
              else onNavigate(m.id)
            }}
            className={`rounded px-2 py-0.5 transition hover:bg-white/12 ${
              section === m.id ? 'bg-white/14 font-medium text-white' : ''
            }`}
          >
            {m.label}
          </button>
        ))}
      </nav>

      <div className="ml-auto flex items-center gap-3">
        <button
          onClick={onSearch}
          className="flex items-center gap-1.5 rounded px-2 py-0.5 transition hover:bg-white/12"
          aria-label="搜索（⌘K）"
        >
          <Search className="h-3.5 w-3.5" strokeWidth={2.2} />
          <kbd className="hidden text-[11px] text-white/55 sm:inline">⌘K</kbd>
        </button>
        <Wifi className="h-3.5 w-3.5" strokeWidth={2.2} />
        <span className="flex h-[11px] w-[22px] items-center rounded-[3px] border border-white/60 p-[1.5px]">
          <span className="h-full w-[72%] rounded-[1px] bg-white/85" />
        </span>
        <SlidersHorizontal className="h-3.5 w-3.5" strokeWidth={2.2} />
        <span className="tabular-nums tracking-tight text-white/90">{clock}</span>
      </div>
    </header>
  )
}
