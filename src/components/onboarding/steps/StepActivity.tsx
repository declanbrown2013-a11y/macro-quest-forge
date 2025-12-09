import React from "react";
import { useUserStore } from "@/store/userStore";
import { ActivityLevel } from "@/types/user";
import { cn } from "@/lib/utils";

const activityOptions: { value: ActivityLevel; label: string; description: string; icon: string }[] = [
  {
    value: "sedentary",
    label: "Sedentary",
    description: "Desk job, little to no exercise",
    icon: "🖥️",
  },
  {
    value: "light",
    label: "Lightly Active",
    description: "Light exercise 1-3 days/week",
    icon: "🚶",
  },
  {
    value: "moderate",
    label: "Moderately Active",
    description: "Moderate exercise 3-5 days/week",
    icon: "🏃",
  },
  {
    value: "active",
    label: "Very Active",
    description: "Hard exercise 6-7 days/week",
    icon: "💪",
  },
  {
    value: "very-active",
    label: "Extremely Active",
    description: "Athlete or physical job",
    icon: "🔥",
  },
];

export function StepActivity() {
  const { onboardingData, updateOnboardingData } = useUserStore();

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold font-display mb-2">
          What's your activity level?
        </h2>
        <p className="text-muted-foreground">
          This determines your TDEE multiplier
        </p>
      </div>

      <div className="space-y-3 mt-6">
        {activityOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => updateOnboardingData({ activityLevel: option.value })}
            className={cn(
              "w-full p-4 rounded-xl border-2 transition-all duration-300 flex items-center gap-4 text-left",
              onboardingData.activityLevel === option.value
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
