import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import SDBFeedbackForm from "./SDBFeedbackForm";
import SDBFeedbackHistory from "./SDBFeedbackHistory";

const GET_FEEDBACK_ENDPOINT =
  "https://overseas.technocitysolutions.com/public/api/getFeedback";

const API_KEY = "overseas@Miak2023";

const getStoredUid = () => {
  try {
    const storedAuth = sessionStorage.getItem("auth");

    if (!storedAuth) return null;

    const parsedAuth = JSON.parse(storedAuth);

    return (
      parsedAuth?.uid ||
      parsedAuth?.user?.uid ||
      parsedAuth?.user?.id ||
      null
    );
  } catch (error) {
    console.error(
      "Unable to read authentication data:",
      error
    );

    return null;
  }
};

const parseApiDate = (value) => {
  if (!value) return null;

  const normalizedValue = String(value)
    .trim()
    .replace(" ", "T");

  const parsedDate = new Date(normalizedValue);

  return Number.isNaN(parsedDate.getTime())
    ? null
    : parsedDate;
};

const formatDate = (date) => {
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const formatTime = (date) => {
  return date.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

const normalizeType = (value) => {
  const type = String(value || "feedback")
    .trim()
    .toLowerCase();

  if (type === "suggestion") {
    return "Suggestion";
  }

  if (type === "issue") {
    return "Issue";
  }

  return "Feedback";
};

const normalizeFeedback = (item, index) => {
  const createdAt =
    item?.created_at ||
    item?.createdAt ||
    item?.submitted_at ||
    item?.date ||
    "";

  const parsedDate = parseApiDate(createdAt);

  return {
    id:
      item?.id ??
      item?.feedback_id ??
      `feedback-${index}`,

    type: normalizeType(
      item?.type ||
        item?.feedback_type ||
        item?.problem
    ),

    message: String(
      item?.message ||
        item?.feedback ||
        item?.description ||
        item?.comment ||
        item?.problem ||
        ""
    ).trim(),

    reply: String(item?.reply || "").trim(),

    date: parsedDate
      ? formatDate(parsedDate)
      : "Date unavailable",

    time: parsedDate
      ? formatTime(parsedDate)
      : "",

    created_at: createdAt,

    status: item?.status,
  };
};

const getHistoryErrorMessage = (error) => {
  const status = error.response?.status;

  if (status === 429) {
    return "Too many requests were sent. Please wait a few seconds and try again.";
  }

  if (error.code === "ECONNABORTED") {
    return "The request took too long. Please try again.";
  }

  if (!error.response) {
    return "The server could not be reached. Please check your internet connection.";
  }

  if (status === 401 || status === 403) {
    return "Your login session is no longer valid. Please log in again.";
  }

  if (status === 404) {
    return "The feedback history API route was not found.";
  }

  if (status >= 500) {
    return "The server encountered an error while loading your feedback history.";
  }

  return (
    error.response?.data?.msg ||
    error.response?.data?.message ||
    "Unable to load your feedback history."
  );
};

export default function SDBFeedback() {
  const reduxUid = useSelector((state) => {
    return (
      state.auth?.uid ||
      state.auth?.user?.uid ||
      state.auth?.user?.id ||
      null
    );
  });

  const uid = useMemo(() => {
    return reduxUid || getStoredUid();
  }, [reduxUid]);

  const [feedbacks, setFeedbacks] = useState([]);
  const [historyLoading, setHistoryLoading] =
    useState(true);
  const [historyError, setHistoryError] =
    useState("");
  const [showAll, setShowAll] = useState(false);

  const mountedRef = useRef(true);
  const requestInProgressRef = useRef(false);

  const fetchFeedbackHistory = useCallback(
    async () => {
      if (!uid || Number(uid) === 0) {
        if (mountedRef.current) {
          setFeedbacks([]);
          setHistoryError(
            "Please log in to view your feedback history."
          );
          setHistoryLoading(false);
        }

        return;
      }

      if (requestInProgressRef.current) {
        return;
      }

      try {
        requestInProgressRef.current = true;

        if (mountedRef.current) {
          setHistoryLoading(true);
          setHistoryError("");
        }

        const formData = new FormData();

        formData.append("api", API_KEY);
        formData.append("uid", String(uid));

        const response = await axios.post(
          GET_FEEDBACK_ENDPOINT,
          formData,
          {
            timeout: 20000,
          }
        );

        console.log(
          "Feedback history response:",
          response.data
        );

        /*
         * API response:
         *
         * {
         *   status: true,
         *   details: [...]
         * }
         */
        const rawFeedbacks = Array.isArray(
          response.data?.details
        )
          ? response.data.details
          : [];

        const normalizedFeedbacks = rawFeedbacks
          .map(normalizeFeedback)
          .filter((item) => item.message)
          .sort((firstItem, secondItem) => {
            const firstDate = parseApiDate(
              firstItem.created_at
            );

            const secondDate = parseApiDate(
              secondItem.created_at
            );

            return (
              (secondDate?.getTime() || 0) -
              (firstDate?.getTime() || 0)
            );
          });

        if (!mountedRef.current) return;

        setFeedbacks(normalizedFeedbacks);
      } catch (error) {
        console.error(
          "Feedback history error:",
          error.response?.data || error
        );

        if (!mountedRef.current) return;

        setFeedbacks([]);
        setHistoryError(
          getHistoryErrorMessage(error)
        );
      } finally {
        requestInProgressRef.current = false;

        if (mountedRef.current) {
          setHistoryLoading(false);
        }
      }
    },
    [uid]
  );

  useEffect(() => {
    mountedRef.current = true;

    fetchFeedbackHistory();

    return () => {
      mountedRef.current = false;
    };
  }, [fetchFeedbackHistory]);

  const handleFeedbackSubmitted = useCallback(
    async () => {
      setShowAll(false);
      await fetchFeedbackHistory();
    },
    [fetchFeedbackHistory]
  );

  const handleToggleShowAll = useCallback(() => {
    setShowAll((currentValue) => !currentValue);
  }, []);

  return (
    <section className="min-h-screen bg-slate-50 px-3 py-4 sm:px-5 lg:px-8">
      <div className="mx-auto w-full max-w-[1280px]">
        <div className="grid grid-cols-1 gap-5">
          <SDBFeedbackForm
            uid={uid}
            onFeedbackSubmitted={
              handleFeedbackSubmitted
            }
          />

          <SDBFeedbackHistory
            feedbacks={feedbacks}
            loading={historyLoading}
            error={historyError}
            showAll={showAll}
            onRefresh={fetchFeedbackHistory}
            onToggleShowAll={
              handleToggleShowAll
            }
          />
        </div>
      </div>
    </section>
  );
}