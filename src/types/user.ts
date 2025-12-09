export type Sex = "male" | "female";
export type Goal = "fat-loss" | "recomp" | "lean-bulk";
export type ActivityLevel = "sedentary" | "light" | "moderate" | "active" | "very-active";
export type DietaryPreference = "standard" | "vegetarian" | "vegan" | "keto" | "paleo" | "halal" | "kosher";
export type CookingSkill = "beginner" | "intermediate" | "advanced";
export type MealsPerDay = 2 | 3 | 4 | 5 | 6;

export interface UserProfile {
  id: string;
  email?: string;
  sex: Sex;
  age: number;
  heightCm: number;
  weightKg: number;
  bodyFatPercentage?: number;
  activityLevel: ActivityLevel;
  goal: Goal;
  trainingDaysPerWeek: number;
  dietaryPreference: DietaryPreference;
  allergies: string[];
  budget: "low" | "medium" | "high";
  cookingSkill: CookingSkill;
  mealsPerDay: MealsPerDay;
  wakeUpTime: string;
  bedTime: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface MacroCalculation {
  bmr: number;
  tdee: number;
  dailyCalories: number;
  protein: number;
  carbs: number;
  fats: number;
  proteinPerMeal: number;
  carbsPerMeal: number;
  fatsPerMeal: number;
  caloriesPerMeal: number;
  weeklyCalories: number;
  weeklyProtein: number;
  weeklyCarbs: number;
  weeklyFats: number;
}

export interface UserStats {
  xp: number;
  level: number;
  streak: number;
  workoutsCompleted: number;
  mealsTracked: number;
  macrosHit: number;
  badges: string[];
}

export interface SubscriptionInfo {
  tier: "basic" | "pro" | "elite" | null;
  status: "active" | "past_due" | "cancelled" | null;
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  mealsPerWeek?: number;
}
