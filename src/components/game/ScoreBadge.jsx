import React from 'react';

export default function ScoreBadge({ score, maxScore = 10, size = 'md' }) {
  const pct = score / maxScore;
  const color = pct >= 0.8 ? '#2ECC71' : pct >= 0.5 ? '#4255FF' : pct >= 0.3 ? '#F5A623' : '#E53E3E';

  if (size === 'lg') {
    return (
      <div className="flex flex-col items-center gap-1 animate-scale-in">
        <span className="text-6xl font-extrabold tabular-nums" style={{ color }}>
          {score.toFixed(2)}
        </span>
        <span className="text-base font-semibold" style={{ color: 'var(--color-text-secondary)' }}>
          / {maxScore} pts
        </span>
      </div>
    );
  }

  return (
    <span
      className="inline-flex items-center justify-center rounded-pill text-xs font-bold px-2.5 py-0.5"
      style={{ backgroundColor: `${color}18`, color }}
    >
      {score.toFixed(1)}
    </span>
  );
}