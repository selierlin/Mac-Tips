# CLI 工具速查

> 高频但篇幅不大的命令行小工具合集，按需取用。一键安装见 [[HomeBrew工具安装]]，模糊搜索见 [[fzf 模糊搜索]]，文本搜索见 [[ripgrep 与 fd]]，ls 美化见 [[eza 与 vivid]]，终端复用见 [[tmux 终极指南]]。

## 文本查看与清理

### bat — 带高亮的代码/日志查看器

**安装：** `brew install bat`

**特性：** 自动分页、Git 状态集成、支持 200+ 语言语法高亮。

```bash title=bat 常用命令
bat file.py                      # 高亮查看文件
grep "error" file.log | bat -l log  # 语法高亮查看被过滤的日志
bat --theme=GitHub src/main.js   # 指定显示主题
bat --line-range 10:20 file.py   # 仅显示 10 到 20 行的内容
```

```bash title=bat 主题与缓存
bat --list-themes                # 列出所有内置主题
bat cache --build                # 重建缓存（换主题 / 加语法后执行）
bat --paging=never file          # 不分页直接输出（适合管道）
```

```bash title=让 man / git 也带高亮（加到 ~/.zshrc）
# man 页用 bat 高亮
export MANPAGER="sh -c 'col -bx | bat -l man -p'"
export MANROFFOPT="-c"
# git diff / log 用 bat
git config --global core.pager 'bat --paging=always'
```

> 持久设置（主题、样式）写进 `~/.config/bat/config`，如 `--theme="GitHub"`、`--style="numbers,changes"`。

### mole — 极简垃圾清理工具

**安装：** `brew install tw93/tap/mole`

**使用：** 在终端直接输入 `mo` 即可唤起交互式清理界面。

## 压缩与解压

### xz — 高压缩比压缩工具

macOS 自带 xz（XZ Utils 5.8.3），常配合 tar 处理 `.tar.xz`。

```bash title=xz / tar.xz 速查
xz file.log              # 压缩为 file.log.xz（默认删原文件）
xz -k file.log           # 保留原文件
xz -d file.log.xz        # 解压 .xz
xz -l file.log.xz        # 查看压缩信息（不解压）

# .tar.xz 归档（最常用）
tar -cJf archive.tar.xz dir/    # 打包并用 xz 压缩
tar -xJf archive.tar.xz         # 解包 .tar.xz
```

> tar 压缩标志：`-J` = xz（.tar.xz）、`-z` = gzip（.tar.gz）、`-j` = bzip2（.tar.bz2）。

## 高频实用工具榜单

| 工具        | 安装命令               | 核心功能                              | 替代对象       |
| ----------- | ---------------------- | ------------------------------------- | -------------- |
| **tldr**    | `brew install tldr`    | 极简、自带示例的 man 手册，秒查命令用法 | `man`          |
| **thefuck** | `brew install thefuck` | 输错命令时输入 `fuck` 自动纠正并执行  | -              |
| **glances** | `brew install glances` | 顶级系统监控看板（CPU/内存/网络/磁盘） | `top` / `htop` |
| **neofetch**| `brew install neofetch`| 终端展示系统硬件和 OS 信息            | -              |
| **trash**   | `brew install trash`   | 安全删除文件至废纸篓（防手残删库）    | `rm`           |
| **eza**     | 见 [[eza 与 vivid]]    | 现代 ls，带图标、颜色、树状图、Git 状态 | `ls` / `tree`  |

## 终极联动：命令行工作流示例

**1. 快速过滤并带高亮查看系统日志**

将实时滚动输出交给 `bat` 进行日志语法高亮：

```bash title=tail 实时日志 + bat 高亮
tail -f /var/log/system.log | bat -l log --paging=never
```

**2. 极速模糊找文件，并用 VS Code 打开**

结合 `rg` 找文件 + `fzf` 交互筛选：

```bash title=rg + fzf + code
rg --files | fzf | xargs code
```

**3. 全局搜索代码并预览，在编辑器中打开（神仙组合）**

`rg -l` 仅输出含关键词的文件名，`fzf` 提供带语法高亮的右侧预览，回车传给 `code`：

```bash title=rg + fzf 预览 + code
rg -l 'SELECT' -t sql | fzf --preview 'bat --color=always {}' | xargs code
```
