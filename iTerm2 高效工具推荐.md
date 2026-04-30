
### 1. `fzf` - 全能模糊搜索器

- **安装：** `brew install fzf`
- **配置绑定：** 安装后运行 `$(brew --prefix)/opt/fzf/install` 启用快捷键。
- **快捷键备忘：**
  - **`Ctrl + T`**：在当前命令行光标处，模糊搜索并插入文件路径。（👉 **神级用法：** 输入 `mv ` -> 按 `Ctrl+T` 找到要移动的文件 -> 继续输入目标地址）。
  - **`Ctrl + R`**：模糊搜索历史命令（彻底替代系统自带的 Ctrl+R）。
  - **`Option + C`** (或 Alt+C)：模糊搜索目录并直接 `cd` 进去。
- **高级搜索语法：**
  - `^music`：以 music 开头
  - `mp3$`：以 mp3 结尾
  - `'word`：严格匹配 word
  - `!word`：不包含 word
  - `!.mp3$`：不以 .mp3 结尾

### 2. `ripgrep (rg)` - 极速文本搜索

- **安装：** `brew install ripgrep`
- **常用速查：

```bash
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
### 3. `fd` - 现代化的 find 替代品

- **安装：** `brew install fd`
- **常用速查：**

```bash
fd "关键词"                      # 在当前目录及子目录模糊搜索文件名
fd -e md "关键词"                # 只查找扩展名为 .md 的文件
fd -t d "关键词"                 # 只查找目录/文件夹 (-t f 查找纯文件)
fd -HI "关键词"                  # 终极全搜：包含隐藏文件 + 被忽略的文件
fd -d 2 "关键词"                 # 限制最大搜索深度为 2 层
fd -e zip -x unzip {}            # 找到所有 zip 文件并批量解压
```

------

## 📖 文本查看与清理

### 1. `bat` - 带高亮的代码/日志查看器

- **安装：** `brew install bat`
- **特性：** 自动分页、Git 状态集成、支持 200+ 语言语法高亮。
- **常用操作：

```bash
bat file.py                      # 高亮查看文件
grep "error" file.log | bat -l log  # 语法高亮查看被过滤的日志
bat --theme=GitHub src/main.js   # 指定显示主题
bat --line-range 10:20 file.py   # 仅显示 10 到 20 行的内容
```

### 2. `mole` - 极简垃圾清理工具

- **安装：** `brew install tw93/tap/mole`
- **使用方式：** 在终端直接输入 `mo` 即可唤起交互式清理界面。

------

## ⚡ 终端环境增强 (Zsh & Tmux)

### 1. Zsh 效率双雄

- **代码自动建议 (基于历史记录)：**

```bash
brew install zsh-autosuggestions
# 在 ~/.zshrc 添加：
source $(brew --prefix)/share/zsh-autosuggestions/zsh-autosuggestions.zsh
```

- **命令语法高亮 (实时检查命令是否有效)：**

```bash
brew install zsh-syntax-highlighting
# 在 ~/.zshrc 添加：
source $(brew --prefix)/share/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh
```

### 2. `tmux` - 终端复用神器

- **核心价值：** 保持会话持久化（断网/关掉终端任务不中断），实现多窗口/面板自由切分管理。

> 详细内容见 [[tmux 终极指南]]

------

## 🛠️ 其他高频实用工具榜单

| **工具**          | **安装命令**            | **核心功能描述**                            | **传统替代对象** |
| ----------------- | ----------------------- | ------------------------------------------- | ---------------- |
| **tldr**          | `brew install tldr`     | 极其精简、自带示例的 man 手册，秒查命令用法 | `man`            |
| **thefuck**       | `brew install thefuck`  | 输错命令时，输入 `fuck` 自动纠正并执行      | -                |
| **glances**       | `brew install glances`  | 顶级系统监控看板（CPU、内存、网络、磁盘IO） | `top` / `htop`   |
| **neofetch**      | `brew install neofetch` | 在终端装X/展示酷炫的系统硬件和 OS 信息      | -                |
| **trash**         | `brew install trash`    | 安全删除文件至废纸篓（防手残删库跑路必备）  | `rm`             |
| **exa** / **eza** | `brew install eza`      | 现代版的 ls，带图标、颜色和树状图显示       | `ls` / `tree`    |

------

## 💡 终极联动：命令行工作流示例

**1. 快速过滤并带高亮查看系统日志：**

> 将实时滚动输出的内容，交给 `bat` 进行日志语法高亮。

```bash
tail -f /var/log/system.log | bat -l log --paging=never
```

**2. 极速模糊找文件，并用 VS Code 打开：**

> 结合了 `rg` 的找文件能力、`fzf` 的交互筛选能力。

```bash
rg --files | fzf | xargs code
```

**3. 全局搜索特定代码，预览内容，并在编辑器中打开（神仙组合）：**

> 使用 `rg -l` 仅输出包含关键词的文件名，通过 `fzf` 提供带语法高亮的右侧预览框，回车后将选中的文件传给 `code`。

```bash
rg -l 'SELECT' -t sql | fzf --preview 'bat --color=always {}' | xargs code
```