import MiaAgent from "../assets/miaSticker.png";

export default function MiaButton({ onClick, disabled = false }) {
  return (
    <>
      {/* Floating animation */}
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
              filter: drop-shadow(0 10px 18px rgba(4,102,175,.25));
            }
            50% {
              filter: drop-shadow(0 18px 28px rgba(247,236,34,.45));
            }
          }
        `}
      </style>

   <button
  type="button"
  onClick={onClick}
  disabled={disabled}
  aria-label="Talk to Mia"
  className="fixed bottom-0 -right-3 z-[12] flex flex-col items-center gap-2 bg-transparent sm:bottom-0 sm:-right-6 animate__animated animate__fadeInTopLeft"
>
        <img
          src={MiaAgent}
          alt="Mia Assistant"
          draggable={false}
          className="h-26 sm:h-36 w-auto select-none transition-all duration-300 hover:scale-110 active:scale-95"
          style={{
            animation:
              "miaFloat 2.8s ease-in-out infinite, miaGlow 2.8s ease-in-out infinite",
          }}
        />

       
      </button>
    </>
  );
}