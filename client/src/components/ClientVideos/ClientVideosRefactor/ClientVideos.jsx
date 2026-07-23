import { useCallback, useEffect, useRef, useState } from "react";
import VideoCarousel from "./components/VideoCarousel";
import VideoModal from "./components/VideoModal";
import {
  EmptyState,
  ErrorState,
  LoadingState,
} from "./components/VideoState";
import useCarouselController from "./hooks/useCarouselController";
import useDepartureVideos from "./hooks/useDepartureVideos";
import { FALLBACK } from "./utils/videoUtils";

const ClientVideos = () => {
  const { videos, loading, error } = useDepartureVideos();
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [previewMuted, setPreviewMuted] = useState(true);
  const previewVideoRef = useRef(null);

  const controller = useCarouselController(
    videos,
    Boolean(selectedVideo)
  );

  useEffect(() => {
    const video = previewVideoRef.current;
    if (!video || selectedVideo) return;

    video.currentTime = 0;
    video.play().catch(() => {});
  }, [controller.activeIndex, selectedVideo]);

  const openVideo = useCallback(
    (video) => {
      if (
        Math.abs(controller.dragOffsetRef.current) > 6 ||
        controller.isDraggingRef.current
      ) {
        return;
      }

      controller.stopAutoplay();
      previewVideoRef.current?.pause();
      setSelectedVideo(video);
    },
    [controller]
  );

  const closeVideo = useCallback(() => {
    setSelectedVideo(null);
  }, []);

  const togglePreviewSound = useCallback((event) => {
    event.stopPropagation();

    setPreviewMuted((current) => {
      const next = !current;
      const video = previewVideoRef.current;

      if (video) {
        video.muted = next;
        if (!next) video.play().catch(() => {});
      }

      return next;
    });
  }, []);

  const handleImageError = useCallback((event, placeholder) => {
    const image = event.currentTarget;

    if (
      placeholder &&
      placeholder !== image.src &&
      image.dataset.fallback !== "placeholder"
    ) {
      image.dataset.fallback = "placeholder";
      image.src = placeholder;
      return;
    }

    if (image.dataset.fallback !== "final") {
      image.dataset.fallback = "final";
      image.src = FALLBACK;
    }
  }, []);

  const handlePreviewError = useCallback((event) => {
    const video = event.currentTarget;
    video.style.display = "none";

    const fallback = video.parentElement?.querySelector(
      "[data-video-fallback]"
    );

    if (fallback) fallback.style.display = "block";
  }, []);

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} />;
  if (!videos.length) return <EmptyState />;

  return (
    <>
      <VideoCarousel
        videos={videos}
        controller={controller}
        previewMuted={previewMuted}
        previewVideoRef={previewVideoRef}
        onOpen={openVideo}
        onToggleSound={togglePreviewSound}
        onImageError={handleImageError}
        onPreviewError={handlePreviewError}
      />

      <VideoModal video={selectedVideo} onClose={closeVideo} />

      <style>{`
        @keyframes clientVideoModalOpen {
          from { opacity: 0; transform: scale(.94) translateY(16px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .video-modal {
          animation: clientVideoModalOpen .32s cubic-bezier(.22,1,.36,1);
        }
        @media (prefers-reduced-motion: reduce) {
          .video-modal { animation: none !important; }
        }
      `}</style>
    </>
  );
};

export default ClientVideos;
