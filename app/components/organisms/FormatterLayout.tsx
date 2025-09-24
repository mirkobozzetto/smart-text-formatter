"use client";

import { ModeSwitcher } from "../molecules/ModeSwitcher";
import { TextBuddyLogo } from "../atoms/TextBuddyLogo";
import { AnimatedBackground } from "../atoms/AnimatedBackground";
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
    <div className="min-h-screen bg-[#FAFAF9] relative">
      <AnimatedBackground />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          <div className="flex flex-col items-center">
            <div className="mb-6">
              <TextBuddyLogo />
            </div>
            <h2 className="text-sm font-medium text-black uppercase tracking-wide mb-4">
              Format Your Text & Start Reading Fast
            </h2>
            <ModeSwitcher currentMode={mode} onModeChange={onModeChange} />
          </div>

          <div>{children}</div>
        </div>
      </main>
    </div>
  );
};
