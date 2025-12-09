// src/pages/Onboarding.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "@/store/userStore";

const Onboarding = () => {
  const navigate = useNavigate();
  const { completeOnboarding } = useUserStore();

  const handleDone = () => {
    completeOnboarding();
    navigate("/results");
  };

  return (
    <div>
      <h1>Onboarding</h1>
      <p>TODO: add your full quiz UI here.</p>
      <button onClick={handleDone}>Finish Onboarding</button>
    </div>
  );
};

export default Onboarding;
