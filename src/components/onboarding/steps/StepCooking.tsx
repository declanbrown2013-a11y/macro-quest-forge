import React from "react";
import { useUserStore } from "@/store/userStore";
import { CookingSkill } from "@/types/user";
import { cn } from "@/lib/utils";

const cookingOptions: { value: CookingSkill; label: string; description: string; icon: string }[] = [
  {
    value: "beginner",
    label: "Beginner",
    description: "Simple recipes, minimal prep",
    icon: "🍳",
  },
  {
    value: "intermediate",
    label: "Intermediate",
    description: "Comfortable with most recipes",
    icon: "👨‍🍳",
  },
  {
    value: "advanced",
    label: "Advanced",
    description: "Love complex meal prep",
    icon: "⭐",
  },
];

export function StepCooking() {
  const { onboardingData, updateOnboardingData } = useUserStore();

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold font-display mb-2">
          What's your cooking skill level?
        </h2>
        <p className="text-muted-foreground">
          We'll match recipe complexity to your skill
        </p>
      </div>

      <div className="space-y-3 mt-6">
        {cookingOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => updateOnboardingData({ cookingSkill: option.value })}
            className={cn(
              "w-full p-4 rounded-xl border-2 transition-all duration-300 flex items-center gap-4 text-left",
              onboardingData.cookingSkill === option.value
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
