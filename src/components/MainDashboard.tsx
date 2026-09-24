import React, { useState, useEffect } from "react";
import type { UserProfile } from "../types";

interface Props {
  profile: UserProfile;
  multiplier: number;
  choiceCount: number;
  onOpenEvent: () => void;
}

const HEALTH_EXPECTANCY = { male: 72.68, female: 75.38 };

export const MainDashboard: React.FC<Props> = ({
  profile,
  multiplier,
  choiceCount,
  onOpenEvent,
}) => {
  const [percentage, setPercentage] = useState<string>("0.0000000");
  const [progressWidth, setProgressWidth] = useState<number>(0);

  useEffect(() => {
    let animationFrameId: number;

    const updateBattery = () => {
      const birthDate = new Date(profile.birthDate);
      const targetAge = HEALTH_EXPECTANCY[profile.gender];

      const targetDate = new Date(birthDate);
      targetDate.setFullYear(targetDate.getFullYear() + Math.floor(targetAge));
      targetDate.setDate(
        targetDate.getDate() + Math.round((targetAge % 1) * 365.25),
      );

      const now = new Date();
      const totalLifetimeMs = targetDate.getTime() - birthDate.getTime();
      const elapsedMs = now.getTime() - birthDate.getTime();

      const consumedRatio = elapsedMs / totalLifetimeMs;
      const effectiveConsumedRatio = consumedRatio * multiplier;
      let remainingPercentage = (1.0 - effectiveConsumedRatio) * 100;

      remainingPercentage = Math.max(0, Math.min(100, remainingPercentage));

      setPercentage(remainingPercentage.toFixed(7));
      setProgressWidth(remainingPercentage);

      animationFrameId = requestAnimationFrame(updateBattery);
    };

    updateBattery();

    return () => cancelAnimationFrame(animationFrameId);
  }, [profile, multiplier]);

  return (
    <div className="w-full max-w-md glass-panel rounded-3xl p-7 relative z-10 space-y-6">
      {/* ユーザー情報 */}
      <div className="flex justify-between items-center text-xs text-slate-500 font-medium px-1">
        <div>
          <span className="font-semibold text-slate-800">{profile.name}</span>{" "}
          のライフメーター
        </div>
        <div>
          選択回数:{" "}
          <span className="font-mono text-slate-700 font-bold">
            {choiceCount}
          </span>
        </div>
      </div>

      {/* バッテリー表示領域 */}
      <div className="bg-white/60 rounded-2xl p-6 border border-white/80 text-center relative overflow-hidden shadow-inner">
        {/* 残量バー（自然なグリーン〜アンバーのグラデーション） */}
        <div
          className="absolute bottom-0 left-0 top-0 bg-gradient-to-r from-emerald-100/60 to-emerald-200/50 transition-all duration-300"
          style={{ width: `${progressWidth}%` }}
        />

        <div className="relative z-10 space-y-3">
          <div className="text-[10px] font-semibold text-slate-400 tracking-widest uppercase">
            Remaining Health Life
          </div>

          <div className="text-3xl font-mono font-bold text-slate-800 tracking-tight font-mono">
            {percentage}
            <span className="text-xl text-slate-500 font-normal">%</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 border border-slate-200/60 text-xs shadow-sm">
            <span className="text-slate-500">放電速度:</span>
            <span
              className={`font-bold font-mono ${
                multiplier > 1.0
                  ? "text-rose-600"
                  : multiplier < 1.0
                    ? "text-emerald-600"
                    : "text-slate-700"
              }`}
            >
              {multiplier.toFixed(2)}x
            </span>
          </div>
        </div>
      </div>

      {/* 行動選択ボタン */}
      <button
        onClick={onOpenEvent}
        className="w-full bg-slate-900 hover:bg-slate-800 text-white font-medium py-3.5 rounded-2xl shadow-sm transition-all active:scale-[0.98] text-xs tracking-wide"
      >
        日常の選択を進める
      </button>
    </div>
  );
};
