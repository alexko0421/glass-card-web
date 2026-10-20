import { forwardRef, type CSSProperties, type HTMLAttributes } from "react";
import { glassCardVars, type GlassSwatch, type SwatchName } from "../index";

export interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  /** A preset name or a custom swatch. */
  swatch?: SwatchName | GlassSwatch;
  /** Blur radius in px. */
  blur?: number;
  /** Corner radius in px. */
  radius?: number;
}

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(function GlassCard(
  { swatch = "blue", blur, radius, className, style, ...rest },
  ref,
) {
  const preset = typeof swatch === "string" ? swatch : undefined;
  const vars = glassCardVars({ swatch: preset ? undefined : (swatch as GlassSwatch), blur, radius });

  return (
    <div
      ref={ref}
      {...rest}
      className={className ? `glass-card ${className}` : "glass-card"}
      data-swatch={preset}
      style={{ ...vars, ...style } as CSSProperties}
    />
  );
});
