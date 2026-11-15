import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CornerDownLeft, FileText, Search, Wrench } from 'lucide-react'
import { searchIndex, type SearchItem } from '../lib/content'

export function Spotlight({
  open,
  onClose,
  onOpenDoc,
  onToast,
}: {
  open: boolean
  onClose: () => void
  onOpenDoc: (slug: string) => void
  onToast: (m: string) => void
}) {
  const [q, setQ] = useState('')
  const [active, setActive] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  const results = useMemo(() => {
    const key = q.trim().toLowerCase()
    const pool = key
      ? searchIndex.filter(
          (i) =>
            i.title.toLowerCase().includes(key) || i.subtitle.toLowerCase().includes(key),
        )
      : searchIndex.filter((i) => i.kind === '文档').slice(0, 6)
    return pool.slice(0, 12)
  }, [q])

  useEffect(() => {
    if (!open) return
    setQ('')
    setActive(0)
    const t = setTimeout(() => inputRef.current?.focus(), 60)
    return () => clearTimeout(t)
  }, [open])

  useEffect(() => setActive(0), [q])

  useEffect(() => {
    const el = listRef.current?.children[active] as HTMLElement | undefined
    el?.scrollIntoView({ block: 'nearest' })
  }, [active])

  const choose = (item: SearchItem) => {
    if (item.kind === '工具' && item.url) {
      window.open(item.url, '_blank')
    } else if (item.kind === '文档' && item.docSlug) {
      onOpenDoc(item.docSlug)
    } else if (item.kind === '快捷键') {
      navigator.clipboard.writeText(item.title).catch(() => {})
      onToast(`已复制 ${item.title}`)
    }
    onClose()
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-50 flex items-start justify-center bg-black/45 px-4 pt-[12vh] backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -6 }}
            transition={{ type: 'spring', stiffness: 420, damping: 32 }}
            onClick={(e) => e.stopPropagation()}
            className="glass w-full max-w-[600px] overflow-hidden rounded-2xl"
            role="dialog"
            aria-modal="true"
            aria-label="搜索"
          >
            <div className="flex items-center gap-2.5 border-b border-white/10 px-4">
              <Search className="h-4 w-4 shrink-0 text-white/40" />
              <input
                ref={inputRef}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'ArrowDown') {
                    e.preventDefault()
                    setActive((a) => Math.min(a + 1, results.length - 1))
                  } else if (e.key === 'ArrowUp') {
                    e.preventDefault()
                    setActive((a) => Math.max(a - 1, 0))
                  } else if (e.key === 'Enter' && results[active]) {
                    e.preventDefault()
                    choose(results[active])
                  } else if (e.key === 'Escape') {
                    onClose()
                  }
                }}
                placeholder="搜索工具、文档、快捷键…"
                className="h-12 flex-1 bg-transparent text-[14px] text-white placeholder:text-white/30 focus:outline-none"
              />
              <kbd className="hidden rounded border border-white/15 px-1.5 py-0.5 text-[10px] text-white/40 sm:block">
                ESC
              </kbd>
            </div>

            <div ref={listRef} className="thin-scroll max-h-[52vh] overflow-y-auto p-1.5">
              {results.map((r, i) => {
                const on = i === active
                return (
                  <button
                    key={r.id}
                    onMouseEnter={() => setActive(i)}
                    onClick={() => choose(r)}
                    className={`flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-left transition ${
                      on ? 'bg-white/14' : 'hover:bg-white/6'
                    }`}
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-md bg-white/10 ring-1 ring-white/10">
                      {r.kind === '工具' && r.icon ? (
                        <img src={r.icon} alt="" className="h-full w-full object-cover" loading="lazy" />
                      ) : r.kind === '工具' ? (
                        <Wrench className="h-3.5 w-3.5 text-white/60" />
                      ) : r.kind === '文档' ? (
                        <FileText className="h-3.5 w-3.5 text-white/60" />
                      ) : (
                        <span className="text-[10px] text-white/60">⌘</span>
                      )}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[13px] text-white/90">{r.title}</span>
                      <span className="block truncate text-[11px] text-white/35">{r.subtitle}</span>
                    </span>
                    <span className="shrink-0 rounded bg-white/8 px-1.5 py-0.5 text-[10px] text-white/40">
                      {r.kind}
                    </span>
                    {on && <CornerDownLeft className="h-3 w-3 shrink-0 text-white/40" />}
                  </button>
                )
              })}
              {results.length === 0 && (
                <p className="px-3 py-10 text-center text-[12.5px] text-white/35">
                  没有找到「{q}」，试试工具名或文档标题
                </p>
              )}
            </div>

            <div className="flex items-center gap-4 border-t border-white/10 px-4 py-2 text-[10.5px] text-white/30">
              <span>↑↓ 选择</span>
              <span>↵ 打开</span>
              <span>esc 关闭</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
