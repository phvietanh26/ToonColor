import React from 'react';
import { hsbToHex, getSatGradient, getBrGradient } from '@/utils/colorMath';

const HUE_GRADIENT = 'linear-gradient(to bottom, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)';

export default function CombinedColorPicker({ hsb, onChange, questionIndex, totalQuestions, onConfirm }) {
  const { h, s, b } = hsb;
  const hex = hsbToHex(h, s, b);

  const handleChange = (key, value) => {
    onChange({ ...hsb, [key]: Number(value) });
  };

  return (
    <div
      className="relative w-full rounded-3xl overflow-hidden flex flex-col"
      style={{
        backgroundColor: hex,
        boxShadow: `0 8px 32px ${hex}66`,
        minHeight: '320px',
        transition: 'background-color 0.1s ease',
      }}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-5 pt-4 pb-2">
        <span className="text-sm font-bold" style={{ color: 'rgba(255,255,255,0.7)' }}>
          {questionIndex + 1}/{totalQuestions}
        </span>
        <span className="text-sm font-bold" style={{ color: 'rgba(255,255,255,0.4)' }}>
          ToonColor
        </span>
      </div>

      {/* Sliders area */}
      <div className="flex-1 flex items-center gap-3 px-5 py-4">
        {/* Hue slider - vertical */}
        <VerticalSlider
          value={h}
          min={0}
          max={360}
          gradient={HUE_GRADIENT}
          onChange={(v) => handleChange('h', v)}
        />

        {/* Saturation slider - vertical */}
        <VerticalSlider
          value={s}
          min={0}
          max={100}
          gradient={`linear-gradient(to bottom, hsl(${h},100%,50%), hsl(${h},0%,50%))`}
          onChange={(v) => handleChange('s', v)}
        />

        {/* Brightness slider - vertical */}
        <VerticalSlider
          value={b}
          min={0}
          max={100}
          gradient={`linear-gradient(to bottom, hsl(${h},${s}%,100%), hsl(${h},${s}%,50%), #000)`}
          onChange={(v) => handleChange('b', v)}
        />

        {/* Spacer */}
        <div className="flex-1" />

        {/* Confirm button */}
        <button
          onClick={onConfirm}
          className="self-end mb-2 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-150 hover:scale-110 active:scale-95"
          style={{
            backgroundColor: 'rgba(255,255,255,0.9)',
            boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
          }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </button>
      </div>

      {/* Hex label */}
      <div className="text-center pb-3">
        <span className="text-xs font-mono font-bold" style={{ color: 'rgba(255,255,255,0.6)' }}>
          {hex.toUpperCase()}
        </span>
      </div>
    </div>
  );
}

function VerticalSlider({ value, min, max, gradient, onChange }) {
  const pct = ((value - min) / (max - min)) * 100;

  return (
    <div
      className="relative flex items-center justify-center rounded-2xl overflow-hidden"
      style={{
        width: '44px',
        height: '200px',
        background: gradient,
        boxShadow: '0 2px 12px rgba(0,0,0,0.3)',
        flexShrink: 0,
      }}
    >
      {/* Thumb indicator */}
      <div
        className="absolute left-1/2 -translate-x-1/2 w-7 h-7 rounded-full border-3 border-white"
        style={{
          top: `calc(${pct}% - 14px)`,
          backgroundColor: 'rgba(255,255,255,0.3)',
          border: '3px solid white',
          boxShadow: '0 2px 8px rgba(0,0,0,0.35)',
          pointerEvents: 'none',
          transition: 'top 0.05s ease',
        }}
      />
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="absolute opacity-0 cursor-pointer"
        style={{
          writingMode: 'vertical-lr',
          direction: 'rtl',
          width: '100%',
          height: '100%',
          WebkitAppearance: 'slider-vertical',
        }}
      />
    </div>
  );
}