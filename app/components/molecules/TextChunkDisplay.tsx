"use client";

import { useState } from "react";
import { TextChunk } from "../../types";
import { FullscreenModal } from "./FullscreenModal";

interface TextChunkDisplayProps {
  chunks: TextChunk[];
}

export const TextChunkDisplay = ({ chunks }: TextChunkDisplayProps) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const ChunkContent = ({
    textSize = "text-xl",
    gap = "gap-3",
  }: {
    textSize?: string;
    gap?: string;
  }) => (
    <div className={`flex flex-col ${gap}`}>
      {chunks.map((chunk) => {
        // Handle line breaks
        if (chunk.text === "\n") {
          return "\n";
        }

        // Handle regular chunks
        return (
          <div
            key={chunk.index}
            className={`w-full p-4 rounded-lg ${textSize} leading-relaxed text-black ${
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
  );

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
      <div className="bg-white rounded-2xl border border-gray-300 min-h-[300px] max-h-[500px] overflow-hidden relative">
        {/* Fullscreen button */}
        {chunks.length > 0 && (
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
          {chunks.length > 0 ? (
            <ChunkContent />
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

      {/* Fullscreen Modal */}
      <FullscreenModal
        isOpen={isFullscreen}
        onClose={() => setIsFullscreen(false)}
      >
        <div className="h-full flex flex-col p-8">
          {/* Header */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-black uppercase tracking-wide">
              Text Chunking
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Full screen reading mode with sentence-based chunks
            </p>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            <ChunkContent textSize="text-2xl sm:text-3xl" gap="gap-4" />
          </div>

          {/* Statistics Footer */}
          <div className="mt-6 pt-6 border-t border-gray-200 grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-black">
                {chunks.length}
              </div>
              <div className="text-sm font-bold text-black uppercase tracking-wide">
                Total Chunks
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-black">
                {chunks.filter((c) => c.isPhrase).length}
              </div>
              <div className="text-sm font-bold text-black uppercase tracking-wide">
                Phrases
              </div>
            </div>
          </div>
        </div>
      </FullscreenModal>
    </div>
  );
};
