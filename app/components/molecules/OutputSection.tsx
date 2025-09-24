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
    <div className="bg-gray-50 rounded p-3 border border-gray-200">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xs font-medium text-gray-700">Output</h2>
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
