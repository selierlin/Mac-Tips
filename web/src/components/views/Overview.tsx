import { animate, motion, useMotionValue, useTransform } from 'framer-motion'
import { useEffect } from 'react'
import { ArrowRight, Command, Package, Sparkles, Terminal } from 'lucide-react'
import { docBySlug, featuredTools, stats } from '../../lib/content'
import type { Section } from '../MenuBar'

function Counter({ to }: { to: number }) {
  const mv = useMotionValue(0)
  const rounded = useTransform(mv, (v) => Math.round(v))
  useEffect(() => {
    const controls = animate(mv, to, { duration: 1.1, ease: [0.22, 1, 0.36, 1] })
    return () => controls.stop()
  }, [mv, to])
  return <motion.span>{rounded}</motion.span>
}

const ENTRIES = [
  {
    slug: 'HomeBrew工具安装',
    label: '新机装机',
    icon: Package,
    tint: 'from-amber-400/20 to-orange-500/10',
  },
  {
    slug: '终端环境搭建',
    label: '终端美化',
    icon: Terminal,
    tint: 'from-emerald-400/20 to-teal-500/10',
  },
  {
    slug: 'CLI工具速查',
    label: 'CLI 提效',
    icon: Sparkles,
    tint: 'from-sky-400/20 to-blue-500/10',
  },
]

const fade = {
  hidden: { opacity: 0, y: 14 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.08 * i, type: 'spring' as const, stiffness: 180, damping: 22 },
  }),
}

export function Overview({
  onNavigate,
  onOpenDoc,
}: {
  onNavigate: (s: Section) => void
  onOpenDoc: (slug: string) => void
}) {
  return (
    <div className="px-6 py-10 sm:px-10 sm:py-12">
      <motion.div initial="hidden" animate="show" variants={fade} custom={0}>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/8 px-3 py-1 text-[11.5px] text-white/70">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          macOS 效率手册
        </span>
      </motion.div>

      <motion.h1
        initial="hidden"
        animate="show"
        variants={fade}
        custom={1}
        className="mt-5 text-[2.6rem] font-semibold leading-[1.1] tracking-[-0.03em] sm:text-[3.4rem]"
      >
        让 Mac{' '}
        <span className="bg-gradient-to-r from-sky-300 via-violet-300 to-pink-300 bg-clip-text text-transparent">
          更好用
        </span>
      </motion.h1>

      <motion.p
        initial="hidden"
        animate="show"
        variants={fade}
        custom={2}
        className="mt-4 max-w-xl text-[15px] leading-relaxed text-white/60"
      >
        快捷键、工具推荐、终端配置，一条龙。所有内容直接来自仓库里的 Markdown，改文档即改站点。
      </motion.p>

      <motion.div
        initial="hidden"
        animate="show"
        variants={fade}
        custom={3}
        className="mt-7 flex flex-wrap items-center gap-3"
      >
        <button
          onClick={() => onNavigate('tools')}
          className="group inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-[13.5px] font-medium text-black transition hover:bg-white/90"
        >
          浏览工具墙
          <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
        </button>
        <button
          onClick={() => onNavigate('tips')}
          className="inline-flex items-center gap-2 rounded-full border border-white/18 bg-white/8 px-5 py-2.5 text-[13.5px] text-white/85 transition hover:bg-white/14"
        >
          <Command className="h-3.5 w-3.5" />
          快捷键速查
        </button>
      </motion.div>

      {/* 统计 */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={fade}
        custom={4}
        className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4"
      >
        {[
          { label: '精选工具', value: stats.tools, unit: '款' },
          { label: '快捷键', value: stats.shortcuts, unit: '组' },
          { label: '使用技巧', value: stats.tips, unit: '条' },
          { label: '专题文档', value: stats.docs, unit: '篇' },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-xl border border-white/10 bg-white/[0.045] px-4 py-3.5 transition hover:border-white/18 hover:bg-white/[0.07]"
          >
            <div className="text-[1.6rem] font-semibold tabular-nums tracking-tight text-white">
              <Counter to={s.value} />
              <span className="ml-1 text-[12px] font-normal text-white/40">{s.unit}</span>
            </div>
            <div className="mt-0.5 text-[11.5px] text-white/45">{s.label}</div>
          </div>
        ))}
      </motion.div>

      {/* 精选工具 */}
      <motion.section initial="hidden" animate="show" variants={fade} custom={5} className="mt-10">
        <div className="mb-3 flex items-baseline justify-between">
          <h2 className="text-[13px] font-medium text-white/75">常用工具</h2>
          <button
            onClick={() => onNavigate('tools')}
            className="text-[12px] text-white/40 transition hover:text-white/80"
          >
            全部 {stats.tools} 款 →
          </button>
        </div>
        <div className="thin-scroll flex gap-2 overflow-x-auto pb-2">
          {featuredTools.slice(0, 16).map((t) => (
            <a
              key={t.name}
              href={t.url}
              target="_blank"
              rel="noreferrer"
              className="group flex w-[74px] shrink-0 flex-col items-center gap-1.5 rounded-xl px-1 py-2 transition hover:bg-white/8"
              title={`${t.name} · ${t.category}`}
            >
              <span className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-[11px] bg-white/[0.06] ring-1 ring-white/10 transition group-hover:-translate-y-1 group-hover:ring-white/25">
                {t.icon ? (
                  <img src={t.icon} alt={t.name} className="h-full w-full object-cover" loading="lazy" />
                ) : (
                  <span className="text-[15px] font-semibold text-white/70">{t.name[0]}</span>
                )}
              </span>
              <span className="w-full truncate text-center text-[10.5px] text-white/50 group-hover:text-white/80">
                {t.name}
              </span>
            </a>
          ))}
        </div>
      </motion.section>

      {/* 入口卡片 */}
      <motion.section initial="hidden" animate="show" variants={fade} custom={6} className="mt-8">
        <h2 className="mb-3 text-[13px] font-medium text-white/75">从哪里开始</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {ENTRIES.map((e) => {
            const doc = docBySlug.get(e.slug)
            const Icon = e.icon
            return (
              <button
                key={e.slug}
                onClick={() => onOpenDoc(e.slug)}
                className={`group relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br ${e.tint} p-4 text-left transition hover:border-white/25`}
              >
                <Icon className="h-5 w-5 text-white/80" strokeWidth={1.7} />
                <div className="mt-3 text-[13.5px] font-medium text-white">{e.label}</div>
                <div className="mt-1 line-clamp-2 text-[11.5px] leading-relaxed text-white/45">
                  {doc?.summary ?? e.slug}
                </div>
                <ArrowRight className="absolute right-3 top-3 h-3.5 w-3.5 -translate-x-1 text-white/0 transition group-hover:translate-x-0 group-hover:text-white/60" />
              </button>
            )
          })}
        </div>
      </motion.section>
    </div>
  )
}
