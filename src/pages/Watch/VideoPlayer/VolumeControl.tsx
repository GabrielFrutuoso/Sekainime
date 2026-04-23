import React from "react";
import { Volume2, VolumeX } from "lucide-react";

interface VolumeControlProps {
  volume: number;
  isMuted: boolean;
  onVolumeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onToggleMute: () => void;
}

export const VolumeControl = ({
  volume,
  isMuted,
  onVolumeChange,
  onToggleMute,
}: VolumeControlProps) => {
  const currentVolume = isMuted ? 0 : volume;

  return (
    <div className="flex items-center gap-2 group/volume h-8">
      <button
        onClick={onToggleMute}
        className="p-1 hover:bg-white/10 rounded-full transition-colors shrink-0"
      >
        {isMuted || volume === 0 ? (
          <VolumeX size={20} />
        ) : (
          <Volume2 size={20} />
        )}
      </button>
      <div className="w-0 group-hover/volume:w-24 transition-all duration-300 overflow-hidden relative flex items-center h-full">
        <div className="w-24 relative flex items-center h-4 mx-1">
          <div className="absolute w-full h-1 bg-white/20 rounded-full" />
          <div
            className="absolute h-1 bg-white rounded-full"
            style={{ width: `${currentVolume * 100}%` }}
          />
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={currentVolume}
            onChange={onVolumeChange}
            className="absolute w-full h-4 opacity-0 cursor-pointer z-10"
          />
        </div>
      </div>
    </div>
  );
};
