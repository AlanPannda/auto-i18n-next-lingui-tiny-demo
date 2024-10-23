# auto-i18n-next-lingui-tiny-demo

自动 i18n，5 分钟 + 0.1 美元 API 费用，就可以给全站增加一种新语言。

**tiny demo 是可运行，可复现，最简洁的技术验证。**

本仓库从 create-next-app 出发，创建一个最简洁但是功能完备的 demo。
要想知道增加了哪些文件，可以直接和 create-next-app 生成的代码对比。

## 技术选型

[lingui](https://lingui.dev/) 一个 AI 翻译友好的 i18n 库，配合脚本做自动翻译。
目前有小坑，需要和 Next.js 的版本完全匹配，要比较专业的前端知识才能排错。

所以我创建了这个 demo，这样后来人可以少走弯路，直接使用。

**用法：点击右上方 Use This Template，或者 git clone 本仓库。**

## 命令

下面记录这个 demo 从创建到运行的所有命令以及输出。

我记录这些的目标是，你需要且只需要参考这些命令，就可以复现出整个项目。

```bash
pnpm dlx create-next-app@latest --typescript --eslint --tailwind --app --src-dir --import-alias @/* auto-i18n-next-lingui-tiny-demo
cd auto-i18n-next-lingui-tiny-demo
```
