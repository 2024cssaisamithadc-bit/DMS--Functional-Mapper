// ─── Canvas Drawing Utility ───────────────────────────────────────────────────
// Draws grid, axes, labels and all function curves on the HTML5 Canvas

import safeEval from "./safeEval";

function drawCanvas(canvas, mappings, xMin, xMax, yMin, yMax) {
  const ctx = canvas.getContext("2d");
  const W = canvas.width;
  const H = canvas.height;

  const toCanvasX = (x) => ((x - xMin) / (xMax - xMin)) * W;
  const toCanvasY = (y) => H - ((y - yMin) / (yMax - yMin)) * H;

  // Background
  ctx.clearRect(0, 0, W, H);
  ctx.fillStyle = "#0a0d14";
  ctx.fillRect(0, 0, W, H);

  // Grid lines
  ctx.strokeStyle = "#1a2035";
  ctx.lineWidth = 1;
  for (let gx = Math.ceil(xMin); gx <= xMax; gx++) {
    const cx = toCanvasX(gx);
    ctx.beginPath();
    ctx.moveTo(cx, 0);
    ctx.lineTo(cx, H);
    ctx.stroke();
  }
  for (let gy = Math.ceil(yMin); gy <= yMax; gy++) {
    const cy = toCanvasY(gy);
    ctx.beginPath();
    ctx.moveTo(0, cy);
    ctx.lineTo(W, cy);
    ctx.stroke();
  }

  // X and Y Axes
  ctx.strokeStyle = "#2a3a60";
  ctx.lineWidth = 2;
  const ax0 = toCanvasX(0);
  const ay0 = toCanvasY(0);
  if (ax0 >= 0 && ax0 <= W) {
    ctx.beginPath(); ctx.moveTo(ax0, 0); ctx.lineTo(ax0, H); ctx.stroke();
  }
  if (ay0 >= 0 && ay0 <= H) {
    ctx.beginPath(); ctx.moveTo(0, ay0); ctx.lineTo(W, ay0); ctx.stroke();
  }

  // Axis number labels
  ctx.fillStyle = "#5a6a90";
  ctx.font = "11px 'Courier New'";
  ctx.textAlign = "center";
  for (let gx = Math.ceil(xMin); gx <= xMax; gx++) {
    if (gx === 0) continue;
    ctx.fillText(gx, toCanvasX(gx), Math.min(ay0 + 16, H - 6));
  }
  ctx.textAlign = "right";
  for (let gy = Math.ceil(yMin); gy <= yMax; gy++) {
    if (gy === 0) continue;
    ctx.fillText(gy, Math.max(ax0 - 6, 30), toCanvasY(gy) + 4);
  }

  // Draw each function curve
  const steps = W * 2;
  mappings.forEach(({ fn, color, expr }) => {
    ctx.strokeStyle = color;
    ctx.lineWidth = 2.5;
    ctx.shadowColor = color;
    ctx.shadowBlur = 6;
    ctx.beginPath();
    let penDown = false;

    for (let i = 0; i <= steps; i++) {
      const x = xMin + (i / steps) * (xMax - xMin);
      const y = fn ? fn(x) : safeEval(expr, x);
      if (y === null || y < yMin || y > yMax) {
        penDown = false;
        continue;
      }
      const cx = toCanvasX(x);
      const cy = toCanvasY(y);
      if (!penDown) { ctx.moveTo(cx, cy); penDown = true; }
      else ctx.lineTo(cx, cy);
    }
    ctx.stroke();
    ctx.shadowBlur = 0;
  });
}

export default drawCanvas;
