import React from "react";

interface ProgressBarProps {
  progress: number;
  onSeek: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ProgressBar = ({
  progress,
  onSeek,
}: ProgressBarProps) => {
  return (
    <div className="relative group/progress mb-4 w-full flex items-center h-4">
      <div className="absolute w-full h-1 bg-white/20 rounded-full" />
      <div
        className="absolute h-1 bg-primary rounded-full"
        style={{ width: `${progress}%` }}
      />
      <input
        type="range"
        min="0"
        max="100"
        step="0.1"
        value={progress}
        onChange={onSeek}
        className="absolute w-full h-1 opacity-0 hover:opacity-100 cursor-pointer accent-primary"
      />
    </div>
  );
};
