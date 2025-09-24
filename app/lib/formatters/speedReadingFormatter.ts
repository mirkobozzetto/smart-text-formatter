import { BionicWord, TextChunk } from "../../types";
import { FORMATTER_CONFIG } from "../../constants";

// RSVP (Rapid Serial Visual Presentation) formatter
export const prepareForRSVP = (text: string): string[] => {
  if (!text.trim()) return [];

  // Clean and normalize text
  const cleaned = text.replace(/\s+/g, " ").trim();

  // Split into words, preserving punctuation
  return cleaned.split(/\s+/).filter((word) => word.length > 0);
};

// Bionic Reading formatter - bold the first part of important words
export const formatForBionic = (text: string): BionicWord[] => {
  if (!text.trim()) return [];

  const { bionicBoldPercentage } = FORMATTER_CONFIG.speedReading;
  const words = text.split(/\s+/).filter((word) => word.length > 0);

  return words.map((word) => {
    // Skip very short words or words that are mostly punctuation
    if (word.length <= 2 || /^[^\w]*$/.test(word)) {
      return {
        original: word,
        bold: "",
        normal: word,
      };
    }

    // Extract letters only for calculating bold portion
    const letters = word.replace(/[^\w]/g, "");
    const boldLength = Math.max(
      1,
      Math.ceil(letters.length * (bionicBoldPercentage / 100))
    );

    // Find the position after the bold letters in the original word
    let letterCount = 0;
    let splitIndex = 0;

    for (let i = 0; i < word.length; i++) {
      if (/\w/.test(word[i])) {
        letterCount++;
        if (letterCount === boldLength) {
          splitIndex = i + 1;
          break;
        }
      }
    }

    return {
      original: word,
      bold: word.slice(0, splitIndex),
      normal: word.slice(splitIndex),
    };
  });
};

// Text chunking formatter - break text into meaningful phrases
export const formatForChunking = (text: string): TextChunk[] => {
  if (!text.trim()) return [];

  const cleaned = text.replace(/\s+/g, " ").trim();

  // Split by various punctuation and phrase boundaries
  const chunks = cleaned
    .split(/([,.;:\-—()[\]{}!?]+\s*)/)
    .filter((chunk) => chunk.trim().length > 0)
    .map((chunk, index) => ({
      text: chunk,
      isPhrase: !/^[,.;:\-—()[\]{}!?]+\s*$/.test(chunk),
      index,
    }));

  // Combine very short chunks with adjacent ones
  const optimizedChunks: TextChunk[] = [];
  let currentChunk = "";
  let isCurrentPhrase = true;

  for (const chunk of chunks) {
    if (chunk.text.trim().length <= 3 && currentChunk) {
      currentChunk += chunk.text;
    } else if (currentChunk.length > 50) {
      optimizedChunks.push({
        text: currentChunk,
        isPhrase: isCurrentPhrase,
        index: optimizedChunks.length,
      });
      currentChunk = chunk.text;
      isCurrentPhrase = chunk.isPhrase;
    } else {
      currentChunk += chunk.text;
      if (chunk.isPhrase) isCurrentPhrase = true;
    }
  }

  if (currentChunk) {
    optimizedChunks.push({
      text: currentChunk,
      isPhrase: isCurrentPhrase,
      index: optimizedChunks.length,
    });
  }

  return optimizedChunks;
};

export const getSpeedReadingStyleConfig = () => ({
  fontFamily: "system-ui, -apple-system, sans-serif",
  fontSize: "1.125rem", // 18px
  lineHeight: "1.5",
});
