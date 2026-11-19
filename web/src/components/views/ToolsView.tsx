import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ExternalLink, Star } from 'lucide-react'
import { toolCategories, tools, type Tool } from '../../lib/content'

function IconTile({ tool, size }: { tool: Tool; size: string }) {
  const [broken, setBroken] = useState(false)
  return (
    <span
      className={`flex ${size} items-center justify-center overflow-hidden rounded-[12px] bg-white/[0.07] ring-1 ring-white/10 transition duration-300 group-hover:ring-white/25`}
    >
      {tool.icon && !broken ? (
        <img
          src={tool.icon}
          alt=""
          loading="lazy"
          decoding="async"
          onError={() => setBroken(true)}
          className="h-full w-full object-cover"
        />
      ) : (
        <span className="text-[15px] font-semibold tracking-tight text-white/55">
          {tool.name.replace(/[^\p{L}\p{N}]/gu, '').slice(0, 2) || '•'}
        </span>
      )}
    </span>
  )
}

export function ToolsView() {
  const [active, setActive] = useState('全部')

  const list = useMemo(
    () => (active === '全部' ? tools : tools.filter((t) => t.categories.includes(active))),
    [active],
  )

  return (
    <div className="px-6 py-8 sm:px-9">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-[1.55rem] font-semibold tracking-tight text-white">工具推荐</h1>
          <p className="mt-1 text-[12.5px] text-white/45">
            {tools.length} 款常用 Mac 软件 · 按使用频率与口碑整理 · 点击卡片前往官网
          </p>
        </div>
        <span className="flex items-center gap-1 rounded-full border border-white/12 bg-white/8 px-2.5 py-1 text-[11px] text-white/55">
          <Star className="h-3 w-3 fill-amber-300 text-amber-300" />
          标记为特别推荐
        </span>
      </div>

      <div className="relative">
      <div className="no-scrollbar fade-right sticky top-0 z-10 -mx-2 mt-5 flex gap-1.5 overflow-x-auto bg-[#121216]/80 px-2 py-2 pr-10 backdrop-blur-md">
        {['全部', ...toolCategories].map((c) => {
          const on = active === c
          const count = c === '全部' ? tools.length : tools.filter((t) => t.categories.includes(c)).length
          return (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`relative shrink-0 rounded-full px-3 py-1 text-[12px] transition ${
                on ? 'text-black' : 'text-white/55 hover:bg-white/8 hover:text-white/85'
              }`}
            >
              {on && (
                <motion.span
                  layoutId="tool-chip"
                  className="absolute inset-0 rounded-full bg-white"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative">
                {c}
                <span className={on ? 'ml-1 text-black/40' : 'ml-1 text-white/25'}>{count}</span>
              </span>
            </button>
          )
        })}
        </div>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        <AnimatePresence mode="popLayout">
          {list.map((t) => (
            <motion.a
              key={t.name}
              layout
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ type: 'spring', stiffness: 320, damping: 28 }}
              whileHover={{ y: -4 }}
              href={t.url}
              target="_blank"
              rel="noreferrer"
              className="group relative flex flex-col items-center gap-2.5 rounded-2xl border border-white/[0.07] bg-white/[0.035] px-2 py-3.5 transition-colors hover:border-white/20 hover:bg-white/[0.07] hover:shadow-[0_16px_40px_-16px_rgba(0,0,0,0.8)]"
              title={t.categories.join(' / ')}
            >
              <IconTile tool={t} size="h-12 w-12" />
              <span className="w-full truncate text-center text-[11.5px] text-white/70 group-hover:text-white">
                {t.name}
              </span>
              <span className="w-full truncate text-center text-[10px] text-white/28">
                {t.categories.join(' / ')}
              </span>
              {t.featured && (
                <Star className="absolute right-2 top-2 h-3 w-3 fill-amber-300 text-amber-300 opacity-80" />
              )}
              <ExternalLink className="absolute right-2 bottom-2 h-3 w-3 text-white/0 transition group-hover:text-white/35" />
            </motion.a>
          ))}
        </AnimatePresence>
      </div>

      {list.length === 0 && (
        <p className="py-16 text-center text-[13px] text-white/35">这个分类下还没有工具</p>
      )}
    </div>
  )
}
