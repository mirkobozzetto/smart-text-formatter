"use client";

import { TextArea } from "../atoms/TextArea";
import { ActionButton } from "../atoms/ActionButton";

interface OutputSectionProps {
  value: string;
  onChange: (value: string) => void;
  onCopy: () => void;
  copied: boolean;
}

export const OutputSection = ({
  value,
  onChange,
  onCopy,
  copied,
}: OutputSectionProps) => {
  return (
    <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
      <div className="flex justify-between items-center mb-3 h-9">
        <h2 className="text-sm font-semibold text-gray-900">Output</h2>
        {value && (
          <ActionButton
            onClick={onCopy}
            variant={copied ? "success" : "primary"}
            size="small"
          >
            {copied ? "Copied" : "Copy"}
          </ActionButton>
        )}
      </div>
      <TextArea
        value={value}
        onChange={onChange}
        placeholder="Formatted text will appear here..."
        readonly={false}
      />
    </div>
  );
};
