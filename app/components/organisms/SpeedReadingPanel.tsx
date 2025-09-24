"use client";

import { SpeedReadingSubMode, BionicWord, TextChunk } from "../../types";
import { RSVPDisplay } from "../molecules/RSVPDisplay";
import { BionicReadingDisplay } from "../molecules/BionicReadingDisplay";
import { TextChunkDisplay } from "../molecules/TextChunkDisplay";
import { motion } from "framer-motion";
import { useRef, useState } from "react";

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
  const [isHovering, setIsHovering] = useState(false);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const modes = Object.entries(subModeConfig);
  const selectedIndex = modes.findIndex(([mode]) => mode === subMode);

  const getCursorPosition = () => {
    const targetIndex =
      isHovering && hoverIndex !== null ? hoverIndex : selectedIndex;
    const targetTab = tabRefs.current[targetIndex];
    if (!targetTab) return { left: 0, width: 0 };
    return {
      left: targetTab.offsetLeft,
      width: targetTab.offsetWidth,
    };
  };

  const { left, width } = getCursorPosition();

  return (
    <div className="space-y-6">
      {/* Sub-mode Switcher */}
      <div>
        <h3 className="text-sm font-bold text-black uppercase tracking-wide mb-4">
          Speed Reading Techniques
        </h3>

        <div
          className="relative flex border-2 border-black rounded-full p-1 bg-white"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => {
            setIsHovering(false);
            setHoverIndex(null);
          }}
        >
          <motion.div
            className="absolute top-1 bottom-1 bg-black rounded-full"
            initial={false}
            animate={{ left, width }}
            transition={{ type: "spring", stiffness: 500, damping: 35 }}
          />

          {modes.map(([mode, config], index) => (
            <button
              key={mode}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              onClick={() => onSubModeChange(mode as SpeedReadingSubMode)}
              onMouseEnter={() => setHoverIndex(index)}
              className="relative flex-1 px-4 py-2 rounded-full text-sm transition-colors duration-200 z-10 cursor-pointer"
            >
              <div
                className={`font-bold uppercase text-xs transition-colors duration-200 ${
                  (isHovering && hoverIndex === index) ||
                  (!isHovering && subMode === mode)
                    ? "text-white"
                    : "text-black"
                }`}
              >
                {config.label}
              </div>
              <div
                className={`text-xs transition-colors duration-200 ${
                  (isHovering && hoverIndex === index) ||
                  (!isHovering && subMode === mode)
                    ? "text-white opacity-90"
                    : "text-gray-600"
                }`}
              >
                {config.description}
              </div>
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
