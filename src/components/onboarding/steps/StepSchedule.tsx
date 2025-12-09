import React from "react";
import { useUserStore } from "@/store/userStore";
import { Sun, Moon } from "lucide-react";

export function StepSchedule() {
  const { onboardingData, updateOnboardingData } = useUserStore();

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold font-display mb-2">
          What's your daily schedule?
        </h2>
        <p className="text-muted-foreground">
          We'll time your meals and reminders accordingly
        </p>
      </div>

      <div className="space-y-6 mt-8">
        {/* Wake up time */}
        <div className="flex items-center gap-4 p-4 rounded-xl bg-secondary/30 border border-border/50">
          <div className="p-3 rounded-lg bg-warning/20">
            <Sun className="w-6 h-6 text-warning" />
          </div>
          <div className="flex-1">
            <p className="font-semibold mb-1">Wake up time</p>
            <input
              type="time"
              value={onboardingData.wakeUpTime || "07:00"}
              onChange={(e) => updateOnboardingData({ wakeUpTime: e.target.value })}
              className="w-full bg-background/50 rounded-lg px-4 py-2 border border-border focus:border-primary outline-none"
            />
          </div>
        </div>

        {/* Bed time */}
        <div className="flex items-center gap-4 p-4 rounded-xl bg-secondary/30 border border-border/50">
          <div className="p-3 rounded-lg bg-primary/20">
            <Moon className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1">
            <p className="font-semibold mb-1">Bed time</p>
            <input
              type="time"
              value={onboardingData.bedTime || "23:00"}
              onChange={(e) => updateOnboardingData({ bedTime: e.target.value })}
              className="w-full bg-background/50 rounded-lg px-4 py-2 border border-border focus:border-primary outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
