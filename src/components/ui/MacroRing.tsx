import * as React from "react";
import { cn } from "@/lib/utils";

interface MacroRingProps {
  value: number;
  max: number;
  size?: number;
  strokeWidth?: number;
  color?: "primary" | "protein" | "carbs" | "fats";
  label?: string;
  showValue?: boolean;
  unit?: string;
  className?: string;
  animate?: boolean;
}

const colorMap = {
  primary: "stroke-primary",
  protein: "stroke-[hsl(0,85%,60%)]",
  carbs: "stroke-[hsl(45,100%,55%)]",
  fats: "stroke-[hsl(200,80%,55%)]",
};

const glowMap = {
  primary: "drop-shadow-[0_0_8px_hsla(132,73%,40%,0.6)]",
  protein: "drop-shadow-[0_0_8px_hsla(0,85%,60%,0.6)]",
  carbs: "drop-shadow-[0_0_8px_hsla(45,100%,55%,0.6)]",
  fats: "drop-shadow-[0_0_8px_hsla(200,80%,55%,0.6)]",
};

const textColorMap = {
  primary: "text-primary",
  protein: "text-[hsl(0,85%,60%)]",
  carbs: "text-[hsl(45,100%,55%)]",
  fats: "text-[hsl(200,80%,55%)]",
};

export function MacroRing({
  value,
  max,
  size = 120,
  strokeWidth = 8,
  color = "primary",
  label,
  showValue = true,
  unit = "g",
  className,
  animate = true,
}: MacroRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const percentage = Math.min((value / max) * 100, 100);
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      <svg width={size} height={size} className="-rotate-90">
        {/* Background ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-muted/30"
        />
        {/* Progress ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={animate ? offset : circumference}
          className={cn(
            colorMap[color],
            glowMap[color],
            animate && "transition-all duration-1000 ease-out animate-ring-fill"
          )}
          style={animate ? { strokeDashoffset: offset } : undefined}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {showValue && (
          <span className={cn("text-2xl font-bold font-display", textColorMap[color])}>
            {Math.round(value)}
          </span>
        )}
        {label && (
          <span className="text-xs text-muted-foreground uppercase tracking-wider mt-1">
            {label}
          </span>
        )}
        {unit && showValue && (
          <span className="text-xs text-muted-foreground">{unit}</span>
        )}
      </div>
    </div>
  );
}
