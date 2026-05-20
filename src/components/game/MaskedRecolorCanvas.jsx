import React, { useRef, useEffect, useState, useCallback } from 'react';
import { drawRecolored } from '@/utils/recolor';

/**
 * Renders a character image with a masked region recolored in realtime.
 *
 * Props:
 *   imageSrc  — original character image URL
 *   maskSrc   — grayscale mask image (white = recolorable, black = untouched)
 *   hsb       — { h, s, b } target color
 *   alt       — image alt text
 */
export default function MaskedRecolorCanvas({ imageSrc, maskSrc, hsb, alt }) {
  const canvasRef = useRef(null);
  const rafRef    = useRef(null);
  const [status, setStatus] = useState('loading'); // loading | ready | error

  const redraw = useCallback(async () => {
    if (!canvasRef.current || !imageSrc || !maskSrc) return;
    try {
      await drawRecolored(canvasRef.current, imageSrc, maskSrc, hsb);
      setStatus('ready');
    } catch {
      setStatus('error');
    }
  }, [imageSrc, maskSrc, hsb]);

  // Throttle redraws to rAF so we never queue faster than the browser can paint
  useEffect(() => {
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => { redraw(); });
    return () => cancelAnimationFrame(rafRef.current);
  }, [redraw]);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {status === 'loading' && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-white/20 border-t-white/80 animate-spin" />
        </div>
      )}
      {status === 'error' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-center px-4">
          <span className="text-4xl">🎨</span>
          <span className="text-sm font-semibold text-white/60">{alt}</span>
        </div>
      )}
      <canvas
        ref={canvasRef}
        alt={alt}
        className="max-w-full max-h-full object-contain"
        style={{
          opacity: status === 'ready' ? 1 : 0,
          transition: 'opacity 0.2s ease',
          borderRadius: '12px',
        }}
      />
    </div>
  );
}