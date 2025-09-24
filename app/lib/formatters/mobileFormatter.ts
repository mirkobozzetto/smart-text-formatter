import { FORMATTER_CONFIG } from "../../constants";

export const formatForMobile = (text: string): string => {
  if (!text.trim()) return "";

  const { minCharsPerLine, maxCharsPerLine } = FORMATTER_CONFIG.mobile;

  // Clean up the text - remove extra spaces but preserve line breaks
  const cleaned = text.replace(/ +/g, " ").trim();

  // Split into sentences first to maintain sentence boundaries
  const sentences = cleaned.split(/([.!?]+\s*)/).filter(Boolean);

  const formattedLines: string[] = [];
  let currentLine = "";

  for (const sentence of sentences) {
    const words = sentence.split(/\s+/);

    for (const word of words) {
      const potentialLine = currentLine ? `${currentLine} ${word}` : word;

      // If adding this word would exceed max line length, start a new line
      if (
        potentialLine.length > maxCharsPerLine &&
        currentLine.length >= minCharsPerLine
      ) {
        formattedLines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = potentialLine;
      }
    }

    // If we finished a sentence and the line is long enough, break
    if (sentence.match(/[.!?]/) && currentLine.length >= minCharsPerLine) {
      formattedLines.push(currentLine);
      currentLine = "";
    }
  }

  // Add any remaining content
  if (currentLine) {
    formattedLines.push(currentLine);
  }

  // Join with single line breaks for mobile optimization
  return formattedLines.join("\n").trim();
};

export const getMobileStyleConfig = () => ({
  fontSize: FORMATTER_CONFIG.mobile.fontSize,
  lineHeight: FORMATTER_CONFIG.mobile.lineHeight,
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
});
