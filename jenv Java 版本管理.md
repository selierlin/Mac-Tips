# jenv Java 版本管理

> 管理多个 JDK 版本，按**全局 / 目录 / Shell** 切换，并自动导出对应的 `JAVA_HOME`。Java 版的 nvm。
>
> 当前在用：**jenv 0.6.0**，已管理 JDK 1.8 / 18 / 21 / 25（global 默认 1.8）。

## 安装与集成

```bash title=安装 jenv
brew install jenv
```

在 `~/.zshrc` 配置（已配置）：

```bash title=~/.zshrc - jenv 集成
# jenv 加入 PATH
export PATH="$HOME/.jenv/bin:$PATH"
# jenv 初始化（- 输出 shell 函数与 init）
eval "$(jenv init -)"
```

## ⚠️ 第一步：启用插件（最常踩的坑）

装完 jenv **必须启用 `export` 插件**，否则切换版本时 `JAVA_HOME` 不会跟着变，等于白切：

```bash title=启用 jenv 插件
jenv enable-plugin export       # 关键：自动导出 JAVA_HOME
jenv enable-plugin maven        # 让 Maven 用对应 JDK
jenv enable-plugin gradle       # 让 Gradle 用对应 JDK
jenv enable-plugin ant          # 可选
```

查看已启用插件：`ls ~/.jenv/plugins`

## 添加 JDK

把本机已装的 JDK 注册进 jenv：

```bash title=jenv add 添加 JDK
# 方式一：直接指向 JDK 主目录
jenv add /Library/Java/JavaVirtualMachines/jdk-21.jdk/Contents/Home

# 方式二：用 macOS 自带工具定位（推荐）
jenv add "$(/usr/libexec/java_home -v 21)"
jenv add "$(/usr/libexec/java_home -v 1.8)"
```

> macOS 查看所有已装 JDK：`/usr/libexec/java_home -V`

## 查看与设置版本

```bash title=jenv 版本管理
jenv versions          # 列出所有已管理的版本（* 为当前）
jenv version           # 当前生效版本
jenv which java        # 当前 java 可执行文件路径

jenv global 21         # 全局默认版本（写 ~/.jenv/version）
jenv local 21          # 当前目录版本（写 .java-version，进目录自动切）
jenv shell 18          # 仅当前 Shell 会话
```

> 💡 **推荐用法**：global 留稳定版（如当前 1.8），具体项目根目录用 `jenv local 21` 固定版本，团队可把 `.java-version` 提交到仓库统一 JDK。

## 移除版本

```bash title=jenv remove
jenv remove 18.0.2     # 从 jenv 移除（不卸载 JDK 本体）
```

## 验证切换是否生效

```bash title=验证 JAVA_HOME 联动
jenv shell 21
echo $JAVA_HOME        # 应指向 JDK 21
java -version          # 应显示 21
```

若 `JAVA_HOME` 没变 → 多半是没启用 `export` 插件，回到第一步。

## 参考

- 官网：<https://www.jenv.be>
- 与 Node 的 [[uv Python 包管理]] / nvm 思路一致：版本管理 + 目录级切换。
