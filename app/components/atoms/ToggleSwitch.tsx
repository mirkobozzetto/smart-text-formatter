"use client";

interface ToggleSwitchProps {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
  label?: string;
  size?: "small" | "medium";
}

export const ToggleSwitch = ({
  enabled,
  onChange,
  label,
  size = "small",
}: ToggleSwitchProps) => {
  const dimensions =
    size === "small"
      ? { switch: "h-4 w-7", ball: "h-2.5 w-2.5" }
      : { switch: "h-6 w-11", ball: "h-4 w-4" };

  return (
    <div className="flex items-center space-x-1">
      {label && <label className="text-xs text-gray-500">{label}</label>}
      <button
        onClick={() => onChange(!enabled)}
        className={`relative inline-flex items-center rounded-full transition-colors ${
          dimensions.switch
        } ${enabled ? "bg-blue-500" : "bg-gray-300"}`}
        role="switch"
        aria-checked={enabled}
      >
        <span
          className={`inline-block transform rounded-full bg-white transition-transform ${
            dimensions.ball
          } ${enabled ? "translate-x-4" : "translate-x-1"}`}
        />
      </button>
    </div>
  );
};
