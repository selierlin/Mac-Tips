# atuin 历史搜索

> 替代 shell 原生历史（`Ctrl+R` / `↑`）的现代化方案：用 SQLite 存储命令历史，支持模糊搜索、按目录/会话过滤、命令统计，可选跨机器加密同步。
>
> 当前在用：**atuin 18.16.1**，zsh 集成，配置基本默认（`enter_accept=true`、`sync.records=true`）。

## 安装与集成

### 安装

```bash title=安装 atuin
brew install atuin
```

### 集成到 zsh

在 `~/.zshrc` 加入（已配置）：

```bash title=~/.zshrc - atuin 集成
# atuin 命令历史
eval "$(atuin init zsh)"
```

> 其他 shell：`atuin init bash` 或 `atuin init fish`。改完 `source ~/.zshrc` 生效。

### 导入现有历史

首次使用可把原有 shell 历史导入 atuin：

```bash title=导入旧历史
atuin import auto   # 自动识别 zsh/bash/fish 历史并导入
```

## 日常使用

| 操作            | 作用                                                         |
| --------------- | ------------------------------------------------------------ |
| **`Ctrl + R`**  | 打开交互式历史搜索（替代原生 Ctrl+R），模糊匹配 + 多行预览  |
| **`↑` 上箭头**  | 按当前 filter_mode 过滤的历史逐条回溯                        |

### 交互界面常用键

- 输入关键词即**模糊搜索**
- 在界面内再按 `Ctrl + R`：**循环切换 filter 模式**（global → host → session → directory → workspace）
- `Enter`：**直接执行**选中命令（因 `enter_accept=true`）
- `Tab`：把命令放入命令行**编辑**（不执行）
- `↑` / `↓`：选择条目
- `Esc`：退出（默认返回原查询）

## 常用命令

| 命令                   | 作用                                              |
| ---------------------- | ------------------------------------------------- |
| `atuin search "关键词"` | 搜索历史（支持 `--cwd`、`--exit`、`--before` 等） |
| `atuin stats`          | 命令使用统计（最常用命令 Top 榜）                 |
| `atuin history list`   | 列出历史                                          |
| `atuin sync`           | 手动触发同步                                      |
| `atuin import auto`    | 导入旧 shell 历史                                 |

## 关键配置（`~/.config/atuin/config.toml`）

> 当前配置基本为默认值，以下是最值得了解/调整的项：

| 配置项                          | 默认值        | 说明                                                              |
| ------------------------------- | ------------- | ----------------------------------------------------------------- |
| `search_mode`                   | `fuzzy`       | 搜索匹配方式：`prefix` / `fulltext` / `fuzzy` / `skim`            |
| `filter_mode`                   | `global`      | 过滤范围：`global` / `host` / `session` / `directory` / `workspace` |
| `enter_accept`                  | `true` ✅      | 回车直接执行；`false` 则放入命令行编辑                            |
| `inline_height`                 | `0`（全屏）   | 内联 UI 最大行数，`0` 表示全屏                                    |
| `secrets_filter`                | `true`        | **强烈保留**：自动拦截含 AWS Key / GitHub PAT / Slack Token 的命令入库 |
| `history_filter`                | `[]`          | 正则数组，匹配的命令不入库（如含密码的命令）                      |
| `[tmux] enabled`                | `false`       | 在 tmux 内用 popup 搜索（需 tmux ≥ 3.2）                          |

> 💡 **推荐调整**：把 `filter_mode` 改为 `directory`，则 `↑` 箭头只回溯**当前目录**下用过的命令，非常贴合项目场景。

## 同步（可选）

- 默认同步服务器 `api.atuin.sh`，需 `atuin login`（或 `atuin register`）注册登录后 `atuin sync`。
- **不登录也能纯本地使用**：数据存在 `~/.local/share/atuin/`（SQLite），搜索/统计/过滤全可用。
- 可自建服务器：设置 `sync_address = "https://your-server"`。
- `auto_sync`（默认 true）与 `sync_frequency`（默认 `10m`）控制自动同步频率。

## 与其他工具的关系

- 与 [[fzf 模糊搜索]]：atuin 的 `Ctrl+R` 用**自带 TUI**（非 fzf）。fzf 仍负责文件/通用模糊搜索，二者互补不冲突。
- 在 tmux 中可启用 popup 搜索，详见 [[终端复用器指南]]。
- 集成入口写在 [[终端环境搭建]] 的 zsh 配置中。

## 参考

- 官网：<https://atuin.sh>
- 文档：<https://docs.atuin.sh>
