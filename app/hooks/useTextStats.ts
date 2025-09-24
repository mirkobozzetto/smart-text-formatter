import { useMemo } from "react";
import { TextStats } from "../types";
import { READING_SPEED_AVERAGE } from "../constants";

export const useTextStats = (text: string): TextStats => {
  return useMemo(() => {
    const trimmedText = text.trim();

    if (!trimmedText) {
      return {
        characterCount: 0,
        wordCount: 0,
        estimatedReadingTime: 0,
      };
    }

    const characterCount = trimmedText.length;
    const wordCount = trimmedText.split(/\s+/).length;
    const estimatedReadingTime = Math.ceil(wordCount / READING_SPEED_AVERAGE);

    return {
      characterCount,
      wordCount,
      estimatedReadingTime,
    };
  }, [text]);
};
