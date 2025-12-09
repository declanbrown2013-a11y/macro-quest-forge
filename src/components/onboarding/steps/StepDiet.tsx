import React from "react";
import { useUserStore } from "@/store/userStore";
import { DietaryPreference } from "@/types/user";
import { cn } from "@/lib/utils";

const dietOptions: { value: DietaryPreference; label: string; icon: string }[] = [
  { value: "standard", label: "Standard", icon: "🍖" },
  { value: "vegetarian", label: "Vegetarian", icon: "🥕" },
  { value: "vegan", label: "Vegan", icon: "🌱" },
  { value: "keto", label: "Keto", icon: "🥓" },
  { value: "paleo", label: "Paleo", icon: "🦴" },
  { value: "halal", label: "Halal", icon: "🌙" },
  { value: "kosher", label: "Kosher", icon: "✡️" },
];

export function StepDiet() {
  const { onboardingData, updateOnboardingData } = useUserStore();

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold font-display mb-2">
          What's your dietary preference?
        </h2>
        <p className="text-muted-foreground">
          We'll customize your meal plans accordingly
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 mt-6">
        {dietOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => updateOnboardingData({ dietaryPreference: option.value })}
            className={cn(
              "p-4 rounded-xl border-2 transition-all duration-300 flex flex-col items-center gap-2",
              onboardingData.dietaryPreference === option.value
                ? "border-primary bg-primary/10 shadow-glow"
                : "border-border/50 hover:border-primary/50 bg-secondary/30"
            )}
          >
            <span className="text-3xl">{option.icon}</span>
            <span className="font-medium">{option.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
