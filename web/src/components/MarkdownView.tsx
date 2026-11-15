import { useMemo, useState } from 'react'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import { Check, Copy, Paperclip } from 'lucide-react'
import { docBySlug, resolveAsset } from '../lib/content'
import { REPO_URL } from '../lib/icons'

/** react-markdown 默认会过滤非白名单协议，会把我们自定义的 doc: 链接清空 */
const keepUrl = (url: string) => (/^javascript:/i.test(url) ? '' : url)

interface CodeBlockData {
  lang: string
  title?: string
  code: string
}

const TOKEN = /^@@CODE:(\d+)@@$/

/** 把围栏代码块抽出来自行渲染，以便显示 title 和复制按钮（react-markdown 会丢弃 meta） */
function extractCode(content: string) {
  const blocks: CodeBlockData[] = []
  const text = content.replace(
    /^```([^\n`]*)\r?\n([\s\S]*?)^```[ \t]*$/gm,
    (_all, info: string, code: string) => {
      const meta = info.trim()
      const title = /title\s*=\s*(.+)$/.exec(meta)?.[1]?.trim()
      const lang = meta.replace(/title\s*=\s*.+$/, '').trim()
      blocks.push({ lang, title, code: code.replace(/\n$/, '') })
      return `\n\n@@CODE:${blocks.length - 1}@@\n\n`
    },
  )
  return { text, blocks }
}

function CodeBlock({ block, onToast }: { block: CodeBlockData; onToast?: (m: string) => void }) {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(block.code)
      setCopied(true)
      onToast?.('已复制到剪贴板')
      setTimeout(() => setCopied(false), 1600)
    } catch {
      onToast?.('复制失败，请手动选择')
    }
  }
  return (
    <div className="my-4 overflow-hidden rounded-xl border border-white/10 bg-black/45">
      <div className="flex items-center gap-1.5 border-b border-white/10 bg-white/[0.04] px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-2 truncate text-[11.5px] text-white/50">
          {block.title || block.lang || 'shell'}
        </span>
        <button
          onClick={copy}
          className="ml-auto flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[11.5px] text-white/45 transition hover:bg-white/10 hover:text-white/80"
        >
          {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
          {copied ? '已复制' : '复制'}
        </button>
      </div>
      <pre className="thin-scroll overflow-x-auto px-4 py-3 text-[12.5px] leading-[1.75]">
        <code className="font-mono text-white/85">{block.code}</code>
      </pre>
    </div>
  )
}

export function MarkdownView({
  content,
  onOpenDoc,
  onToast,
}: {
  content: string
  onOpenDoc?: (slug: string) => void
  onToast?: (m: string) => void
}) {
  const { text, blocks } = useMemo(() => extractCode(content), [content])
  const prepared = useMemo(
    () =>
      text.replace(/\[\[([^\]]+)\]\]/g, (_m, name: string) => `[${name}](doc:${encodeURIComponent(name)})`),
    [text],
  )

  return (
    <div className="md-body">
      <Markdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        urlTransform={keepUrl}
        components={{
          p({ children }) {
            const first = Array.isArray(children) ? children[0] : children
            if (typeof first === 'string') {
              const m = TOKEN.exec(first.trim())
              if (m) return <CodeBlock block={blocks[Number(m[1])]} onToast={onToast} />
            }
            return <p>{children}</p>
          },
          pre({ children }) {
            return <pre className="thin-scroll overflow-x-auto rounded-xl bg-black/45 p-4">{children}</pre>
          },
          a({ href, children }) {
            if (href?.startsWith('doc:')) {
              const slug = decodeURIComponent(href.slice(4))
              const exists = docBySlug.has(slug)
              if (exists) {
                return (
                  <a
                    href={href}
                    onClick={(e) => {
                      e.preventDefault()
                      onOpenDoc?.(slug)
                    }}
                  >
                    {children}
                  </a>
                )
              }
              return <span className="text-white/70">{children}</span>
            }
            return (
              <a href={href} target={href?.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
                {children}
              </a>
            )
          },
          img({ src, alt, ...rest }) {
            const raw = typeof src === 'string' ? src : ''
            const name = raw.startsWith('doc:') ? decodeURIComponent(raw.slice(4)) : raw
            // `![[assets/zshrc.sh]]` 这类文件嵌入不是图片，渲染成附件链接
            if (name && !/\.(png|jpe?g|gif|svg|webp)(\?|$)/i.test(name)) {
              return (
                <a
                  href={`${REPO_URL}/blob/main/${encodeURI(name)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="my-2 inline-flex items-center gap-2 rounded-lg border border-white/12 bg-white/6 px-3 py-1.5 text-[12.5px] !border-b-0 !text-white/70 transition hover:bg-white/12 hover:!text-white"
                >
                  <Paperclip className="h-3.5 w-3.5 text-white/50" />
                  {name.split('/').pop()}
                </a>
              )
            }
            return (
              <img
                src={resolveAsset(name)}
                alt={alt ?? ''}
                loading="lazy"
                decoding="async"
                {...(rest as Record<string, unknown>)}
              />
            )
          },
          table({ children }) {
            return (
              <div className="thin-scroll overflow-x-auto">
                <table>{children}</table>
              </div>
            )
          },
        }}
      >
        {prepared}
      </Markdown>
    </div>
  )
}
