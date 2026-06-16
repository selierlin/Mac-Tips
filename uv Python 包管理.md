# uv Python 包管理

> Astral（Rust）出品的极速 Python 包 / 项目管理器。**一个工具**替代 `pip` / `venv` / `pip-tools` / `virtualenv` / `pyenv`（部分）/ `pipx`，速度比 pip 快 10–100 倍。
>
> 当前在用：**uv 0.11.21**。

## 安装

```bash title=安装 uv
brew install uv
```

## Python 版本管理（替代 pyenv）

```bash title=uv python 版本管理
uv python install 3.12      # 安装某版本 Python（uv 自管，不污染系统）
uv python install 3.11 3.13 # 批量
uv python list              # 列出可用 / 已装版本
uv python pin 3.12          # 为当前项目固定 Python 版本
```

## 项目工作流（推荐，替代 venv + pip + requirements）

```bash title=uv 项目工作流
uv init myapp               # 初始化项目（生成 pyproject.toml）
cd myapp
uv add requests             # 加依赖（自动创建 .venv + 写 pyproject + 更新 lock）
uv add --dev pytest ruff    # 加开发依赖
uv remove requests          # 移除依赖
uv sync                     # 按 uv.lock 精确安装到 .venv（可复现）
uv lock                     # 重新求解并锁定依赖版本
```

运行项目命令时用 `uv run`，自动激活 `.venv`，无需手动 `source activate`：

```bash title=uv run 在项目环境执行
uv run python main.py       # 在项目虚拟环境里跑脚本
uv run pytest               # 跑测试
uv run uvicorn main:app     # 跑服务
```

## 一次性脚本（PEP 723 内联依赖）

单个脚本文件顶部声明依赖，`uv run` 自动建临时环境执行，**无需任何项目结构**：

```python title=script.py - 内联依赖声明
# /// script
# requires-python = ">=3.12"
# dependencies = [
#   "requests",
#   "rich",
# ]
# ///
import requests
from rich import print
print(requests.get("https://api.github.com").json())
```

```bash title=直接运行带依赖的脚本
uv run script.py
```

## 全局 CLI 工具（替代 pipx）

```bash title=uv tool 全局工具
uv tool install ruff        # 全局安装一个命令行工具（独立环境）
uv tool install black
uv tool list                # 列出已装工具
uv tool upgrade --all       # 全部升级
uv tool uninstall ruff

uvx ruff check .            # uvx = tool run：临时跑一次，没装也行
```

> `uvx` 等价于 `pipx run`，跑完即走，适合偶尔用一次的工具。

## 兼容旧 pip 习惯

uv 提供 `uv pip` 子命令，接口与 pip 一致，可平滑迁移：

```bash title=uv pip 兼容接口
uv venv                     # 手动建 .venv
uv pip install requests     # 装包
uv pip install -r requirements.txt
uv pip list
uv pip freeze
```

## 速查对照

| 传统方式                        | uv 方式                    |
| ------------------------------- | -------------------------- |
| `python -m venv .venv`          | `uv venv`                  |
| `pip install pkg`               | `uv add pkg`（项目）/ `uv pip install pkg` |
| `pip install -r requirements.txt` | `uv sync`（按 lock）/ `uv pip install -r ...` |
| `pipx install tool`             | `uv tool install tool`     |
| `pyenv install 3.12`            | `uv python install 3.12`   |

## 参考

- 官网：<https://docs.astral.sh/uv/>
- 思路类比：Node 的 nvm + npm、Java 的 [[jenv Java 版本管理]] + Maven，但 uv 把版本管理、虚拟环境、依赖、锁、工具分发全收进一个工具。
