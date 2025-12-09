import React, { useState } from "react";
import { useUserStore } from "@/store/userStore";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft, Sparkles } from "lucide-react";
import { StepSex } from "./steps/StepSex";
import { StepAge } from "./steps/StepAge";
import { StepHeight } from "./steps/StepHeight";
import { StepWeight } from "./steps/StepWeight";
import { StepBodyFat } from "./steps/StepBodyFat";
import { StepActivity } from "./steps/StepActivity";
import { StepGoal } from "./steps/StepGoal";
import { StepTraining } from "./steps/StepTraining";
import { StepDiet } from "./steps/StepDiet";
import { StepAllergies } from "./steps/StepAllergies";
import { StepBudget } from "./steps/StepBudget";
import { StepCooking } from "./steps/StepCooking";
import { StepMeals } from "./steps/StepMeals";
import { StepSchedule } from "./steps/StepSchedule";
import { useNavigate } from "react-router-dom";

const TOTAL_STEPS = 14;

const stepComponents = [
  StepSex,
  StepAge,
  StepHeight,
  StepWeight,
  StepBodyFat,
  StepActivity,
  StepGoal,
  StepTraining,
  StepDiet,
  StepAllergies,
  StepBudget,
  StepCooking,
  StepMeals,
  StepSchedule,
];

export function OnboardingQuiz() {
  const { currentStep, setCurrentStep, completeOnboarding, onboardingData } = useUserStore();
  const navigate = useNavigate();
  const [direction, setDirection] = useState(1);

  const CurrentStepComponent = stepComponents[currentStep];
  const progress = ((currentStep + 1) / TOTAL_STEPS) * 100;

  const canProceed = () => {
    const data = onboardingData;
    switch (currentStep) {
      case 0: return !!data.sex;
      case 1: return !!data.age && data.age > 0;
      case 2: return (!!data.heightCm && data.heightCm > 0) || (!!data.heightFeet && data.heightFeet > 0);
      case 3: return (!!data.weightKg && data.weightKg > 0) || (!!data.weightLbs && data.weightLbs > 0);
      case 4: return true; // Body fat is optional
      case 5: return !!data.activityLevel;
      case 6: return !!data.goal;
      case 7: return !!data.trainingDaysPerWeek;
      case 8: return !!data.dietaryPreference;
      case 9: return true; // Allergies optional
      case 10: return !!data.budget;
      case 11: return !!data.cookingSkill;
      case 12: return !!data.mealsPerDay;
      case 13: return !!data.wakeUpTime && !!data.bedTime;
      default: return true;
    }
  };

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS - 1) {
      setDirection(1);
      setCurrentStep(currentStep + 1);
    } else {
      completeOnboarding();
      navigate("/results");
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setDirection(-1);
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[150px]" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-primary/10 rounded-full blur-[120px]" />

      <div className="w-full max-w-lg relative z-10">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm text-muted-foreground">
              Step {currentStep + 1} of {TOTAL_STEPS}
            </span>
            <span className="text-sm font-medium text-primary">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="h-2 bg-muted/30 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary to-primary-glow rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* Step content */}
        <GlassCard variant="strong" className="relative min-h-[400px]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: direction * 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -direction * 50 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="w-full"
            >
              {CurrentStepComponent && <CurrentStepComponent />}
            </motion.div>
          </AnimatePresence>
        </GlassCard>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-6 gap-4">
          <Button
            variant="ghost"
            onClick={handleBack}
            disabled={currentStep === 0}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </Button>

          <Button
            variant={currentStep === TOTAL_STEPS - 1 ? "premium" : "default"}
            onClick={handleNext}
            disabled={!canProceed()}
            className="flex items-center gap-2"
          >
            {currentStep === TOTAL_STEPS - 1 ? (
              <>
                <Sparkles className="w-4 h-4" />
                Calculate My Plan
              </>
            ) : (
              <>
                Continue
                <ChevronRight className="w-4 h-4" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
