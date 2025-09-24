import { useState, useCallback, useRef, useEffect } from "react";
import { RSVPState } from "../types";
import { UI_CONSTANTS } from "../constants";

export const useRSVP = (words: string[], initialWPM: number = 400) => {
  const [state, setState] = useState<RSVPState>({
    currentWordIndex: 0,
    isPlaying: false,
    wpm: initialWPM,
    words,
    intervalId: undefined,
  });

  const intervalRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const prevWordsLength = useRef(words.length);

  // Update words when they change - compare by length to avoid infinite loops
  useEffect(() => {
    if (prevWordsLength.current !== words.length) {
      prevWordsLength.current = words.length;
      setState((prev) => ({ ...prev, words, currentWordIndex: 0 }));
    }
  }, [words]);

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const start = useCallback(() => {
    if (state.words.length === 0) return;

    setState((prev) => ({ ...prev, isPlaying: true }));

    const interval = setInterval(() => {
      setState((prev) => {
        const nextIndex = prev.currentWordIndex + 1;

        if (nextIndex >= prev.words.length) {
          // Reached the end
          clearInterval(intervalRef.current!);
          return {
            ...prev,
            isPlaying: false,
            currentWordIndex: 0,
            intervalId: undefined,
          };
        }

        return {
          ...prev,
          currentWordIndex: nextIndex,
        };
      });
    }, UI_CONSTANTS.RSVP_DISPLAY_DURATION(state.wpm));

    intervalRef.current = interval;
    setState((prev) => ({ ...prev, intervalId: interval }));
  }, [state.words.length, state.wpm]);

  const pause = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = undefined;
    }
    setState((prev) => ({ ...prev, isPlaying: false, intervalId: undefined }));
  }, []);

  const reset = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = undefined;
    }
    setState((prev) => ({
      ...prev,
      currentWordIndex: 0,
      isPlaying: false,
      intervalId: undefined,
    }));
  }, []);

  const setWPM = useCallback(
    (newWPM: number) => {
      setState((prev) => ({ ...prev, wpm: newWPM }));

      // If currently playing, restart with new speed
      if (state.isPlaying) {
        pause();
        setTimeout(() => start(), 100);
      }
    },
    [state.isPlaying, pause, start]
  );

  const togglePlay = useCallback(() => {
    if (state.isPlaying) {
      pause();
    } else {
      start();
    }
  }, [state.isPlaying, pause, start]);

  const currentWord = state.words[state.currentWordIndex] || "";
  const progress =
    state.words.length > 0
      ? (state.currentWordIndex / state.words.length) * 100
      : 0;

  return {
    currentWord,
    currentWordIndex: state.currentWordIndex,
    isPlaying: state.isPlaying,
    wpm: state.wpm,
    progress,
    totalWords: state.words.length,
    start,
    pause,
    reset,
    setWPM,
    togglePlay,
  };
};
