import { useState, useEffect, useMemo } from "react";
import {
  FormattingMode,
  SpeedReadingSubMode,
  BionicWord,
  TextChunk,
} from "../types";
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

export const useTextFormatter = () => {
  // Core text state
  const [inputText, setInputText] = useState("");
  const [formattedText, setFormattedText] = useState("");

  // Mode state
  const [currentMode, setCurrentMode] =
    useState<FormattingMode>("conventional");
  const [speedReadingSubMode, setSpeedReadingSubMode] =
    useState<SpeedReadingSubMode>("rsvp");

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
        formatted = debouncedInput;
        setBionicWords(formatForBionic(debouncedInput));
        setTextChunks(formatForChunking(debouncedInput));
        break;
      default:
        formatted = debouncedInput;
    }

    setFormattedText(formatted);
    pushState(formatted);
  }, [debouncedInput, currentMode, pushState]);

  const handleModeChange = (mode: FormattingMode) => {
    setCurrentMode(mode);
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
  };
};
