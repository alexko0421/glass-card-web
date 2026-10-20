# Glass Card 网页版

[English](README.md) | 简体中文

带颜色的毛玻璃卡片，会模糊它后面的东西。

**[打开 demo →](https://alexko0421.github.io/glass-card-web/)**

这是 SwiftUI 包 [Glass Card](https://github.com/alexko0421/glass-card) 的网页版。SwiftUI 版要你自己传一个背景让它重画；网页上 `backdrop-filter` 直接取真实页面，所以不用传背景，叠在一起的卡也会真正互相模糊，连颜色一起。

- 一个 CSS 文件，纯 HTML 或任何框架都能用
- 另外有一个可选的 React 组件
- 九个颜色和 SwiftUI 版一样，也可以自定义

还没发到 npm。复制 `src/style.css`（用 React 的话再加 `src/react/`），或者 clone 下来跑 `npm run build`。

## 纯 HTML

```html
<link rel="stylesheet" href="style.css" />

<div class="glass-card" data-swatch="rose" style="width: 300px; height: 160px">
  Room for a new idea
</div>
```

预设：`blue`、`rose`、`violet`、`mint`、`lemon`、`orange`、`teal`、`graphite`、`pearl`。大部分是 58% 着色，pearl 是 45%。

其他都用 CSS 变量调：

| 变量 | 默认 | |
| --- | --- | --- |
| `--glass-tint` | `#3769f5` | 着色 |
| `--glass-ink` | `#18428e` | 文字颜色 |
| `--glass-opacity` | `0.58` | 着色透明度，0–1 |
| `--glass-blur` | `7px` | 模糊半径 |
| `--glass-radius` | `20px` | 圆角 |

## React

```tsx
import { GlassCard } from "glass-card/react";
import "glass-card/style.css";

<GlassCard swatch="rose" blur={7} style={{ width: 300, height: 160 }}>
  Room for a new idea
</GlassCard>

<GlassCard swatch={{ tint: "#7c3aed", ink: "#ffffff", opacity: 0.4 }}>…</GlassCard>
```

`GlassCard` 渲染一个 `div`，其他 props 原样传下去。`swatch` 可以是预设名，也可以是 `{ tint, ink, opacity }`。

## 阴影

卡片本身没有阴影，和 SwiftUI 版一样，自己加 `box-shadow`。要对上 SwiftUI 的 `.shadow(color: .black.opacity(a), radius: r, y: y)`，用 `0 y (2 × r) rgb(0 0 0 / (1.4 × a))`。这个换算是量两边渲染结果得出来的，不是文档写的。demo 用的是 `0 10px 40px rgb(0 0 0 / 0.14)`。

## 模糊不见了

`backdrop-filter` 只看得到最近一个带 `filter`、`opacity` 小于 1、`mask`、`clip-path`、`mix-blend-mode` 或者自己也有 `backdrop-filter` 的祖先元素以内的东西。超出那个范围的卡片都看不到，于是看起来是平的。不要在卡片的祖先元素上用这些属性。

内容会被裁成圆角（`overflow: hidden`）。

## 开发

```sh
npm install
npm run dev        # demo
npm run typecheck
npm run build
```

## 致谢与许可

视觉灵感来自 sam（[@artntek](https://x.com/artntek)）的 [Event Stack Shifting](https://x.com/artntek/status/2100247096993485129)。没有附带任何原视频或原作品。

[MIT](LICENSE)，版权 2026 Chunlong Ko。demo 用了六个 [Tabler Icons](https://tabler.io/icons) 实心 SVG（3.46.0 版），保留其 MIT 许可（[THIRD_PARTY_NOTICES.txt](THIRD_PARTY_NOTICES.txt)）。
