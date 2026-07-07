// ─── Preset Functions ─────────────────────────────────────────────────────────
// Each preset has a label, a JS function, and a display color

const PRESETS = {
  "Linear f(x) = 2x + 1":     { fn: (x) => 2 * x + 1,              color: "#00e5ff" },
  "Quadratic f(x) = x²":      { fn: (x) => x * x,                   color: "#39ff14" },
  "Cubic f(x) = x³":          { fn: (x) => x * x * x,               color: "#b347ff" },
  "Abs f(x) = |x|":           { fn: (x) => Math.abs(x),             color: "#ff6b35" },
  "Square Root f(x) = √|x|":  { fn: (x) => Math.sqrt(Math.abs(x)), color: "#ff4da6" },
  "Sine f(x) = sin(x)":       { fn: (x) => Math.sin(x),             color: "#ffd700" },
  "Cosine f(x) = cos(x)":     { fn: (x) => Math.cos(x),             color: "#00ffaa" },
};

export default PRESETS;
