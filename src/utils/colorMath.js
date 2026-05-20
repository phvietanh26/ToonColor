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

// Fixed weights — hue perception is handled by effectiveHueDelta, not weight scaling
const WEIGHTS = {
  hue:        0.5,
  saturation: 0.2,
  brightness: 0.3,
};

// "Perfect match" thresholds — returns 10.00 immediately
const PERFECT = {
  hueDelta: 3,  // degrees
  satDelta: 5,  // 0–100
  brDelta:  5,  // 0–100
};

// Lower = more forgiving decay curve (1.8 feels satisfying without being trivial)
const CURVE_STEEPNESS = 1.8;

// ─────────────────────────────────────────────────────────────────────────────

/**
 * Calculate score (0–10) — perception-based, gameplay-satisfying.
 *
 * Key ideas:
 *  1. Circular hue distance (handles 359° vs 1° wrap-around).
 *  2. Perceptual hue scaling: hueDelta is multiplied by hueVisibility so that
 *     pastel / grey / dark colours forgive large Hue differences that eyes can't see.
 *     sqrt() keeps mid-tone hue relevant instead of vanishing too early.
 *  3. Fixed weights — no double-scaling. Perception is already baked into effectiveHueDelta.
 *  4. Soft error forgiveness: raise weightedError to power < 1 to lift mid-range scores.
 *  5. Exponential curve with low steepness → near-perfect colours score 9+.
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

  // Hue visibility: how much hue actually registers to the human eye.
  // sqrt() prevents hue from disappearing too fast at mid-tone colours.
  // Near-black or near-white → hueVisibility → 0 → Hue errors forgiven.
  const bNorm = answerHSB.b / 100;
  const sNorm = answerHSB.s / 100;
  const hueVisibility = Math.sqrt(bNorm * sNorm);

  // Scale raw hueDelta by visibility — vivid = strict, pastel/dark/grey = forgiving
  const effectiveHueDelta = hueDelta * hueVisibility;

  // Normalise deltas to 0–1
  const hueNorm = effectiveHueDelta / 180;
  const satNorm = satDelta / 100;
  const brNorm  = brDelta  / 100;

  // Weighted error using fixed weights
  const weightedError = hueNorm * WEIGHTS.hue + satNorm * WEIGHTS.saturation + brNorm * WEIGHTS.brightness;

  // Soft forgiveness: compress error slightly so mid-range scores feel fair
  const softenedError = Math.pow(weightedError, 0.85);

  // Exponential curve → satisfying drop-off matching human perception
  const raw = 10 * Math.exp(-softenedError * CURVE_STEEPNESS);

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