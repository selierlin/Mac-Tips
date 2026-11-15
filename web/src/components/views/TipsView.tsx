import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, ClipboardList, Command, Keyboard } from 'lucide-react'
import { shortcutGroups, tipGroups } from '../../lib/content'

const MODS = new Set(['⌘', '⌃', '⌥', '⇧', '⇪'])

/** 把 `⌘` 这类反引号片段渲染成键帽，其余当普通文本 */
function RichText({ text }: { text: string }) {
  const parts = text.split('`')
  return (
    <>
      {parts.map((p, i) =>
        i % 2 === 1 ? (
          <kbd key={i} className="keycap mx-0.5 !min-w-0 !h-[1.45rem] !px-1.5 !text-[0.72rem] align-middle">
            {p}
          </kbd>
        ) : (
          <span key={i}>{p}</span>
        ),
      )}
    </>
  )
}

export function TipsView({ onToast }: { onToast: (m: string) => void }) {
  const [mode, setMode] = useState<'keys' | 'tips'>('keys')
  const [group, setGroup] = useState(shortcutGroups[0]?.name ?? '')
  const [copied, setCopied] = useState<string | null>(null)

  const current = shortcutGroups.find((g) => g.name === group) ?? shortcutGroups[0]

  const copy = async (label: string) => {
    try {
      await navigator.clipboard.writeText(label)
      setCopied(label)
      onToast(`已复制 ${label}`)
      setTimeout(() => setCopied((c) => (c === label ? null : c)), 1400)
    } catch {
      onToast('复制失败，请手动选择')
    }
  }

  return (
    <div className="px-6 py-8 sm:px-9">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-[1.55rem] font-semibold tracking-tight text-white">技巧与快捷键</h1>
          <p className="mt-1 text-[12.5px] text-white/45">
            点击任意一行即可复制快捷键 · 内容来自《Mac使用技巧》
          </p>
        </div>
        <div className="flex rounded-full border border-white/12 bg-white/[0.06] p-0.5 text-[12px]">
          {[
            { id: 'keys' as const, label: '快捷键', icon: Keyboard },
            { id: 'tips' as const, label: '使用技巧', icon: ClipboardList },
          ].map((t) => {
            const on = mode === t.id
            const Icon = t.icon
            return (
              <button
                key={t.id}
                onClick={() => setMode(t.id)}
                className={`relative flex items-center gap-1.5 rounded-full px-3 py-1.5 transition ${
                  on ? 'text-black' : 'text-white/55 hover:text-white/85'
                }`}
              >
                {on && (
                  <motion.span
                    layoutId="tip-mode"
                    className="absolute inset-0 rounded-full bg-white"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <Icon className="relative h-3.5 w-3.5" />
                <span className="relative">{t.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {mode === 'keys' ? (
        <>
          <div className="thin-scroll mt-5 flex gap-1.5 overflow-x-auto pb-1">
            {shortcutGroups.map((g) => {
              const on = g.name === current?.name
              return (
                <button
                  key={g.name}
                  onClick={() => setGroup(g.name)}
                  className={`relative shrink-0 rounded-lg px-3 py-1.5 text-[12px] transition ${
                    on ? 'text-white' : 'text-white/50 hover:bg-white/8 hover:text-white/80'
                  }`}
                >
                  {on && (
                    <motion.span
                      layoutId="key-group"
                      className="absolute inset-0 rounded-lg border border-white/18 bg-white/12"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative flex items-center gap-1.5">
                    <Command className="h-3 w-3 opacity-60" />
                    {g.name.replace(/[（(].*?[）)]/g, '')}
                    <span className="text-white/30">{g.items.length}</span>
                  </span>
                </button>
              )
            })}
          </div>

          <motion.div
            key={current?.name}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22 }}
            className="mt-3 grid gap-2 lg:grid-cols-2"
          >
            {current?.items.map((it, i) => {
              const label = it.keys.join('')
              const done = copied === label
              return (
                <motion.button
                  key={label + i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(i * 0.025, 0.4), duration: 0.25 }}
                  onClick={() => copy(label)}
                  className="group flex items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.035] px-3 py-2.5 text-left transition hover:border-white/18 hover:bg-white/[0.07]"
                >
                  <span className="flex shrink-0 items-center gap-1">
                    {it.keys.map((k, ki) => (
                      <kbd key={ki} className={`keycap ${MODS.has(k) ? 'keycap-mod' : ''}`}>
                        {k}
                      </kbd>
                    ))}
                  </span>
                  <span className="min-w-0 flex-1 truncate text-[12.5px] text-white/65 group-hover:text-white/85">
                    {it.desc}
                  </span>
                  {done ? (
                    <Check className="h-3.5 w-3.5 shrink-0 text-emerald-400" />
                  ) : (
                    <span className="shrink-0 text-[10.5px] text-white/0 transition group-hover:text-white/30">
                      点击复制
                    </span>
                  )}
                </motion.button>
              )
            })}
          </motion.div>
        </>
      ) : (
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {tipGroups.map((g, gi) => (
            <motion.section
              key={g.name}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: gi * 0.05, duration: 0.28 }}
              className="rounded-2xl border border-white/[0.08] bg-white/[0.035] p-4"
            >
              <h2 className="mb-2.5 flex items-center gap-2 text-[13px] font-medium text-white/85">
                <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                {g.name}
              </h2>
              <ul className="space-y-2">
                {g.items.map((t, i) => (
                  <li key={i} className="flex gap-2 text-[12.3px] leading-relaxed text-white/55">
                    <span className="mt-[3px] shrink-0 text-[10px] tabular-nums text-white/25">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="min-w-0">
                      <RichText text={t} />
                    </span>
                  </li>
                ))}
              </ul>
            </motion.section>
          ))}
        </div>
      )}
    </div>
  )
}
