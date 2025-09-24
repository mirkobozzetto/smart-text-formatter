import { create } from "zustand";
import { persist } from "zustand/middleware";
import { FormattingMode, SpeedReadingSubMode } from "../types";

interface FormatterState {
  currentMode: FormattingMode;
  setCurrentMode: (mode: FormattingMode) => void;

  autoCopyEnabled: boolean;
  setAutoCopyEnabled: (enabled: boolean) => void;

  speedReadingWPM: number;
  setSpeedReadingWPM: (wpm: number) => void;

  speedReadingSubMode: SpeedReadingSubMode;
  setSpeedReadingSubMode: (mode: SpeedReadingSubMode) => void;
}

export const useFormatterStore = create<FormatterState>()(
  persist(
    (set) => ({
      // Mode de formatage
      currentMode: "conventional",
      setCurrentMode: (mode) => set({ currentMode: mode }),

      // Auto-copy
      autoCopyEnabled: true,
      setAutoCopyEnabled: (enabled) => set({ autoCopyEnabled: enabled }),

      // Speed reading
      speedReadingWPM: 400,
      setSpeedReadingWPM: (wpm) => set({ speedReadingWPM: wpm }),

      speedReadingSubMode: "rsvp",
      setSpeedReadingSubMode: (mode) => set({ speedReadingSubMode: mode }),
    }),
    {
      name: "text-formatter-storage",
    }
  )
);
