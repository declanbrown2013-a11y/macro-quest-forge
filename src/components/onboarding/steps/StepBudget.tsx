import React from "react";
import { useUserStore } from "@/store/userStore";
import { cn } from "@/lib/utils";

const budgetOptions: { value: "low" | "medium" | "high"; label: string; description: string; icon: string }[] = [
  {
    value: "low",
    label: "Budget Friendly",
    description: "£50-80/week on food",
    icon: "💵",
  },
  {
    value: "medium",
    label: "Moderate",
    description: "£80-120/week on food",
    icon: "💰",
  },
  {
    value: "high",
    label: "Premium",
    description: "£120+/week on food",
    icon: "💎",
  },
];

export function StepBudget() {
  const { onboardingData, updateOnboardingData } = useUserStore();

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold font-display mb-2">
          What's your food budget?
        </h2>
        <p className="text-muted-foreground">
          This helps us recommend appropriate meal options
        </p>
      </div>

      <div className="space-y-3 mt-6">
        {budgetOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => updateOnboardingData({ budget: option.value })}
            className={cn(
              "w-full p-4 rounded-xl border-2 transition-all duration-300 flex items-center gap-4 text-left",
              onboardingData.budget === option.value
                ? "border-primary bg-primary/10 shadow-glow"
                : "border-border/50 hover:border-primary/50 bg-secondary/30"
            )}
          >
            <span className="text-3xl">{option.icon}</span>
            <div>
              <p className="font-semibold">{option.label}</p>
              <p className="text-sm text-muted-foreground">{option.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
