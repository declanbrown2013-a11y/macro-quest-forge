import React, { useState } from "react";
import { useUserStore } from "@/store/userStore";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/button";
import { BottomNav } from "@/components/navigation/BottomNav";
import { 
  UtensilsCrossed, 
  Plus, 
  Minus, 
  ShoppingCart,
  Check,
  Flame,
  Sparkles,
  ChevronRight
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Meal {
  id: string;
  name: string;
  image: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  price: number;
  category: "fat-loss" | "balanced" | "bulk";
}

const mockMeals: Meal[] = [
  {
    id: "1",
    name: "Grilled Chicken & Quinoa",
    image: "🍗",
    calories: 450,
    protein: 42,
    carbs: 38,
    fats: 12,
    price: 8.99,
    category: "fat-loss",
  },
  {
    id: "2",
    name: "Salmon with Sweet Potato",
    image: "🐟",
    calories: 520,
    protein: 38,
    carbs: 42,
    fats: 18,
    price: 12.99,
    category: "balanced",
  },
  {
    id: "3",
    name: "Beef Stir Fry & Rice",
    image: "🥩",
    calories: 620,
    protein: 45,
    carbs: 55,
    fats: 22,
    price: 10.99,
    category: "bulk",
  },
  {
    id: "4",
    name: "Turkey Meatballs & Pasta",
    image: "🍝",
    calories: 580,
    protein: 40,
    carbs: 52,
    fats: 16,
    price: 9.99,
    category: "balanced",
  },
  {
    id: "5",
    name: "Lean Beef Burger Bowl",
    image: "🍔",
    calories: 490,
    protein: 38,
    carbs: 35,
    fats: 20,
    price: 11.99,
    category: "fat-loss",
  },
  {
    id: "6",
    name: "Chicken Tikka & Basmati",
    image: "🍛",
    calories: 550,
    protein: 44,
    carbs: 48,
    fats: 14,
    price: 9.49,
    category: "balanced",
  },
];

export function MealsPage() {
  const { macros, subscription } = useUserStore();
  const navigate = useNavigate();
  const [selectedMeals, setSelectedMeals] = useState<Record<string, number>>({});
  const [filter, setFilter] = useState<"all" | "fat-loss" | "balanced" | "bulk">("all");

  const filteredMeals = filter === "all" 
    ? mockMeals 
    : mockMeals.filter(m => m.category === filter);

  const addMeal = (id: string) => {
    setSelectedMeals((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const removeMeal = (id: string) => {
    setSelectedMeals((prev) => {
      const count = prev[id] || 0;
      if (count <= 1) {
        const { [id]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [id]: count - 1 };
    });
  };

  const totalMeals = Object.values(selectedMeals).reduce((a, b) => a + b, 0);
  const totalCalories = Object.entries(selectedMeals).reduce((total, [id, count]) => {
    const meal = mockMeals.find((m) => m.id === id);
    return total + (meal?.calories || 0) * count;
  }, 0);
  const totalPrice = Object.entries(selectedMeals).reduce((total, [id, count]) => {
    const meal = mockMeals.find((m) => m.id === id);
    return total + (meal?.price || 0) * count;
  }, 0);

  return (
    <div className="min-h-screen bg-background pb-24 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-primary/10 rounded-full blur-[150px]" />

      <div className="max-w-lg mx-auto p-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="pt-4 mb-6"
        >
          <h1 className="text-2xl font-bold font-display mb-1">Meal Prep</h1>
          <p className="text-muted-foreground">Build your weekly meal box</p>
        </motion.div>

        {/* Subscription Status */}
        {!subscription.tier && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <GlassCard variant="glow" className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">Unlock Meal Prep</p>
                  <p className="text-sm text-muted-foreground">Subscribe to order meals</p>
                </div>
                <Button variant="premium" size="sm" onClick={() => navigate("/subscription")}>
                  <Sparkles className="w-4 h-4" />
                  Subscribe
                </Button>
              </div>
            </GlassCard>
          </motion.div>
        )}

        {/* Filter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex gap-2 mb-6 overflow-x-auto pb-2"
        >
          {["all", "fat-loss", "balanced", "bulk"].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat as any)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                filter === cat
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {cat === "all" ? "All Meals" : cat.charAt(0).toUpperCase() + cat.slice(1).replace("-", " ")}
            </button>
          ))}
        </motion.div>

        {/* Meals Grid */}
        <div className="space-y-4 mb-6">
          {filteredMeals.map((meal, i) => (
            <motion.div
              key={meal.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <GlassCard className="p-4">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">{meal.image}</div>
                  <div className="flex-1">
                    <p className="font-semibold mb-1">{meal.name}</p>
                    <div className="flex gap-3 text-xs text-muted-foreground mb-2">
                      <span>{meal.calories} kcal</span>
                      <span className="text-[hsl(0,85%,60%)]">{meal.protein}g P</span>
                      <span className="text-[hsl(45,100%,55%)]">{meal.carbs}g C</span>
                      <span className="text-[hsl(200,80%,55%)]">{meal.fats}g F</span>
                    </div>
                    <p className="text-primary font-semibold">£{meal.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {selectedMeals[meal.id] ? (
                      <>
                        <button
                          onClick={() => removeMeal(meal.id)}
                          className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center font-bold">{selectedMeals[meal.id]}</span>
                        <button
                          onClick={() => addMeal(meal.id)}
                          className="w-8 h-8 rounded-full bg-primary flex items-center justify-center"
                        >
                          <Plus className="w-4 h-4 text-primary-foreground" />
                        </button>
                      </>
                    ) : (
                      <Button variant="outline" size="sm" onClick={() => addMeal(meal.id)}>
                        <Plus className="w-4 h-4" />
                        Add
                      </Button>
                    )}
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Cart Summary */}
        {totalMeals > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-20 left-4 right-4 max-w-lg mx-auto"
          >
            <GlassCard variant="strong" className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">{totalMeals} meals selected</p>
                  <p className="text-sm text-muted-foreground">
                    {totalCalories} kcal • £{totalPrice.toFixed(2)}
                  </p>
                </div>
                <Button variant="premium">
                  <ShoppingCart className="w-4 h-4" />
                  Checkout
                </Button>
              </div>
            </GlassCard>
          </motion.div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
