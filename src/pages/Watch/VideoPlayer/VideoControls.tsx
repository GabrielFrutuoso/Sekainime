import { Play, Pause, Maximize, RotateCcw, RotateCw } from "lucide-react";
import { ProgressBar } from "./ProgressBar";
import { VolumeControl } from "./VolumeControl";

interface VideoControlsProps {
  isPlaying: boolean;
  progress: number;
  volume: number;
  isMuted: boolean;
  currentTime: string;
  duration: string;
  onTogglePlay: () => void;
  onSeek: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onVolumeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onToggleMute: () => void;
  onToggleFullscreen: () => void;
  onSkip: (seconds: number) => void;
  showControls: boolean;
}

export const VideoControls = ({
  isPlaying,
  progress,
  volume,
  isMuted,
  currentTime,
  duration,
  onTogglePlay,
  onSeek,
  onVolumeChange,
  onToggleMute,
  onToggleFullscreen,
  onSkip,
  showControls,
}: VideoControlsProps) => {
  return (
    <div
      className={`absolute inset-x-0 bottom-0 p-4 pb-6 bg-linear-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-300 ${showControls ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      onClick={(e) => e.stopPropagation()}
    >
      <ProgressBar
        progress={progress}
        onSeek={onSeek}
        showControls={showControls}
      />

      <div className="flex items-center justify-between text-white">
        <div className="flex items-center gap-4">
          <button
            onClick={onTogglePlay}
            className="hover:scale-110 transition-transform p-1"
          >
            {isPlaying ? (
              <Pause size={24} fill="currentColor" />
            ) : (
              <Play size={24} fill="currentColor" />
            )}
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onSkip(-10)}
              className="p-1 hover:bg-white/10 rounded-full transition-colors"
            >
              <RotateCcw size={20} />
            </button>
            <button
              onClick={() => onSkip(10)}
              className="p-1 hover:bg-white/10 rounded-full transition-colors"
            >
              <RotateCw size={20} />
            </button>
          </div>

          <VolumeControl
            volume={volume}
            isMuted={isMuted}
            onVolumeChange={onVolumeChange}
            onToggleMute={onToggleMute}
          />

          <div className="text-sm font-medium tabular-nums">
            {currentTime} / {duration}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onToggleFullscreen}
            className="p-1 hover:bg-white/10 rounded-full transition-colors"
          >
            <Maximize size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};
