import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  Sparkles, 
  Flame, 
  Trophy, 
  Zap,
  ChevronRight,
  Target,
  Utensils,
  Dumbbell
} from "lucide-react";

export function Landing() {
  const navigate = useNavigate();

  const features = [
    {
      icon: Target,
      title: "Science-Based Macros",
      description: "Personalized nutrition using Mifflin-St Jeor equation",
    },
    {
      icon: Utensils,
      title: "Meal Prep Delivered",
      description: "Chef-prepared meals matched to your exact macros",
    },
    {
      icon: Dumbbell,
      title: "Custom Workouts",
      description: "AI-generated training programs for your goals",
    },
    {
      icon: Trophy,
      title: "Gamified Progress",
      description: "XP, levels, badges, and leaderboards to keep you motivated",
    },
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[200px]" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[150px]" />
      
      <div className="max-w-lg mx-auto px-4 relative z-10">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="pt-16 pb-8 text-center"
        >
          {/* Logo */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/20 border border-primary/30 shadow-glow mb-4">
              <Flame className="w-10 h-10 text-primary" />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-6xl font-bold font-display mb-4"
          >
            <span className="text-gradient">MACRO</span>
            <span className="text-foreground">MASTERS</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-muted-foreground mb-8"
          >
            Transform your body with science-based nutrition and elite coaching
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex justify-center gap-8 mb-10"
          >
            <div className="text-center">
              <p className="text-3xl font-bold font-display text-gradient">50K+</p>
              <p className="text-sm text-muted-foreground">Users</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold font-display text-gradient">2M+</p>
              <p className="text-sm text-muted-foreground">Meals Delivered</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold font-display text-gradient">4.9★</p>
              <p className="text-sm text-muted-foreground">Rating</p>
            </div>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Button
              variant="hero"
              size="xl"
              onClick={() => navigate("/onboarding")}
              className="w-full md:w-auto"
            >
              <Sparkles className="w-5 h-5" />
              Start Your Transformation
              <ChevronRight className="w-5 h-5" />
            </Button>
          </motion.div>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="space-y-4 pb-16"
        >
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 + i * 0.1 }}
              className="glass p-4 rounded-xl flex items-center gap-4"
            >
              <div className="p-3 rounded-lg bg-primary/20">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export default Landing;
