
## 🎯 fzf - 模糊搜索神器

**安装**：`brew install fzf`  
**使用技巧**：

1. 直接输入 `fzf` 进行模糊搜索文件/目录
2. 快捷键绑定（安装后运行 `$(brew --prefix)/opt/fzf/install`）：
    - `Ctrl+T` 插入文件路径
	    - 如果要 `mv` 一个文件，先输入 `mv` 然后再 Ctrl-t 找到文件，继续输入目的地址即可。
    - `Ctrl+R` 搜索历史命令
    - `Alt+C` 快速切换目录
        **类似工具**：`peco`（更轻量的模糊搜索）
3. 直接输入 `bindkey` 可以查看所有绑定的快捷键

- `^music` 以 music 开头
- `mp3$` 以 mp3 结尾
- `'word` 严格匹配
- `!word` 不包含 word
- `!.mp3$` 不以 `.mp3` 结尾

## 🦇 bat - 代码高亮查看

**安装**：`brew install bat`  
**高级用法**：

```bash
grep "pattern" file.txt | bat -l log  # 语法高亮日志文件
bat --theme=GitHub src/main.js       # 指定主题
bat --line-range 10:20 file.py       # 显示指定行范围
```

**特性**：
- 自动分页（类似 `less`）
- Git 集成（显示修改状态）
- 支持 200+ 语言高亮  
    **类似工具**：`exa`（现代 ls 替代品）、lnav（日志文件查看）

## 🔍 ripgrep (rg) - 超快文本搜索

**安装**：`brew install ripgrep`  
**使用场景**：
```bash
rg -tjs 'function'            # 搜索 JS 文件中的 function 等同于 --type=js
rg --files | fzf              # 与 fzf 联动
rg -C 3 'error' --context 3   # 显示上下文
```

## mole  - 清理垃圾工具

**安装**：`brew install tw93/tap/mole`  
**使用场景**：
```bash
直接输入：mo
```

# 🖥️ tmux 终极指南

**终端复用神器** - 保持会话持久化，实现多窗口/面板管理，彻底摆脱终端标签混乱

## 🔧 安装与基础配置
```bash
brew install tmux  # macOS 安装
sudo apt install tmux  # Ubuntu/Debian
```

**基础配置文件 (`~/.tmux.conf`)**

```sh
# 启用鼠标支持（滚轮、选择面板）
set -g mouse on

# 设置前缀键为 Ctrl-a（默认 Ctrl-b 反人类）
set -g prefix C-a
unbind C-b
bind C-a send-prefix

# 面板分割快捷键（更符合现代习惯）
bind | split-window -h  # 垂直分割
bind - split-window -v  # 水平分割

# 开启256色和真彩色支持
set -g default-terminal "screen-256color"
set -ga terminal-overrides ",xterm-256color:Tc"

# 状态栏美化
set -g status-style bg=black,fg=cyan
set -g status-right "#{cpu_percentage} | %Y-%m-%d %H:%M "
```

## ⌨️ 核心快捷键速查

| 操作        | 快捷键                            |
| --------- | ------------------------------ |
| 激活命令模式    | `前缀键 + :`                      |
| 新建窗口      | `前缀键 + c`                      |
| 切换窗口      | `前缀键 + 数字`                     |
| 面板切换      | `前缀键 + 方向键`                    |
| 全屏当前面板    | `前缀键 + z`                      |
| 复制模式      | `前缀键 + [`                      |
| 粘贴内容      | `前缀键 + ]`                      |
| 水平分屏      | `前缀键 + "`                      |
| 垂直分屏      | `前缀键 + %`                      |
| 在不同窗格之间切换 | `前缀键 + 方向键（上、下、左、右）`           |
| 调整水平窗格大小  | `前缀键 + {`（左窗格缩小） 、`}`（右窗格缩小）   |
| 调整垂直窗格大小  | `前缀键 + +`（上方窗格缩小） 、`-`（下方窗格缩小） |
| 关闭窗格      | `前缀键 + x`                      |
| 重命名会话     | 先按下 `前缀键 + b` ，然后输入 `$`        |
| 列出所有会话    | `tmux ls`                      |
| 切换到其他会话   | `tmux attach -t <会话名称>`        |
| 分离当前会话    | `前缀键 + d`                      |

注：这里的 “前缀键” 通常默认是 `Ctrl + b` ，但有些配置可能会将其修改为其他组合，比如 `Ctrl + a` 。

## 🚀 高效工作流技巧

### 1. 会话管理

```bash
tmux new -s work         # 创建名为 work 的会话
tmux ls                  # 列出所有会话
tmux attach -t work      # 重新接入会话
tmux kill-session -t work # 终止指定会话
```

### 2. 会话持久化

通过 `tmux-resurrect` 插件实现：

1. 安装插件管理器：

```bash
git clone https://github.com/tmux-plugins/tpm ~/.tmux/plugins/tpm
```
    
2. 在 `~/.tmux.conf` 添加：

```bash
set -g @plugin 'tmux-plugins/tpm'
set -g @plugin 'tmux-plugins/tmux-resurrect'
run '~/.tmux/plugins/tpm/tpm'
```
3. 保存后按 `前缀键 + I` 安装插件

**使用**：
- 保存会话：`前缀键 + Ctrl-s`
- 恢复会话：`前缀键 + Ctrl-r`

### 3. 窗口与面板进阶

- **同步输入到所有面板**：  
    `前缀键 + :` 进入命令模式，输入 `setw synchronize-panes`
- **面板布局预设**：

```bash
tmux select-layout even-horizontal  # 水平等分
tmux select-layout tiled            # 自动平铺
```

- **批量操作窗口**：

```bash
tmux link-window -s dev:2 -t work:3  # 将 dev 会话的窗口2链接到 work 会话窗口3
```

## 🔥 高阶玩法

### 与系统剪贴板集成

1. 安装 `reattach-to-user-namespace`：

```bash
brew install reattach-to-user-namespace
```
    
2. 在 `~/.tmux.conf` 添加：

```bash
set-option -g default-command "reattach-to-user-namespace -l zsh"
```

### 模糊查找切换会话/窗口

结合 fzf 实现智能切换：

```bash
# 绑定快捷键：前缀键 + s 选择会话
bind-key s run-shell "tmux list-sessions | sed -E 's/:.*$//' | fzf --height 40% | xargs tmux switch-client -t"
```

### 性能监控面板

创建系统监控面板：

```bash
tmux new-window -n "Monitor"
tmux split-window -h "glances"
tmux split-window -v "htop"
tmux select-pane -t 0
```

## 💡 实际工作流示例

**Web 开发环境搭建**：

```bash
tmux new -s webdev
tmux rename-window 'Server'
tmux send-keys 'npm run dev' C-m  # 自动运行命令
tmux new-window -n 'Code'
tmux split-window -h "nvim"       # 左侧编辑器，右侧终端
tmux select-pane -t 0
```

## 🛠️ 推荐插件生态

|插件名称|功能描述|
|---|---|
|`tmux-pomodoro`|番茄钟工作法集成|
|`tmux-battery`|状态栏显示电池电量|
|`tmux-cpu`|显示 CPU 使用率|
|`tmux-continuum`|定时自动保存会话|

---

**建议搭配**：

- 使用 `iTerm2` 的 tmux 集成模式（`⌘ + Enter` 进入全屏）
- 结合 `fzf` 实现模糊查找历史命令/文件
- 通过 `bat` 在 tmux 中高亮预览文件内容

掌握这些技巧后，你可以实现：  
✅ SSH 断开自动恢复工作环境  
✅ 单屏高效管理 10+ 个终端任务  
✅ 复杂开发环境一键重建

# 🚀 其他效率增强

### zsh-autosuggestions

**安装**：
```bash
brew install zsh-autosuggestions
# 在 ~/.zshrc 添加：source $(brew --prefix)/share/zsh-autosuggestions/zsh-autosuggestions.zsh
```

**功能**：根据历史记录自动建议命令

### zsh-syntax-highlighting

```bash
brew install zsh-syntax-highlighting
# 在 ~/.zshrc 添加：source $(brew --prefix)/share/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh
```

**功能**：实时显示命令语法是否有效


# 🛠️ 更多推荐工具

| 工具         | 安装命令                    | 功能描述                | 替代对象          |
| ---------- | ----------------------- | ------------------- | ------------- |
| `fd`       | `brew install fd`       | 更快的文件查找             | find          |
| `tldr`     | `brew install tldr`     | 简化版 man 手册          | man           |
| `thefuck`  | `brew install thefuck`  | 自动纠正错误命令            | -             |
| `glances`  | `brew install glances`  | 高级系统监控（类似 htop 增强版） | top/htop/btop |
| `neofetch` | `brew install neofetch` | 炫酷系统信息展示            | screenfetch   |
| `trash`    | `brew install trash`    | 安全删除文件（可恢复）         | rm            |

## 💡 使用技巧组合示例

3. 快速打开历史命令：
```bash
history | fzf | bat --language=sh 
```
4. 语法高亮 + 分页查看日志：

```bash
tail -f /var/log/system.log | bat -l log --paging=always
```
    
5. 多工具协作工作流：

```bash
rg -tsql 'SELECT' | fzf --preview 'bat --color=always {}' | xargs code
```

