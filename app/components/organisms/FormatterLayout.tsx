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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Premium Header */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="flex items-center space-x-3">
                  <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-indigo-500 shadow-lg shadow-indigo-500/25" />
                  <h1 className="text-xl font-semibold text-gray-900">
                    Text Formatter Pro
                  </h1>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">
                Professional Text Processing
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Mode Switcher Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="space-y-4">
              <div>
                <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                  Formatting Mode
                </h2>
              </div>
              <ModeSwitcher currentMode={mode} onModeChange={onModeChange} />
            </div>
          </div>

          {/* Main Content Area */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            {children}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-gray-200 bg-white/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-center text-sm text-gray-500">
            Powered by advanced text processing algorithms
          </p>
        </div>
      </footer>
    </div>
  );
};
