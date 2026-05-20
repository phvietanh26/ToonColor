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

// ─── Scoring config ───────────────────────────────────────────────────────────
const WEIGHTS = {
  hue:        0.5,   // hue is most perceptually significant
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
 * Calculate score (0–10) based on perceptual HSB delta.
 *
 * Scoring strategy:
 *  - Circular hue distance to handle wrap-around (e.g. 359° vs 1°)
 *  - Weighted error combining H, S, B deltas (each normalised to 0–1)
 *  - Exponential curve:  score = 10 * exp(-weightedError * CURVE_STEEPNESS)
 *    → very close colours score 8.5–10
 *    → slight mismatches score ~5–7
 *    → large mismatches score < 3
 *  - PERFECT bonus: if all deltas are within tight thresholds → 10.00
 */
export function calculateScore(playerHSB, answerHSB) {
  const hueDelta = Math.min(
    Math.abs(playerHSB.h - answerHSB.h),
    360 - Math.abs(playerHSB.h - answerHSB.h)
  );
  const satDelta = Math.abs(playerHSB.s - answerHSB.s);
  const brDelta  = Math.abs(playerHSB.b - answerHSB.b);

  // Perfect match bonus
  if (hueDelta < PERFECT.hueDelta && satDelta < PERFECT.satDelta && brDelta < PERFECT.brDelta) {
    return 10;
  }

  // Normalise each delta to 0–1
  const hueNorm = hueDelta / 180;
  const satNorm = satDelta / 100;
  const brNorm  = brDelta  / 100;

  // Weighted error (0–1 scale)
  const weightedError =
    hueNorm * WEIGHTS.hue +
    satNorm * WEIGHTS.saturation +
    brNorm  * WEIGHTS.brightness;

  // Exponential curve — perceptually natural drop-off
  const raw = 10 * Math.exp(-weightedError * CURVE_STEEPNESS);

  // Clamp to 0–10 and round to 2 decimal places
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