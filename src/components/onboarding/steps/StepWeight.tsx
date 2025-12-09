import React, { useState } from "react";
import { useUserStore } from "@/store/userStore";
import { cn } from "@/lib/utils";

export function StepWeight() {
  const { onboardingData, updateOnboardingData } = useUserStore();
  const [unit, setUnit] = useState<"lbs" | "kg">("lbs");

  const handleLbsChange = (lbs: number) => {
    const kg = Math.round(lbs * 0.453592 * 10) / 10;
    updateOnboardingData({ weightLbs: lbs, weightKg: kg });
  };

  const handleKgChange = (kg: number) => {
    const lbs = Math.round(kg / 0.453592);
    updateOnboardingData({ weightKg: kg, weightLbs: lbs });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold font-display mb-2">What's your current weight?</h2>
        <p className="text-muted-foreground">
          This determines your protein needs and caloric baseline
        </p>
      </div>

      {/* Unit toggle */}
      <div className="flex justify-center gap-2">
        <button
          onClick={() => setUnit("lbs")}
          className={cn(
            "px-4 py-2 rounded-lg text-sm font-medium transition-all",
            unit === "lbs"
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-muted-foreground hover:text-foreground"
          )}
        >
          lbs
        </button>
        <button
          onClick={() => setUnit("kg")}
          className={cn(
            "px-4 py-2 rounded-lg text-sm font-medium transition-all",
            unit === "kg"
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-muted-foreground hover:text-foreground"
          )}
        >
          kg
        </button>
      </div>

      <div className="flex flex-col items-center mt-8">
        <div className="text-center">
          <input
            type="number"
            value={unit === "lbs" ? onboardingData.weightLbs || "" : onboardingData.weightKg || ""}
            onChange={(e) =>
              unit === "lbs"
                ? handleLbsChange(parseInt(e.target.value) || 0)
                : handleKgChange(parseFloat(e.target.value) || 0)
            }
            className="w-36 h-24 text-5xl font-bold font-display text-center bg-secondary/50 rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
            placeholder={unit === "lbs" ? "180" : "82"}
            min={unit === "lbs" ? 80 : 35}
            max={unit === "lbs" ? 500 : 230}
          />
          <p className="text-sm text-muted-foreground mt-2">{unit}</p>
        </div>

        {onboardingData.weightKg && (
          <p className="text-sm text-muted-foreground mt-4">
            {unit === "lbs"
              ? `(${onboardingData.weightKg} kg)`
              : `(${onboardingData.weightLbs} lbs)`}
          </p>
        )}
      </div>
    </div>
  );
}
