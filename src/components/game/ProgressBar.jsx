import React from 'react';

export default function ProgressBar({ current, total }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex gap-1.5">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className="h-2 rounded-full transition-all duration-300"
            style={{
              width: i < current ? '24px' : '8px',
              backgroundColor: i < current
                ? 'var(--color-primary)'
                : 'hsl(var(--border))',
            }}
          />
        ))}
      </div>
      <span className="text-sm font-bold" style={{ color: 'var(--color-text-secondary)' }}>
        {current}/{total}
      </span>
    </div>
  );
}