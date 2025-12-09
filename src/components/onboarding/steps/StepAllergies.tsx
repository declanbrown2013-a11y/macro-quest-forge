import React from "react";
import { useUserStore } from "@/store/userStore";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

const commonAllergies = [
  "Dairy",
  "Eggs",
  "Gluten",
  "Peanuts",
  "Tree Nuts",
  "Soy",
  "Shellfish",
  "Fish",
  "Sesame",
];

export function StepAllergies() {
  const { onboardingData, updateOnboardingData } = useUserStore();
  const allergies = onboardingData.allergies || [];

  const toggleAllergy = (allergy: string) => {
    if (allergies.includes(allergy)) {
      updateOnboardingData({ allergies: allergies.filter((a) => a !== allergy) });
    } else {
      updateOnboardingData({ allergies: [...allergies, allergy] });
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold font-display mb-2">
          Any food allergies or intolerances?
        </h2>
        <p className="text-muted-foreground">
          Select all that apply (optional)
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mt-6 justify-center">
        {commonAllergies.map((allergy) => (
          <button
            key={allergy}
            onClick={() => toggleAllergy(allergy)}
            className={cn(
              "px-4 py-2 rounded-full border-2 transition-all duration-300 flex items-center gap-2",
              allergies.includes(allergy)
                ? "border-destructive bg-destructive/20 text-destructive"
                : "border-border/50 hover:border-primary/50 bg-secondary/30"
            )}
          >
            {allergy}
            {allergies.includes(allergy) && <X className="w-4 h-4" />}
          </button>
        ))}
      </div>

      {allergies.length > 0 && (
        <p className="text-center text-sm text-muted-foreground mt-4">
          {allergies.length} allerg{allergies.length === 1 ? "y" : "ies"} selected
        </p>
      )}

      <button
        onClick={() => updateOnboardingData({ allergies: [] })}
        className="block mx-auto text-sm text-muted-foreground hover:text-foreground transition-colors mt-2"
      >
        No allergies
      </button>
    </div>
  );
}
