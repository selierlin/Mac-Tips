# HomeBrew 工具安装

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

# Java 版本管理 - 多 JDK 切换
brew install jenv

# Python 包管理 - 极速，替代 pip/venv
brew install uv

# GitHub 命令行工具 - PR/Issue/Release 管理
brew install gh

# Web 服务器
brew install nginx

# 编辑器 - Neovim（搭配 LazyVim）
brew install neovim

# 终端复用 - 分屏神器
brew install tmux

# 终端复用 - 现代款，开箱即用带键位提示
brew install zellij
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

# 命令历史 - 替代 Ctrl+R，SQLite 存储 + 模糊搜索
brew install atuin
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
brew install bat btop htop fzf lsd eza ripgrep zoxide vivid nvm jenv uv gh nginx neovim tmux zellij thefuck tldr atuin trash zsh neofetch stow starship navi wails

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

> 详见 [[fzf 模糊搜索]]。

### gh

```bash title=gh 常用命令
gh auth login                       # 登录 GitHub 账户

# Pull Request
gh pr create                        # 创建 PR
gh pr checkout 123                  # 切换到 PR 分支
gh pr list                          # 列出 PR
gh pr merge 123 --squash --delete-branch  # 合并并删分支
gh pr view --web                    # 浏览器打开当前 PR

# Issue / Release / Actions / Gist
gh issue create
gh release create v1.0              # 创建发布
gh run list                         # 查看 Actions 运行
gh run watch                        # 实时跟踪某次运行
gh gist create file.txt --public    # 创建 Gist

# 仓库
gh repo clone owner/repo
gh repo create my-proj --public --source=. --push  # 本地项目一键建仓并推送
```

### nvm

```bash title=~/.zshrc - nvm 集成
# 添加到 ~/.zshrc
export NVM_DIR="$HOME/.nvm"
[ -s "/opt/homebrew/opt/nvm/nvm.sh" ] && \. "/opt/homebrew/opt/nvm/nvm.sh"
```

```bash title=nvm 版本管理
nvm install 20            # 安装 Node 20
nvm install --lts         # 安装最新 LTS
nvm use 20                # 当前 shell 切版本
nvm ls                    # 列出已装版本
nvm ls-remote --lts       # 列出远程可装的 LTS
nvm alias default 20      # 设默认版本（新终端生效）
nvm uninstall 18          # 卸载某版本
```

> 项目根目录放 `.nvmrc`（内容如 `20`），进目录 `nvm use` 自动按文件切版本。

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

```bash title=~/.zshrc - starship 集成
# 添加到 ~/.zshrc
eval "$(starship init zsh)"
```

```bash title=starship 配置
starship preset --list                                          # 列出内置预设
starship preset nerd-font-symbols > ~/.config/starship.toml     # 导出预设为配置
```

> 提示符样式在 `~/.config/starship.toml`（我的已有自定义）。

### zoxide

```bash
# 添加到 ~/.zshrc
eval "$(zoxide init zsh)"
```

> 详见 [[zoxide 智能跳转]]。

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

> 搭配 eza 用效果翻倍，详见 [[eza 与 vivid]]。

### stow

GNU Stow 用**符号链接**管理 dotfiles：配置集中放一个仓库，stow 自动在 `$HOME` 建软链，增删某个工具的配置互不影响。

```bash title=stow dotfiles 工作流
# 假设仓库结构 ~/dotfiles/zellij/.config/zellij/config.kdl
cd ~/dotfiles
stow zellij          # 链接 zellij 配置到 ~/.config/zellij
stow nvim            # 链接 neovim 配置
stow starship

stow -D zellij       # 撤销（删除软链，不删源文件）
stow -R zellij       # 重新链接（目录结构调整后）
stow --adopt zellij  # 把 $HOME 已存在的真实文件收编进仓库
```

> 进入仓库目录执行 stow，它按「包名/子目录」结构向 `$HOME` 建镜像软链。zellij、starship、nvim 的配置都这么管理。

---

*创建于 2026-03-20*