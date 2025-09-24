"use client";

export function TextBuddyLogo() {
  return (
    <div className="relative select-none">
      <h1 className="relative text-7xl font-black tracking-tight">
        <span className="absolute text-red-500 translate-x-[2px] opacity-70">
          Text Buddy
        </span>
        <span className="absolute text-green-500 opacity-70">Text Buddy</span>
        <span className="absolute text-blue-500 -translate-x-[2px] opacity-70">
          Text Buddy
        </span>
        <span className="relative text-black">Text Buddy</span>
      </h1>
    </div>
  );
}
