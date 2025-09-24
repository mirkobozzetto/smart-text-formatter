"use client";

import { BionicWord } from "../../types";
import { ToggleSwitch } from "../atoms/ToggleSwitch";

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
      <div className="bg-white rounded-2xl border border-gray-300 min-h-[300px] max-h-[500px] overflow-hidden">
        <div className="max-h-[500px] overflow-y-auto p-6">
          {bionicWords.length > 0 ? (
            <div className="text-lg leading-relaxed text-black whitespace-pre-wrap">
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
    </div>
  );
};
