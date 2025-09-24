import { FORMATTER_CONFIG } from "../../constants";

export const formatForConventional = (text: string): string => {
  if (!text.trim()) return "";

  // Normalize only multiple spaces (NOT line breaks)
  let formatted = text.replace(/ +/g, " ").trim();

  // Apply sentence formatting rules intelligently
  // Handle quotes and punctuation properly:
  // 1. If punctuation is followed by closing quotes, add break after quotes (if not already present)
  // 2. Otherwise add break after punctuation (if not already present)
  // 3. Preserve multiple line breaks (user's intentional formatting)
  formatted = formatted
    .replace(/([.!?]+)(["'»"'])(?!\n)/g, "$1$2\n") // Punctuation + closing quote - add newline only if not present
    .replace(/([.!?]+)(?!["'»"'\n])/g, "$1\n") // Punctuation alone - add newline only if not present
    .replace(/\n +/g, "\n"); // Clean up spaces after line breaks (but preserve multiple newlines)

  // Return formatted text preserving user's intentional formatting
  return formatted.trim();
};

export const getConventionalStyleConfig = () => ({
  lineHeight: FORMATTER_CONFIG.conventional.lineHeight,
  fontFamily: 'Georgia, "Times New Roman", serif',
});
