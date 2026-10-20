import { StrictMode, useState, type CSSProperties } from "react";
import { createRoot } from "react-dom/client";
import { GlassCard, swatchNames, swatches, type SwatchName } from "../src/react";
import "../src/style.css";
import { ICONS } from "./icons";
import "./demo.css";

function Icon({ name, size = 24 }: { name: string; size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
      {ICONS[name].map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}

function Dots() {
  return (
    <span className="dots" aria-hidden="true">
      <i />
      <i />
      <i />
    </span>
  );
}

function Slider(props: {
  label: string;
  value: number;
  min: number;
  max: number;
  unit?: string;
  onChange: (v: number) => void;
}) {
  const pct = ((props.value - props.min) / (props.max - props.min)) * 100;
  return (
    <label className="slider" style={{ "--pct": `${pct}%` } as CSSProperties}>
      <span className="slider-label">{props.label}</span>
      <span className="slider-value">
        {props.value}
        {props.unit}
      </span>
      <input
        type="range"
        min={props.min}
        max={props.max}
        value={props.value}
        onChange={(e) => props.onChange(Number(e.target.value))}
      />
    </label>
  );
}

// The SwiftUI demo's Layered layout: poses relative to the pile center, drawn bottom to top.
const PILE: { swatch: SwatchName; title: string; subtitle: string; icon: string; x: number; y: number; r: number }[] = [
  { swatch: "blue", title: "New directions", subtitle: "Today, 3:00 PM", icon: "navigation", x: -210, y: -107, r: -8 },
  { swatch: "rose", title: "Make something", subtitle: "Tomorrow", icon: "flag", x: 0, y: -120, r: -2 },
  { swatch: "violet", title: "Keep an idea", subtitle: "Saved for later", icon: "message-circle", x: 201, y: 113, r: 5 },
  { swatch: "mint", title: "A little fresh air", subtitle: "This afternoon", icon: "calendar", x: -193, y: -8, r: -6 },
  { swatch: "lemon", title: "Let the light in", subtitle: "Every morning", icon: "sun", x: 16, y: -8, r: 1 },
  { swatch: "orange", title: "Try something new", subtitle: "This weekend", icon: "flag", x: 224, y: 8, r: 6 },
  { swatch: "teal", title: "Go somewhere", subtitle: "Sunday, 10:00 AM", icon: "navigation", x: -220, y: 103, r: -8 },
  { swatch: "graphite", title: "Make some room", subtitle: "Whenever you need", icon: "file-text", x: -10, y: 96, r: -1 },
  { swatch: "pearl", title: "A blank page", subtitle: "A fresh start", icon: "file-text", x: 210, y: -100, r: 6 },
];
const PILE_ORDER = [6, 7, 2, 3, 4, 5, 0, 1, 8];

function App() {
  const [swatch, setSwatch] = useState<SwatchName>("rose");
  const [blur, setBlur] = useState(7);

  return (
    <main className="page">
      <header className="intro">
        <h1>Glass Card</h1>
        <p>Frosted color, softly layered. It blurs whatever is behind it.</p>
      </header>

      <section className="stage" aria-label="Demo">
        <div className="stage-center">
          <div className="scene" aria-hidden="true">
            <div className="layer layer--blue" />
            <div className="layer layer--rose" />
            <span className="underneath">A thought underneath</span>
          </div>

          <GlassCard swatch={swatch} blur={blur} className="demo-card">
            <div className="card-top">
              <Icon name="navigation" />
              <Dots />
            </div>
            <span className="card-subtitle">A little clarity</span>
            <span className="card-title">Room for a new idea</span>
          </GlassCard>
        </div>

        <div className="chrome chrome--bottom glass" aria-label="Controls">
          <div className="swatches" role="radiogroup" aria-label="Color">
            {swatchNames.map((name) => (
              <button
                key={name}
                role="radio"
                aria-checked={swatch === name}
                aria-label={name}
                style={{ "--dot": swatches[name].tint } as CSSProperties}
                onClick={() => setSwatch(name)}
              />
            ))}
          </div>
          <Slider label="Blur" value={blur} min={0} max={20} unit="px" onChange={setBlur} />
        </div>
      </section>

      <header className="intro intro--section">
        <h2>Layered</h2>
        <p>Each card blurs the cards below it, tint and all.</p>
      </header>
      <section className="stage stage--pile" aria-label="Overlapping cards">
        <div className="pile">
          {PILE_ORDER.map((index) => {
            const card = PILE[index];
            return (
              <GlassCard
                key={card.title}
                swatch={card.swatch}
                blur={blur}
                className="pile-card"
                style={{ transform: `translate(${card.x}px, ${card.y}px) rotate(${card.r}deg)` }}
              >
                <div className="card-top">
                  <Icon name={card.icon} size={22} />
                  <Dots />
                </div>
                <span className="card-subtitle">{card.subtitle}</span>
                <span className="card-title">{card.title}</span>
              </GlassCard>
            );
          })}
        </div>
      </section>
    </main>
  );
}

createRoot(document.getElementById("app")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
