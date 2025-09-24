"use client";

import { FormattingMode } from "../../types";

interface ModeSwitcherProps {
  currentMode: FormattingMode;
  onModeChange: (mode: FormattingMode) => void;
}

const modeConfig = {
  mobile: {
    label: "Mobile",
    description: "45-60 characters per line",
  },
  conventional: {
    label: "Conventional",
    description: "Standard paragraph formatting",
  },
  "speed-reading": {
    label: "Speed Reading",
    description: "RSVP, Bionic, Chunking",
  },
} as const;

export const ModeSwitcher = ({
  currentMode,
  onModeChange,
}: ModeSwitcherProps) => {
  return (
    <div className="space-y-2">
      <div className="flex bg-gray-100 rounded p-1">
        {Object.entries(modeConfig).map(([mode, config]) => (
          <button
            key={mode}
            onClick={() => onModeChange(mode as FormattingMode)}
            className={`
              flex-1 px-3 py-1.5 rounded text-sm
              ${
                currentMode === mode
                  ? "bg-white text-blue-600"
                  : "text-gray-600 hover:text-gray-800"
              }
            `}
          >
            {config.label}
          </button>
        ))}
      </div>

      <p className="text-xs text-gray-500">
        {modeConfig[currentMode].description}
      </p>
    </div>
  );
};
