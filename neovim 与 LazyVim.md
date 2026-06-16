# neovim 与 LazyVim

> Neovim + **LazyVim** 发行版。LazyVim 基于 lazy.nvim 插件管理器，预配置了一套现代 IDE 体验（补全、语法、文件树、模糊搜索、格式化……），开箱即用又可深度定制。
>
> 当前在用：**Neovim 0.12.2**，LazyVim 发行版，配置入口 `~/.config/nvim/`。

## 安装

```bash title=安装 neovim
brew install neovim
```

> 字体需 Nerd Font 才能正常显示图标（已在 [[终端环境搭建]] 安装）。

## LazyVim 是什么

把 Neovim 从零配置到「现代 IDE」需要调几百个插件和键位，LazyVim 帮你**预置好一套合理默认**，你只需在其上做个性化覆盖。底层用 `lazy.nvim` 管理插件（懒加载、自动更新）。

## 配置结构

```
~/.config/nvim/
├── init.lua          # 入口（加载 lua/ 下的配置）
├── lazyvim.json      # LazyVim 自身配置（extras 开关等）
└── lua/              # 个人配置（键位、插件、选项覆盖）
    ├── config/
    └── plugins/
```

个人定制放在 `lua/` 下：`lua/config/keymaps.lua`（键位）、`lua/config/options.lua`（选项）、`lua/plugins/*.lua`（声明额外插件 / 覆盖默认）。

## 插件管理

在 nvim 里用命令模式（`:` 进入）：

```vim title=LazyVim 插件管理命令
:Lazy              " 打开 lazy.nvim 管理面板（安装/更新/状态）
:Lazy sync         " 同步：按声明清理 + 安装 + 更新
:Lazy update       " 更新所有插件
:Lazy install      " 安装声明的插件
:Lazy log          " 查看更新日志
```

## 我的插件栈（概览）

> 以下为当前已装插件的主要部分（lazy 目录），作用速览：

| 插件            | 作用                       |
| --------------- | -------------------------- |
| `blink.cmp`     | 极速代码补全               |
| `bufferline.nvim` | 顶部标签栏（buffer 可视化）|
| `catppuccin`    | 主题配色                   |
| `conform.nvim`  | 代码格式化（接入各类 formatter） |
| `flash.nvim`    | 快速光标跳转                |

> 具体配置以 `~/.config/nvim/lua/` 为准。

## 常用键位入门

LazyVim 以 **`Space`（`<leader>`）** 为领导键，按完会弹出后续按键提示。以下为官方默认（**实际以你的 `keymaps.lua` 为准**）：

| 键位          | 作用                          |
| ------------- | ----------------------------- |
| `<Space>`     | 弹出命令面板（按提示继续按）  |
| `<Space> e`   | 打开 / 关闭文件树（neo-tree） |
| `<Space> f f` | 查找文件（Telescope）         |
| `<Space> f g` | 全局内容搜索                   |
| `<Space> f b` | 在已开 buffer 间查找          |
| `<Space> b d` | 关闭当前 buffer               |
| `Ctrl + h/j/k/l` | 窗口间切换                 |

> LazyVim 把很多常用操作映射成「两到三个键」，按 `<Space>` 后照提示走即可，不必死记。

## 参考

- LazyVim 官网（键位 / extras 全表）：<https://www.lazyvim.org>
- lazy.nvim：<https://github.com/folke/lazy.nvim>
- Neovim：<https://neovim.io>
