'use client';

import * as React from "react";
import { cn } from "@/lib/utils/utils";

interface SliderProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onValueChange?: (value: number) => void;
}

export function Slider({
  className,
  value,
  min = 0,
  max = 100,
  step = 1,
  onValueChange,
  ...props
}: SliderProps) {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className={cn("relative flex w-full touch-none select-none items-center", className)}>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onValueChange && onValueChange(Number(e.target.value))}
        className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-secondary accent-primary focus:outline-none"
        style={{
          background: `linear-gradient(to right, hsl(var(--primary)) 0%, hsl(var(--primary)) ${percentage}%, hsl(var(--secondary)) ${percentage}%, hsl(var(--secondary)) 100%)`,
        }}
        {...props}
      />
    </div>
  );
}
