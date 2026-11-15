import { motion } from 'framer-motion'
import { ArrowLeft, ChevronRight } from 'lucide-react'
import { docBySlug, docGroups } from '../../lib/content'
import { docIcons } from '../../lib/icons'
import { MarkdownView } from '../MarkdownView'

export function DocsView({ onOpenDoc }: { onOpenDoc: (slug: string) => void }) {
  return (
    <div className="px-6 py-8 sm:px-9">
      <h1 className="text-[1.55rem] font-semibold tracking-tight text-white">专题文档</h1>
      <p className="mt-1 text-[12.5px] text-white/45">
        终端、CLI、编辑器与开发环境的完整配置笔记 · 与仓库 Markdown 实时同步
      </p>

      <div className="mt-7 space-y-7">
        {docGroups.map((g, gi) => (
          <motion.section
            key={g.name}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: gi * 0.06, duration: 0.3 }}
          >
            <h2 className="mb-2.5 flex items-center gap-2 text-[12px] font-medium tracking-wide text-white/45">
              <span className="h-px w-4 bg-white/20" />
              {g.name}
            </h2>
            <div className="grid gap-2.5 sm:grid-cols-2 xl:grid-cols-3">
              {g.docs.map((d) => {
                const Icon = docIcons[d.icon] ?? docIcons['file-text']
                return (
                  <motion.button
                    key={d.slug}
                    whileHover={{ y: -3 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 26 }}
                    onClick={() => onOpenDoc(d.slug)}
                    className="group flex items-start gap-3 rounded-xl border border-white/[0.08] bg-white/[0.035] p-3.5 text-left transition-colors hover:border-white/20 hover:bg-white/[0.075]"
                  >
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/[0.07] ring-1 ring-white/10">
                      <Icon className="h-4 w-4 text-white/70" strokeWidth={1.8} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-1">
                        <span className="truncate text-[13px] font-medium text-white/90">{d.title}</span>
                        <ChevronRight className="h-3.5 w-3.5 shrink-0 -translate-x-1 text-white/0 transition group-hover:translate-x-0 group-hover:text-white/40" />
                      </span>
                      <span className="mt-0.5 line-clamp-2 block text-[11.5px] leading-relaxed text-white/40">
                        {d.summary}
                      </span>
                    </span>
                  </motion.button>
                )
              })}
            </div>
          </motion.section>
        ))}
      </div>
    </div>
  )
}

export function DocReader({
  slug,
  onBack,
  onOpenDoc,
  onToast,
}: {
  slug: string
  onBack: () => void
  onOpenDoc: (slug: string) => void
  onToast: (m: string) => void
}) {
  const doc = docBySlug.get(slug)
  if (!doc) return null

  return (
    <div className="px-6 py-7 sm:px-10 sm:py-8">
      <button
        onClick={onBack}
        className="group mb-5 inline-flex items-center gap-1.5 rounded-full border border-white/12 bg-white/[0.06] px-3 py-1.5 text-[12px] text-white/60 transition hover:bg-white/12 hover:text-white"
      >
        <ArrowLeft className="h-3.5 w-3.5 transition group-hover:-translate-x-0.5" />
        返回文档列表
      </button>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <MarkdownView content={doc.content} onOpenDoc={onOpenDoc} onToast={onToast} />
      </motion.div>
    </div>
  )
}
