import React from "react";
import { useUserStore } from "@/store/userStore";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/button";
import { MacroRing } from "@/components/ui/MacroRing";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { 
  Flame, 
  Dumbbell, 
  MessageCircle, 
  UtensilsCrossed,
  Trophy,
  Zap,
  Calendar,
  TrendingUp,
  ChevronRight,
  Sparkles
} from "lucide-react";
import { calculateLevelProgress } from "@/lib/macroCalculator";
import { BottomNav } from "@/components/navigation/BottomNav";

export function Dashboard() {
  const { macros, profile, stats } = useUserStore();
  const navigate = useNavigate();

  if (!macros || !profile) {
    navigate("/onboarding");
    return null;
  }

  const levelProgress = calculateLevelProgress(stats.xp);

  // Demo data for today's tracking
  const todaysMacros = {
    calories: Math.round(macros.dailyCalories * 0.65),
    protein: Math.round(macros.protein * 0.7),
    carbs: Math.round(macros.carbs * 0.5),
    fats: Math.round(macros.fats * 0.8),
  };

  const quickActions = [
    { icon: UtensilsCrossed, label: "Track Meal", color: "text-[hsl(0,85%,60%)]", action: () => {} },
    { icon: Dumbbell, label: "Log Workout", color: "text-primary", action: () => navigate("/workouts") },
    { icon: MessageCircle, label: "AI Coach", color: "text-[hsl(200,80%,55%)]", action: () => navigate("/coach") },
  ];

  return (
    <div className="min-h-screen bg-background pb-24 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[150px]" />
      
      <div className="max-w-lg mx-auto p-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-6 pt-4"
        >
          <div>
            <p className="text-muted-foreground">Welcome back</p>
            <h1 className="text-2xl font-bold font-display">MacroMaster</h1>
          </div>
          <div className="flex items-center gap-3">
            {/* Streak */}
            <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-warning/20 text-warning">
              <Flame className="w-4 h-4" />
              <span className="font-bold">{stats.streak}</span>
            </div>
            {/* Level */}
            <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-primary/20 text-primary">
              <Trophy className="w-4 h-4" />
              <span className="font-bold">Lv.{stats.level}</span>
            </div>
          </div>
        </motion.div>

        {/* XP Progress */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <GlassCard className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary" />
                <span className="font-medium">Level Progress</span>
              </div>
              <span className="text-sm text-muted-foreground">
                {levelProgress.current} / {levelProgress.needed} XP
              </span>
            </div>
            <ProgressBar 
              value={levelProgress.current} 
              max={levelProgress.needed} 
              color="xp" 
              size="md" 
            />
          </GlassCard>
        </motion.div>

        {/* Calories Remaining */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <GlassCard variant="strong" className="text-center p-6">
            <p className="text-sm text-muted-foreground mb-1">Calories Remaining</p>
            <p className="text-5xl font-bold font-display text-gradient mb-2">
              {macros.dailyCalories - todaysMacros.calories}
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <span>{macros.dailyCalories} goal</span>
              <span>-</span>
              <span>{todaysMacros.calories} consumed</span>
            </div>
          </GlassCard>
        </motion.div>

        {/* Macro Rings */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-6"
        >
          <GlassCard>
            <h3 className="text-lg font-semibold font-display mb-4">Today's Macros</h3>
            <div className="flex justify-around items-center">
              <MacroRing
                value={todaysMacros.protein}
                max={macros.protein}
                color="protein"
                label="Protein"
                size={90}
              />
              <MacroRing
                value={todaysMacros.carbs}
                max={macros.carbs}
                color="carbs"
                label="Carbs"
                size={90}
              />
              <MacroRing
                value={todaysMacros.fats}
                max={macros.fats}
                color="fats"
                label="Fats"
                size={90}
              />
            </div>
          </GlassCard>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-6"
        >
          <h3 className="text-lg font-semibold font-display mb-3">Quick Actions</h3>
          <div className="grid grid-cols-3 gap-3">
            {quickActions.map((action, i) => (
              <button
                key={action.label}
                onClick={action.action}
                className="glass p-4 rounded-xl flex flex-col items-center gap-2 hover:bg-white/10 transition-all"
              >
                <action.icon className={`w-6 h-6 ${action.color}`} />
                <span className="text-xs font-medium">{action.label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Today's Workout */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-6"
        >
          <GlassCard className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-primary/20">
                  <Dumbbell className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">Today's Workout</p>
                  <p className="text-sm text-muted-foreground">Push Day - Chest & Triceps</p>
                </div>
              </div>
              <Button variant="ghost" size="icon">
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </GlassCard>
        </motion.div>

        {/* Next Meal Delivery */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <GlassCard className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-success/20">
                  <Calendar className="w-6 h-6 text-success" />
                </div>
                <div>
                  <p className="font-semibold">Next Delivery</p>
                  <p className="text-sm text-muted-foreground">Monday, 10 meals arriving</p>
                </div>
              </div>
              <Button variant="ghost" size="icon">
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </GlassCard>
        </motion.div>
      </div>

      <BottomNav />
    </div>
  );
}
