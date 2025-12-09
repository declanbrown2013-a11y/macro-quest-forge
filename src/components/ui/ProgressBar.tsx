import * as React from "react";
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  max: number;
  color?: "primary" | "xp" | "streak";
  showLabel?: boolean;
  label?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
  animate?: boolean;
}

const colorMap = {
  primary: "bg-primary",
  xp: "bg-gradient-to-r from-primary via-primary-glow to-primary",
  streak: "bg-gradient-to-r from-warning to-orange-500",
};

const sizeMap = {
  sm: "h-1.5",
  md: "h-2.5",
  lg: "h-4",
};

export function ProgressBar({
  value,
  max,
  color = "primary",
  showLabel = false,
  label,
  size = "md",
  className,
  animate = true,
}: ProgressBarProps) {
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <div className={cn("w-full", className)}>
      {(showLabel || label) && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-muted-foreground">{label}</span>
          <span className="text-sm font-medium">
            {value.toLocaleString()} / {max.toLocaleString()}
          </span>
        </div>
      )}
      <div className={cn("w-full bg-muted/50 rounded-full overflow-hidden", sizeMap[size])}>
        <div
          className={cn(
            "h-full rounded-full transition-all duration-1000 ease-out",
            colorMap[color],
            animate && "animate-shimmer bg-[length:200%_100%]"
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
