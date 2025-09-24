"use client";

import { SpeedReadingSubMode, BionicWord, TextChunk } from "../../types";
import { RSVPDisplay } from "../molecules/RSVPDisplay";
import { BionicReadingDisplay } from "../molecules/BionicReadingDisplay";
import { TextChunkDisplay } from "../molecules/TextChunkDisplay";

interface SpeedReadingPanelProps {
  subMode: SpeedReadingSubMode;
  onSubModeChange: (subMode: SpeedReadingSubMode) => void;

  // RSVP props
  currentWord: string;
  isPlaying: boolean;
  progress: number;
  wpm: number;
  totalWords: number;
  currentWordIndex: number;
  onTogglePlay: () => void;
  onWpmChange: (wpm: number) => void;
  onReset: () => void;

  // Bionic Reading props
  bionicWords: BionicWord[];
  isBionicEnabled: boolean;
  onToggleBionic: () => void;

  // Text Chunking props
  textChunks: TextChunk[];
}

const subModeConfig = {
  rsvp: {
    label: "RSVP",
    description: "Word by word",
  },
  bionic: {
    label: "Bionic",
    description: "Bold fixations",
  },
  chunking: {
    label: "Chunking",
    description: "Phrase groups",
  },
} as const;

export const SpeedReadingPanel = ({
  subMode,
  onSubModeChange,
  currentWord,
  isPlaying,
  progress,
  wpm,
  totalWords,
  currentWordIndex,
  onTogglePlay,
  onWpmChange,
  onReset,
  bionicWords,
  isBionicEnabled,
  onToggleBionic,
  textChunks,
}: SpeedReadingPanelProps) => {
  return (
    <div className="space-y-6">
      {/* Sub-mode Switcher */}
      <div className="bg-white rounded-lg p-4 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Speed Reading Techniques
        </h3>

        <div className="flex space-x-2">
          {Object.entries(subModeConfig).map(([mode, config]) => (
            <button
              key={mode}
              onClick={() => onSubModeChange(mode as SpeedReadingSubMode)}
              className={`
                flex-1 px-3 py-2 rounded text-sm
                ${
                  subMode === mode
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }
              `}
            >
              <div className="font-medium">{config.label}</div>
              <div className="text-xs opacity-80">{config.description}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Content based on selected sub-mode */}
      <div className="min-h-[400px]">
        {subMode === "rsvp" && (
          <RSVPDisplay
            currentWord={currentWord}
            isPlaying={isPlaying}
            progress={progress}
            wpm={wpm}
            totalWords={totalWords}
            currentWordIndex={currentWordIndex}
            onTogglePlay={onTogglePlay}
            onWpmChange={onWpmChange}
            onReset={onReset}
          />
        )}

        {subMode === "bionic" && (
          <BionicReadingDisplay
            bionicWords={bionicWords}
            isEnabled={isBionicEnabled}
            onToggle={onToggleBionic}
          />
        )}

        {subMode === "chunking" && <TextChunkDisplay chunks={textChunks} />}
      </div>
    </div>
  );
};
