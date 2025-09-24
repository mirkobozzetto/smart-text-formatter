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
      <div className="bg-white rounded-2xl p-6 border border-gray-300 min-h-[300px] max-h-[500px] overflow-y-auto">
        {chunks.length > 0 ? (
          <div className="space-y-3">
            {chunks.map((chunk, index) => (
              <div
                key={chunk.index}
                className={`p-3 rounded-xl border transition-all duration-200 hover:bg-gray-50 ${
                  chunk.isPhrase ? "border-gray-400" : "border-gray-300"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-black leading-relaxed">{chunk.text}</p>
                  </div>
                  <div className="ml-3 flex items-center space-x-2">
                    <span
                      className={`text-xs px-2 py-1 rounded-full font-bold uppercase ${
                        chunk.isPhrase
                          ? "bg-black text-white"
                          : "bg-white text-black border border-black"
                      }`}
                    >
                      {chunk.isPhrase ? "Phrase" : "Sentence"}
                    </span>
                    <span className="text-xs text-gray-400">#{index + 1}</span>
                  </div>
                </div>
              </div>
            ))}
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
