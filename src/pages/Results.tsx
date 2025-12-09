import React from "react";
import { useUserStore } from "@/store/userStore";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/button";
import { MacroRing } from "@/components/ui/MacroRing";
import { 
  Flame, 
  Target, 
  Zap, 
  ArrowRight, 
  Activity,
  Utensils,
  Calendar,
  Sparkles
} from "lucide-react";

export function ResultsPage() {
  const { macros, profile } = useUserStore();
  const navigate = useNavigate();

  if (!macros || !profile) {
    navigate("/onboarding");
    return null;
  }

  const goalLabels = {
    "fat-loss": "Fat Loss",
    recomp: "Recomposition", 
    "lean-bulk": "Lean Bulk",
  };

  return (
    <div className="min-h-screen bg-background p-4 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[200px]" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[150px]" />

      <div className="max-w-2xl mx-auto relative z-10 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            Your Personalized Plan
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-display mb-3">
            Your <span className="text-gradient">Perfect Plan</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Based on your profile, here are your optimal macros
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <GlassCard className="text-center">
              <Activity className="w-6 h-6 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">BMR</p>
              <p className="text-2xl font-bold font-display">{macros.bmr}</p>
              <p className="text-xs text-muted-foreground">calories/day</p>
            </GlassCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <GlassCard className="text-center">
              <Flame className="w-6 h-6 text-warning mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">TDEE</p>
              <p className="text-2xl font-bold font-display">{macros.tdee}</p>
              <p className="text-xs text-muted-foreground">calories/day</p>
            </GlassCard>
          </motion.div>
        </div>

        {/* Daily Calories Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <GlassCard variant="glow" className="text-center mb-6">
            <div className="flex items-center justify-center gap-3 mb-2">
              <Target className="w-8 h-8 text-primary" />
              <span className="text-sm font-medium text-primary uppercase tracking-wider">
                {goalLabels[profile.goal]}
              </span>
            </div>
            <p className="text-6xl font-bold font-display text-gradient mb-2">
              {macros.dailyCalories}
            </p>
            <p className="text-muted-foreground">Daily Calories Target</p>
          </GlassCard>
        </motion.div>

        {/* Macro Rings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <GlassCard className="mb-6">
            <h3 className="text-lg font-semibold font-display mb-6 text-center">
              Daily Macro Targets
            </h3>
            <div className="flex justify-around items-center">
              <MacroRing
                value={macros.protein}
                max={macros.protein}
                color="protein"
                label="Protein"
                size={100}
              />
              <MacroRing
                value={macros.carbs}
                max={macros.carbs}
                color="carbs"
                label="Carbs"
                size={100}
              />
              <MacroRing
                value={macros.fats}
                max={macros.fats}
                color="fats"
                label="Fats"
                size={100}
              />
            </div>
          </GlassCard>
        </motion.div>

        {/* Per Meal Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <GlassCard className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Utensils className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold font-display">
                Per Meal ({profile.mealsPerDay} meals/day)
              </h3>
            </div>
            <div className="grid grid-cols-4 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-foreground">{macros.caloriesPerMeal}</p>
                <p className="text-xs text-muted-foreground">Calories</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-[hsl(0,85%,60%)]">{macros.proteinPerMeal}g</p>
                <p className="text-xs text-muted-foreground">Protein</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-[hsl(45,100%,55%)]">{macros.carbsPerMeal}g</p>
                <p className="text-xs text-muted-foreground">Carbs</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-[hsl(200,80%,55%)]">{macros.fatsPerMeal}g</p>
                <p className="text-xs text-muted-foreground">Fats</p>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Weekly Totals */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <GlassCard className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold font-display">Weekly Totals</h3>
            </div>
            <div className="grid grid-cols-4 gap-4 text-center">
              <div>
                <p className="text-xl font-bold text-foreground">
                  {(macros.weeklyCalories / 1000).toFixed(1)}k
                </p>
                <p className="text-xs text-muted-foreground">Calories</p>
              </div>
              <div>
                <p className="text-xl font-bold text-[hsl(0,85%,60%)]">{macros.weeklyProtein}g</p>
                <p className="text-xs text-muted-foreground">Protein</p>
              </div>
              <div>
                <p className="text-xl font-bold text-[hsl(45,100%,55%)]">{macros.weeklyCarbs}g</p>
                <p className="text-xs text-muted-foreground">Carbs</p>
              </div>
              <div>
                <p className="text-xl font-bold text-[hsl(200,80%,55%)]">{macros.weeklyFats}g</p>
                <p className="text-xs text-muted-foreground">Fats</p>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-center"
        >
          <Button
            variant="hero"
            onClick={() => navigate("/dashboard")}
            className="w-full md:w-auto"
          >
            <Zap className="w-5 h-5" />
            Start Your Journey
            <ArrowRight className="w-5 h-5" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
