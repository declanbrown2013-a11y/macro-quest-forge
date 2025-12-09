import React from "react";
import { useUserStore } from "@/store/userStore";
import { MealsPerDay } from "@/types/user";
import { cn } from "@/lib/utils";

const mealsOptions: { value: MealsPerDay; label: string }[] = [
  { value: 2, label: "2 meals" },
  { value: 3, label: "3 meals" },
  { value: 4, label: "4 meals" },
  { value: 5, label: "5 meals" },
  { value: 6, label: "6 meals" },
];

export function StepMeals() {
  const { onboardingData, updateOnboardingData } = useUserStore();

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold font-display mb-2">
          How many meals per day?
        </h2>
        <p className="text-muted-foreground">
          This helps us divide your macros evenly
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-3 mt-8">
        {mealsOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => updateOnboardingData({ mealsPerDay: option.value })}
            className={cn(
              "px-6 py-4 rounded-xl border-2 transition-all duration-300",
              onboardingData.mealsPerDay === option.value
                ? "border-primary bg-primary text-primary-foreground shadow-glow"
                : "border-border/50 hover:border-primary/50 bg-secondary/30"
            )}
          >
            <span className="text-2xl font-bold font-display block">{option.value}</span>
            <span className="text-sm">meals</span>
          </button>
        ))}
      </div>
    </div>
  );
}
