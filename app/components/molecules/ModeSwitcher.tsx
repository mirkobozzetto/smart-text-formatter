"use client";

import { FormattingMode } from "../../types";
import { motion } from "framer-motion";
import { useRef, useState, useEffect, forwardRef } from "react";

interface ModeSwitcherProps {
  currentMode: FormattingMode;
  onModeChange: (mode: FormattingMode) => void;
}

type Position = {
  left: number;
  width: number;
  opacity: number;
};

const modes: { id: FormattingMode; label: string; description: string }[] = [
  {
    id: "mobile",
    label: "Mobile",
    description: "45-60 characters per line",
  },
  {
    id: "conventional",
    label: "Conventional",
    description: "Standard paragraph formatting",
  },
  {
    id: "speed-reading",
    label: "Speed Reading",
    description: "RSVP, Bionic, Chunking",
  },
];

export const ModeSwitcher = ({
  currentMode,
  onModeChange,
}: ModeSwitcherProps) => {
  const [isHovering, setIsHovering] = useState(false);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [skipAnimation, setSkipAnimation] = useState(true);
  const tabRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    setSkipAnimation(false);
  }, []);

  const getCursorPosition = (): Position => {
    const targetIndex =
      isHovering && hoverIndex !== null
        ? hoverIndex
        : modes.findIndex((m) => m.id === currentMode);

    const targetTab = tabRefs.current[targetIndex];

    if (targetTab) {
      const { width } = targetTab.getBoundingClientRect();
      return {
        left: targetTab.offsetLeft,
        width,
        opacity: 1,
      };
    }

    return { left: 0, width: 0, opacity: 0 };
  };

  const displayedMode =
    isHovering && hoverIndex !== null
      ? modes[hoverIndex]
      : modes.find((m) => m.id === currentMode);

  return (
    <div className="space-y-3">
      <ul
        onMouseLeave={() => {
          setIsHovering(false);
          setHoverIndex(null);
        }}
        className="relative mx-auto flex w-fit rounded-full border-2 border-black bg-white p-1"
      >
        {modes.map((mode, index) => (
          <Tab
            key={mode.id}
            ref={(el) => {
              tabRefs.current[index] = el;
            }}
            onHover={() => {
              setIsHovering(true);
              setHoverIndex(index);
            }}
            isActive={currentMode === mode.id}
            onClick={() => onModeChange(mode.id)}
          >
            {mode.label}
          </Tab>
        ))}

        <Cursor position={getCursorPosition()} skipAnimation={skipAnimation} />
      </ul>

      <motion.div
        key={displayedMode?.id}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="text-center"
      >
        <p className="text-xs font-medium text-black/80">
          {displayedMode?.description}
        </p>
      </motion.div>
    </div>
  );
};

const Tab = forwardRef<
  HTMLLIElement,
  {
    children: string;
    onHover: () => void;
    isActive: boolean;
    onClick: () => void;
  }
>(({ children, onHover, isActive, onClick }, ref) => {
  return (
    <li
      ref={ref}
      onMouseEnter={onHover}
      onClick={onClick}
      className={`
        relative z-10 block cursor-pointer px-3 py-1.5
        text-xs uppercase text-white mix-blend-difference
        md:px-5 md:py-3 md:text-base
        ${isActive ? "font-bold" : ""}
      `}
    >
      {children}
    </li>
  );
});

Tab.displayName = "Tab";

const Cursor = ({
  position,
  skipAnimation,
}: {
  position: Position;
  skipAnimation: boolean;
}) => {
  return (
    <motion.li
      initial={skipAnimation ? position : false}
      animate={{
        ...position,
      }}
      transition={{
        type: "spring",
        stiffness: 350,
        damping: 25,
      }}
      className="absolute z-0 h-7 rounded-full bg-black md:h-12"
    />
  );
};
