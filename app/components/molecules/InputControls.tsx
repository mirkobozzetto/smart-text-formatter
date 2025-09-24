"use client";

import { ToggleSwitch } from "../atoms/ToggleSwitch";
import { ActionButton } from "../atoms/ActionButton";

interface InputControlsProps {
  autoCopyEnabled: boolean;
  onAutoCopyChange: (enabled: boolean) => void;
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
}

export const InputControls = ({
  autoCopyEnabled,
  onAutoCopyChange,
  canUndo,
  canRedo,
  onUndo,
  onRedo,
}: InputControlsProps) => {
  return (
    <div className="flex items-center space-x-3">
      <ToggleSwitch
        enabled={autoCopyEnabled}
        onChange={onAutoCopyChange}
        label="Auto-copy"
      />

      <div className="flex space-x-1">
        <ActionButton onClick={onUndo} disabled={!canUndo} variant="default">
          Undo
        </ActionButton>
        <ActionButton onClick={onRedo} disabled={!canRedo} variant="default">
          Redo
        </ActionButton>
      </div>
    </div>
  );
};
