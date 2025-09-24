"use client";

import { BionicWord } from "../../types";

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
      <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Bionic Reading
          </h3>
          <p className="text-sm text-gray-600">
            Bold the first parts of words to enhance reading speed
          </p>
        </div>
        <button
          onClick={onToggle}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
            isEnabled
              ? "bg-gradient-to-r from-blue-500 to-purple-600"
              : "bg-gray-200"
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
              isEnabled ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </button>
      </div>

      {/* Text Display */}
      <div className="bg-white rounded-lg p-6 border border-gray-200 min-h-[300px] max-h-[500px] overflow-y-auto">
        {bionicWords.length > 0 ? (
          <div className="text-lg leading-relaxed text-gray-900">
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
              <div className="text-4xl mb-2">📖</div>
              <p>Enter text to see Bionic Reading format</p>
            </div>
          </div>
        )}
      </div>

      {/* Info Panel */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 border border-blue-200">
        <div className="flex items-start space-x-3">
          <div className="text-blue-500 text-xl">💡</div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-1">
              How Bionic Reading Works
            </h4>
            <p className="text-sm text-gray-600">
              The first few letters of each word are bolded to guide your eye
              and help your brain recognize words faster, potentially increasing
              reading speed and comprehension.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
