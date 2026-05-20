/**
 * Convert HSB (Hue 0-360, Saturation 0-100, Brightness 0-100) to RGB hex
 */
export function hsbToHex(h, s, b) {
  const S = s / 100;
  const V = b / 100;
  const H = h / 60;

  const i = Math.floor(H);
  const f = H - i;
  const p = V * (1 - S);
  const q = V * (1 - S * f);
  const t = V * (1 - S * (1 - f));

  let r, g, bv;
  switch (i % 6) {
    case 0: r = V; g = t; bv = p; break;
    case 1: r = q; g = V; bv = p; break;
    case 2: r = p; g = V; bv = t; break;
    case 3: r = p; g = q; bv = V; break;
    case 4: r = t; g = p; bv = V; break;
    case 5: r = V; g = p; bv = q; break;
    default: r = 0; g = 0; bv = 0;
  }

  const toHex = (x) => Math.round(x * 255).toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(bv)}`;
}

// ─── Base weights (used when colour is fully vivid) ───────────────────────────
const BASE_WEIGHTS = {
  hue:        0.5,
  saturation: 0.2,
  brightness: 0.3,
};

// "Perfect match" thresholds — returns 10.00 immediately
const PERFECT = {
  hueDelta: 3,   // degrees
  satDelta: 5,   // 0-100
  brDelta:  5,   // 0-100
};

// Exponential curve steepness — increase to punish errors harder
const CURVE_STEEPNESS = 3.5;
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Compute perception-based dynamic weights for H, S, B.
 *
 * Core insight:
 *  - When a colour is very dark (low B), it looks nearly black regardless of H or S.
 *    → Hue & Saturation become irrelevant; only Brightness matters.
 *  - When a colour is nearly white (high B + low S), Hue is again invisible.
 *    → Reduce Hue weight proportionally.
 *  - We quantify "hue visibility" as how much colour actually shows through,
 *    then scale the base Hue weight by that visibility factor.
 *  - Weights are always renormalised so they sum to exactly 1.
 *
 * @param {object} answerHSB - The target colour {h, s, b}
 * @returns {{ hue, saturation, brightness }} — weights that sum to 1
 */
function computeDynamicWeights(answerHSB) {
  const bNorm = answerHSB.b / 100; // 0 = black, 1 = full bright
  const sNorm = answerHSB.s / 100; // 0 = grey/white, 1 = fully saturated

  // "Hue visibility" — how much the hue actually shows to the human eye.
  // Near-black (low B): hue is invisible regardless of S.
  // Near-white (high B, low S): hue is also invisible.
  // Peak visibility when both B and S are high.
  const hueVisibility = bNorm * sNorm; // 0 → 1

  // Scale the base hue weight by visibility
  const scaledHue = BASE_WEIGHTS.hue * hueVisibility;

  // Redistribute the "lost" hue weight into brightness (more critical in dark colours)
  // and saturation (more critical in near-white colours).
  const lostWeight = BASE_WEIGHTS.hue - scaledHue;

  // When dark: all lost weight goes to brightness.
  // When near-white (bright + desaturated): split lost weight toward saturation.
  const darknessContribution  = 1 - bNorm;                     // 1 when black
  const whitenessContribution = bNorm * (1 - sNorm);           // 1 when white
  const total = darknessContribution + whitenessContribution || 1;

  const toBrightness  = lostWeight * (darknessContribution / total);
  const toSaturation  = lostWeight * (whitenessContribution / total);

  const w = {
    hue:        scaledHue,
    saturation: BASE_WEIGHTS.saturation + toSaturation,
    brightness: BASE_WEIGHTS.brightness + toBrightness,
  };

  // Normalise so weights always sum to exactly 1
  const sum = w.hue + w.saturation + w.brightness;
  return {
    hue:        w.hue        / sum,
    saturation: w.saturation / sum,
    brightness: w.brightness / sum,
  };
}

/**
 * Calculate score (0–10) based on perceptual HSB delta.
 *
 * Scoring strategy:
 *  1. Circular hue distance (handles 359° vs 1° correctly).
 *  2. Dynamic weights via computeDynamicWeights() — hue weight shrinks when
 *     the colour is nearly black or nearly white, matching human perception.
 *  3. Exponential curve:  score = 10 * exp(-weightedError * CURVE_STEEPNESS)
 *     → very close colours  →  8.5–10
 *     → slight mismatches   →  5–7
 *     → large mismatches    →  < 3
 *  4. PERFECT bonus: all deltas within tight thresholds → 10.00
 */
export function calculateScore(playerHSB, answerHSB) {
  const hueDelta = Math.min(
    Math.abs(playerHSB.h - answerHSB.h),
    360 - Math.abs(playerHSB.h - answerHSB.h)
  );
  const satDelta = Math.abs(playerHSB.s - answerHSB.s);
  const brDelta  = Math.abs(playerHSB.b - answerHSB.b);

  // Perfect match shortcut
  if (hueDelta < PERFECT.hueDelta && satDelta < PERFECT.satDelta && brDelta < PERFECT.brDelta) {
    return 10;
  }

  // Hue visibility: how much the hue actually registers to the human eye.
  // Near-black (low B) or near-white (high B + low S) → hue is nearly invisible.
  // We scale hueDelta DOWN so pastel/grey/dark colours are forgiving on Hue.
  const bNorm = answerHSB.b / 100;
  const sNorm = answerHSB.s / 100;
  const hueVisibility = bNorm * sNorm; // 0 (invisible) → 1 (fully vivid)

  // effectiveHueDelta shrinks when colour is dark, pastel, or desaturated.
  // A 40° shift in a grey-blue barely shows; in a vivid red it's glaring.
  const effectiveHueDelta = hueDelta * hueVisibility;

  // Normalise deltas to 0–1
  const hueNorm = effectiveHueDelta / 180;
  const satNorm = satDelta / 100;
  const brNorm  = brDelta  / 100;

  // Get perception-aware weights based on the answer colour
  const w = computeDynamicWeights(answerHSB);

  // Weighted error using dynamic weights
  const weightedError = hueNorm * w.hue + satNorm * w.saturation + brNorm * w.brightness;

  // Exponential curve for perceptually natural score drop-off
  const raw = 10 * Math.exp(-weightedError * CURVE_STEEPNESS);

  return Math.round(Math.max(0, Math.min(10, raw)) * 100) / 100;
}

/**
 * Get score feedback label
 */
export function getScoreBand(total) {
  if (total >= 41) return { label: "Xuất sắc! 🏆", color: "#2ECC71" };
  if (total >= 26) return { label: "Khá giỏi! 🎨", color: "#4255FF" };
  if (total >= 11) return { label: "Bạn đang cải thiện 💪", color: "#F5A623" };
  return { label: "Thử lại nhé! 🎯", color: "#E53E3E" };
}

/**
 * Get Saturation slider gradient (gray → current hue at full sat/brightness)
 */
export function getSatGradient(h) {
  const fullColor = hsbToHex(h, 100, 100);
  return `linear-gradient(to right, #b0b0b0, ${fullColor})`;
}

/**
 * Get Brightness slider gradient (black → current hue full bright)
 */
export function getBrGradient(h, s) {
  const fullColor = hsbToHex(h, s, 100);
  return `linear-gradient(to right, #000000, ${fullColor})`;
}