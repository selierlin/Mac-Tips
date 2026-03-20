# Brew 工具安装

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

# grep 替代 - 超快搜索
brew install ripgrep
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

### 🐚 Shell 增强

```bash
# Zsh - 更强大的 shell
brew install zsh

# 命令纠错 - 输入 fuck 自动修正
brew install thefuck
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
```

### 🎮 游戏/其他

```bash
# Wails 应用构建工具
brew install wails
```

---

## 🚀 一键安装全部

```bash
brew install bat btop htop fzf lsd nvm nginx ripgrep thefuck tldr tmux trash zsh neofetch
brew install navi
brew install wails
```

> 注：`mole` 未找到官方 formula，可能是自定义 tap 或其他来源

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

---

*创建于 2026-03-20*