import React, { useState, useEffect } from "react";
import type { LifeEvent } from "../types";
import { EVENT_POOL } from "../constants/eventPool";

interface Props {
  onSelect: (event: LifeEvent) => void;
  onClose: () => void;
}

export const EventModal: React.FC<Props> = ({ onSelect, onClose }) => {
  const [choices, setChoices] = useState<LifeEvent[]>([]);

  useEffect(() => {
    const shuffled = [...EVENT_POOL].sort(() => 0.5 - Math.random());
    setChoices(shuffled.slice(0, 3));
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/30 backdrop-blur-sm">
      <div className="w-full max-w-md glass-panel rounded-3xl p-6 relative z-10 space-y-4 shadow-xl">
        {/* ヘッダー */}
        <div className="flex justify-between items-center border-b border-slate-300/60 pb-3">
          <div>
            <h2 className="text-sm font-bold text-slate-900">日常の選択</h2>
            <p className="text-[10px] text-slate-600">
              ふとした行動を選んでください
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-800 text-xs px-2 py-1 transition font-medium"
          >
            閉じる
          </button>
        </div>

        {/* 選択肢リスト */}
        <div className="space-y-2.5">
          {choices.map((item) => (
            <button
              key={item.id}
              onClick={() => onSelect(item)}
              className="w-full text-left glass-card glass-card-hover p-4 rounded-2xl transition-all group active:scale-[0.99] shadow-sm"
            >
              <div className="space-y-1">
                <div className="text-[11px] text-slate-500 font-semibold">
                  {item.title}
                </div>
                <div className="text-xs font-bold text-slate-800 group-hover:text-slate-950 leading-relaxed">
                  {item.choice}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
