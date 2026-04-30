# Sublime Text 粘贴内容自动识别语法

## 问题

从剪贴板粘贴代码到 Sublime Text 新文件时，默认不会自动识别语法高亮。

## 解决方案：AutoSetSyntax 插件

- 仓库：https://github.com/jfcherng-sublime/ST-AutoSetSyntax
- 文档：https://jfcherng-sublime.github.io/ST-AutoSetSyntax/
- 要求：Sublime Text Build 4201+

### 安装

1. `Cmd+Shift+P` → `Package Control: Install Package`
2. 搜索 `AutoSetSyntax` 安装

### 启用 Magika 深度学习检测（可选，推荐）

基于 Google Magika，能识别粘贴到新 buffer 中的任意代码片段。

1. `Cmd+Shift+P` → `AutoSetSyntax: Download Dependencies`（约 15~25 MB）
2. `Preferences` → `Package Settings` → `AutoSetSyntax` → `Settings`，添加：

```json
{
    "magika.enabled": true
}
```

3. 重启 Sublime Text

### 使用

- `Cmd+N` 新建文件 → 粘贴代码 → 自动识别语法
- 仅在当前语法为 **Plain Text** 时触发
- 手动触发：`Cmd+Shift+P` → `AutoSetSyntax: Set Syntax`
