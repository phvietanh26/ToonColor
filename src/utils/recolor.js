/**
 * Mask-based tint recoloring engine.
 *
 * Approach: "Luminance-preserving tint blend"
 *  1. Convert each masked pixel's RGB → HSL to extract luminance.
 *  2. Replace hue & saturation with the target HSB color (converted to HSL).
 *  3. Keep original luminance → preserves shadows, highlights, gradients.
 *  4. Blend strength is controlled by mask alpha (white=full, grey=partial, black=skip).
 *
 * This is much more visually accurate than raw RGB replacement
 * because lighting and texture information lives in the L channel.
 */

// ─── Color space helpers ──────────────────────────────────────────────────────

function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s;
  const l = (max + min) / 2;
  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      default: h = ((r - g) / d + 4) / 6;
    }
  }
  return [h, s, l];
}

function hslToRgb(h, s, l) {
  if (s === 0) {
    const v = Math.round(l * 255);
    return [v, v, v];
  }
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  const hue2rgb = (t) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };
  return [
    Math.round(hue2rgb(h + 1 / 3) * 255),
    Math.round(hue2rgb(h) * 255),
    Math.round(hue2rgb(h - 1 / 3) * 255),
  ];
}

/** HSB (0-360, 0-100, 0-100) → HSL (0-1, 0-1, 0-1) */
function hsbToHsl(h, s, b) {
  const S = s / 100;
  const V = b / 100;
  const l = V * (1 - S / 2);
  const sl = (l === 0 || l === 1) ? 0 : (V - l) / Math.min(l, 1 - l);
  return [h / 360, sl, l];
}

// ─── Cache for loaded ImageData ───────────────────────────────────────────────

const imgCache = new Map();

function loadImage(src) {
  if (imgCache.has(src)) return imgCache.get(src);
  const p = new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
  imgCache.set(src, p);
  return p;
}

// ─── Main recolor function ────────────────────────────────────────────────────

/**
 * Draw a recolored version of `imageSrc` onto `canvas`.
 * Pixels where mask is bright get tinted with targetHSB,
 * preserving original luminance (shadows / highlights intact).
 *
 * @param {HTMLCanvasElement} canvas
 * @param {string} imageSrc
 * @param {string} maskSrc
 * @param {{ h: number, s: number, b: number }} targetHSB
 */
export async function drawRecolored(canvas, imageSrc, maskSrc, targetHSB) {
  const [img, mask] = await Promise.all([loadImage(imageSrc), loadImage(maskSrc)]);

  const w = img.naturalWidth;
  const h = img.naturalHeight;
  canvas.width  = w;
  canvas.height = h;

  const ctx = canvas.getContext('2d');

  // Draw original image to extract pixel data
  ctx.drawImage(img, 0, 0, w, h);
  const origData = ctx.getImageData(0, 0, w, h);

  // Draw mask to extract mask pixel data
  ctx.clearRect(0, 0, w, h);
  ctx.drawImage(mask, 0, 0, w, h);
  const maskData = ctx.getImageData(0, 0, w, h);

  // Build output
  const outData = ctx.createImageData(w, h);
  const orig = origData.data;
  const msk  = maskData.data;
  const out  = outData.data;

  const [tH, tS, tL] = hsbToHsl(targetHSB.h, targetHSB.s, targetHSB.b);

  for (let i = 0; i < orig.length; i += 4) {
    const r = orig[i], g = orig[i + 1], b = orig[i + 2], a = orig[i + 3];
    // Mask brightness (use R channel of mask as strength 0-1)
    const strength = msk[i] / 255;

    if (strength < 0.02 || a === 0) {
      // Outside mask — copy original pixel unchanged
      out[i] = r; out[i + 1] = g; out[i + 2] = b; out[i + 3] = a;
      continue;
    }

    // Luminance-preserving tint:
    // Keep original L, replace H+S with target, then lerp by mask strength
    const [, , origL] = rgbToHsl(r, g, b);
    const [nr, ng, nb] = hslToRgb(tH, tS, origL);

    // Lerp between original and tinted based on mask strength
    out[i]     = Math.round(r  + (nr - r)  * strength);
    out[i + 1] = Math.round(g  + (ng - g)  * strength);
    out[i + 2] = Math.round(b  + (nb - b)  * strength);
    out[i + 3] = a;
  }

  ctx.putImageData(outData, 0, 0);
}