"use client";

import { ActionButton } from "../atoms/ActionButton";

interface RSVPDisplayProps {
  currentWord: string;
  isPlaying: boolean;
  progress: number;
  wpm: number;
  totalWords: number;
  currentWordIndex: number;
  onTogglePlay: () => void;
  onWpmChange: (wpm: number) => void;
  onReset: () => void;
}

export const RSVPDisplay = ({
  currentWord,
  isPlaying,
  progress,
  wpm,
  totalWords,
  currentWordIndex,
  onTogglePlay,
  onWpmChange,
  onReset,
}: RSVPDisplayProps) => {
  return (
    <div className="space-y-6">
      {/* Word Display Area */}
      <div className="bg-white rounded-2xl p-8 text-center min-h-[120px] flex items-center justify-center border border-gray-300">
        <div className="text-3xl md:text-4xl font-bold text-black">
          {currentWord || "Start reading..."}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs font-medium text-black uppercase tracking-wide">
          <span>
            Word {currentWordIndex + 1} of {totalWords}
          </span>
          <span>{progress.toFixed(1)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-black h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Controls */}
      <div className="space-y-4">
        {/* Play/Pause and Reset */}
        <div className="flex space-x-2 justify-center">
          <ActionButton
            onClick={onTogglePlay}
            disabled={totalWords === 0}
            variant="default"
            size="small"
          >
            {isPlaying ? "PAUSE" : "PLAY"}
          </ActionButton>

          <ActionButton
            onClick={onReset}
            disabled={totalWords === 0}
            variant="default"
            size="small"
          >
            RESET
          </ActionButton>
        </div>

        {/* WPM Control */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-xs font-bold text-black uppercase tracking-wide">
              Speed: {wpm} WPM
            </label>
            <div className="text-xs text-gray-500 uppercase">300 - 800 WPM</div>
          </div>
          <input
            type="range"
            min="300"
            max="800"
            step="50"
            value={wpm}
            onChange={(e) => onWpmChange(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-black [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-black [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-500 uppercase">
            <span>Slow</span>
            <span>Fast</span>
          </div>
        </div>
      </div>
    </div>
  );
};
