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

## 和 SwiftUI 版的区别

| | SwiftUI（[glass-card](https://github.com/alexko0421/glass-card)） | 网页版（本仓库） |
| --- | --- | --- |
| 模糊的是什么 | 你传入的背景视图，在卡片后面重画一次 | 卡片后面的真实页面，用 `backdrop-filter` |
| 卡片叠在一起 | 演示把下层卡片扁平重画（白底加颜色），是近似的多层玻璃 | 每张卡都会模糊下面卡片的完整材质 |
| API | `GlassCard`，另有 `GlassCardMaterial` 自定义背景和遮罩 | `.glass-card` class 和 `<GlassCard>`，不用传背景或遮罩 |
| 什么时候会失效 | 背景视图要可以重复绘制、没有副作用 | 祖先元素有 `filter`、`opacity` 小于 1、`mask` 等，卡片就看不到页面，见下文 |
| 阴影数值 | `.shadow(radius: r)` | 要看起来一样，用 `blur = 2 × r`，透明度 × 1.4 |
| 运行环境 | macOS 14 及以上 | 支持 `backdrop-filter` 和 `color-mix()` 的浏览器，目前只在 Chrome 测过 |
| 演示 | 单卡材质，加上可以展开、选择、拖动的 Layered 和 Ring | 单卡材质（可换颜色、调模糊），加一个静态的 Layered；没有 Ring，叠卡不能展开、选择或拖动 |
| 测试 | 四个渲染和数值测试 | 只有类型检查 |

材质本身一致：颜色、饱和度、模糊和白边都相同。和 SwiftUI 在同一尺寸下的渲染对比，卡片内的像素大约只差 3/255。

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
