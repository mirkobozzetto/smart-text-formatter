"use client";

import { InputSection } from "../molecules/InputSection";
import { OutputSection } from "../molecules/OutputSection";
import { SpeedReadingPanel } from "./SpeedReadingPanel";
import { TextStats } from "../molecules/TextStats";
import {
  FormattingMode,
  SpeedReadingSubMode,
  BionicWord,
  TextChunk,
  TextStats as TextStatsType,
} from "../../types";

interface RSVPState {
  currentWord: string;
  currentWordIndex: number;
  isPlaying: boolean;
  wpm: number;
  progress: number;
  totalWords: number;
  togglePlay: () => void;
  setWPM: (wpm: number) => void;
  reset: () => void;
}

interface TextFormatterContentProps {
  formatter: {
    inputText: string;
    setInputText: (text: string) => void;
    formattedText: string;
    setFormattedText: (text: string) => void;
    currentMode: FormattingMode;
    speedReadingSubMode: SpeedReadingSubMode;
    setSpeedReadingSubMode: (mode: SpeedReadingSubMode) => void;
    canUndo: boolean;
    canRedo: boolean;
    undo: () => void;
    redo: () => void;
    textStats: TextStatsType;
    rsvp: RSVPState;
    bionicWords: BionicWord[];
    textChunks: TextChunk[];
    isBionicEnabled: boolean;
    setIsBionicEnabled: (enabled: boolean) => void;
  };
  clipboard: {
    copied: boolean;
    copyToClipboard: (text?: string) => void;
    autoCopyEnabled: boolean;
    setAutoCopyEnabled: (enabled: boolean) => void;
  };
}

export const TextFormatterContent = ({
  formatter,
  clipboard,
}: TextFormatterContentProps) => {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Input Column */}
        <div className="space-y-4">
          <InputSection
            value={formatter.inputText}
            onChange={formatter.setInputText}
            autoCopyEnabled={clipboard.autoCopyEnabled}
            onAutoCopyChange={clipboard.setAutoCopyEnabled}
            canUndo={formatter.canUndo}
            canRedo={formatter.canRedo}
            onUndo={formatter.undo}
            onRedo={formatter.redo}
          />
          <TextStats stats={formatter.textStats} />
        </div>

        {/* Output Column */}
        <div className="space-y-4">
          {formatter.currentMode === "speed-reading" ? (
            <SpeedReadingPanel
              subMode={formatter.speedReadingSubMode}
              onSubModeChange={formatter.setSpeedReadingSubMode}
              currentWord={formatter.rsvp.currentWord}
              isPlaying={formatter.rsvp.isPlaying}
              progress={formatter.rsvp.progress}
              wpm={formatter.rsvp.wpm}
              totalWords={formatter.rsvp.totalWords}
              currentWordIndex={formatter.rsvp.currentWordIndex}
              onTogglePlay={formatter.rsvp.togglePlay}
              onWpmChange={formatter.rsvp.setWPM}
              onReset={formatter.rsvp.reset}
              bionicWords={formatter.bionicWords}
              isBionicEnabled={formatter.isBionicEnabled}
              onToggleBionic={() =>
                formatter.setIsBionicEnabled(!formatter.isBionicEnabled)
              }
              textChunks={formatter.textChunks}
            />
          ) : (
            <OutputSection
              value={formatter.formattedText}
              onChange={formatter.setFormattedText}
              onCopy={() => clipboard.copyToClipboard()}
              copied={clipboard.copied}
            />
          )}
        </div>
      </div>

      {/* Copy feedback */}
      {clipboard.copied && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-3 py-1.5 rounded text-xs">
          Text copied to clipboard
        </div>
      )}
    </>
  );
};
