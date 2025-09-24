"use client";

import { TextStats as TextStatsType } from "../../types";

interface TextStatsProps {
  stats: TextStatsType;
  className?: string;
}

const StatIcon = ({ type }: { type: string }) => {
  const icons: Record<string, React.ReactElement> = {
    Characters: (
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
        />
      </svg>
    ),
    Words: (
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
    ),
    "Reading Time": (
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  };

  return icons[type] || icons.Words;
};

export const TextStats = ({ stats, className = "" }: TextStatsProps) => {
  const formatReadingTime = (minutes: number): string => {
    if (minutes < 1) {
      const seconds = Math.ceil(minutes * 60);
      return `${seconds}s`;
    }

    if (minutes < 60) {
      return `${Math.ceil(minutes)}m`;
    }

    const hours = Math.floor(minutes / 60);
    const remainingMinutes = Math.ceil(minutes % 60);
    return `${hours}h ${remainingMinutes}m`;
  };

  const statItems = [
    {
      label: "Characters",
      value: stats.characterCount.toLocaleString(),
      raw: stats.characterCount,
    },
    {
      label: "Words",
      value: stats.wordCount.toLocaleString(),
      raw: stats.wordCount,
    },
    {
      label: "Reading Time",
      value: formatReadingTime(stats.estimatedReadingTime),
      raw: stats.estimatedReadingTime,
    },
  ];

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex items-center justify-between px-1">
        <h3 className="text-xs font-bold text-black uppercase tracking-wide">
          Text Metrics
        </h3>
        <div className="flex items-center space-x-1">
          <div className="w-1.5 h-1.5 bg-black rounded-full animate-pulse" />
          <span className="text-xs text-gray-500 uppercase">Live</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {statItems.map((item) => (
          <div
            key={item.label}
            className="bg-white rounded-2xl p-4 border border-gray-300 transition-all duration-200 hover:bg-gray-50"
          >
            <div className="space-y-2">
              <div className="text-black">
                <StatIcon type={item.label} />
              </div>
              <div>
                <div className="text-lg font-bold text-black tabular-nums">
                  {item.value}
                </div>
                <div className="text-xs font-bold text-black uppercase tracking-wide">
                  {item.label}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
