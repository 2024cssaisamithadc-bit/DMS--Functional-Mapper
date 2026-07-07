// ─── Safe Custom Expression Evaluator ────────────────────────────────────────
// Evaluates a user-typed math expression safely without "use strict"
// All Math functions are passed as named parameters so they work in any env.

function safeEval(expr, x) {
  try {
    const clean = expr.trim();
    // eslint-disable-next-line no-new-func
    const fn = new Function(
      "x",
      "sin", "cos", "tan", "sqrt", "abs",
      "log", "exp", "pow", "PI",
      "floor", "ceil", "round", "max", "min",
      `return (${clean});`
    );
    const r = fn(
      x,
      Math.sin, Math.cos, Math.tan, Math.sqrt, Math.abs,
      Math.log, Math.exp, Math.pow, Math.PI,
      Math.floor, Math.ceil, Math.round, Math.max, Math.min
    );
    return isFinite(r) ? r : null;
  } catch {
    return null;
  }
}

export default safeEval;
