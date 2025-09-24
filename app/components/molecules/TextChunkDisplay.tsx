"use client";

import { TextChunk } from "../../types";

interface TextChunkDisplayProps {
  chunks: TextChunk[];
}

export const TextChunkDisplay = ({ chunks }: TextChunkDisplayProps) => {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-white rounded-lg p-4 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Text Chunking
        </h3>
        <p className="text-sm text-gray-600">
          Text broken into meaningful chunks for easier processing and
          comprehension.
        </p>
      </div>

      {/* Chunks Display */}
      <div className="bg-white rounded-lg p-6 border border-gray-200 min-h-[300px] max-h-[500px] overflow-y-auto">
        {chunks.length > 0 ? (
          <div className="space-y-3">
            {chunks.map((chunk, index) => (
              <div
                key={chunk.index}
                className={`p-3 rounded-lg border-l-4 transition-all duration-200 hover:shadow-sm ${
                  chunk.isPhrase
                    ? "bg-blue-50 border-blue-400"
                    : "bg-gray-50 border-gray-300"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-gray-900 leading-relaxed">
                      {chunk.text}
                    </p>
                  </div>
                  <div className="ml-3 flex items-center space-x-2">
                    <span
                      className={`text-xs px-2 py-1 rounded-full font-medium ${
                        chunk.isPhrase
                          ? "bg-blue-100 text-blue-700"
                          : "bg-gray-100 text-gray-600"
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
              <div className="text-4xl mb-2">🧩</div>
              <p>Enter text to see chunked format</p>
            </div>
          </div>
        )}
      </div>

      {/* Statistics */}
      {chunks.length > 0 && (
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 border border-blue-200">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {chunks.length}
              </div>
              <div className="text-sm text-gray-600">Total Chunks</div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4 border border-green-200">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {chunks.filter((c) => c.isPhrase).length}
              </div>
              <div className="text-sm text-gray-600">Phrases</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
