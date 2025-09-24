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
      <div className="bg-white rounded-2xl p-6 border border-gray-300 min-h-[300px] max-h-[500px] overflow-y-auto">
        {bionicWords.length > 0 ? (
          <div className="text-lg leading-relaxed text-black">
            {bionicWords.map((word, index) => (
              <span key={index}>
                {isEnabled ? (
                  <>
                    <span className="font-bold">{word.bold}</span>
                    <span>{word.normal}</span>
                  </>
                ) : (
                  word.original
                )}
                {index < bionicWords.length - 1 && " "}
              </span>
            ))}
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
