"use client";

import { useTextFormatter } from "../hooks/useTextFormatter";
import { useClipboard } from "../hooks/useClipboard";
import { FormatterLayout } from "./organisms/FormatterLayout";
import { TextFormatterContent } from "./organisms/TextFormatterContent";

export const TextFormatter = () => {
  const formatter = useTextFormatter();

  // Determine if we should trigger auto-copy
  const shouldAutoCopy: boolean =
    formatter.currentMode !== "speed-reading" &&
    Boolean(formatter.formattedText) &&
    formatter.formattedText !== formatter.debouncedInput;

  const clipboard = useClipboard(formatter.formattedText, {
    autoCopy: shouldAutoCopy,
  });

  return (
    <FormatterLayout
      mode={formatter.currentMode}
      onModeChange={formatter.setCurrentMode}
    >
      <TextFormatterContent formatter={formatter} clipboard={clipboard} />
    </FormatterLayout>
  );
};