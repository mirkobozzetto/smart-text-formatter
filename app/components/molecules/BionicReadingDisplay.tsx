"use client";

import { useState } from "react";
import { BionicWord } from "../../types";
import { ToggleSwitch } from "../atoms/ToggleSwitch";
import { FullscreenModal } from "./FullscreenModal";

interface BionicReadingDisplayProps {
  bionicWords: BionicWord[];
  isEnabled: boolean;
  onToggle: () => void;
}

export const BionicReadingDisplay = ({
  bionicWords,
  isEnabled,
  onToggle,
}: BionicReadingDisplayProps) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const BionicContent = ({ textSize = "text-lg" }: { textSize?: string }) => (
    <div
      className={`${textSize} leading-relaxed text-black whitespace-pre-wrap`}
    >
      {bionicWords.map((word, index) => {
        // Handle line breaks
        if (word.original === "\n") {
          return "\n";
        }

        // Handle regular words
        return (
          <span key={index}>
            {isEnabled ? (
              <>
                <span className="font-bold">{word.bold}</span>
                <span>{word.normal}</span>
              </>
            ) : (
              word.original
            )}
            {/* Add space after word unless it's the last word or next is a line break */}
            {index < bionicWords.length - 1 &&
              bionicWords[index + 1].original !== "\n" &&
              " "}
          </span>
        );
      })}
    </div>
  );

  return (
    <div className="space-y-4">
      {/* Toggle Control */}
      <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-gray-300">
        <div>
          <h3 className="text-sm font-bold text-black uppercase tracking-wide">
            Bionic Reading
          </h3>
          <p className="text-xs text-gray-600">
            Bold the first parts of words to enhance reading speed
          </p>
        </div>
        <ToggleSwitch enabled={isEnabled} onChange={onToggle} />
      </div>

      {/* Text Display */}
      <div className="bg-white rounded-2xl border border-gray-300 min-h-[300px] max-h-[500px] overflow-hidden relative">
        {/* Fullscreen button */}
        {bionicWords.length > 0 && (
          <button
            onClick={() => setIsFullscreen(true)}
            className="absolute top-3 right-3 z-10 p-1.5 rounded-md bg-gray-50/80 hover:bg-gray-100 transition-all duration-200 group hover:shadow-md"
            aria-label="Enter fullscreen"
          >
            <svg
              className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
              />
            </svg>
          </button>
        )}

        <div className="max-h-[500px] overflow-y-auto p-6">
          {bionicWords.length > 0 ? (
            <BionicContent />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              <div className="text-center">
                <p className="text-sm uppercase tracking-wide">
                  Enter text to see Bionic Reading format
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Info Panel */}
      <div className="bg-white rounded-2xl p-4 border border-gray-300">
        <div>
          <h4 className="text-xs font-bold text-black uppercase tracking-wide mb-2">
            How Bionic Reading Works
          </h4>
          <p className="text-xs text-gray-600">
            The first few letters of each word are bolded to guide your eye and
            help your brain recognize words faster, potentially increasing
            reading speed and comprehension.
          </p>
        </div>
      </div>

      {/* Fullscreen Modal */}
      <FullscreenModal
        isOpen={isFullscreen}
        onClose={() => setIsFullscreen(false)}
      >
        <div className="h-full flex flex-col p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6 pr-12">
            <div>
              <h2 className="text-xs font-bold text-black uppercase tracking-wide italic">
                Bionic Reading - Fullscreen Mode
              </h2>
            </div>
            <ToggleSwitch enabled={isEnabled} onChange={onToggle} />
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            <BionicContent textSize="text-2xl sm:text-3xl" />
          </div>
        </div>
      </FullscreenModal>
    </div>
  );
};
