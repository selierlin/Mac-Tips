/**
 * 内容层：直接从仓库根目录的 Markdown 读取，站点内容永远与文档同步。
 * - 文档：import.meta.glob 取 raw 文本
 * - 图片：glob 取 URL，按文件名建立映射，把 md 里的相对路径换成构建后的地址
 */
const docGlob = import.meta.glob('../../../*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>

const iconGlob = {
  ...(import.meta.glob('../../../Mac工具推荐.assets/**/*', {
    eager: true,
    query: '?url',
    import: 'default',
  }) as Record<string, string>),
  ...(import.meta.glob('../../../assets/**/*', {
    eager: true,
    query: '?url',
    import: 'default',
  }) as Record<string, string>),
}

/** 文件名统一小写做键：md 里写的 `Input Source Pro.jpg` 与磁盘上的 `input source pro.jpg` 大小写不一致 */
const assetByName = new Map<string, string>()
for (const [path, url] of Object.entries(iconGlob)) {
  if (typeof url !== 'string' || !/\.(png|jpe?g|gif|svg|webp)$/i.test(path)) continue
  const name = path.split('/').pop()!.toLowerCase()
  if (!assetByName.has(name)) assetByName.set(name, url)
}

/** 把 md 里的图片相对路径解析成构建后的 URL */
export function resolveAsset(src?: string): string | undefined {
  if (!src) return undefined
  if (/^(https?:)?\/\//.test(src) || src.startsWith('data:')) return src
  let decoded = src
  try {
    decoded = decodeURIComponent(src)
  } catch {
    /* 保留原样 */
  }
  const name = decoded.split('/').pop()!.toLowerCase()
  return assetByName.get(name) ?? src
}

const rawDocs = new Map<string, string>()
for (const [path, text] of Object.entries(docGlob)) {
  const slug = path.split('/').pop()!.replace(/\.md$/, '')
  rawDocs.set(slug, text)
}

function firstHeading(md: string) {
  return md.match(/^#{1,2}\s+(.+)$/m)?.[1]?.trim()
}

function plain(text: string) {
  return text
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/<[^>]+>/g, '')
    .replace(/\[\[([^\]]+)\]\]/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[`*_>#]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

/** 摘要优先取文首引用（作者写的概述），否则取第一段像样的正文 */
function summarize(md: string) {
  const lines = md.split('\n').map((l) => l.trim())
  const quote = lines.find((l) => l.startsWith('>') && plain(l).length >= 10)
  const body = lines.find(
    (l) =>
      l &&
      !/^(#|\||>|```|---|!\[)/.test(l) &&
      plain(l).length >= 16 &&
      !/[：:]$/.test(plain(l)),
  )
  const text = plain(quote ?? body ?? '')
  return text.length > 56 ? text.slice(0, 56) + '…' : text
}

export type DocGroupName = '系统与 GUI' | '终端环境' | 'CLI 工具' | '开发语言' | '编辑器' | '其他'

const ICONS: Record<string, string> = {
  Mac使用技巧: 'command',
  Mac工具推荐: 'app-window',
  终端环境搭建: 'terminal',
  终端复用器指南: 'panels',
  'fzf 模糊搜索': 'search',
  'atuin 历史搜索': 'history',
  'ripgrep 与 fd': 'file-search',
  'eza 与 vivid': 'palette',
  'zoxide 智能跳转': 'folder-tree',
  CLI工具速查: 'square-terminal',
  HomeBrew工具安装: 'package',
  'jenv Java 版本管理': 'coffee',
  'uv Python 包管理': 'box',
  'neovim 与 LazyVim': 'file-code',
  'Sublime Text 粘贴自动识别语法': 'pen-line',
}

/** 分类顺序沿用 README 的结构 */
const GROUPS: { name: DocGroupName; slugs: string[] }[] = [
  { name: '系统与 GUI', slugs: ['Mac使用技巧', 'Mac工具推荐'] },
  { name: '终端环境', slugs: ['终端环境搭建', '终端复用器指南'] },
  {
    name: 'CLI 工具',
    slugs: [
      'CLI工具速查',
      'HomeBrew工具安装',
      'fzf 模糊搜索',
      'atuin 历史搜索',
      'ripgrep 与 fd',
      'eza 与 vivid',
      'zoxide 智能跳转',
    ],
  },
  { name: '开发语言', slugs: ['jenv Java 版本管理', 'uv Python 包管理'] },
  { name: '编辑器', slugs: ['neovim 与 LazyVim', 'Sublime Text 粘贴自动识别语法'] },
]

export interface Doc {
  slug: string
  title: string
  summary: string
  icon: string
  group: DocGroupName
  content: string
}

const listed = new Set(GROUPS.flatMap((g) => g.slugs))
const leftovers = [...rawDocs.keys()].filter((s) => s !== 'README' && !listed.has(s))

export const docs: Doc[] = [
  ...GROUPS.flatMap((g) => g.slugs),
  ...leftovers,
]
  .filter((slug) => rawDocs.has(slug))
  .map((slug) => {
    const content = rawDocs.get(slug)!
    const group = GROUPS.find((g) => g.slugs.includes(slug))?.name ?? '其他'
    return {
      slug,
      title: firstHeading(content) ?? slug,
      summary: summarize(content),
      icon: ICONS[slug] ?? 'file-text',
      group,
      content,
    }
  })

export const docBySlug = new Map(docs.map((d) => [d.slug, d]))

export const docGroups = [...new Set(docs.map((d) => d.group))].map((name) => ({
  name,
  docs: docs.filter((d) => d.group === name),
}))

/* ------------------------------ 工具推荐 ------------------------------ */

export interface Tool {
  name: string
  url: string
  icon?: string
  category: string
  featured: boolean
}

const TOOL_SRC = rawDocs.get('Mac工具推荐') ?? ''

function parseTools(md: string): Tool[] {
  const tools: Tool[] = []
  for (const line of md.split('\n')) {
    if (!line.trim().startsWith('|')) continue
    const cells = line.split('|').map((c) => c.trim())
    if (cells.length < 4) continue
    const category = cells[1]
    if (!category || category === '分类' || /^:?-{3,}/.test(category)) continue

    const body = cells.slice(2, -1).join('|')
    let pendingIcon: string | undefined
    const re = /<img\s+src="([^"]+)"[^>]*>|\[([^\]]+)\]\(([^)]+)\)/g
    let m: RegExpExecArray | null
    while ((m = re.exec(body))) {
      if (m[1]) {
        pendingIcon = m[1]
        continue
      }
      const rawName = m[2] ?? ''
      const name = rawName.replace(/\*\*/g, '').trim()
      const url = (m[3] ?? '').trim()
      if (!name || !url) continue
      tools.push({
        name,
        url,
        icon: resolveAsset(pendingIcon),
        category,
        featured: rawName.includes('**'),
      })
      pendingIcon = undefined
    }
  }
  return tools
}

export const tools = parseTools(TOOL_SRC)
export const toolCategories = [...new Set(tools.map((t) => t.category))]
export const featuredTools = tools.filter((t) => t.featured)

/* ------------------------------ 快捷键 ------------------------------ */

export interface Shortcut {
  keys: string[]
  desc: string
}
export interface ShortcutGroup {
  name: string
  items: Shortcut[]
}

const MODIFIERS = new Set(['⌘', '⌃', '⌥', '⇧', '⇪'])

/** `⌥⇧⌘V` → ['⌥','⇧','⌘','V']；`⌘空格键` → ['⌘','空格键'] */
export function splitKeys(raw: string): string[] {
  const cleaned = raw
    .replace(/[（(][^）)]*[）)]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
  const keys: string[] = []
  let rest = ''
  for (const ch of cleaned) {
    if (MODIFIERS.has(ch)) {
      if (rest.trim()) {
        keys.push(rest.trim())
        rest = ''
      }
      keys.push(ch)
    } else {
      rest += ch
    }
  }
  if (rest.trim()) keys.push(rest.trim())
  return keys.length ? keys : [raw]
}

function sectionOf(md: string, startRe: RegExp, stopRe: RegExp) {
  const lines = md.split('\n')
  const start = lines.findIndex((l) => startRe.test(l))
  if (start < 0) return []
  const rest = lines.slice(start + 1)
  const stop = rest.findIndex((l) => stopRe.test(l))
  return stop < 0 ? rest : rest.slice(0, stop)
}

const TIPS_MD = rawDocs.get('Mac使用技巧') ?? ''

function parseShortcuts(md: string): ShortcutGroup[] {
  const groups: ShortcutGroup[] = []
  let current: ShortcutGroup | null = null
  for (const line of sectionOf(md, /^###\s*快捷键/, /^###\s+[^#]/)) {
    const h = line.match(/^####\s+(.+)$/)
    if (h) {
      current = { name: h[1].trim(), items: [] }
      groups.push(current)
      continue
    }
    if (!current || !line.trim().startsWith('|')) continue
    const cells = line.split('|').map((c) => c.trim())
    if (cells.length < 4) continue
    const [key, desc] = [cells[1], cells[2]]
    if (!key || !desc || key === '快捷键' || /^:?-{3,}/.test(key)) continue
    current.items.push({ keys: splitKeys(key), desc: plain(desc) })
  }
  return groups.filter((g) => g.items.length)
}

function parseTips(md: string): { name: string; items: string[] }[] {
  const groups: { name: string; items: string[] }[] = []
  let current: { name: string; items: string[] } | null = null
  for (const line of sectionOf(md, /^###\s*技巧/, /^###\s+[^#]/)) {
    const h = line.match(/^####\s+(.+)$/)
    if (h) {
      current = { name: h[1].trim(), items: [] }
      groups.push(current)
      continue
    }
    if (!current) continue
    if (/^-\s+/.test(line)) current.items.push(line.replace(/^-\s+/, '').trim())
    else if (/^\s+-\s+/.test(line) && current.items.length) {
      current.items[current.items.length - 1] += ' ' + line.trim().replace(/^-\s+/, '')
    }
  }
  return groups.filter((g) => g.items.length)
}

export const shortcutGroups = parseShortcuts(TIPS_MD)
export const tipGroups = parseTips(TIPS_MD)

export const stats = {
  tools: tools.length,
  docs: docs.length,
  shortcuts: shortcutGroups.reduce((n, g) => n + g.items.length, 0),
  tips: tipGroups.reduce((n, g) => n + g.items.length, 0),
}

/* ------------------------------ 搜索 ------------------------------ */

export interface SearchItem {
  id: string
  title: string
  subtitle: string
  kind: '工具' | '文档' | '快捷键'
  icon?: string
  docSlug?: string
  url?: string
}

export const searchIndex: SearchItem[] = [
  ...tools.map((t) => ({
    id: `tool:${t.name}`,
    title: t.name,
    subtitle: t.category,
    kind: '工具' as const,
    icon: t.icon,
    url: t.url,
  })),
  ...docs.map((d) => ({
    id: `doc:${d.slug}`,
    title: d.title,
    subtitle: d.group + ' · ' + d.summary,
    kind: '文档' as const,
    docSlug: d.slug,
  })),
  ...shortcutGroups.flatMap((g) =>
    g.items.map((it, i) => ({
      id: `shortcut:${g.name}:${i}`,
      title: it.keys.join(' '),
      subtitle: `${g.name} · ${it.desc}`,
      kind: '快捷键' as const,
    })),
  ),
]
