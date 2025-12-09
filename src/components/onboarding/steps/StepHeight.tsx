import React, { useState } from "react";
import { useUserStore } from "@/store/userStore";
import { cn } from "@/lib/utils";

export function StepHeight() {
  const { onboardingData, updateOnboardingData } = useUserStore();
  const [unit, setUnit] = useState<"imperial" | "metric">("imperial");

  const handleImperialChange = (feet: number, inches: number) => {
    const cm = Math.round((feet * 12 + inches) * 2.54);
    updateOnboardingData({ heightFeet: feet, heightInches: inches, heightCm: cm });
  };

  const handleMetricChange = (cm: number) => {
    const totalInches = cm / 2.54;
    const feet = Math.floor(totalInches / 12);
    const inches = Math.round(totalInches % 12);
    updateOnboardingData({ heightCm: cm, heightFeet: feet, heightInches: inches });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold font-display mb-2">What's your height?</h2>
        <p className="text-muted-foreground">
          Height is essential for calculating your BMR
        </p>
      </div>

      {/* Unit toggle */}
      <div className="flex justify-center gap-2">
        <button
          onClick={() => setUnit("imperial")}
          className={cn(
            "px-4 py-2 rounded-lg text-sm font-medium transition-all",
            unit === "imperial"
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-muted-foreground hover:text-foreground"
          )}
        >
          ft / in
        </button>
        <button
          onClick={() => setUnit("metric")}
          className={cn(
            "px-4 py-2 rounded-lg text-sm font-medium transition-all",
            unit === "metric"
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-muted-foreground hover:text-foreground"
          )}
        >
          cm
        </button>
      </div>

      <div className="flex flex-col items-center mt-8">
        {unit === "imperial" ? (
          <div className="flex items-end gap-4">
            <div className="text-center">
              <input
                type="number"
                value={onboardingData.heightFeet || ""}
                onChange={(e) =>
                  handleImperialChange(
                    parseInt(e.target.value) || 0,
                    onboardingData.heightInches || 0
                  )
                }
                className="w-24 h-20 text-4xl font-bold font-display text-center bg-secondary/50 rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                placeholder="5"
                min={3}
                max={8}
              />
              <p className="text-sm text-muted-foreground mt-2">feet</p>
            </div>
            <div className="text-center">
              <input
                type="number"
                value={onboardingData.heightInches || ""}
                onChange={(e) =>
                  handleImperialChange(
                    onboardingData.heightFeet || 0,
                    parseInt(e.target.value) || 0
                  )
                }
                className="w-24 h-20 text-4xl font-bold font-display text-center bg-secondary/50 rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                placeholder="10"
                min={0}
                max={11}
              />
              <p className="text-sm text-muted-foreground mt-2">inches</p>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <input
              type="number"
              value={onboardingData.heightCm || ""}
              onChange={(e) => handleMetricChange(parseInt(e.target.value) || 0)}
              className="w-32 h-20 text-4xl font-bold font-display text-center bg-secondary/50 rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
              placeholder="175"
              min={100}
              max={250}
            />
            <p className="text-sm text-muted-foreground mt-2">centimeters</p>
          </div>
        )}

        {onboardingData.heightCm && (
          <p className="text-sm text-muted-foreground mt-4">
            {unit === "imperial"
              ? `(${onboardingData.heightCm} cm)`
              : `(${onboardingData.heightFeet}'${onboardingData.heightInches}")`}
          </p>
        )}
      </div>
    </div>
  );
}
