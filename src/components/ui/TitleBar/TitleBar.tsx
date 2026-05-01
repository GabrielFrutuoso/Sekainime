import { getCurrentWindow } from "@tauri-apps/api/window";
import { X } from "lucide-react";

export const TitleBar = () => {
  return (
    <header
      data-tauri-drag-region
      className="h-8 border-b border-border bg-sidebar-accent flex items-center shrink-0 select-none cursor-default"
    >
      <div
        data-tauri-drag-region
        className="flex-1 h-full flex items-center px-6"
      >
        <h1
          data-tauri-drag-region
          className="text-xl font-bold tracking-tight text-sidebar-primary"
        >
          Sekainime
        </h1>
      </div>
      <div className="flex h-full">
        <button
          onClick={() => getCurrentWindow().minimize()}
          className="h-full px-4 hover:bg-white/10 transition-colors flex items-center justify-center"
        >
          <svg width="12" height="1" viewBox="0 0 12 1">
            <rect width="12" height="1" fill="currentColor" />
          </svg>
        </button>
        <button
          onClick={async () =>
            (await getCurrentWindow().isMaximized())
              ? getCurrentWindow().unmaximize()
              : getCurrentWindow().maximize()
          }
          className="h-full px-4 hover:bg-white/10 transition-colors flex items-center justify-center"
        >
          <svg width="12" height="12" viewBox="0 0 12 12">
            <rect
              width="9"
              height="9"
              x="1.5"
              y="1.5"
              fill="none"
              stroke="currentColor"
            />
          </svg>
        </button>
        <button
          onClick={() => getCurrentWindow().close()}
          className="h-full px-4 hover:bg-red-500 transition-colors flex items-center justify-center"
        >
          <X size={17} />
        </button>
      </div>
    </header>
  );
};
