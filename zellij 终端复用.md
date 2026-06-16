# zellij 终端复用

> 现代终端复用器（Rust），[[tmux 终极指南]] 的年轻替代品。开箱即用、底部实时键位提示（不用背快捷键）、原生浮动面板、WebAssembly 插件、KDL 配置。
>
> 当前在用：**zellij 0.44.3**，配置 `~/.config/zellij/config.kdl`（软链到 dotfiles，用 [[HomeBrew工具安装]] 的 stow 管理）。

## 安装与启动

```bash title=安装 zellij
brew install zellij
```

```bash title=zellij 会话命令
zellij                  # 新建会话（或恢复最近会话）
zellij -s work          # 新建名为 work 的会话
zellij attach work      # 接入指定会话（简写 zellij a work）
zellij list-sessions    # 列出所有会话（简写 zellij ls）
zellij kill-session work
zellij delete-all-sessions
```

> 默认 detach（`Ctrl+o` → `d`）后会话保留，下次 `zellij attach` 恢复，断网/关终端任务不中断。

## 核心：模式系统

zellij 的快捷键按「模式」组织。按一个**模式键**进入模式后，屏幕**底部会实时显示该模式下所有可用按键**——这是它和 tmux 最大的体验差异。

| 模式键        | 模式     | 用途                       |
| ------------- | -------- | -------------------------- |
| `Ctrl + p`    | PANE     | 面板：拆分、切换、关闭、浮动 |
| `Ctrl + t`    | TAB      | 标签页：新建、切换、重命名 |
| `Ctrl + n`    | RESIZE   | 调整面板大小               |
| `Ctrl + h`    | MOVE     | 移动面板                   |
| `Ctrl + s`    | SCROLL   | 上下翻页 / 查看历史输出    |
| `Ctrl + o`    | SESSION  | 会话：分离、打开会话管理器 |
| `Ctrl + g`    | LOCK     | 锁定（禁用快捷键，防误触） |

> 进入任意模式后，**看底部提示**即可，无需记忆。按 `Esc` 或重复按模式键退出模式。

### PANE 模式（`Ctrl + p` 后）

| 键       | 作用                |
| -------- | ------------------- |
| `h j k l`| 切换到左/下/上/右面板 |
| `d`      | 向下拆分            |
| `r`      | 向右拆分            |
| `n`      | 新建面板            |
| `w`      | 切换浮动 / 平铺     |
| `x`      | 关闭当前面板        |

### TAB 模式（`Ctrl + t` 后）

| 键            | 作用                |
| ------------- | ------------------- |
| `n`           | 新建标签页          |
| `r`           | 重命名当前标签页    |
| `x`           | 关闭标签页          |
| `1`–`9`       | 切到第 N 个标签页   |
| `←` / `→`     | 左右切换标签页      |

## 浮动面板

zellij 原生支持浮动面板（tmux 需要 hack）：`Ctrl + p` → `w` 把当前面板转浮动，再按转回平铺。适合临时弹个终端跑命令。

## 配置（KDL）

配置文件 `~/.config/zellij/config.kdl`（KDL 格式）。生成默认配置：

```bash title=生成 zellij 默认配置
zellij setup --dump-config > ~/.config/zellij/config.kdl
zellij setup --check        # 检查配置 / 环境是否正常
```

布局（layout）文件放 `~/.config/zellij/layouts/*.kdl`，启动时 `zellij --layout dev` 加载预设的面板布局。

> 我的 `config.kdl` 软链到 dotfiles 仓库，随 [[HomeBrew工具安装]] 的 stow 一起管理。

## 会话持久化

默认 detach 即保留。社区插件可做到「关机后也能恢复全部面板布局」：

- `zellij-zashboard`：增强的会话管理面板
- `zellij-choose` / `harpoon` 类：快速跳转

## zellij vs tmux

| 维度     | tmux                 | zellij                    |
| -------- | -------------------- | ------------------------- |
| 上手     | 需记快捷键           | 底部实时提示，开箱即用     |
| 浮动面板 | 需 hack              | 原生支持                  |
| 配置     | `~/.tmux.conf`       | `config.kdl`              |
| 插件     | 脚本 / TPM           | WebAssembly，更强         |
| 生态     | 老牌、几乎处处可用   | 较新、远程服务器未必预装  |

> 两者可共存。本地开发用 zellij 体验好；连远程服务器还是 tmux 稳。

## 参考

- 官网：<https://zellij.dev>
- 文档：<https://zellij.dev/documentation/>
