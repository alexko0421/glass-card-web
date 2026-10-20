# Glass Card for the web

English | [简体中文](README.zh-CN.md)

Frosted color, softly layered. A tinted glass card that blurs whatever is behind it.

**[Try the demo →](https://alexko0421.github.io/glass-card-web/)**

This is the web version of [Glass Card](https://github.com/alexko0421/glass-card), the SwiftUI package. The SwiftUI version has to redraw a backdrop you supply. On the web, `backdrop-filter` samples the real page, so there is no backdrop to pass in, and overlapping cards blur each other properly, tint and all.

- One CSS file. Works with plain HTML or any framework.
- Optional React component on top.
- The same nine colors as the SwiftUI version, plus custom tints.

Not on npm yet. Copy `src/style.css` (and `src/react/` if you use React), or clone the repo and run `npm run build`.

## Plain HTML

```html
<link rel="stylesheet" href="style.css" />

<div class="glass-card" data-swatch="rose" style="width: 300px; height: 160px">
  Room for a new idea
</div>
```

Presets: `blue`, `rose`, `violet`, `mint`, `lemon`, `orange`, `teal`, `graphite`, `pearl`. Most use 58% tint; pearl uses 45%.

Everything else is a CSS custom property:

| Property | Default | |
| --- | --- | --- |
| `--glass-tint` | `#3769f5` | Tint color |
| `--glass-ink` | `#18428e` | Text color |
| `--glass-opacity` | `0.58` | Tint opacity, 0–1 |
| `--glass-blur` | `7px` | Blur radius |
| `--glass-radius` | `20px` | Corner radius |

## React

```tsx
import { GlassCard } from "glass-card/react";
import "glass-card/style.css";

<GlassCard swatch="rose" blur={7} style={{ width: 300, height: 160 }}>
  Room for a new idea
</GlassCard>

<GlassCard swatch={{ tint: "#7c3aed", ink: "#ffffff", opacity: 0.4 }}>…</GlassCard>
```

`GlassCard` renders a `div` and passes other props through. `swatch` takes a preset name or `{ tint, ink, opacity }`.

## How it differs from the SwiftUI version

| | SwiftUI ([glass-card](https://github.com/alexko0421/glass-card)) | Web (this repo) |
| --- | --- | --- |
| What gets blurred | A backdrop view you pass in, redrawn behind the card | The real page behind the card, via `backdrop-filter` |
| Overlapping cards | The demo redraws lower cards flat (white plus tint), so it approximates layered glass | Each card blurs the full material of the cards below it |
| API | `GlassCard`, plus `GlassCardMaterial` for a custom backdrop and mask | `.glass-card` class and `<GlassCard>`. No backdrop or mask to pass |
| When the blur fails | Backdrop views must be repeatable and free of side effects | An ancestor with `filter`, `opacity` below 1, `mask` and so on cuts the card off from the page. See below |
| Shadow numbers | `.shadow(radius: r)` | Use `blur = 2 × r` and opacity × 1.4 to look the same |
| Runs on | macOS 14+ | Browsers with `backdrop-filter` and `color-mix()`. Checked in Chrome only so far |
| Demo | Material, plus Layered and Ring stacks you can expand, select and drag | Material with color and blur controls, plus a static Layered stack. No Ring; the stack can't be expanded, selected or dragged |
| Tests | Four rendering and value tests | Type checking only |

The material itself matches: same colors, saturation, blur and rim. Measured against the SwiftUI render at the same size, pixels inside the card differ by about 3 out of 255.

## Shadows

The card has no shadow, like the SwiftUI version. Add a normal `box-shadow`. To match a SwiftUI `.shadow(color: .black.opacity(a), radius: r, y: y)`, use `0 y (2 × r) rgb(0 0 0 / (1.4 × a))`. That conversion comes from measuring both renders, not from documentation. The demo uses `0 10px 40px rgb(0 0 0 / 0.14)`.

## When the blur disappears

`backdrop-filter` only sees as far as the nearest ancestor with `filter`, `opacity` below 1, `mask`, `clip-path`, `mix-blend-mode` or its own `backdrop-filter`. Everything outside that ancestor is invisible to the card, so the card looks flat. Keep those properties off the card's ancestors.

Content is clipped to the rounded corners (`overflow: hidden`).

## Development

```sh
npm install
npm run dev        # demo
npm run typecheck
npm run build
```

## Credits and license

The visual inspiration is sam ([@artntek](https://x.com/artntek)) and [Event Stack Shifting](https://x.com/artntek/status/2100247096993485129). No original video or artwork is bundled.

[MIT](LICENSE), copyright 2026 Chunlong Ko. The demo includes six [Tabler Icons](https://tabler.io/icons) filled SVGs, version 3.46.0, under their MIT license ([THIRD_PARTY_NOTICES.txt](THIRD_PARTY_NOTICES.txt)).
