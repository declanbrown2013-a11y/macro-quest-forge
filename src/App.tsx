import { supabase } from '../supabaseClient';
import React, { useState, useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useUserStore } from "@/store/userStore";
import Landing from "./pages/Landing";
import { OnboardingQuiz } from "@/components/onboarding/OnboardingQuiz";
import { ResultsPage } from "@/pages/Results";
import { Dashboard } from "@/pages/Dashboard";
import { WorkoutsPage } from "@/pages/Workouts";
import { MealsPage } from "@/pages/Meals";
import { CoachPage } from "@/pages/Coach";
import { ProfilePage } from "@/pages/Profile";
import { SubscriptionPage } from "@/pages/Subscription";
import NotFound from "./pages/NotFound";
const SimpleAuth = ({ onDone }: { onDone: () => void }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState<'login' | 'signup'>('signup');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setError(null);

    try {
      if (mode === 'signup') {
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
      setError(err.message);
    }
  };

  return (
    <div className="flex flex-col gap-3 p-6">
      <h2 className="text-xl font-bold">
        {mode === 'signup' ? 'Create account' : 'Log in'}
      </h2>

      <input
        className="border rounded px-3 py-2 bg-black/40"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="border rounded px-3 py-2 bg-black/40"
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {error && <p className="text-red-400 text-sm">{error}</p>}

      <button
        className="bg-emerald-600 text-white rounded px-4 py-2"
        onClick={handleSubmit}
      >
        {mode === 'signup' ? 'Sign Up' : 'Log In'}
      </button>

      <button
        className="text-xs text-gray-400"
        onClick={() => setMode(mode === 'signup' ? 'login' : 'signup')}
      >
        {mode === 'signup'
          ? 'Already have an account? Log in'
          : "Don’t have an account? Sign up"}
      </button>
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
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/workouts" element={<ProtectedRoute><WorkoutsPage /></ProtectedRoute>} />
          <Route path="/meals" element={<ProtectedRoute><MealsPage /></ProtectedRoute>} />
          <Route path="/coach" element={<ProtectedRoute><CoachPage /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
          <Route path="/subscription" element={<ProtectedRoute><SubscriptionPage /></ProtectedRoute>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
