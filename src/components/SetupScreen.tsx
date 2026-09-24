import React, { useState } from "react";
import type { UserProfile, Gender } from "../types";

interface Props {
  onComplete: (profile: UserProfile) => void;
}

export const SetupScreen: React.FC<Props> = ({ onComplete }) => {
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("2000-01-01");
  const [gender, setGender] = useState<Gender>("male");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!birthDate) return;
    onComplete({ name: name || "User", birthDate, gender });
  };

  return (
    <div className="w-full max-w-md bg-white/60 backdrop-blur-xl border border-slate-300/80 rounded-3xl p-8 shadow-2xl relative z-10 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-light tracking-wide text-slate-900/90">
          Life Battery
        </h1>
        <p className="text-xs text-slate-600">
          健康寿命を基準にしたあなたのライフメーターを設定します。
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-1">
          <label className="text-xs text-slate-900/70 font-medium pl-1">
            ニックネーム
          </label>
          <input
            type="text"
            placeholder="例: 山田 太郎"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-white/5 border border-slate-300/80 rounded-2xl p-3.5 text-sm text-slate-900 placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 transition"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs text-slate-600 font-medium pl-1">
            生年月日
          </label>
          <input
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className="w-full bg-white/5 border border-slate-300/80 rounded-2xl p-3.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 transition [color-scheme:dark]"
          />
          <p className="text-xs text-justify">
            ※入力された情報は処理にのみ使用され、サーバーや端末に記録・保存されることはありません
          </p>
        </div>

        <div className="space-y-1">
          <label className="text-xs text-slate-600 font-medium pl-1">
            性別（健康寿命算出用）
          </label>
          <div className="grid grid-cols-2 gap-3">
            {(["male", "female"] as Gender[]).map((g) => (
              <button
                type="button"
                key={g}
                onClick={() => setGender(g)}
                className={`p-3 rounded-2xl border text-xs font-medium transition ${
                  gender === g
                    ? "bg-white/20 border-slate-500/80 text-slate-900 shadow-lg"
                    : "bg-white/5 border-slate-300/80 text-slate-600 hover:bg-white/60"
                }`}
              >
                {g === "male" ? "男性 (72.68歳)" : "女性 (75.38歳)"}
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full mt-4 bg-emerald-500/80 hover:bg-emerald-400 text-slate-900 font-medium py-4 rounded-2xl backdrop-blur-md border border-emerald-300/30 shadow-lg shadow-emerald-900/30 transition-all active:scale-[0.98]"
        >
          バッテリーを起動する
        </button>
      </form>
    </div>
  );
};
