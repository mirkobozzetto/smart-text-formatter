"use client";

import { TextArea } from "../atoms/TextArea";
import { InputControls } from "./InputControls";

interface InputSectionProps {
  value: string;
  onChange: (value: string) => void;
  autoCopyEnabled: boolean;
  onAutoCopyChange: (enabled: boolean) => void;
}

export const InputSection = ({
  value,
  onChange,
  autoCopyEnabled,
  onAutoCopyChange,
}: InputSectionProps) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-3 h-9">
        <h2 className="text-sm font-bold text-black uppercase tracking-wide">
          Input
        </h2>
        <InputControls
          autoCopyEnabled={autoCopyEnabled}
          onAutoCopyChange={onAutoCopyChange}
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
