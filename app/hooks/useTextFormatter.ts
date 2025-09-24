import { useState, useEffect, useMemo } from "react";
import { FormattingMode, BionicWord, TextChunk } from "../types";
import { useDebounce } from "./useDebounce";
import { useTextStats } from "./useTextStats";
import { useUndoRedo } from "./useUndoRedo";
import { useRSVP } from "./useRSVP";
import {
  formatForMobile,
  formatForConventional,
  prepareForRSVP,
  formatForBionic,
  formatForChunking,
} from "../lib/formatters";
import { useFormatterStore } from "../stores/useFormatterStore";

export const useTextFormatter = () => {
  // Core text state
  const [inputText, setInputText] = useState("");
  const [formattedText, setFormattedText] = useState("");

  // Mode state from Zustand store
  const {
    currentMode,
    setCurrentMode: setStoreMode,
    speedReadingWPM,
    speedReadingSubMode,
    setSpeedReadingSubMode,
  } = useFormatterStore();

  // Speed reading specific state
  const [bionicWords, setBionicWords] = useState<BionicWord[]>([]);
  const [textChunks, setTextChunks] = useState<TextChunk[]>([]);
  const [isBionicEnabled, setIsBionicEnabled] = useState(true);

  // Debounced input for performance
  const debouncedInput = useDebounce(inputText, 300);

  // Text statistics
  const textStats = useTextStats(debouncedInput);

  // Undo/Redo functionality
  const {
    canUndo,
    canRedo,
    push: pushState,
    undo,
    redo,
  } = useUndoRedo<string>("");

  // RSVP functionality for speed reading
  const words = useMemo(() => prepareForRSVP(debouncedInput), [debouncedInput]);
  const rsvp = useRSVP(words);

  // Format text based on current mode
  useEffect(() => {
    if (!debouncedInput.trim()) {
      setFormattedText("");
      setBionicWords([]);
      setTextChunks([]);
      return;
    }

    let formatted = "";

    switch (currentMode) {
      case "mobile":
        formatted = formatForMobile(debouncedInput);
        break;
      case "conventional":
        formatted = formatForConventional(debouncedInput);
        break;
      case "speed-reading":
        // Apply conventional formatting first to get proper line breaks
        formatted = formatForConventional(debouncedInput);
        setBionicWords(formatForBionic(formatted));
        setTextChunks(formatForChunking(formatted));
        break;
      default:
        formatted = debouncedInput;
    }

    setFormattedText(formatted);
    pushState(formatted);
  }, [debouncedInput, currentMode, pushState]);

  const handleModeChange = (mode: FormattingMode) => {
    setStoreMode(mode);
    if (mode === "speed-reading" && speedReadingSubMode === "rsvp") {
      rsvp.reset();
    }
  };

  return {
    // Text state
    inputText,
    setInputText,
    formattedText,
    setFormattedText,
    debouncedInput,

    // Mode state
    currentMode,
    setCurrentMode: handleModeChange,
    speedReadingSubMode,
    setSpeedReadingSubMode,

    // Speed reading state
    bionicWords,
    textChunks,
    isBionicEnabled,
    setIsBionicEnabled,

    // Features
    textStats,
    canUndo,
    canRedo,
    undo,
    redo,
    rsvp,
    speedReadingWPM,
  };
};
