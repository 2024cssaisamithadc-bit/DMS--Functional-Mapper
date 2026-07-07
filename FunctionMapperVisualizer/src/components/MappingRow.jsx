// ─── MappingRow Component ─────────────────────────────────────────────────────
// Displays one row in the input→output mapping table for a single function

import React from "react";
import safeEval from "../utils/safeEval";

function MappingRow({ mapping, index, inputVals, onRemove }) {
  const { label, fn, expr, color } = mapping;

  // Compute output for each sample input
  const outputs = inputVals.map((x) => {
    const y = fn ? fn(x) : safeEval(expr, x);
    return y !== null ? +y.toFixed(4) : "—";
  });

  return (
    <div
      className="map-row"
      style={{ borderLeft: `3px solid ${color}` }}
    >
      {/* Function name */}
      <span className="map-name" style={{ color }}>
        {label}
      </span>

      {/* Input → Output chips */}
      {inputVals.map((x, i) => (
        <div className="map-chip" key={i}>
          <span className="chip-input">{x}→</span>
          <span style={{ color }}>{outputs[i]}</span>
        </div>
      ))}

      {/* Remove button */}
      <button
        className="remove-btn"
        onClick={() => onRemove(index)}
        title="Remove function"
      >
        ✕
      </button>
    </div>
  );
}

export default MappingRow;
