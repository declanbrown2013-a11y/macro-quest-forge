import React from "react";
import { useUserStore } from "@/store/userStore";
import { cn } from "@/lib/utils";

export function StepSex() {
  const { onboardingData, updateOnboardingData } = useUserStore();

  const options = [
    { value: "male", label: "Male", icon: "👨" },
    { value: "female", label: "Female", icon: "👩" },
  ] as const;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold font-display mb-2">What's your biological sex?</h2>
        <p className="text-muted-foreground">
          This helps us calculate your basal metabolic rate accurately
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-8">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => updateOnboardingData({ sex: option.value })}
            className={cn(
              "p-8 rounded-xl border-2 transition-all duration-300 flex flex-col items-center gap-3",
              onboardingData.sex === option.value
                ? "border-primary bg-primary/10 shadow-glow"
                : "border-border/50 hover:border-primary/50 bg-secondary/30"
            )}
          >
            <span className="text-5xl">{option.icon}</span>
            <span className="text-lg font-semibold">{option.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
