import { useEffect, useRef, useState } from "react";
import { Send, X } from "lucide-react";
import MiaAvatar from "../assets/miaSticker.png";

export default function MiaAgentChatbox({ onClose }) {
  const chatboxRef = useRef(null);
  const messagesRef = useRef(null);

  const [message, setMessage] = useState("");

  // Lock the main page while the chatbot is open.
  useEffect(() => {
    const body = document.body;
    const html = document.documentElement;

    const previousBodyOverflow = body.style.overflow;
    const previousBodyPaddingRight = body.style.paddingRight;
    const previousHtmlOverflow = html.style.overflow;

    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    body.style.overflow = "hidden";
    html.style.overflow = "hidden";

    // Prevent layout movement when the scrollbar disappears.
    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      body.style.overflow = previousBodyOverflow;
      body.style.paddingRight = previousBodyPaddingRight;
      html.style.overflow = previousHtmlOverflow;
    };
  }, []);

  // Close on Escape.
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose?.();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const handleOverlayMouseDown = (event) => {
    // Close only when the dark backdrop itself is clicked.
    if (event.target === event.currentTarget) {
      onClose?.();
    }
  };

  const handleChatboxMouseDown = (event) => {
    event.stopPropagation();
  };

  const handleWheel = (event) => {
    // Keep wheel events inside the chatbot.
    event.stopPropagation();
  };

  const handleTouchMove = (event) => {
    // Keep touch scrolling inside the chatbot on mobile.
    event.stopPropagation();
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmedMessage = message.trim();

    if (!trimmedMessage) return;

    console.log("Message:", trimmedMessage);
    setMessage("");
  };

  return (
    <div
      role="presentation"
      onMouseDown={handleOverlayMouseDown}
      className="
        fixed inset-0 z-[9999]
        flex items-end justify-end
        bg-slate-950/25
        p-3
        backdrop-blur-[2px]
        sm:p-6
      "
    >
      <section
        ref={chatboxRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="mia-chatbox-title"
        onMouseDown={handleChatboxMouseDown}
        onWheel={handleWheel}
        onTouchMove={handleTouchMove}
        className="
          flex
          max-h-[calc(100dvh-24px)]
          w-[94vw]
          max-w-sm
          flex-col
          overflow-hidden
          rounded-[28px]
          border border-white/70
          bg-white
          shadow-[0_24px_80px_rgba(99,26,51,0.28)]
          sm:max-h-[calc(100dvh-48px)]
        "
      >
        {/* Header */}
        <header
          className="
            relative flex shrink-0
            items-center gap-3
            overflow-hidden
            bg-gradient-to-r
            from-darkPrimary
            via-[#8f2348]
            to-primary
            p-4 text-white
          "
        >
          <span
            className="
              pointer-events-none
              absolute -right-8 -top-10
              h-28 w-28 rounded-full
              bg-white/10 blur-2xl
            "
          />

          <div className="relative shrink-0">
            <img
              src={MiaAvatar}
              alt="MIA"
              className="
                h-12 w-12
                rounded-full
                border-2 border-white
                bg-white object-cover
                shadow-lg
              "
            />

            <span
              className="
                absolute bottom-0 right-0
                h-3.5 w-3.5
                rounded-full
                border-2 border-darkPrimary
                bg-green-400
              "
            />
          </div>

          <div className="relative min-w-0 flex-1">
            <h3
              id="mia-chatbox-title"
              className="truncate text-lg font-bold leading-none"
            >
              MIA ✨
            </h3>

            <p className="mt-1 text-xs text-white/80">
              Study Abroad Advisor
            </p>

            <div className="mt-1.5 flex items-center gap-1.5 text-xs">
              <span className="h-2 w-2 rounded-full bg-green-400" />
              <span>Online</span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close chatbot"
            className="
              relative grid h-9 w-9 shrink-0
              place-items-center
              rounded-full
              bg-white/15
              transition-all duration-200
              hover:rotate-90
              hover:bg-white/25
              focus:outline-none
              focus-visible:ring-2
              focus-visible:ring-white/70
            "
          >
            <X size={20} />
          </button>
        </header>

        {/* Scrollable messages */}
        <div
          ref={messagesRef}
          className="
            min-h-0 flex-1
            overflow-y-auto
            overscroll-contain
            bg-gradient-to-b
            from-white
            via-white
            to-pink-50/40
            p-5
            [scrollbar-color:#c01f53_transparent]
            [scrollbar-width:thin]
          "
        >
          <div className="flex items-start gap-3">
            <img
              src={MiaAvatar}
              alt=""
              aria-hidden="true"
              className="
                h-10 w-10 shrink-0
                rounded-full
                bg-gray-100 object-cover
                shadow-sm
              "
            />

            <div className="min-w-0">
              <div
                className="
                  relative max-w-[245px]
                  rounded-3xl rounded-tl-md
                  border border-slate-100
                  bg-slate-100
                  px-4 py-3
                  text-sm leading-6
                  text-slate-800
                  shadow-sm
                "
              >
                <p className="font-semibold text-slate-900">
                  Hi! 👋 I’m MIA,
                </p>

                <p>your study abroad advisor.</p>

                <p className="mt-3">
                  I’ll help you find the best options based on your profile,
                  budget and future goals.
                </p>
              </div>

              <span className="mt-2 block pl-1 text-[11px] text-slate-400">
                10:30 AM
              </span>
            </div>
          </div>

          {/* Temporary spacing for testing internal scrolling */}
          <div className="h-24" />
        </div>

        {/* Message input */}
        <form
          onSubmit={handleSubmit}
          className="
            shrink-0
            border-t border-slate-100
            bg-white
            px-4 py-3
          "
        >
          <div
            className="
              flex items-center gap-2
              rounded-2xl
              border border-pink-200
              bg-white
              p-2
              shadow-[0_6px_20px_rgba(192,31,83,0.08)]
              transition
              focus-within:border-primary/60
              focus-within:ring-4
              focus-within:ring-primary/10
            "
          >
            <input
              type="text"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Type your message..."
              aria-label="Type your message"
              className="
                min-w-0 flex-1
                bg-transparent
                px-3 py-2
                text-sm text-slate-900
                outline-none
                placeholder:text-slate-400
              "
            />

            <button
              type="submit"
              disabled={!message.trim()}
              aria-label="Send message"
              className="
                grid h-10 w-10 shrink-0
                place-items-center
                rounded-full
                bg-primary
                text-white
                shadow-[0_5px_14px_rgba(192,31,83,0.3)]
                transition-all duration-200
                hover:scale-105
                hover:bg-darkPrimary
                disabled:cursor-not-allowed
                disabled:opacity-40
                disabled:hover:scale-100
                focus:outline-none
                focus-visible:ring-2
                focus-visible:ring-primary/40
                focus-visible:ring-offset-2
              "
            >
              <Send size={18} />
            </button>
          </div>
        </form>

        {/* Footer */}
        <footer
          className="
            shrink-0
            bg-pink-50
            px-4 py-3
            text-center text-xs
            text-slate-600
          "
        >
          🛡️ Powered by{" "}
          <span className="font-semibold text-primary">Medcity</span>{" "}
          Abroad Mentor
        </footer>
      </section>
    </div>
  );
}