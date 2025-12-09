import React from "react";
import { useUserStore } from "@/store/userStore";
import { cn } from "@/lib/utils";

export function StepTraining() {
  const { onboardingData, updateOnboardingData } = useUserStore();

  const options = [1, 2, 3, 4, 5, 6, 7];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold font-display mb-2">
          How many days per week do you train?
        </h2>
        <p className="text-muted-foreground">
          This helps us design your workout split
        </p>
      </div>

      <div className="grid grid-cols-7 gap-2 mt-8">
        {options.map((days) => (
          <button
            key={days}
            onClick={() => updateOnboardingData({ trainingDaysPerWeek: days })}
            className={cn(
              "aspect-square rounded-xl border-2 transition-all duration-300 flex items-center justify-center text-xl font-bold font-display",
              onboardingData.trainingDaysPerWeek === days
                ? "border-primary bg-primary text-primary-foreground shadow-glow"
                : "border-border/50 hover:border-primary/50 bg-secondary/30"
            )}
          >
            {days}
          </button>
        ))}
      </div>

      <div className="text-center mt-4">
        {onboardingData.trainingDaysPerWeek && (
          <p className="text-muted-foreground">
            {onboardingData.trainingDaysPerWeek === 1
              ? "1 day per week"
              : `${onboardingData.trainingDaysPerWeek} days per week`}
          </p>
        )}
      </div>
    </div>
  );
}
