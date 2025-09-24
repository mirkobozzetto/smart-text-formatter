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
      ? { switch: "h-5 w-10", ball: "h-3 w-3", translate: "translate-x-5" }
      : { switch: "h-6 w-12", ball: "h-4 w-4", translate: "translate-x-6" };

  return (
    <div className="flex items-center space-x-2">
      {label && (
        <label className="text-xs font-medium text-black uppercase tracking-wide">
          {label} {enabled ? "ON" : "OFF"}
        </label>
      )}
      <button
        onClick={() => onChange(!enabled)}
        className={`
          relative inline-flex items-center rounded-full
          transition-all duration-200 border-2
          ${dimensions.switch}
          ${enabled ? "bg-black border-black" : "bg-white border-black"}
        `}
        role="switch"
        aria-checked={enabled}
      >
        <span
          className={`
            inline-block transform rounded-full
            transition-transform duration-200
            ${dimensions.ball}
            ${
              enabled
                ? `${dimensions.translate} bg-white`
                : "translate-x-0.5 bg-black"
            }
          `}
        />
      </button>
    </div>
  );
};
