import MiaAgent from "../assets/miaSticker.png";

export default function MiaButton({ onClick }) {
  return (
    <>
      <style>
        {`
          @keyframes miaFloat {
            0%, 100% {
              transform: translateY(0px) rotate(0deg);
            }
            50% {
              transform: translateY(-8px) rotate(-2deg);
            }
          }

          @keyframes miaGlow {
            0%, 100% {
              filter: drop-shadow(0 10px 18px rgba(219, 39, 119, .25));
            }
            50% {
              filter: drop-shadow(0 18px 28px rgba(244, 114, 182, .45));
            }
          }
        `}
      </style>

      <button
        type="button"
        onClick={onClick}
        aria-label="Open Mia Chatbot"
        className="fixed bottom-0 right-0 z-[9998] bg-transparent sm:-right-3"
      >
        <img
          src={MiaAgent}
          alt="Mia Assistant"
          draggable={false}
          className="h-28 w-auto hover:cursor-pointer select-none transition-all duration-300 hover:scale-110 active:scale-95 sm:h-36"
          style={{
            animation:
              "miaFloat 2.8s ease-in-out infinite, miaGlow 2.8s ease-in-out infinite",
          }}
        />
      </button>
    </>
  );
}