import React, { useState } from "react";
import { useUserStore } from "@/store/userStore";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/button";
import { BottomNav } from "@/components/navigation/BottomNav";
import { 
  Dumbbell, 
  Play, 
  Check, 
  ChevronRight,
  Flame,
  Trophy,
  RotateCcw
} from "lucide-react";

interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: string;
  weight?: string;
  completed: boolean;
}

interface WorkoutDay {
  id: string;
  name: string;
  muscleGroups: string[];
  exercises: Exercise[];
  completed: boolean;
}

const mockWorkoutPlan: WorkoutDay[] = [
  {
    id: "1",
    name: "Push Day",
    muscleGroups: ["Chest", "Shoulders", "Triceps"],
    exercises: [
      { id: "1", name: "Bench Press", sets: 4, reps: "8-10", weight: "80kg", completed: false },
      { id: "2", name: "Overhead Press", sets: 3, reps: "8-10", weight: "40kg", completed: false },
      { id: "3", name: "Incline Dumbbell Press", sets: 3, reps: "10-12", weight: "30kg", completed: false },
      { id: "4", name: "Lateral Raises", sets: 3, reps: "12-15", weight: "10kg", completed: false },
      { id: "5", name: "Tricep Pushdowns", sets: 3, reps: "12-15", weight: "25kg", completed: false },
    ],
    completed: false,
  },
  {
    id: "2",
    name: "Pull Day",
    muscleGroups: ["Back", "Biceps", "Rear Delts"],
    exercises: [
      { id: "1", name: "Deadlifts", sets: 4, reps: "5-6", weight: "120kg", completed: false },
      { id: "2", name: "Pull-Ups", sets: 4, reps: "8-10", completed: false },
      { id: "3", name: "Barbell Rows", sets: 3, reps: "8-10", weight: "70kg", completed: false },
      { id: "4", name: "Face Pulls", sets: 3, reps: "15-20", weight: "15kg", completed: false },
      { id: "5", name: "Barbell Curls", sets: 3, reps: "10-12", weight: "30kg", completed: false },
    ],
    completed: false,
  },
  {
    id: "3",
    name: "Leg Day",
    muscleGroups: ["Quads", "Hamstrings", "Glutes"],
    exercises: [
      { id: "1", name: "Squats", sets: 4, reps: "6-8", weight: "100kg", completed: false },
      { id: "2", name: "Romanian Deadlifts", sets: 3, reps: "10-12", weight: "80kg", completed: false },
      { id: "3", name: "Leg Press", sets: 3, reps: "10-12", weight: "150kg", completed: false },
      { id: "4", name: "Leg Curls", sets: 3, reps: "12-15", weight: "40kg", completed: false },
      { id: "5", name: "Calf Raises", sets: 4, reps: "15-20", weight: "60kg", completed: false },
    ],
    completed: false,
  },
];

export function WorkoutsPage() {
  const { addXP } = useUserStore();
  const [workouts, setWorkouts] = useState(mockWorkoutPlan);
  const [activeWorkout, setActiveWorkout] = useState<WorkoutDay | null>(null);

  const toggleExercise = (exerciseId: string) => {
    if (!activeWorkout) return;
    
    setActiveWorkout({
      ...activeWorkout,
      exercises: activeWorkout.exercises.map((ex) =>
        ex.id === exerciseId ? { ...ex, completed: !ex.completed } : ex
      ),
    });
  };

  const completeWorkout = () => {
    if (!activeWorkout) return;
    
    addXP(50);
    setWorkouts(
      workouts.map((w) =>
        w.id === activeWorkout.id ? { ...w, completed: true } : w
      )
    );
    setActiveWorkout(null);
  };

  const completedCount = activeWorkout?.exercises.filter((e) => e.completed).length || 0;
  const totalExercises = activeWorkout?.exercises.length || 0;

  return (
    <div className="min-h-screen bg-background pb-24 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-primary/10 rounded-full blur-[150px]" />

      <div className="max-w-lg mx-auto p-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="pt-4 mb-6"
        >
          <h1 className="text-2xl font-bold font-display mb-1">Workouts</h1>
          <p className="text-muted-foreground">Your personalized training program</p>
        </motion.div>

        {activeWorkout ? (
          /* Active Workout View */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <GlassCard variant="glow" className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold font-display">{activeWorkout.name}</h2>
                  <p className="text-sm text-muted-foreground">
                    {activeWorkout.muscleGroups.join(" • ")}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-primary">
                    {completedCount}/{totalExercises}
                  </p>
                  <p className="text-xs text-muted-foreground">Completed</p>
                </div>
              </div>

              <div className="space-y-3">
                {activeWorkout.exercises.map((exercise) => (
                  <button
                    key={exercise.id}
                    onClick={() => toggleExercise(exercise.id)}
                    className={`w-full p-4 rounded-xl border-2 transition-all flex items-center gap-4 ${
                      exercise.completed
                        ? "border-primary bg-primary/10"
                        : "border-border/50 bg-secondary/30"
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        exercise.completed
                          ? "border-primary bg-primary"
                          : "border-muted-foreground"
                      }`}
                    >
                      {exercise.completed && <Check className="w-4 h-4 text-primary-foreground" />}
                    </div>
                    <div className="flex-1 text-left">
                      <p className={`font-medium ${exercise.completed ? "line-through text-muted-foreground" : ""}`}>
                        {exercise.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {exercise.sets} sets × {exercise.reps} reps
                        {exercise.weight && ` @ ${exercise.weight}`}
                      </p>
                    </div>
                    <RotateCcw className="w-4 h-4 text-muted-foreground" />
                  </button>
                ))}
              </div>

              <div className="flex gap-3 mt-6">
                <Button
                  variant="ghost"
                  onClick={() => setActiveWorkout(null)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  variant="premium"
                  onClick={completeWorkout}
                  disabled={completedCount < totalExercises}
                  className="flex-1"
                >
                  <Trophy className="w-4 h-4" />
                  Complete (+50 XP)
                </Button>
              </div>
            </GlassCard>
          </motion.div>
        ) : (
          /* Workout List */
          <div className="space-y-4">
            {workouts.map((workout, i) => (
              <motion.div
                key={workout.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <GlassCard className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-xl ${workout.completed ? "bg-success/20" : "bg-primary/20"}`}>
                        {workout.completed ? (
                          <Check className="w-6 h-6 text-success" />
                        ) : (
                          <Dumbbell className="w-6 h-6 text-primary" />
                        )}
                      </div>
                      <div>
                        <p className="font-semibold">{workout.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {workout.muscleGroups.join(" • ")}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {workout.exercises.length} exercises
                        </p>
                      </div>
                    </div>
                    {!workout.completed && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setActiveWorkout(workout)}
                      >
                        <Play className="w-4 h-4" />
                        Start
                      </Button>
                    )}
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
