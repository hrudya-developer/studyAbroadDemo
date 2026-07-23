import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  AUTOPLAY_DELAY,
  DRAG_THRESHOLD,
  getWrappedIndex,
} from "../utils/videoUtils";

const useCarouselController = (videos, modalOpen) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);

  const dragStartXRef = useRef(0);
  const dragOffsetRef = useRef(0);
  const isDraggingRef = useRef(false);
  const autoplayRef = useRef(null);

  const total = videos.length;

  const stopAutoplay = useCallback(() => {
    if (!autoplayRef.current) return;
    window.clearInterval(autoplayRef.current);
    autoplayRef.current = null;
  }, []);

  const startAutoplay = useCallback(() => {
    stopAutoplay();

    if (total <= 1 || modalOpen || document.hidden) return;

    autoplayRef.current = window.setInterval(() => {
      setActiveIndex((current) =>
        getWrappedIndex(current + 1, total)
      );
    }, AUTOPLAY_DELAY);
  }, [modalOpen, stopAutoplay, total]);

  useEffect(() => {
    setActiveIndex(0);
  }, [videos]);

  useEffect(() => {
    startAutoplay();
    return stopAutoplay;
  }, [startAutoplay, stopAutoplay]);

  useEffect(() => {
    const handleVisibility = () =>
      document.hidden ? stopAutoplay() : startAutoplay();

    document.addEventListener("visibilitychange", handleVisibility);
    return () =>
      document.removeEventListener(
        "visibilitychange",
        handleVisibility
      );
  }, [startAutoplay, stopAutoplay]);

  const goToIndex = useCallback(
    (index) => {
      if (!total) return;
      setActiveIndex(getWrappedIndex(index, total));
      setDragOffset(0);
      dragOffsetRef.current = 0;
      startAutoplay();
    },
    [startAutoplay, total]
  );

  const goToPrevious = useCallback(
    () => goToIndex(activeIndex - 1),
    [activeIndex, goToIndex]
  );

  const goToNext = useCallback(
    () => goToIndex(activeIndex + 1),
    [activeIndex, goToIndex]
  );

  const handleDragStart = useCallback(
    (clientX) => {
      if (total <= 1) return;
      isDraggingRef.current = true;
      dragStartXRef.current = clientX;
      dragOffsetRef.current = 0;
      setDragOffset(0);
      stopAutoplay();
    },
    [stopAutoplay, total]
  );

  const handleDragMove = useCallback((clientX) => {
    if (!isDraggingRef.current) return;
    const offset = clientX - dragStartXRef.current;
    dragOffsetRef.current = offset;
    setDragOffset(offset);
  }, []);

  const handleDragEnd = useCallback(() => {
    if (!isDraggingRef.current) return;

    const offset = dragOffsetRef.current;
    if (offset > DRAG_THRESHOLD) {
      setActiveIndex((current) =>
        getWrappedIndex(current - 1, total)
      );
    } else if (offset < -DRAG_THRESHOLD) {
      setActiveIndex((current) =>
        getWrappedIndex(current + 1, total)
      );
    }

    isDraggingRef.current = false;
    dragOffsetRef.current = 0;
    setDragOffset(0);
    startAutoplay();
  }, [startAutoplay, total]);

  const visibleCards = useMemo(() => {
    if (!total) return [];
    if (total === 1) {
      return [{ position: "center", video: videos[0], videoIndex: 0 }];
    }

    return [
      {
        position: "left",
        videoIndex: getWrappedIndex(activeIndex - 1, total),
      },
      { position: "center", videoIndex: activeIndex },
      {
        position: "right",
        videoIndex: getWrappedIndex(activeIndex + 1, total),
      },
    ].map((item) => ({
      ...item,
      video: videos[item.videoIndex],
    }));
  }, [activeIndex, total, videos]);

  return {
    activeIndex,
    dragOffset,
    dragOffsetRef,
    isDraggingRef,
    visibleCards,
    goToIndex,
    goToPrevious,
    goToNext,
    handleDragStart,
    handleDragMove,
    handleDragEnd,
    startAutoplay,
    stopAutoplay,
  };
};

export default useCarouselController;
