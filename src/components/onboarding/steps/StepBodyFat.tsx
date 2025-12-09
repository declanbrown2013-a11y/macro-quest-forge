import React from "react";
import { useUserStore } from "@/store/userStore";
import { Slider } from "@/components/ui/slider";

export function StepBodyFat() {
  const { onboardingData, updateOnboardingData } = useUserStore();
  const bodyFat = onboardingData.bodyFatPercentage || 20;

  const getBodyFatCategory = (bf: number) => {
    if (bf < 10) return { label: "Essential Fat", color: "text-destructive" };
    if (bf < 14) return { label: "Athletic", color: "text-primary" };
    if (bf < 18) return { label: "Fitness", color: "text-success" };
    if (bf < 25) return { label: "Average", color: "text-foreground" };
    return { label: "Above Average", color: "text-warning" };
  };

  const category = getBodyFatCategory(bodyFat);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold font-display mb-2">
          Estimate your body fat percentage
        </h2>
        <p className="text-muted-foreground">
          This is optional but helps us fine-tune your macros
        </p>
      </div>

      <div className="flex flex-col items-center mt-8">
        <div className="flex items-baseline gap-1">
          <span className="text-7xl font-bold font-display text-gradient">
            {bodyFat}
          </span>
          <span className="text-2xl text-muted-foreground">%</span>
        </div>

        <span className={`text-lg font-medium mt-2 ${category.color}`}>
          {category.label}
        </span>

        <div className="w-full px-4 mt-8">
          <Slider
            value={[bodyFat]}
            onValueChange={([value]) => updateOnboardingData({ bodyFatPercentage: value })}
            min={5}
            max={45}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between mt-2 text-sm text-muted-foreground">
            <span>5%</span>
            <span>45%</span>
          </div>
        </div>

        <button
          onClick={() => updateOnboardingData({ bodyFatPercentage: undefined })}
          className="mt-4 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Skip this step
        </button>
      </div>
    </div>
  );
}
