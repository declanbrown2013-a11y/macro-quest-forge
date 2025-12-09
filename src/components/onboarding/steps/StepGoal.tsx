import React from "react";
import { useUserStore } from "@/store/userStore";
import { Goal } from "@/types/user";
import { cn } from "@/lib/utils";
import { TrendingDown, Scale, TrendingUp } from "lucide-react";

const goalOptions: { value: Goal; label: string; description: string; icon: React.ReactNode; color: string }[] = [
  {
    value: "fat-loss",
    label: "Fat Loss",
    description: "Lose fat while preserving muscle. 20% caloric deficit.",
    icon: <TrendingDown className="w-8 h-8" />,
    color: "text-[hsl(0,85%,60%)]",
  },
  {
    value: "recomp",
    label: "Recomposition",
    description: "Build muscle and lose fat simultaneously. Maintenance calories.",
    icon: <Scale className="w-8 h-8" />,
    color: "text-primary",
  },
  {
    value: "lean-bulk",
    label: "Lean Bulk",
    description: "Build muscle with minimal fat gain. 10% caloric surplus.",
    icon: <TrendingUp className="w-8 h-8" />,
    color: "text-[hsl(45,100%,55%)]",
  },
];

export function StepGoal() {
  const { onboardingData, updateOnboardingData } = useUserStore();

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold font-display mb-2">
          What's your primary goal?
        </h2>
        <p className="text-muted-foreground">
          This determines your caloric target
        </p>
      </div>

      <div className="space-y-4 mt-6">
        {goalOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => updateOnboardingData({ goal: option.value })}
            className={cn(
              "w-full p-5 rounded-xl border-2 transition-all duration-300 flex items-center gap-4 text-left",
              onboardingData.goal === option.value
                ? "border-primary bg-primary/10 shadow-glow"
                : "border-border/50 hover:border-primary/50 bg-secondary/30"
            )}
          >
            <div className={cn("p-3 rounded-lg bg-secondary/50", option.color)}>
              {option.icon}
            </div>
            <div>
              <p className="font-semibold text-lg">{option.label}</p>
              <p className="text-sm text-muted-foreground">{option.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
