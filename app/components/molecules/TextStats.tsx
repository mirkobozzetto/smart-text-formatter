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
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
        />
      </svg>
    ),
    Words: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
    ),
    "Reading Time": (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
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
      bgGradient: "from-indigo-50/50 to-indigo-100/30",
      iconColor: "text-indigo-600",
      ringColor: "ring-indigo-500/20",
    },
    {
      label: "Words",
      value: stats.wordCount.toLocaleString(),
      raw: stats.wordCount,
      bgGradient: "from-purple-50/50 to-purple-100/30",
      iconColor: "text-purple-600",
      ringColor: "ring-purple-500/20",
    },
    {
      label: "Reading Time",
      value: formatReadingTime(stats.estimatedReadingTime),
      raw: stats.estimatedReadingTime,
      bgGradient: "from-emerald-50/50 to-emerald-100/30",
      iconColor: "text-emerald-600",
      ringColor: "ring-emerald-500/20",
    },
  ];

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex items-center justify-between px-1">
        <h3 className="text-sm font-semibold text-gray-900">Text Metrics</h3>
        <div className="flex items-center space-x-1">
          <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
          <span className="text-xs text-gray-500">Live</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {statItems.map((item, index) => (
          <div
            key={item.label}
            className="group relative"
            style={{
              animationDelay: `${index * 100}ms`,
            }}
          >
            <div
              className={`
              relative bg-gradient-to-br ${item.bgGradient}
              rounded-xl p-4 border border-gray-100/50
              ring-1 ${item.ringColor}
              transition-all duration-300 ease-out
              hover:shadow-xl hover:scale-[1.03]
              hover:ring-2 hover:border-gray-200/50
              cursor-default overflow-hidden
            `}
            >
              {/* Animated Background Glow */}
              <div
                className={`
                absolute -inset-4 bg-gradient-to-r ${item.bgGradient}
                opacity-0 blur-2xl
                group-hover:opacity-30 transition-opacity duration-500
              `}
              />

              {/* Content */}
              <div className="relative space-y-2">
                <div
                  className={`${item.iconColor} opacity-80 group-hover:opacity-100 transition-opacity`}
                >
                  <StatIcon type={item.label} />
                </div>
                <div>
                  <div className="text-lg font-bold text-gray-900 tabular-nums">
                    {item.value}
                  </div>
                  <div className="text-xs font-medium text-gray-600">
                    {item.label}
                  </div>
                </div>
              </div>

              {/* Decorative Corner Element */}
              <div
                className={`
                absolute -right-2 -bottom-2 w-12 h-12 rounded-full
                bg-gradient-to-br ${item.bgGradient}
                opacity-30 blur-xl
                group-hover:w-16 group-hover:h-16 group-hover:opacity-40
                transition-all duration-500
              `}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
