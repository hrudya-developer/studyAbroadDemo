import { useEffect, useRef } from "react";
import MiaAgent from "../assets/animatedMia.webm";

export default function MiaButton() {
  const videoRef = useRef(null);
  const playCount = useRef(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleEnded = () => {
      playCount.current++;

      // Play twice
      if (playCount.current < 2) {
        video.currentTime = 0;
        video.play();
      } else {
        // Pause for 15 seconds
        playCount.current = 0;

        setTimeout(() => {
          video.currentTime = 0;
          video.play();
        }, 15000);
      }
    };

    video.addEventListener("ended", handleEnded);

    return () => {
      video.removeEventListener("ended", handleEnded);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      src={MiaAgent}
      autoPlay
      muted
      playsInline
      className="h-38 w-28 object-contain hover:scale-105 hover:cursor-pointer transition-transform duration-500 animate__animated animate__fadeInTopLeft"
    />
  );
}