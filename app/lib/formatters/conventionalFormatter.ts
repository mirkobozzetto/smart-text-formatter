import {
  FORMATTER_CONFIG,
  SENTENCE_ENDINGS,
  PHRASE_BREAKS,
} from "../../constants";

export const formatForConventional = (text: string): string => {
  if (!text.trim()) return "";

  const { targetCharsPerLine, maxCharsPerLine } = FORMATTER_CONFIG.conventional;

  // Normalize whitespace
  let formatted = text.replace(/\s+/g, " ").trim();

  // Apply sentence and phrase formatting rules
  formatted = formatted
    // Double line break after sentence endings
    .replace(SENTENCE_ENDINGS, "$&\n\n")
    // Single line break after phrase breaks
    .replace(PHRASE_BREAKS, "$&\n");

  // Split into lines and optimize line lengths
  const lines = formatted.split("\n");
  const optimizedLines: string[] = [];

  for (const line of lines) {
    if (!line.trim()) {
      optimizedLines.push("");
      continue;
    }

    // If line is already good length, keep it
    if (line.length <= maxCharsPerLine) {
      optimizedLines.push(line);
      continue;
    }

    // Break long lines at word boundaries near target length
    const words = line.split(/\s+/);
    let currentLine = "";

    for (const word of words) {
      const potentialLine = currentLine ? `${currentLine} ${word}` : word;

      if (potentialLine.length > targetCharsPerLine && currentLine) {
        optimizedLines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = potentialLine;
      }
    }

    if (currentLine) {
      optimizedLines.push(currentLine);
    }
  }

  return optimizedLines.join("\n").trim();
};

export const getConventionalStyleConfig = () => ({
  lineHeight: FORMATTER_CONFIG.conventional.lineHeight,
  fontFamily: 'Georgia, "Times New Roman", serif',
});
