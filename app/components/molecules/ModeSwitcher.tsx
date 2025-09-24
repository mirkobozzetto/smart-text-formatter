"use client";

import { FormattingMode } from "../../types";
import { useState, useEffect } from "react";

interface ModeSwitcherProps {
  currentMode: FormattingMode;
  onModeChange: (mode: FormattingMode) => void;
}

const modeConfig = {
  mobile: {
    label: "Mobile",
    description: "45-60 characters per line",
    icon: "M",
    gradient: "from-blue-500 to-cyan-500",
  },
  conventional: {
    label: "Conventional",
    description: "Standard paragraph formatting",
    icon: "C",
    gradient: "from-emerald-500 to-teal-500",
  },
  "speed-reading": {
    label: "Speed Reading",
    description: "RSVP, Bionic, Chunking",
    icon: "S",
    gradient: "from-purple-500 to-pink-500",
  },
} as const;

export const ModeSwitcher = ({
  currentMode,
  onModeChange,
}: ModeSwitcherProps) => {
  const [indicatorStyle, setIndicatorStyle] = useState({});

  useEffect(() => {
    const modes = Object.keys(modeConfig) as FormattingMode[];
    const currentIndex = modes.indexOf(currentMode);
    const width = 100 / modes.length;
    setIndicatorStyle({
      width: `${width}%`,
      transform: `translateX(${currentIndex * 100}%)`,
    });
  }, [currentMode]);

  return (
    <div className="space-y-4">
      {/* Premium Tab Navigation */}
      <div className="relative">
        <div className="flex items-center p-1 bg-gray-100/50 rounded-xl border border-gray-200/50">
          {/* Sliding Indicator */}
          <div
            className="absolute h-[calc(100%-8px)] bg-white rounded-lg shadow-lg transition-all duration-300 ease-out"
            style={indicatorStyle}
          />

          {/* Tab Buttons */}
          {Object.entries(modeConfig).map(([mode, config]) => (
            <button
              key={mode}
              onClick={() => onModeChange(mode as FormattingMode)}
              className={`
                relative z-10 flex-1 flex items-center justify-center
                px-4 py-2.5 rounded-lg
                transition-all duration-200
                group cursor-pointer
                ${currentMode !== mode ? "hover:bg-gray-50" : ""}
              `}
            >
              <div className="flex flex-col items-center space-y-1">
                <span
                  className={`
                    text-sm font-semibold transition-colors duration-200
                    ${
                      currentMode === mode
                        ? "text-gray-900"
                        : "text-gray-500 group-hover:text-gray-700"
                    }
                  `}
                >
                  {config.label}
                </span>
                {currentMode === mode && (
                  <div className="h-0.5 w-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Description Card */}
      <div className="relative overflow-hidden">
        <div className="bg-gradient-to-r from-gray-50 to-white rounded-lg border border-gray-100 p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div
                className={`
                  w-2 h-2 rounded-full
                  bg-gradient-to-r ${modeConfig[currentMode].gradient}
                  animate-pulse
                `}
              />
              <p className="text-xs font-medium text-gray-600">
                {modeConfig[currentMode].description}
              </p>
            </div>
            <span className="text-xs text-gray-400 uppercase tracking-wider">
              Active
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
