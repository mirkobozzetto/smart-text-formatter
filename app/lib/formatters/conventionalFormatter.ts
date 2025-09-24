import { FORMATTER_CONFIG } from "../../constants";

export const formatForConventional = (text: string): string => {
  if (!text.trim()) return "";

  // Normalize only multiple spaces (NOT line breaks)
  let formatted = text.replace(/ +/g, " ").trim();

  // Apply sentence formatting rules intelligently
  // Handle quotes and punctuation properly:
  // 1. If punctuation is followed by closing quotes, add break after quotes
  // 2. Otherwise add break after punctuation (if not already present)
  // Also remove any spaces after the line break
  formatted = formatted
    .replace(/([.!?]+)(["'»"'])\s*/g, "$1$2\n") // Punctuation + closing quote + remove trailing spaces
    .replace(/([.!?]+)(?!["'»"'])\s*/g, "$1\n") // Punctuation alone + remove trailing spaces
    .replace(/\n\s+/g, "\n"); // Clean up any spaces at the beginning of lines

  // Return formatted text without artificial line breaks
  // Let the text flow naturally within paragraphs
  return formatted.trim();
};

export const getConventionalStyleConfig = () => ({
  lineHeight: FORMATTER_CONFIG.conventional.lineHeight,
  fontFamily: 'Georgia, "Times New Roman", serif',
});
