import { Sex, Goal, ActivityLevel, MacroCalculation, MealsPerDay } from "@/types/user";

const ACTIVITY_MULTIPLIERS: Record<ActivityLevel, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  "very-active": 1.9,
};

const GOAL_MULTIPLIERS: Record<Goal, number> = {
  "fat-loss": 0.80,
  recomp: 1.00,
  "lean-bulk": 1.10,
};

/**
 * Calculate BMR using Mifflin-St Jeor equation
 * Male: 10×kg + 6.25×cm − 5×age + 5
 * Female: 10×kg + 6.25×cm − 5×age − 161
 */
export function calculateBMR(
  weightKg: number,
  heightCm: number,
  age: number,
  sex: Sex
): number {
  const baseBMR = 10 * weightKg + 6.25 * heightCm - 5 * age;
  return sex === "male" ? baseBMR + 5 : baseBMR - 161;
}

/**
 * Calculate TDEE (Total Daily Energy Expenditure)
 */
export function calculateTDEE(bmr: number, activityLevel: ActivityLevel): number {
  return bmr * ACTIVITY_MULTIPLIERS[activityLevel];
}

/**
 * Calculate target daily calories based on goal
 */
export function calculateTargetCalories(tdee: number, goal: Goal): number {
  return Math.round(tdee * GOAL_MULTIPLIERS[goal]);
}

/**
 * Calculate macros based on calories and body weight
 * - Protein: 1.8g per kg bodyweight
 * - Fats: 25% of calories
 * - Carbs: remaining calories
 */
export function calculateMacros(
  dailyCalories: number,
  weightKg: number,
  mealsPerDay: MealsPerDay
): Omit<MacroCalculation, "bmr" | "tdee"> {
  // Protein: 1.8g per kg bodyweight (4 calories per gram)
  const protein = Math.round(1.8 * weightKg);
  const proteinCalories = protein * 4;

  // Fats: 25% of daily calories (9 calories per gram)
  const fatCalories = dailyCalories * 0.25;
  const fats = Math.round(fatCalories / 9);

  // Carbs: remaining calories (4 calories per gram)
  const remainingCalories = dailyCalories - proteinCalories - fatCalories;
  const carbs = Math.round(remainingCalories / 4);

  // Per meal breakdown
  const proteinPerMeal = Math.round(protein / mealsPerDay);
  const carbsPerMeal = Math.round(carbs / mealsPerDay);
  const fatsPerMeal = Math.round(fats / mealsPerDay);
  const caloriesPerMeal = Math.round(dailyCalories / mealsPerDay);

  // Weekly totals
  const weeklyCalories = dailyCalories * 7;
  const weeklyProtein = protein * 7;
  const weeklyCarbs = carbs * 7;
  const weeklyFats = fats * 7;

  return {
    dailyCalories,
    protein,
    carbs,
    fats,
    proteinPerMeal,
    carbsPerMeal,
    fatsPerMeal,
    caloriesPerMeal,
    weeklyCalories,
    weeklyProtein,
    weeklyCarbs,
    weeklyFats,
  };
}

/**
 * Complete macro calculation from user profile
 */
export function calculateFullMacros(
  weightKg: number,
  heightCm: number,
  age: number,
  sex: Sex,
  activityLevel: ActivityLevel,
  goal: Goal,
  mealsPerDay: MealsPerDay
): MacroCalculation {
  const bmr = calculateBMR(weightKg, heightCm, age, sex);
  const tdee = calculateTDEE(bmr, activityLevel);
  const dailyCalories = calculateTargetCalories(tdee, goal);
  const macros = calculateMacros(dailyCalories, weightKg, mealsPerDay);

  return {
    bmr: Math.round(bmr),
    tdee: Math.round(tdee),
    ...macros,
  };
}

/**
 * Convert height from feet/inches to centimeters
 */
export function feetInchesToCm(feet: number, inches: number): number {
  return Math.round((feet * 12 + inches) * 2.54);
}

/**
 * Convert weight from pounds to kilograms
 */
export function lbsToKg(lbs: number): number {
  return Math.round(lbs * 0.453592 * 10) / 10;
}

/**
 * Convert centimeters to feet and inches
 */
export function cmToFeetInches(cm: number): { feet: number; inches: number } {
  const totalInches = cm / 2.54;
  const feet = Math.floor(totalInches / 12);
  const inches = Math.round(totalInches % 12);
  return { feet, inches };
}

/**
 * Convert kilograms to pounds
 */
export function kgToLbs(kg: number): number {
  return Math.round(kg / 0.453592);
}

/**
 * Calculate XP needed for next level
 */
export function calculateXPForLevel(level: number): number {
  return level * 1000;
}

/**
 * Calculate level from XP
 */
export function calculateLevelFromXP(xp: number): number {
  return Math.floor(xp / 1000) + 1;
}

/**
 * Calculate XP progress within current level
 */
export function calculateLevelProgress(xp: number): { current: number; needed: number; percentage: number } {
  const level = calculateLevelFromXP(xp);
  const xpForCurrentLevel = (level - 1) * 1000;
  const xpForNextLevel = level * 1000;
  const current = xp - xpForCurrentLevel;
  const needed = 1000;
  const percentage = (current / needed) * 100;
  
  return { current, needed, percentage };
}
