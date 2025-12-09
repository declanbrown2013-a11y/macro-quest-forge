import OnboardingQuiz from "@/pages/Onboarding";
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

import Landing from "@/pages/Landing";
import OnboardingQuiz from "@/pages/Onboarding";
import ResultsPage from "@/pages/Results";
import Dashboard from "@/pages/Dashboard";
import WorkoutsPage from "@/pages/Workouts";
import MealsPage from "@/pages/Meals";
import CoachPage from "@/pages/Coach";
import ProfilePage from "@/pages/Profile";
import SubscriptionPage from "@/pages/Subscription";
import NotFound from "@/pages/NotFound";

import useUserStore from "@/store/userStore";
import { supabase } from "./supabaseClient";

const SimpleAuth = ({ onDone }: { onDone: () => void }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"login" | "signup">("signup");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setError(null);

    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
      }

      onDone();
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black">
      <div className="w-full max-w-md rounded-xl border border-emerald-700/40 bg-zinc-900/80 p-6 shadow-xl">
        <h2 className="mb-4 text-center text-2xl font-bold text-white">
          {mode === "signup" ? "Create your MacroMasters account" : "Welcome back"}
        </h2>

        <div className="mb-4 space-y-3">
          <input
            className="w-full rounded border border-zinc-700 bg-black/40 px-3 py-2 text-sm text-white outline-none"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="w-full rounded border border-zinc-700 bg-black/40 px-3 py-2 text-sm text-white outline-none"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && (
            <p className="text-xs text-red-400">
              {error}
            </p>
          )}
        </div>

        <button
          className="mb-3 w-full rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white"
          onClick={handleSubmit}
        >
          {mode === "signup" ? "Sign Up" : "Log In"}
        </button>

        <button
          className="w-full text-center text-xs text-zinc-400"
          onClick={() =>
            setMode(mode === "signup" ? "login" : "signup")
          }
        >
          {mode === "signup"
            ? "Already have an account? Log in"
            : "Don’t have an account? Sign up"}
        </button>
      </div>
    </div>
  );
};

const queryClient = new QueryClient();

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isOnboardingComplete } = useUserStore();

  if (!isOnboardingComplete) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

const App = () => {
  const [checking, setChecking] = useState(true);
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) setAuthed(true);
      setChecking(false);
    });
  }, []);

  if (checking) return null;

  if (!authed) {
    return <SimpleAuth onDone={() => setAuthed(true)} />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/onboarding" element={<OnboardingQuiz />} />
            <Route path="/results" element={<ResultsPage />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/workouts"
              element={
                <ProtectedRoute>
                  <WorkoutsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/meals"
              element={
                <ProtectedRoute>
                  <MealsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/coach"
              element={
                <ProtectedRoute>
                  <CoachPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/subscription"
              element={
                <ProtectedRoute>
                  <SubscriptionPage />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;

