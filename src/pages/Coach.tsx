import React, { useState, useRef, useEffect } from "react";
import { useUserStore } from "@/store/userStore";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/button";
import { BottomNav } from "@/components/navigation/BottomNav";
import { 
  Send, 
  Bot, 
  User,
  Sparkles,
  Dumbbell,
  Utensils,
  TrendingUp
} from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const quickPrompts = [
  { icon: Utensils, label: "Meal suggestions", prompt: "What should I eat for my next meal to hit my macros?" },
  { icon: Dumbbell, label: "Workout tips", prompt: "How can I improve my workout performance?" },
  { icon: TrendingUp, label: "Break plateau", prompt: "I've hit a plateau. How do I break through?" },
];

export function CoachPage() {
  const { profile, macros } = useUserStore();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: `Hey there, MacroMaster! 💪 I'm your personal AI coach. I can see you're on a ${profile?.goal?.replace("-", " ")} journey with ${macros?.dailyCalories} daily calories. How can I help you crush your goals today?`,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateResponse = (userMessage: string): string => {
    const responses = [
      `Based on your ${profile?.goal?.replace("-", " ")} goal and ${macros?.protein}g protein target, I recommend focusing on lean protein sources like chicken breast, fish, or Greek yogurt. For your next meal, try grilled salmon with roasted vegetables – it's macro-friendly and delicious!`,
      `Great question! To optimize your ${profile?.trainingDaysPerWeek}-day training split, make sure you're progressively overloading each week. Add 2.5kg to your compounds or an extra rep. Recovery is key – you're sleeping from ${profile?.wakeUpTime} schedule, so aim for 7-8 hours.`,
      `I understand plateaus can be frustrating. With your current ${macros?.dailyCalories} calorie target, consider a strategic refeed day at maintenance (${macros?.tdee} calories) once per week. This can boost metabolism and break through stalls. Also, try changing exercise variations!`,
      `You're doing amazing! Remember, consistency beats perfection. Your ${profile?.mealsPerDay} meals per day structure is solid. Focus on hitting your ${macros?.protein}g protein first, then fill in carbs and fats. Don't stress about being perfect every day – progress is progress! 🔥`,
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: generateResponse(content),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background pb-24 relative overflow-hidden flex flex-col">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[150px]" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-4 pt-6 border-b border-border/50"
      >
        <div className="max-w-lg mx-auto flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
            <Bot className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold font-display">AI Coach</h1>
            <p className="text-sm text-muted-foreground">Your 24/7 fitness advisor</p>
          </div>
        </div>
      </motion.div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-lg mx-auto space-y-4">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 ${message.role === "user" ? "justify-end" : ""}`}
            >
              {message.role === "assistant" && (
                <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-primary" />
                </div>
              )}
              <div
                className={`max-w-[80%] p-4 rounded-2xl ${
                  message.role === "user"
                    ? "bg-primary text-primary-foreground rounded-br-none"
                    : "glass rounded-bl-none"
                }`}
              >
                <p className="text-sm leading-relaxed">{message.content}</p>
              </div>
              {message.role === "user" && (
                <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4" />
                </div>
              )}
            </motion.div>
          ))}

          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex gap-3"
            >
              <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                <Bot className="w-4 h-4 text-primary" />
              </div>
              <div className="glass p-4 rounded-2xl rounded-bl-none">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                  <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-100" />
                  <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-200" />
                </div>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Quick Prompts */}
      {messages.length <= 2 && (
        <div className="p-4 pt-0">
          <div className="max-w-lg mx-auto flex gap-2 overflow-x-auto pb-2">
            {quickPrompts.map((prompt) => (
              <button
                key={prompt.label}
                onClick={() => sendMessage(prompt.prompt)}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-sm whitespace-nowrap hover:bg-secondary/80 transition-all"
              >
                <prompt.icon className="w-4 h-4 text-primary" />
                {prompt.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-4 border-t border-border/50">
        <div className="max-w-lg mx-auto flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
            placeholder="Ask your coach anything..."
            className="flex-1 px-4 py-3 rounded-xl bg-secondary border border-border focus:border-primary outline-none"
          />
          <Button
            variant="premium"
            size="icon"
            onClick={() => sendMessage(input)}
            disabled={!input.trim()}
            className="w-12 h-12"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
