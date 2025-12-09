import React from "react";
import { useUserStore } from "@/store/userStore";
import { Slider } from "@/components/ui/slider";

export function StepAge() {
  const { onboardingData, updateOnboardingData } = useUserStore();
  const age = onboardingData.age || 25;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold font-display mb-2">How old are you?</h2>
        <p className="text-muted-foreground">
          Age affects your metabolism and caloric needs
        </p>
      </div>

      <div className="flex flex-col items-center mt-8">
        <div className="text-7xl font-bold font-display text-gradient mb-8">
          {age}
        </div>
        
        <div className="w-full px-4">
          <Slider
            value={[age]}
            onValueChange={([value]) => updateOnboardingData({ age: value })}
            min={16}
            max={80}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between mt-2 text-sm text-muted-foreground">
            <span>16</span>
            <span>80</span>
          </div>
        </div>
      </div>
    </div>
  );
}
