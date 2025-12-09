import React from "react";
import { useUserStore } from "@/store/userStore";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/button";
import { 
  Check, 
  Sparkles, 
  Dumbbell,
  UtensilsCrossed,
  Crown,
  Zap,
  ArrowLeft
} from "lucide-react";

interface PlanFeature {
  text: string;
  included: boolean;
}

interface Plan {
  id: "basic" | "pro" | "elite";
  name: string;
  price: { gbp: number; usd: number };
  description: string;
  features: PlanFeature[];
  popular?: boolean;
}

const plans: Plan[] = [
  {
    id: "basic",
    name: "Basic",
    price: { gbp: 39, usd: 49 },
    description: "Coaching only",
    features: [
      { text: "Personalized macro calculations", included: true },
      { text: "Custom workout plans", included: true },
      { text: "AI coach access", included: true },
      { text: "Progress tracking & gamification", included: true },
      { text: "Meal prep delivery", included: false },
      { text: "Priority support", included: false },
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: { gbp: 99, usd: 99 },
    description: "Coaching + 6-10 meals/week",
    popular: true,
    features: [
      { text: "Everything in Basic", included: true },
      { text: "6-10 prepared meals per week", included: true },
      { text: "Macro-matched meal selection", included: true },
      { text: "Weekly meal delivery", included: true },
      { text: "Meal swap flexibility", included: true },
      { text: "Custom meal requests", included: false },
    ],
  },
  {
    id: "elite",
    name: "Elite",
    price: { gbp: 199, usd: 199 },
    description: "Full experience + priority",
    features: [
      { text: "Everything in Pro", included: true },
      { text: "14-20 prepared meals per week", included: true },
      { text: "Custom meal requests", included: true },
      { text: "Priority delivery scheduling", included: true },
      { text: "1-on-1 coaching calls", included: true },
      { text: "VIP support", included: true },
    ],
  },
];

export function SubscriptionPage() {
  const { subscription, updateSubscription } = useUserStore();
  const navigate = useNavigate();

  const handleSubscribe = (planId: "basic" | "pro" | "elite") => {
    // In a real app, this would redirect to Stripe checkout
    updateSubscription({ tier: planId, status: "active" });
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/15 rounded-full blur-[200px]" />

      <div className="max-w-4xl mx-auto p-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="pt-4 mb-8"
        >
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <div className="text-center">
            <h1 className="text-3xl font-bold font-display mb-2">Choose Your Plan</h1>
            <p className="text-muted-foreground">
              Unlock your full potential with MacroMasters
            </p>
          </div>
        </motion.div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <GlassCard
                variant={plan.popular ? "glow" : "default"}
                className={`relative h-full flex flex-col ${plan.popular ? "border-primary" : ""}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1 rounded-full bg-primary text-primary-foreground text-xs font-bold uppercase">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/20 mb-4">
                    {plan.id === "basic" && <Dumbbell className="w-7 h-7 text-primary" />}
                    {plan.id === "pro" && <UtensilsCrossed className="w-7 h-7 text-primary" />}
                    {plan.id === "elite" && <Crown className="w-7 h-7 text-primary" />}
                  </div>
                  <h2 className="text-2xl font-bold font-display">{plan.name}</h2>
                  <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-bold font-display">£{plan.price.gbp}</span>
                    <span className="text-muted-foreground">/mo</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">${plan.price.usd} USD</p>
                </div>

                <div className="space-y-3 flex-1">
                  {plan.features.map((feature, j) => (
                    <div key={j} className="flex items-start gap-3">
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                          feature.included ? "bg-primary/20" : "bg-secondary"
                        }`}
                      >
                        {feature.included ? (
                          <Check className="w-3 h-3 text-primary" />
                        ) : (
                          <span className="w-2 h-2 bg-muted-foreground/30 rounded-full" />
                        )}
                      </div>
                      <span
                        className={`text-sm ${
                          feature.included ? "text-foreground" : "text-muted-foreground"
                        }`}
                      >
                        {feature.text}
                      </span>
                    </div>
                  ))}
                </div>

                <Button
                  variant={plan.popular ? "premium" : "outline"}
                  className="w-full mt-6"
                  onClick={() => handleSubscribe(plan.id)}
                  disabled={subscription.tier === plan.id}
                >
                  {subscription.tier === plan.id ? (
                    <>
                      <Check className="w-4 h-4" />
                      Current Plan
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4" />
                      Get Started
                    </>
                  )}
                </Button>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* FAQ or Trust badges could go here */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center text-sm text-muted-foreground pb-8"
        >
          <p>Cancel anytime • 7-day money-back guarantee • Secure payment via Stripe</p>
        </motion.div>
      </div>
    </div>
  );
}
