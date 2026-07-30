import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { fetchGermanPrograms } from "../../redux/slices/germanProgramSlice";

import {
  HOME_API_URL,
  isAusbildungProgram,
} from "./germanProgramUtils";

export default function useGermanPopularCourses() {
  const dispatch = useDispatch();

  const [programs, setPrograms] = useState(
    []
  );

  const [imagePath, setImagePath] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [error, setError] = useState("");

  const {
    youtube = [],
    loading: videosLoading = false,
    error: videosError = null,
  } = useSelector(
    (state) =>
      state.germanProgramData || {}
  );

  useEffect(() => {
    const controller =
      new AbortController();

    const loadPrograms = async () => {
      try {
        setLoading(true);
        setError("");

        const formData = new FormData();

        formData.append(
          "api",
          "overseas@Miak2023"
        );

        formData.append("uid", "0");

        const response = await axios.post(
          HOME_API_URL,
          formData,
          {
            headers: {
              Accept: "application/json",
            },
            signal: controller.signal,
          }
        );

        const result = Array.isArray(
          response?.data?.home_tile_new
        )
          ? response.data.home_tile_new
          : [];

        const sortedPrograms = [
          ...result,
        ].sort((first, second) => {
          return (
            Number(
              isAusbildungProgram(second)
            ) -
            Number(
              isAusbildungProgram(first)
            )
          );
        });

        setPrograms(sortedPrograms);

        setImagePath(
          response?.data
            ?.hometile_image_path || ""
        );
      } catch (requestError) {
        if (
          requestError?.code ===
          "ERR_CANCELED"
        ) {
          return;
        }

        console.error(requestError);

        setError(
          "Failed to load German programs."
        );
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    loadPrograms();

    return () => controller.abort();
  }, []);

  const ausbildungProgram = useMemo(
    () =>
      programs.find(
        isAusbildungProgram
      ) ||
      programs[0] ||
      null,
    [programs]
  );

  useEffect(() => {
    if (!ausbildungProgram?.id) return;

    dispatch(
      fetchGermanPrograms({
        uid: 0,
        id: ausbildungProgram.id,
      })
    );
  }, [
    dispatch,
    ausbildungProgram?.id,
  ]);

  return {
    programs,
    imagePath,
    loading,
    error,
    youtube,
    videosLoading,
    videosError,
    ausbildungProgram,
  };
}