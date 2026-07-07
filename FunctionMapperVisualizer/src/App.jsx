// ─── App.jsx ──────────────────────────────────────────────────────────────────
// Main application component — wires together all parts

import React, { useState } from "react";
import ControlPanel  from "./components/ControlPanel";
import GraphCanvas   from "./components/GraphCanvas";
import MappingTable  from "./components/MappingTable";
import "./styles/App.css";

function App() {
  // Active function mappings list
  const [mappings, setMappings] = useState([
    {
      label: "Linear f(x) = 2x + 1",
      fn: (x) => 2 * x + 1,
      expr: null,
      color: "#00e5ff",
    },
  ]);

  // Graph viewport
  const [viewport, setViewport] = useState({
    xMin: -5, xMax: 5,
    yMin: -10, yMax: 10,
  });

  // Sample input values for mapping table
  const [inputVals, setInputVals] = useState([-2, -1, 0, 1, 2]);

  // Add a new function (preset or custom)
  const handleAddMapping = (newMapping) => {
    // Prevent duplicate labels
    if (mappings.find((m) => m.label === newMapping.label)) return;
    setMappings((prev) => [...prev, newMapping]);
  };

  // Remove a function by index
  const handleRemove = (index) => {
    setMappings((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="app">

      {/* ── Header ── */}
      <div className="header">
        <div className="header-logo">ƒ</div>
        <div>
          <div className="header-title">Function Mapper Visualizer</div>
          <div className="header-subtitle">
            Plot, compare &amp; trace mathematical functions interactively
          </div>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="main">

        {/* Left: Control Panel */}
        <ControlPanel
          onAddMapping={handleAddMapping}
          onViewportChange={setViewport}
          onInputsChange={setInputVals}
          viewport={viewport}
          inputStr="-2,-1,0,1,2"
        />

        {/* Right: Graph + Table */}
        <div className="right-side">
          <GraphCanvas
            mappings={mappings}
            viewport={viewport}
          />
          <MappingTable
            mappings={mappings}
            inputVals={inputVals}
            onRemove={handleRemove}
          />
        </div>

      </div>

      {/* ── Footer ── */}
      <div className="footer">
        <span>Function Mapper Visualizer · Mini Project · NIE Mysore</span>
        <span>
          {mappings.length} function{mappings.length !== 1 ? "s" : ""} active
          &nbsp;·&nbsp; hover canvas to read coordinates
        </span>
      </div>

    </div>
  );
}

export default App;
