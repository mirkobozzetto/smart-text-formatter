"use client";

import { ModeSwitcher } from "../molecules/ModeSwitcher";
import { FormattingMode } from "../../types";

interface FormatterLayoutProps {
  mode: FormattingMode;
  onModeChange: (mode: FormattingMode) => void;
  children: React.ReactNode;
}

export const FormatterLayout = ({
  mode,
  onModeChange,
  children,
}: FormatterLayoutProps) => {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-4 max-w-6xl">
        {/* Header */}
        <div className="mb-4">
          <h1 className="text-lg font-semibold text-gray-900">
            Text Formatter
          </h1>
        </div>

        {/* Mode Switcher */}
        <div className="mb-4">
          <ModeSwitcher currentMode={mode} onModeChange={onModeChange} />
        </div>

        {/* Main Content */}
        {children}
      </div>
    </div>
  );
};
