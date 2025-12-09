import { create } from "zustand";
import { persist } from "zustand/middleware";
import { 
  UserProfile, 
  MacroCalculation, 
  UserStats, 
  SubscriptionInfo,
  Sex,
  Goal,
  ActivityLevel,
  DietaryPreference,
  CookingSkill,
  MealsPerDay
} from "@/types/user";
import { calculateFullMacros } from "@/lib/macroCalculator";

interface OnboardingData {
  sex?: Sex;
  age?: number;
  heightFeet?: number;
  heightInches?: number;
  heightCm?: number;
  weightLbs?: number;
  weightKg?: number;
  bodyFatPercentage?: number;
  activityLevel?: ActivityLevel;
  goal?: Goal;
  trainingDaysPerWeek?: number;
  dietaryPreference?: DietaryPreference;
  allergies?: string[];
  budget?: "low" | "medium" | "high";
  cookingSkill?: CookingSkill;
  mealsPerDay?: MealsPerDay;
  wakeUpTime?: string;
  bedTime?: string;
}

interface UserState {
  // Onboarding
  currentStep: number;
  onboardingData: OnboardingData;
  isOnboardingComplete: boolean;
  
  // User profile
  profile: UserProfile | null;
  macros: MacroCalculation | null;
  stats: UserStats;
  subscription: SubscriptionInfo;
  
  // Actions
  setCurrentStep: (step: number) => void;
  updateOnboardingData: (data: Partial<OnboardingData>) => void;
  completeOnboarding: () => void;
  calculateMacros: () => MacroCalculation | null;
  addXP: (amount: number) => void;
  incrementStreak: () => void;
  resetStreak: () => void;
  addBadge: (badge: string) => void;
  updateSubscription: (info: Partial<SubscriptionInfo>) => void;
  reset: () => void;
}

const initialStats: UserStats = {
  xp: 0,
  level: 1,
  streak: 0,
  workoutsCompleted: 0,
  mealsTracked: 0,
  macrosHit: 0,
  badges: [],
};

const initialSubscription: SubscriptionInfo = {
  tier: null,
  status: null,
};

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      currentStep: 0,
      onboardingData: {},
      isOnboardingComplete: false,
      profile: null,
      macros: null,
      stats: initialStats,
      subscription: initialSubscription,

      setCurrentStep: (step) => set({ currentStep: step }),

      updateOnboardingData: (data) =>
        set((state) => ({
          onboardingData: { ...state.onboardingData, ...data },
        })),

      completeOnboarding: () => {
        const { onboardingData } = get();
        
        // Convert units if needed
        const heightCm = onboardingData.heightCm || 
          (onboardingData.heightFeet && onboardingData.heightInches 
            ? Math.round((onboardingData.heightFeet * 12 + onboardingData.heightInches) * 2.54)
            : 170);
        
        const weightKg = onboardingData.weightKg || 
          (onboardingData.weightLbs 
            ? Math.round(onboardingData.weightLbs * 0.453592 * 10) / 10
            : 70);

        const profile: UserProfile = {
          id: crypto.randomUUID(),
          sex: onboardingData.sex || "male",
          age: onboardingData.age || 25,
          heightCm,
          weightKg,
          bodyFatPercentage: onboardingData.bodyFatPercentage,
          activityLevel: onboardingData.activityLevel || "moderate",
          goal: onboardingData.goal || "recomp",
          trainingDaysPerWeek: onboardingData.trainingDaysPerWeek || 4,
          dietaryPreference: onboardingData.dietaryPreference || "standard",
          allergies: onboardingData.allergies || [],
          budget: onboardingData.budget || "medium",
          cookingSkill: onboardingData.cookingSkill || "intermediate",
          mealsPerDay: onboardingData.mealsPerDay || 4,
          wakeUpTime: onboardingData.wakeUpTime || "07:00",
          bedTime: onboardingData.bedTime || "23:00",
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        const macros = calculateFullMacros(
          profile.weightKg,
          profile.heightCm,
          profile.age,
          profile.sex,
          profile.activityLevel,
          profile.goal,
          profile.mealsPerDay
        );

        set({
          profile,
          macros,
          isOnboardingComplete: true,
        });
      },

      calculateMacros: () => {
        const { profile } = get();
        if (!profile) return null;

        return calculateFullMacros(
          profile.weightKg,
          profile.heightCm,
          profile.age,
          profile.sex,
          profile.activityLevel,
          profile.goal,
          profile.mealsPerDay
        );
      },

      addXP: (amount) =>
        set((state) => {
          const newXP = state.stats.xp + amount;
          const newLevel = Math.floor(newXP / 1000) + 1;
          return {
            stats: {
              ...state.stats,
              xp: newXP,
              level: newLevel,
            },
          };
        }),

      incrementStreak: () =>
        set((state) => ({
          stats: {
            ...state.stats,
            streak: state.stats.streak + 1,
          },
        })),

      resetStreak: () =>
        set((state) => ({
          stats: {
            ...state.stats,
            streak: 0,
          },
        })),

      addBadge: (badge) =>
        set((state) => ({
          stats: {
            ...state.stats,
            badges: state.stats.badges.includes(badge)
              ? state.stats.badges
              : [...state.stats.badges, badge],
          },
        })),

      updateSubscription: (info) =>
        set((state) => ({
          subscription: { ...state.subscription, ...info },
        })),

      reset: () =>
        set({
          currentStep: 0,
          onboardingData: {},
          isOnboardingComplete: false,
          profile: null,
          macros: null,
          stats: initialStats,
          subscription: initialSubscription,
        }),
    }),
    {
      name: "macromasters-user-storage",
    }
  )
);
