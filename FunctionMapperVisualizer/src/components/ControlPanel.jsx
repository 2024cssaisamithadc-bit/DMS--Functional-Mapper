// ─── ControlPanel Component ───────────────────────────────────────────────────
// Left sidebar with preset selector, custom expression, viewport and sample inputs

import React, { useState } from "react";
import PRESETS from "../utils/presets";
import safeEval from "../utils/safeEval";

function ControlPanel({ onAddMapping, onViewportChange, onInputsChange, viewport, inputStr }) {
  const [selectedPreset, setSelectedPreset] = useState("Linear f(x) = 2x + 1");
  const [customExpr, setCustomExpr]         = useState("sin(x)*x");
  const [customColor, setCustomColor]       = useState("#ff4da6");
  const [customErr, setCustomErr]           = useState("");
  const [localInputStr, setLocalInputStr]   = useState(inputStr);

  // ── Add preset function ──────────────────────────────────────────────────
  const handleAddPreset = () => {
    const preset = PRESETS[selectedPreset];
    if (!preset) return;
    onAddMapping({
      label: selectedPreset,
      fn: preset.fn,
      expr: null,
      color: preset.color,
    });
  };

  // ── Add custom expression ────────────────────────────────────────────────
  const handleAddCustom = () => {
    setCustomErr("");
    if (!customExpr.trim()) {
      setCustomErr("Please type an expression first.");
      return;
    }
    const test = safeEval(customExpr, 1);
    if (test === null) {
      setCustomErr("Invalid expression. Try: sin(x)*x  or  x**2  or  x**3-3*x");
      return;
    }
    onAddMapping({
      label: `f(x) = ${customExpr}`,
      fn: null,
      expr: customExpr,
      color: customColor,
    });
  };

  // ── Apply sample inputs ──────────────────────────────────────────────────
  const handleApplyInputs = () => {
    const vals = localInputStr
      .split(",")
      .map((s) => parseFloat(s.trim()))
      .filter((n) => !isNaN(n));
    onInputsChange(vals);
  };

  return (
    <div className="panel">

      {/* Preset Functions */}
      <div>
        <div className="panel-label">Add Preset Function</div>
        <select
          className="input-field"
          value={selectedPreset}
          onChange={(e) => setSelectedPreset(e.target.value)}
        >
          {Object.keys(PRESETS).map((key) => (
            <option key={key} value={key}>{key}</option>
          ))}
        </select>
        <button className="btn btn-cyan" onClick={handleAddPreset}>
          + Add Preset
        </button>
      </div>

      <div className="panel-divider" />

      {/* Custom Expression */}
      <div>
        <div className="panel-label">Custom Expression</div>
        <input
          type="text"
          className="input-field"
          value={customExpr}
          placeholder="e.g. sin(x)*x  or  x**3-3*x"
          onChange={(e) => { setCustomExpr(e.target.value); setCustomErr(""); }}
        />
        {customErr && <div className="error-text">{customErr}</div>}
        <div className="hint-text">
          Supports: sin, cos, sqrt, abs, log, exp, pow, PI
        </div>
        <div className="hint-text">
          Power → x**2 &nbsp;|&nbsp; Multiply → 2*x
        </div>
        <div className="color-row">
          <input
            type="color"
            value={customColor}
            onChange={(e) => setCustomColor(e.target.value)}
            title="Pick curve color"
          />
          <button className="btn btn-purple" onClick={handleAddCustom}>
            + Add Custom
          </button>
        </div>
      </div>

      <div className="panel-divider" />

      {/* Viewport Range */}
      <div>
        <div className="panel-label">Viewport Range</div>
        <div className="viewport-grid">
          {[
            ["X min", "xMin"], ["X max", "xMax"],
            ["Y min", "yMin"], ["Y max", "yMax"],
          ].map(([label, key]) => (
            <div className="viewport-item" key={key}>
              <label>{label}</label>
              <input
                type="number"
                className="input-field"
                value={viewport[key]}
                onChange={(e) =>
                  onViewportChange({ ...viewport, [key]: Number(e.target.value) })
                }
              />
            </div>
          ))}
        </div>
      </div>

      <div className="panel-divider" />

      {/* Sample Inputs */}
      <div>
        <div className="panel-label">Sample Inputs (comma-separated)</div>
        <input
          type="text"
          className="input-field"
          value={localInputStr}
          placeholder="-2,-1,0,1,2"
          onChange={(e) => setLocalInputStr(e.target.value)}
        />
        <button className="btn btn-green" onClick={handleApplyInputs}>
          Apply Inputs
        </button>
      </div>

    </div>
  );
}

export default ControlPanel;
