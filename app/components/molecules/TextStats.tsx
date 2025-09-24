"use client";

import { TextStats as TextStatsType } from "../../types";

interface TextStatsProps {
  stats: TextStatsType;
  className?: string;
}

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
    },
    {
      label: "Words",
      value: stats.wordCount.toLocaleString(),
    },
    {
      label: "Reading Time",
      value: formatReadingTime(stats.estimatedReadingTime),
    },
  ];

  return (
    <div className={`bg-white rounded p-3 border border-gray-200 ${className}`}>
      <div className="grid grid-cols-3 gap-4">
        {statItems.map((item) => (
          <div key={item.label} className="text-center">
            <div className="text-sm font-medium text-gray-900">
              {item.value}
            </div>
            <div className="text-xs text-gray-500">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
