import React from "react";
import { useUserStore } from "@/store/userStore";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/button";
import { BottomNav } from "@/components/navigation/BottomNav";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { 
  User,
  Settings,
  Trophy,
  Flame,
  Medal,
  Crown,
  ChevronRight,
  LogOut,
  CreditCard,
  Bell,
  Shield
} from "lucide-react";
import { calculateLevelProgress } from "@/lib/macroCalculator";

const badges = [
  { id: "streak-7", name: "7-Day Streak", icon: "🔥", earned: true },
  { id: "macro-master", name: "Macro Master", icon: "🎯", earned: true },
  { id: "protein-king", name: "Protein King", icon: "🥩", earned: false },
  { id: "consistency", name: "Consistency Beast", icon: "💪", earned: false },
  { id: "no-missed", name: "No Missed Workouts", icon: "🏆", earned: false },
];

export function ProfilePage() {
  const { profile, macros, stats, subscription, reset } = useUserStore();
  const navigate = useNavigate();
  const levelProgress = calculateLevelProgress(stats.xp);

  const menuItems = [
    { icon: CreditCard, label: "Subscription", path: "/subscription" },
    { icon: Bell, label: "Notifications", path: "/notifications" },
    { icon: Shield, label: "Privacy", path: "/privacy" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  const handleLogout = () => {
    reset();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background pb-24 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-primary/10 rounded-full blur-[150px]" />

      <div className="max-w-lg mx-auto p-4 relative z-10">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="pt-4 mb-6"
        >
          <GlassCard variant="strong" className="text-center p-6">
            <div className="w-24 h-24 rounded-full bg-primary/20 border-4 border-primary mx-auto mb-4 flex items-center justify-center">
              <User className="w-12 h-12 text-primary" />
            </div>
            <h1 className="text-2xl font-bold font-display mb-1">MacroMaster</h1>
            <p className="text-muted-foreground mb-4">
              {profile?.goal?.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())} Journey
            </p>

            {/* Level & XP */}
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20">
                <Crown className="w-5 h-5 text-primary" />
                <span className="font-bold">Level {stats.level}</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-warning/20">
                <Flame className="w-5 h-5 text-warning" />
                <span className="font-bold">{stats.streak} day streak</span>
              </div>
            </div>

            <ProgressBar
              value={levelProgress.current}
              max={levelProgress.needed}
              color="xp"
              label={`${levelProgress.current} / ${levelProgress.needed} XP to next level`}
              showLabel
            />
          </GlassCard>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <h2 className="text-lg font-semibold font-display mb-3">Your Stats</h2>
          <div className="grid grid-cols-2 gap-4">
            <GlassCard className="text-center p-4">
              <p className="text-3xl font-bold font-display text-primary">{stats.xp.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">Total XP</p>
            </GlassCard>
            <GlassCard className="text-center p-4">
              <p className="text-3xl font-bold font-display text-primary">{stats.workoutsCompleted}</p>
              <p className="text-sm text-muted-foreground">Workouts</p>
            </GlassCard>
            <GlassCard className="text-center p-4">
              <p className="text-3xl font-bold font-display text-primary">{stats.mealsTracked}</p>
              <p className="text-sm text-muted-foreground">Meals Tracked</p>
            </GlassCard>
            <GlassCard className="text-center p-4">
              <p className="text-3xl font-bold font-display text-primary">{stats.macrosHit}</p>
              <p className="text-sm text-muted-foreground">Macros Hit</p>
            </GlassCard>
          </div>
        </motion.div>

        {/* Badges */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <h2 className="text-lg font-semibold font-display mb-3">Badges</h2>
          <GlassCard className="p-4">
            <div className="flex gap-4 overflow-x-auto pb-2">
              {badges.map((badge) => (
                <div
                  key={badge.id}
                  className={`flex flex-col items-center min-w-[80px] ${
                    !badge.earned && "opacity-40"
                  }`}
                >
                  <div
                    className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl mb-2 ${
                      badge.earned ? "bg-primary/20 shadow-glow" : "bg-secondary"
                    }`}
                  >
                    {badge.icon}
                  </div>
                  <p className="text-xs text-center text-muted-foreground">{badge.name}</p>
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* Menu */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-6"
        >
          <GlassCard className="p-2">
            {menuItems.map((item, i) => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-all"
              >
                <div className="flex items-center gap-3">
                  <item.icon className="w-5 h-5 text-muted-foreground" />
                  <span>{item.label}</span>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </button>
            ))}
          </GlassCard>
        </motion.div>

        {/* Logout */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Button
            variant="ghost"
            onClick={handleLogout}
            className="w-full text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            <LogOut className="w-5 h-5" />
            Log Out
          </Button>
        </motion.div>
      </div>

      <BottomNav />
    </div>
  );
}
