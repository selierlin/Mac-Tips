# ripgrep 与 fd

> 现代化的搜索双雄：**ripgrep (rg)** 按内容搜索，**fd** 按文件名查找。分别替代 `grep` 与 `find`，速度极快且默认尊重 `.gitignore`。

## ripgrep (rg) — 极速文本搜索

**安装：**

```bash title=安装 ripgrep
brew install ripgrep
```

**常用速查：**

```bash title=ripgrep 常用命令
rg "关键词"                      # 递归搜索当前目录下的文本
rg -i "关键词"                   # 忽略大小写
rg -w "关键词"                   # 全字匹配（防止搜 port 匹配到 report）
rg -t js "关键词"                # 只在 .js 文件中搜 (-T 则是排除)
rg -g "*.md" "关键词"            # 使用 glob 模式只搜 markdown
rg -l "关键词"                   # 只列出包含关键词的文件名
rg -C 3 "关键词"                 # 显示匹配行及其上下各 3 行上下文
rg --hidden "关键词"             # 搜索隐藏文件 (如 .env)
rg -uu "关键词"                  # 强力模式：搜隐藏文件且忽略 .gitignore 规则
```

## fd — 现代化的 find 替代品

**安装：**

```bash title=安装 fd
brew install fd
```

**常用速查：**

```bash title=fd 常用命令
fd "关键词"                      # 在当前目录及子目录模糊搜索文件名
fd -e md "关键词"                # 只查找扩展名为 .md 的文件
fd -t d "关键词"                 # 只查找目录/文件夹 (-t f 查找纯文件)
fd -HI "关键词"                  # 终极全搜：包含隐藏文件 + 被忽略的文件
fd -d 2 "关键词"                 # 限制最大搜索深度为 2 层
fd -e zip -x unzip {}            # 找到所有 zip 文件并批量解压
```

## 二者分工

| 工具 | 搜索维度 | 替代对象 |
| ---- | -------- | -------- |
| rg   | 文件**内容** | grep     |
| fd   | 文件**名**   | find     |

> 想找「哪个文件里有 SELECT」用 `rg`；想找「哪个文件叫 config」用 `fd`。
