import React from "react";

/**
 * Props:
 * - value: number (current value)
 * - max: number (max value)
 * - label: string (optional)
 */
const StatsBar = ({ value, max, label }) => {
  const percent = Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <div className="w-full max-w-xs flex flex-col items-start gap-1">
      {label && (
        <span className="text-xs font-mono text-cyan-300 mb-1">{label}</span>
      )}
      <div className="w-full h-6 bg-[#181e2a] border-2 border-cyan-400 rounded-lg flex items-center px-1 shadow-inner relative overflow-hidden" style={{ imageRendering: "pixelated" }}>
        <div
          className="h-4 bg-gradient-to-r from-cyan-400 to-blue-500 rounded transition-all duration-500"
          style={{
            width: `${percent}%`,
            boxShadow: "0 0 8px #22d3ee, 0 0 2px #0ff inset",
            imageRendering: "pixelated",
          }}
        />
        {/* Pixel "notch" effect */}
        <div className="absolute inset-0 flex">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="h-full border-r border-cyan-300/30"
              style={{ width: "10%" }}
            />
          ))}
        </div>
        {/* Value text */}
        <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-mono text-cyan-100 drop-shadow">
          {Math.round(percent)}%
        </span>
      </div>
    </div>
  );
};

export default StatsBar;