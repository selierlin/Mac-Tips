# zoxide 智能跳转

> 基于 frecency（frequency + recency，频率 × 最近度）评分的智能目录跳转工具。告别冗长的 `cd /a/b/c/d`，用 `z 关键词` 一键跳到最常去的目录。autojump / z 的现代继任者（Rust）。
>
> 当前在用：**zoxide 0.9.9**，zsh 集成（`eval "$(zoxide init zsh)"`）。

## 安装与集成

```bash title=安装 zoxide
brew install zoxide
```

在 `~/.zshrc` 加入（已配置）：

```bash title=~/.zshrc - zoxide 集成
# zoxide 自动目录跳转
eval "$(zoxide init zsh)"
```

> 其他 shell：`zoxide init bash` / `fish` / `nushell`。改完 `source ~/.zshrc`。

## 核心用法

| 命令            | 作用                                                       |
| --------------- | ---------------------------------------------------------- |
| `z foo`         | 跳到名字含 `foo` 且评分最高的目录                          |
| `z foo bar`     | 多关键词：跳到路径同时含 `foo` 和 `bar` 的目录             |
| `zi foo`        | **交互式**：列出所有匹配，用 [[fzf 模糊搜索]] 选一个再跳   |
| `z -`           | 回到上一个目录                                            |
| `z`（无参数）   | 跳到评分最高的目录（通常是 `~`）                           |

> 平时正常 `cd` 过的目录，zoxide 都会默默记下并累计评分——用得越多越准。

## 评分机制（frecency）

zoxide 综合「访问频率」和「最近访问时间」打分：

- **最近访问**的目录加分更高（recency 衰减）
- **频繁访问**的目录累积更高基础分（frequency）
- 所以 `z proj` 会优先跳到你**最近常用**的那个含 proj 的目录，而不是半年前去过的

数据库位置：`~/.local/share/zoxide/db.zo`

## 配置（init 选项）

`zoxide init` 支持自定义命令名等：

```bash title=zoxide init 常用选项
# 把默认命令 z 改成 cd（激进模式，cd 直接带跳转能力）
eval "$(zoxide init zsh --cmd cd)"

# 同时保留 z 和 zi，并指定交互命令名
eval "$(zoxide init zsh --cmd j)"
```

直接用 zoxide 本体操作数据库：

```bash title=zoxide 本体命令
zoxide query              # 列出所有目录及评分（按分排序）
zoxide query --list       # 详细列表
zoxide add /some/path     # 手动添加目录
zoxide edit               # 用编辑器增删目录
```

## 与 autojump 的关系

| 维度     | autojump（`j`）  | zoxide（`z`）            |
| -------- | ---------------- | ------------------------ |
| 实现     | Python           | Rust，极快                |
| 交互选择 | 需额外配置       | `zi` 原生调 fzf           |
| 维护     | 已不活跃         | 活跃                     |

> 早期终端配置里装过 autojump，现已被 zoxide 取代。两者**不要同时启用**，避免命令冲突。

## 联动

- `zi` 默认用 [[fzf 模糊搜索]] 做交互前端，二者天然配合。
- 在 [[终端复用器指南]] 的多面板里跳目录尤为高效。
