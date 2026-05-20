import React from 'react';
import { hsbToHex } from '@/utils/colorMath';

export default function ColorPreview({ hsb, label = "Your Color", size = 'lg' }) {
  const hex = hsbToHex(hsb.h, hsb.s, hsb.b);
  const isLarge = size === 'lg';

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="rounded-2xl shadow-md transition-all duration-150"
        style={{
          backgroundColor: hex,
          width: isLarge ? '100%' : '64px',
          height: isLarge ? '120px' : '64px',
          minWidth: isLarge ? '160px' : '64px',
          boxShadow: `0 8px 24px ${hex}55`,
        }}
      />
      <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--color-text-secondary)' }}>
        {label}
      </span>
      <span className="text-sm font-bold font-mono" style={{ color: 'var(--color-text-primary)' }}>
        {hex.toUpperCase()}
      </span>
    </div>
  );
}