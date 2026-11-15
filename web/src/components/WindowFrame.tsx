import { useEffect, useRef, type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { BookOpen, Boxes, Command, Github, Monitor } from 'lucide-react'
import type { Section } from './MenuBar'
import { REPO_URL } from '../lib/icons'
import { docs, stats } from '../lib/content'

const SIDEBAR = [
  { id: 'overview' as Section, label: '概览', icon: Monitor, badge: null },
  { id: 'tools' as Section, label: '工具推荐', icon: Boxes, badge: stats.tools },
  { id: 'tips' as Section, label: '技巧与快捷键', icon: Command, badge: stats.shortcuts },
  { id: 'docs' as Section, label: '专题文档', icon: BookOpen, badge: docs.length },
]

const TITLES: Record<Section, string> = {
  overview: '概览',
  tools: '工具推荐',
  tips: '技巧与快捷键',
  docs: '专题文档',
}

export function WindowFrame({
  section,
  docSlug,
  onNavigate,
  children,
}: {
  section: Section
  docSlug: string | null
  onNavigate: (s: Section) => void
  children: ReactNode
}) {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 })
  }, [section, docSlug])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94, y: 44 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 170, damping: 24, delay: 0.1 }}
      className="glass flex h-full w-full max-w-[1180px] flex-col overflow-hidden rounded-[14px]"
    >
      {/* 标题栏 */}
      <div className="group flex h-11 shrink-0 items-center gap-3 border-b border-white/[0.07] bg-white/[0.03] px-4">
        <div className="flex gap-2">
          <span className="flex h-3 w-3 items-center justify-center rounded-full bg-[#ff5f57] ring-1 ring-black/20">
            <span className="text-[7px] font-bold leading-none text-black/45 opacity-0 group-hover:opacity-100">
              ×
            </span>
          </span>
          <span className="flex h-3 w-3 items-center justify-center rounded-full bg-[#febc2e] ring-1 ring-black/20">
            <span className="text-[7px] font-bold leading-none text-black/45 opacity-0 group-hover:opacity-100">
              −
            </span>
          </span>
          <span className="flex h-3 w-3 items-center justify-center rounded-full bg-[#28c840] ring-1 ring-black/20">
            <span className="text-[7px] font-bold leading-none text-black/45 opacity-0 group-hover:opacity-100">
              +
            </span>
          </span>
        </div>
        <span className="text-[12px] font-medium text-white/55">
          Mac-Tips
          <span className="mx-1.5 text-white/20">/</span>
          <span className="text-white/80">{TITLES[section]}</span>
        </span>
        <span className="ml-auto hidden items-center gap-1.5 text-[10.5px] text-white/30 sm:flex">
          <kbd className="rounded border border-white/12 px-1 py-0.5">⌘</kbd>
          <kbd className="rounded border border-white/12 px-1 py-0.5">K</kbd>
          <span>搜索</span>
        </span>
      </div>

      {/* 移动端导航 */}
      <div className="thin-scroll flex shrink-0 gap-1 overflow-x-auto border-b border-white/[0.07] px-3 py-2 md:hidden">
        {SIDEBAR.map((s) => {
          const Icon = s.icon
          const on = section === s.id
          return (
            <button
              key={s.id}
              onClick={() => onNavigate(s.id)}
              className={`flex shrink-0 items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[12px] transition ${
                on ? 'bg-white/14 text-white' : 'text-white/50'
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              {s.label}
            </button>
          )
        })}
      </div>

      <div className="flex min-h-0 flex-1">
        {/* 侧边栏 */}
        <aside className="hidden w-[204px] shrink-0 flex-col border-r border-white/[0.07] bg-black/[0.14] p-2.5 md:flex">
          <div className="mb-2 px-2 pt-1 text-[10.5px] font-medium tracking-wider text-white/25">
            FAVORITES
          </div>
          <nav className="space-y-0.5">
            {SIDEBAR.map((s) => {
              const Icon = s.icon
              const on = section === s.id
              return (
                <button
                  key={s.id}
                  onClick={() => onNavigate(s.id)}
                  className={`flex w-full items-center gap-2.5 rounded-lg px-2.5 py-[7px] text-[12.5px] transition ${
                    on
                      ? 'bg-white/13 font-medium text-white'
                      : 'text-white/60 hover:bg-white/[0.06] hover:text-white/90'
                  }`}
                >
                  <Icon className="h-4 w-4 shrink-0 opacity-80" strokeWidth={1.8} />
                  <span className="flex-1 text-left">{s.label}</span>
                  {s.badge != null && (
                    <span className="text-[10.5px] tabular-nums text-white/30">{s.badge}</span>
                  )}
                </button>
              )
            })}
          </nav>

          <div className="mt-auto space-y-0.5 border-t border-white/[0.07] pt-2">
            <a
              href={REPO_URL}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2.5 rounded-lg px-2.5 py-[7px] text-[12.5px] text-white/50 transition hover:bg-white/[0.06] hover:text-white/85"
            >
              <Github className="h-4 w-4 shrink-0 opacity-80" strokeWidth={1.8} />
              仓库源码
            </a>
            <div className="px-2.5 py-1 text-[10.5px] text-white/20">Markdown 驱动 · 实时同步</div>
          </div>
        </aside>

        {/* 内容区 */}
        <main ref={scrollRef} className="thin-scroll min-w-0 flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </motion.div>
  )
}
