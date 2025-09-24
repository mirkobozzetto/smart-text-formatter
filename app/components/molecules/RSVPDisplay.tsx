"use client";

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
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-8 text-center min-h-[120px] flex items-center justify-center border-2 border-blue-200">
        <div className="text-3xl md:text-4xl font-bold text-gray-900">
          {currentWord || "Start reading..."}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-gray-600">
          <span>
            Word {currentWordIndex + 1} of {totalWords}
          </span>
          <span>{progress.toFixed(1)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Controls */}
      <div className="space-y-4">
        {/* Play/Pause and Reset */}
        <div className="flex space-x-3 justify-center">
          <button
            onClick={onTogglePlay}
            disabled={totalWords === 0}
            className="px-3 py-1 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white rounded text-sm disabled:cursor-not-allowed"
          >
            {isPlaying ? "Pause" : "Play"}
          </button>

          <button
            onClick={onReset}
            disabled={totalWords === 0}
            className="px-3 py-1 bg-gray-500 hover:bg-gray-600 disabled:bg-gray-300 text-white rounded text-sm disabled:cursor-not-allowed"
          >
            Reset
          </button>
        </div>

        {/* WPM Control */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-gray-700">
              Speed: {wpm} WPM
            </label>
            <div className="text-xs text-gray-500">300 - 800 WPM</div>
          </div>
          <input
            type="range"
            min="300"
            max="800"
            step="50"
            value={wpm}
            onChange={(e) => onWpmChange(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>Slow</span>
            <span>Fast</span>
          </div>
        </div>
      </div>
    </div>
  );
};
