# HoneBrew 工具安装

> 常用开发工具的 Homebrew 安装命令合集

## 📦 工具列表

### 🖥️ 系统监控

```bash
# 进程监控 - 现代版 top，带图表
brew install btop

# 进程监控 - 经典款
brew install htop
```

### 🔍 文件与搜索

```bash
# cat 替代 - 语法高亮 + Git 集成
brew install bat

# 模糊搜索 - Ctrl+R 历史搜索神器
brew install fzf

# ls 替代 - 图标 + 颜色
brew install lsd

# ls 替代 - 现代版，支持 Git 状态
brew install eza

# grep 替代 - 超快搜索
brew install ripgrep

# 智能目录跳转 - 快速切换常用目录
brew install zoxide

# LS_COLORS 生成器 - 自定义目录颜色
brew install vivid
```

### 🛠️ 开发环境

```bash
# Node.js 版本管理
brew install nvm

# Web 服务器
brew install nginx

# 终端复用 - 分屏神器
brew install tmux
```

### 🌍 环境管理

```bash
# 目录级环境变量自动切换
brew install direnv
```

### 🐚 Shell 增强

```bash
# Zsh - 更强大的 shell
brew install zsh

# 命令纠错 - 输入 fuck 自动修正
brew install thefuck

# Shell 提示符 - 快速、可定制
brew install starship
```

### 📚 帮助文档

```bash
# 简化版 man - 命令示例优先
brew install tldr
```

### 🎨 实用工具

```bash
# 交互式 cheatsheet - 命令备忘录
brew install navi

# 安全删除 - 可恢复的 rm
brew install trash

# 系统信息展示 - 终端 neofetch
brew install neofetch

# 符号链接管理 - dotfiles 管理神器
brew install stow
```

### 🎮 游戏/其他

```bash
# Wails 应用构建工具
brew install wails
```

### 🖥️ 终端模拟器

```bash
# Ghostty - 现代 GPU 加速终端
brew install --cask ghostty

# iTerm2 - 功能强大的终端
brew install --cask iterm2
```

### 🐳 容器与虚拟化

```bash
# OrbStack - 轻量级 Docker/Linux 容器
brew install --cask orbstack
```

---

## 🚀 一键安装全部

```bash
# CLI 工具
brew install bat btop htop fzf lsd eza ripgrep zoxide vivid nvm nginx thefuck tldr tmux trash zsh neofetch stow starship navi wails

# GUI 应用
brew install --cask ghostty iterm2 orbstack
```

---

## ⚙️ 安装后配置

### fzf

```bash
# 启用键盘快捷键
$(brew --prefix)/opt/fzf/install
```

### nvm

```bash
# 添加到 ~/.zshrc
export NVM_DIR="$HOME/.nvm"
[ -s "/opt/homebrew/opt/nvm/nvm.sh" ] && \. "/opt/homebrew/opt/nvm/nvm.sh"
```

### thefuck

```bash
# 添加到 ~/.zshrc
eval $(thefuck --alias)
```

### zsh

```bash
# 设为默认 shell
chsh -s $(which zsh)
```

### starship

```bash
# 添加到 ~/.zshrc
eval "$(starship init zsh)"
```

### zoxide

```bash
# 添加到 ~/.zshrc
eval "$(zoxide init zsh)"
```

### direnv

```bash
# 添加到 ~/.zshrc
eval "$(direnv hook zsh)"

# 在项目目录创建 .envrc，允许自动加载
echo 'source .venv/bin/activate' > .envrc
direnv allow
```

进入目录自动激活虚拟环境，离开自动退出。

### vivid

```bash
# 添加到 ~/.zshrc
export LS_COLORS="$(vivid generate molokai)"
```

---

*创建于 2026-03-20*