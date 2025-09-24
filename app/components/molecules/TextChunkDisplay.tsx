"use client";

import { TextChunk } from "../../types";

interface TextChunkDisplayProps {
  chunks: TextChunk[];
}

export const TextChunkDisplay = ({ chunks }: TextChunkDisplayProps) => {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-white rounded-2xl p-4 border border-gray-300">
        <h3 className="text-sm font-bold text-black uppercase tracking-wide mb-2">
          Text Chunking
        </h3>
        <p className="text-xs text-gray-600">
          Text broken into meaningful chunks for easier processing and
          comprehension.
        </p>
      </div>

      {/* Chunks Display */}
      <div className="bg-white rounded-2xl border border-gray-300 min-h-[300px] max-h-[500px] overflow-hidden">
        <div className="max-h-[500px] overflow-y-auto p-6">
          {chunks.length > 0 ? (
            <div className="flex flex-col gap-3">
              {chunks.map((chunk) => {
                // Handle line breaks
                if (chunk.text === "\n") {
                  return "\n";
                }

                // Handle regular chunks
                return (
                  <div
                    key={chunk.index}
                    className={`w-full p-4 rounded-lg text-xl leading-relaxed text-black ${
                      chunk.isPhrase
                        ? "bg-blue-50 border border-blue-200"
                        : "bg-gray-25 border border-gray-200"
                    }`}
                  >
                    {chunk.text}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              <div className="text-center">
                <p className="text-sm uppercase tracking-wide">
                  Enter text to see chunked format
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Statistics */}
      {chunks.length > 0 && (
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl p-4 border border-gray-300">
            <div className="text-center">
              <div className="text-2xl font-bold text-black">
                {chunks.length}
              </div>
              <div className="text-xs font-bold text-black uppercase tracking-wide">
                Total Chunks
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-4 border border-gray-300">
            <div className="text-center">
              <div className="text-2xl font-bold text-black">
                {chunks.filter((c) => c.isPhrase).length}
              </div>
              <div className="text-xs font-bold text-black uppercase tracking-wide">
                Phrases
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
