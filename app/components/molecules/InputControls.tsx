"use client";

import { ToggleSwitch } from "../atoms/ToggleSwitch";

interface InputControlsProps {
  autoCopyEnabled: boolean;
  onAutoCopyChange: (enabled: boolean) => void;
}

export const InputControls = ({
  autoCopyEnabled,
  onAutoCopyChange,
}: InputControlsProps) => {
  return (
    <div className="flex items-center">
      <ToggleSwitch
        enabled={autoCopyEnabled}
        onChange={onAutoCopyChange}
        label="Auto-copy"
      />
    </div>
  );
};
