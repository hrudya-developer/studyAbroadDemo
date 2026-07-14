import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { BookOpen, Loader2, Send } from "lucide-react";

const ADD_FEEDBACK_ENDPOINT =
  "https://overseas.technocitysolutions.com/public/api/AddFeedback";

const feedbackTypes = [
  {
    label: "Feedback",
    apiValue: "feedback",
  },
  {
    label: "Suggestions",
    apiValue: "suggestion",
  },
  {
    label: "Issues",
    apiValue: "issue",
  },
];

const isSuccessfulResponse = (responseData) => {
  const status = responseData?.status;
  const success = responseData?.success;

  return (
    status === true ||
    status === 1 ||
    status === "1" ||
    status === "true" ||
    success === true ||
    success === 1 ||
    success === "1" ||
    success === "true"
  );
};

const getSubmissionErrorMessage = (error) => {
  const status = error.response?.status;

  if (status === 429) {
    return "Too many requests were sent. Please wait a few seconds and try again.";
  }

  if (error.code === "ECONNABORTED") {
    return "The request took too long. Please try again.";
  }

  if (!error.response) {
    return (
      error.message ||
      "The server could not be reached. Please check your internet connection."
    );
  }

  if (status === 404) {
    return "The feedback API route was not found.";
  }

  if (status === 401 || status === 403) {
    return "Your login session is not valid. Please log in again.";
  }

  if (status === 422) {
    return (
      error.response?.data?.msg ||
      error.response?.data?.message ||
      "The submitted feedback details are invalid."
    );
  }

  if (status >= 500) {
    return "The server encountered an error while adding your feedback.";
  }

  return (
    error.response?.data?.msg ||
    error.response?.data?.message ||
    error.message ||
    "Something went wrong. Please try again."
  );
};



export default function SDBFeedbackForm({
  uid,
  onFeedbackSubmitted,
}) {
  const [selectedType, setSelectedType] =
    useState("feedback");

  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] =
    useState(false);

 const handleSubmit = async (event) => {
  event.preventDefault();

  if (submitting) return;

  const trimmedMessage = message.trim();

  if (!trimmedMessage) {
    await Swal.fire({
      icon: "warning",
      title: "Message required",
      text: "Please enter your feedback, suggestion, or issue.",
      confirmButtonColor: "#c01f53",
    });

    return;
  }

  if (!uid || Number(uid) === 0) {
    await Swal.fire({
      icon: "warning",
      title: "Login required",
      text: "Please log in before submitting feedback.",
      confirmButtonColor: "#c01f53",
    });

    return;
  }

  try {
    setSubmitting(true);

    const formData = new FormData();

    formData.append("api", "overseas@Miak2023");
    formData.append("uid", String(uid));
    formData.append("type", selectedType);
    formData.append("message", trimmedMessage);

    const response = await axios.post(
      ADD_FEEDBACK_ENDPOINT,
      formData,
      {
        timeout: 20000,
      }
    );

    console.log("Add feedback response:", response.data);

    const responseData = response.data;

    if (!isSuccessfulResponse(responseData)) {
      const apiMessage =
        responseData?.msg ||
        responseData?.message ||
        "The server could not add your feedback.";

      const normalizedMessage = apiMessage
        .toLowerCase()
        .trim();

      if (
        normalizedMessage.includes("already exist") ||
        normalizedMessage.includes("already exists")
      ) {
        await Swal.fire({
          icon: "info",
          title: "Already submitted",
          text: "This feedback has already been submitted.",
          confirmButtonColor: "#c01f53",
        });

        return;
      }

      await Swal.fire({
        icon: "warning",
        title: "Unable to submit",
        text: apiMessage,
        confirmButtonColor: "#c01f53",
      });

      return;
    }

    setMessage("");
    setSelectedType("feedback");

    await Swal.fire({
      icon: "success",
      title: "Submitted",
      text:
        responseData?.msg ||
        responseData?.message ||
        "Your feedback was submitted successfully.",
      timer: 1800,
      showConfirmButton: false,
    });

    if (typeof onFeedbackSubmitted === "function") {
      onFeedbackSubmitted();
    }
  } catch (error) {
    console.error("Feedback submission error:", {
      message: error.message,
      status: error.response?.status,
      response: error.response?.data,
      requestUrl: error.config?.url,
    });

    await Swal.fire({
      icon: "error",
      title: "Submission failed",
      text: getSubmissionErrorMessage(error),
      confirmButtonColor: "#c01f53",
    });
  } finally {
    setSubmitting(false);
  }
};

  return (
    <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_20px_60px_rgba(15,23,42,0.08)] sm:p-7 lg:p-9">
      <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-primary/10 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-24 -left-20 h-56 w-56 rounded-full bg-secondary/10 blur-3xl" />

      <div className="relative z-10">
        <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-12 w-12 shrink-0 hidden sm:flex items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-darkPrimary text-white shadow-lg shadow-primary/20">
              <BookOpen size={21} />
            </div>

            <div className="min-w-0">
              <h1 className="text-xl font-black text-slate-900 sm:text-2xl">
                Share Your Feedback
              </h1>

              <p className="mt-1 text-sm leading-relaxed text-slate-500">
                Your suggestions help us improve your
                experience.
              </p>
            </div>
          </div>

          <div className="hidden shrink-0 rounded-full border border-primary/15 bg-primary/5 px-4 py-2 text-xs font-semibold text-primary sm:block">
            We value your opinion
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
          noValidate
        >
          <fieldset disabled={submitting}>
            <legend className="mb-3 text-sm font-bold text-slate-800">
              What would you like to share?
            </legend>

            <div className="grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 sm:grid-cols-3">
              {feedbackTypes.map((type) => {
                const isSelected =
                  selectedType === type.apiValue;

                return (
                  <label
                    key={type.apiValue}
                    className={`group flex items-center gap-3 rounded-xl border px-4 py-3.5 transition-all duration-300 ${
                      submitting
                        ? "cursor-not-allowed opacity-60"
                        : "cursor-pointer"
                    } ${
                      isSelected
                        ? "border-primary bg-primary/5 shadow-[0_8px_25px_rgba(192,31,83,0.12)]"
                        : "border-slate-200 bg-slate-50 hover:border-primary/40 hover:bg-white"
                    }`}
                  >
                    <input
                      type="radio"
                      name="feedbackType"
                      value={type.apiValue}
                      checked={isSelected}
                      onChange={(event) =>
                        setSelectedType(
                          event.target.value
                        )
                      }
                      className="sr-only"
                    />

                    <span
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition ${
                        isSelected
                          ? "border-primary bg-primary"
                          : "border-slate-400 bg-white group-hover:border-primary"
                      }`}
                    >
                      {isSelected && (
                        <span className="h-2 w-2 rounded-full bg-white" />
                      )}
                    </span>

                    <span
                      className={`text-sm font-semibold ${
                        isSelected
                          ? "text-primary"
                          : "text-slate-700"
                      }`}
                    >
                      {type.label}
                    </span>
                  </label>
                );
              })}
            </div>
          </fieldset>

          <div>
            <div className="mb-3 flex items-center justify-between gap-3">
              <label
                htmlFor="feedback-message"
                className="text-sm font-bold text-slate-800"
              >
                Tell us more
              </label>

              <span
                className={`text-xs ${
                  message.length >= 450
                    ? "font-semibold text-primary"
                    : "text-slate-400"
                }`}
              >
                {message.length}/500
              </span>
            </div>

            <div className="relative">
              <textarea
                id="feedback-message"
                value={message}
                maxLength={500}
                disabled={submitting}
                onChange={(event) =>
                  setMessage(event.target.value)
                }
                placeholder="Write your feedback, suggestion or issue here..."
                rows={5}
                className="min-h-[150px] w-full resize-y rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 pb-12 text-sm leading-6 text-slate-800 outline-none transition duration-300 placeholder:text-slate-400 focus:border-primary/50 focus:bg-white focus:ring-4 focus:ring-primary/10 disabled:cursor-not-allowed disabled:opacity-60 sm:min-h-[170px]"
              />

              <div className="pointer-events-none absolute bottom-4 left-4 flex items-center gap-2 text-xs text-slate-400">
                <BookOpen size={14} />
                <span>Be as detailed as possible</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 border-t border-slate-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs leading-relaxed text-slate-400 sm:max-w-sm">
              Your feedback will be reviewed by our team
              and used to improve our services.
            </p>

            <button
              type="submit"
              disabled={
                submitting || !message.trim()
              }
              className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-darkPrimary px-7 py-3.5 text-sm font-bold text-white shadow-[0_12px_30px_rgba(192,31,83,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_35px_rgba(192,31,83,0.35)] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 sm:w-auto sm:min-w-[180px]"
            >
              {submitting ? (
                <>
                  <Loader2
                    size={17}
                    className="animate-spin"
                  />

                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <span>Submit Feedback</span>

                  <Send
                    size={17}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}