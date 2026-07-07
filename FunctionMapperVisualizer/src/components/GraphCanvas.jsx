// ─── GraphCanvas Component ────────────────────────────────────────────────────
// Renders the HTML5 Canvas graph with grid, axes and all function curves

import React, { useRef, useEffect, useState, useCallback } from "react";
import drawCanvas from "../utils/drawCanvas";

function GraphCanvas({ mappings, viewport }) {
  const canvasRef = useRef(null);
  const [hoverPt, setHoverPt]   = useState(null);
  const { xMin, xMax, yMin, yMax } = viewport;

  // Redraw whenever mappings or viewport change
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    drawCanvas(canvas, mappings, xMin, xMax, yMin, yMax);
  }, [mappings, xMin, xMax, yMin, yMax]);

  // Hover: convert pixel coords to math coords
  const handleMouseMove = useCallback((e) => {
    const canvas = canvasRef.current;
    const rect   = canvas.getBoundingClientRect();
    const scaleX = canvas.width  / rect.width;
    const scaleY = canvas.height / rect.height;
    const px = (e.clientX - rect.left) * scaleX;
    const py = (e.clientY - rect.top)  * scaleY;
    const x  = xMin + (px / canvas.width)  * (xMax - xMin);
    const y  = yMax - (py / canvas.height) * (yMax - yMin);
    setHoverPt({ x: +x.toFixed(3), y: +y.toFixed(3) });
  }, [xMin, xMax, yMin, yMax]);

  return (
    <div className="canvas-wrap">
      <canvas
        ref={canvasRef}
        width={700}
        height={360}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHoverPt(null)}
      />

      {/* Legend */}
      <div className="legend">
        {mappings.map((m, i) => (
          <div className="legend-item" key={i}>
            <div
              className="legend-line"
              style={{
                background: m.color,
                boxShadow: `0 0 5px ${m.color}`,
              }}
            />
            <span className="legend-text" style={{ color: m.color }}>
              {m.label}
            </span>
          </div>
        ))}
      </div>

      {/* Hover coordinates */}
      {hoverPt && (
        <div className="hover-coords">
          x: {hoverPt.x} &nbsp; y: {hoverPt.y}
        </div>
      )}
    </div>
  );
}

export default GraphCanvas;
