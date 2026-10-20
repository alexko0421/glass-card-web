/** The card tint and its recommended foreground color. */
export interface GlassSwatch {
  tint: string;
  ink: string;
  /** 0–1. Defaults to 0.58. */
  opacity?: number;
}

export const swatches = {
  blue: { tint: "#3769f5", ink: "#18428e", opacity: 0.58 },
  rose: { tint: "#ee556d", ink: "#881d2d", opacity: 0.58 },
  violet: { tint: "#9b38ec", ink: "#4a1478", opacity: 0.58 },
  mint: { tint: "#68bd81", ink: "#1f5e33", opacity: 0.58 },
  lemon: { tint: "#f2f766", ink: "#5a5e12", opacity: 0.58 },
  orange: { tint: "#f5963c", ink: "#7a3e0a", opacity: 0.58 },
  teal: { tint: "#2ec2c4", ink: "#0b5557", opacity: 0.58 },
  graphite: { tint: "#3a3f4a", ink: "#15181e", opacity: 0.58 },
  pearl: { tint: "#ffffff", ink: "#484848", opacity: 0.45 },
} as const satisfies Record<string, Required<GlassSwatch>>;

export type SwatchName = keyof typeof swatches;

export const swatchNames = Object.keys(swatches) as SwatchName[];

export interface GlassCardOptions {
  /** A custom swatch. Preset names go in `data-swatch` instead. */
  swatch?: GlassSwatch;
  /** Blur radius in px. */
  blur?: number;
  /** Corner radius in px. */
  radius?: number;
}

/** CSS custom properties for a `.glass-card`. Only the options you pass are set. */
export function glassCardVars({ swatch, blur, radius }: GlassCardOptions): Record<string, string> {
  const vars: Record<string, string> = {};
  if (swatch) {
    vars["--glass-tint"] = swatch.tint;
    vars["--glass-ink"] = swatch.ink;
    vars["--glass-opacity"] = String(Math.min(1, Math.max(0, swatch.opacity ?? 0.58)));
  }
  if (blur !== undefined) vars["--glass-blur"] = `${Math.max(0, blur)}px`;
  if (radius !== undefined) vars["--glass-radius"] = `${Math.max(0, radius)}px`;
  return vars;
}
