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

/**
 * Calculate score (0-10) based on HSB delta
 * Hue: circular distance (max 180), weight 0.5
 * Saturation: linear (max 100), weight 0.25
 * Brightness: linear (max 100), weight 0.25
 */
export function calculateScore(playerHSB, answerHSB) {
  const hueDelta = Math.min(
    Math.abs(playerHSB.h - answerHSB.h),
    360 - Math.abs(playerHSB.h - answerHSB.h)
  );
  const satDelta = Math.abs(playerHSB.s - answerHSB.s);
  const brDelta = Math.abs(playerHSB.b - answerHSB.b);

  // Normalize each delta to 0–1
  const hueNorm = hueDelta / 180;
  const satNorm = satDelta / 100;
  const brNorm = brDelta / 100;

  // Weighted error
  const weightedError = hueNorm * 0.5 + satNorm * 0.25 + brNorm * 0.25;

  // Score from 0 to 10, curved so very close = high score
  const score = Math.max(0, 10 * (1 - weightedError * 1.5));
  return Math.round(score * 100) / 100;
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