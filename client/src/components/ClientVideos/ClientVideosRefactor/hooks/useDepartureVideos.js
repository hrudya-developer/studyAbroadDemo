import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL, formatVideos } from "../utils/videoUtils";

const useDepartureVideos = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const loadVideos = async () => {
      try {
        setLoading(true);
        setError("");

        const formData = new FormData();
        formData.append("api", "overseas@Miak2023");
        formData.append("uid", "0");

        const response = await axios.post(API_URL, formData, {
          signal: controller.signal,
        });

        setVideos(formatVideos(response?.data));
      } catch (err) {
        if (
          err?.name === "CanceledError" ||
          err?.name === "AbortError" ||
          err?.code === "ERR_CANCELED"
        ) {
          return;
        }

        console.error("Unable to fetch departure videos:", err);
        setError(
          "Unable to load departure videos. Please try again later."
        );
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };

    loadVideos();
    return () => controller.abort();
  }, []);

  return { videos, loading, error };
};

export default useDepartureVideos;
