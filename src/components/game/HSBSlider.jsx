import React from 'react';
import { hsbToHex, getSatGradient, getBrGradient } from '@/utils/colorMath';

const HUE_GRADIENT = 'linear-gradient(to right, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)';

export default function HSBSlider({ hsb, onChange }) {
  const { h, s, b } = hsb;

  const handleChange = (key, value) => {
    onChange({ ...hsb, [key]: Number(value) });
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Hue */}
      <SliderRow
        label="Hue"
        value={h}
        min={0}
        max={360}
        gradient={HUE_GRADIENT}
        onChange={(v) => handleChange('h', v)}
        displayValue={`${h}°`}
      />

      {/* Saturation */}
      <SliderRow
        label="Saturation"
        value={s}
        min={0}
        max={100}
        gradient={getSatGradient(h)}
        onChange={(v) => handleChange('s', v)}
        displayValue={`${s}%`}
      />

      {/* Brightness */}
      <SliderRow
        label="Brightness"
        value={b}
        min={0}
        max={100}
        gradient={getBrGradient(h, s)}
        onChange={(v) => handleChange('b', v)}
        displayValue={`${b}%`}
      />
    </div>
  );
}

function SliderRow({ label, value, min, max, gradient, onChange, displayValue }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-semibold" style={{ color: 'var(--color-text-secondary)' }}>
          {label}
        </span>
        <span className="text-sm font-bold tabular-nums" style={{ color: 'var(--color-text-primary)' }}>
          {displayValue}
        </span>
      </div>
      <div className="relative h-5 flex items-center">
        <div
          className="absolute w-full h-3 rounded-full"
          style={{ background: gradient }}
        />
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="slider-input relative w-full h-3 appearance-none bg-transparent cursor-pointer"
          style={{ zIndex: 1 }}
        />
      </div>
    </div>
  );
}