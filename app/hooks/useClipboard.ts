import { useState, useCallback, useEffect } from "react";

interface UseClipboardOptions {
  resetDelay?: number;
  autoCopy?: boolean;
}

export const useClipboard = (
  text: string,
  options: UseClipboardOptions = {}
) => {
  const { resetDelay = 2000, autoCopy = false } = options;

  const [copied, setCopied] = useState(false);
  const [autoCopyEnabled, setAutoCopyEnabled] = useState(autoCopy);

  const copyToClipboard = useCallback(
    async (textToCopy: string = text) => {
      try {
        await navigator.clipboard.writeText(textToCopy);
        setCopied(true);
        setTimeout(() => setCopied(false), resetDelay);
        return true;
      } catch (err) {
        console.error("Failed to copy text:", err);
        return false;
      }
    },
    [text, resetDelay]
  );

  // Auto-copy functionality
  useEffect(() => {
    if (autoCopyEnabled && text && text.trim()) {
      copyToClipboard();
    }
  }, [text, autoCopyEnabled, copyToClipboard]);

  return {
    copied,
    copyToClipboard,
    autoCopyEnabled,
    setAutoCopyEnabled,
  };
};
