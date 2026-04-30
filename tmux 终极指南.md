# 🖥️ tmux 终极指南

**终端复用神器** - 保持会话持久化，实现多窗口/面板管理，彻底摆脱终端标签混乱

## 🔧 安装与基础配置
```bash
brew install tmux  # macOS 安装
sudo apt install tmux  # Ubuntu/Debian
```

**基础配置文件 (`~/.tmux.conf`)**

```bash
# =============================================
# 1. 基础全局设置 (通用性与性能)
# =============================================
set -g default-terminal "screen-256color"
set -ga terminal-overrides ",xterm-256color:Tc" # 开启真彩色支持
set -s escape-time 0          # 彻底消除 Vim 模式切换延迟
set -g history-limit 50000    # 增加回滚行数，防止日志刷没
set -g display-time 4000      # 提示信息显示 4 秒
set -g status-interval 5      # 状态栏刷新频率
set -g focus-events on        # 增强与终端程序的交互

# =============================================
# 2. 操控逻辑优化 (手感核心)
# =============================================
set -g mouse on               # 鼠标支持 (滚轮、选面板)
set -g prefix C-a             # 你的选择是对的，C-a 比 C-b 顺手得多
unbind C-b
bind C-a send-prefix

# 窗口和面板从 1 开始编号 (符合键盘物理布局)
set -g base-index 1
setw -g pane-base-index 1
set -g renumber-windows on    # 关闭窗口后自动重排编号

# =============================================
# 3. 快捷键映射 (Vim 风格与直觉化)
# =============================================

# 分屏：保持当前路径 (-c "#{pane_current_path}")
# 这是最实用的改动，新开面板直接留在当前目录
bind | split-window -h -c "#{pane_current_path}"
bind - split-window -v -c "#{pane_current_path}"

# 面板切换：使用 Vim 的 h j k l (无需按 Prefix 后再按方向键)
bind h select-pane -L
bind j select-pane -D
bind k select-pane -U
bind l select-pane -R

# 调整面板大小 (Prefix + Alt + h/j/k/l)
bind -r H resize-pane -L 5
bind -r J resize-pane -D 5
bind -r K resize-pane -U 5
bind -r L resize-pane -R 5

# 配置文件重载：Prefix + r
bind r source-file ~/.tmux.conf \; display "Config Reloaded!"

# =============================================
# 4. 颜值与状态栏 (简洁但不简单)
# =============================================
set -g status-style bg=default,fg=cyan        # 背景透明，适配终端主题
set -g status-left-length 20
set -g status-left "#[fg=green]Session: #S #[default]"
set -g status-right "#[fg=yellow]%Y-%m-%d %H:%M #[fg=white]| #[fg=cyan]#H"

# 当前激活窗口的高亮样式
setw -g window-status-current-style fg=black,bg=cyan,bold
```

保存后，在终端执行以下命令生效： `tmux source-file ~/.tmux.conf`

## 常用命令清单

所有的 tmux 快捷键都需要先按 **Prefix (前缀键)**，默认是 `Ctrl + b`。

### 会话管理（在 Shell 中输入）

| **动作** | **命令**                              |
| ------ | ----------------------------------- |
| 新建会话   | `tmux new -s <name>`                |
| 查看所有会话 | `tmux ls`                           |
| 接入指定会话 | `tmux a -t <name>`                  |
| 断开当前会话 | `tmux detach` (或快捷键 `Prefix` + `d`) |
| 杀死指定会话 | `tmux kill-session -t <name>`       |


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
| 重命名会话     | 先按下 `前缀键 + b` ，然后输入 `$`        |
| 列出所有会话    | `tmux ls`                      |
| 切换到其他会话   | `tmux attach -t <会话名称>`        |
| 分离当前会话    | `前缀键 + d`                      |

注：这里的 "前缀键" 通常默认是 `Ctrl + b`，但有些配置可能会将其修改为其他组合，比如 `Ctrl + a` 。

## 🚀 高效工作流技巧

### 1. 会话管理

```bash
tmux new -s work         # 创建名为 work 的会话
tmux ls                  # 列出所有会话
tmux attach -t work      # 重新接入会话
tmux kill-session -t work # 终止指定会话
```

### 2. 会话持久化

通过 `tmux-resurrect` 插件实现：

1. 安装插件管理器：

```bash
git clone https://github.com/tmux-plugins/tpm ~/.tmux/plugins/tpm
```

2. 在 `~/.tmux.conf` 添加：

```bash
set -g @plugin 'tmux-plugins/tpm'
set -g @plugin 'tmux-plugins/tmux-resurrect'
run '~/.tmux/plugins/tpm/tpm'
```
3. 保存后按 `前缀键 + I` 安装插件

**使用**：
- 保存会话：`前缀键 + Ctrl-s`
- 恢复会话：`前缀键 + Ctrl-r`

### 3. 窗口与面板进阶

- **同步输入到所有面板**：  
    `前缀键 + :` 进入命令模式，输入 `setw synchronize-panes`
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

1. 安装 `reattach-to-user-namespace`：

```bash
brew install reattach-to-user-namespace
```
    
2. 在 `~/.tmux.conf` 添加：

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

- 使用 `iTerm2` 的 tmux 集成模式（`⌘ + Enter` 进入全屏）
- 结合 `fzf` 实现模糊查找历史命令/文件
- 通过 `bat` 在 tmux 中高亮预览文件内容

掌握这些技巧后，你可以实现：  
✅ SSH 断开自动恢复工作环境  
✅ 单屏高效管理 10+ 个终端任务  
✅ 复杂开发环境一键重建