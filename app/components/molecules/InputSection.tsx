"use client";

import { TextArea } from "../atoms/TextArea";
import { InputControls } from "./InputControls";

interface InputSectionProps {
  value: string;
  onChange: (value: string) => void;
  autoCopyEnabled: boolean;
  onAutoCopyChange: (enabled: boolean) => void;
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
}

export const InputSection = ({
  value,
  onChange,
  autoCopyEnabled,
  onAutoCopyChange,
  canUndo,
  canRedo,
  onUndo,
  onRedo,
}: InputSectionProps) => {
  return (
    <div className="bg-gray-50 rounded p-3 border border-gray-200">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xs font-medium text-gray-700">Input</h2>
        <InputControls
          autoCopyEnabled={autoCopyEnabled}
          onAutoCopyChange={onAutoCopyChange}
          canUndo={canUndo}
          canRedo={canRedo}
          onUndo={onUndo}
          onRedo={onRedo}
        />
      </div>
      <TextArea
        value={value}
        onChange={onChange}
        placeholder="Paste your text here..."
      />
    </div>
  );
};
