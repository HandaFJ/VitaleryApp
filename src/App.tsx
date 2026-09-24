import React, { useState } from "react";
import type { UserProfile, LifeEvent, ScreenState } from "./types";
import { SetupScreen } from "./components/SetupScreen";
import { MainDashboard } from "./components/MainDashboard";
import { EventModal } from "./components/EventModal";

export const App: React.FC = () => {
  const [screen, setScreen] = useState<ScreenState>("setup");
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [multiplier, setMultiplier] = useState<number>(1.0);
  const [isEventOpen, setIsEventOpen] = useState<boolean>(false);
  const [choiceCount, setChoiceCount] = useState<number>(0);

  const handleSetupComplete = (userProfile: UserProfile) => {
    setProfile(userProfile);
    setScreen("dashboard");
  };

  const handleSelectEvent = (event: LifeEvent) => {
    setMultiplier((prev) => Math.max(0.1, prev + event.effect));
    setChoiceCount((prev) => prev + 1);
    setIsEventOpen(false);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-amber-50/30 to-emerald-50/40 text-slate-800 flex items-center justify-center p-4 relative overflow-hidden">
      {/* 柔らかい自然光のようなバックライトオーラ */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-emerald-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-amber-200/40 rounded-full blur-3xl pointer-events-none" />

      {/* コンテンツエリア */}
      {screen === "setup" && <SetupScreen onComplete={handleSetupComplete} />}

      {screen === "dashboard" && profile && (
        <MainDashboard
          profile={profile}
          multiplier={multiplier}
          choiceCount={choiceCount}
          onOpenEvent={() => setIsEventOpen(true)}
        />
      )}

      {isEventOpen && (
        <EventModal
          onSelect={handleSelectEvent}
          onClose={() => setIsEventOpen(false)}
        />
      )}
    </div>
  );
};

export default App;
