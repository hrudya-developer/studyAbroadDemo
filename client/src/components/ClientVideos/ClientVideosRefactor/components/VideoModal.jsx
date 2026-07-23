import { useEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

const VideoModal = ({ video, onClose }) => {
  useEffect(() => {
    if (!video) return undefined;

    const bodyOverflow = document.body.style.overflow;
    const htmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    const handleEscape = (event) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = bodyOverflow;
      document.documentElement.style.overflow = htmlOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [onClose, video]);

  if (!video || typeof document === "undefined") return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[2147483647] flex items-center justify-center bg-black/90 p-3 backdrop-blur-md sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={`${video.title} video player`}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="video-modal relative w-full max-w-[470px] overflow-hidden rounded-[26px] border border-white/20 bg-black shadow-[0_30px_120px_rgba(0,0,0,.9)]">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close video"
          className="absolute right-3 top-3 z-30 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/70 text-white shadow-xl backdrop-blur-md transition duration-300 hover:rotate-90 hover:bg-primary"
        >
          <X size={22} />
        </button>

        <video
          key={video.videoUrl}
          src={video.videoUrl}
          poster={video.poster}
          controls
          autoPlay
          playsInline
          preload="auto"
          controlsList="nodownload"
          className="max-h-[90vh] min-h-[420px] w-full bg-black object-contain"
          onError={(event) =>
            console.error("Video playback failed:", event)
          }
        >
          Your browser does not support video playback.
        </video>
      </div>
    </div>,
    document.body
  );
};

export default VideoModal;
