import { X, Send } from "lucide-react";
import MiaAvatar from "../assets/miaSticker.png";

export default function MiaAgentChatbox({ onClose }) {
  return (
    <div className="fixed bottom-4 right-4 z-[9999] w-[94vw] max-w-sm overflow-hidden rounded-[28px] bg-white shadow-2xl shadow-pink-300/50 sm:bottom-6 sm:right-6">
      <div className="flex items-center gap-3 bg-darkPrimary p-4 text-white">
        <img
          src={MiaAvatar}
          alt="MIA"
          className="h-12 w-12 rounded-full border-2 border-white object-cover bg-white"
        />

        <div className="flex-1">
          <h3 className="text-xlg font-bold leading-none">MIA ✨</h3>
          <p className="mt-1 text-xs">Study Abroad Advisor</p>

          <div className="mt-1 flex items-center gap-2 text-xs">
            <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
            Online
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="grid h-9 w-9 place-items-center rounded-full bg-white/15 transition hover:bg-white/25 hover:cursor-pointer"
        >
          <X size={20} />
        </button>
      </div>

      <div className="min-h-[360px] bg-white p-5">
        <div className="flex items-start gap-3">
          <img
            src={MiaAvatar}
            alt="MIA"
            className="h-10 w-10 rounded-full object-cover bg-gray-100"
          />

          <div>
            <div className="max-w-[245px] rounded-3xl bg-gray-100 p-5 text-[14px] leading-7 text-slate-900 shadow-sm">
              <p>Hi! 👋 I’m MIA,</p>
              <p>your study abroad advisor.</p>
              <br />
              <p>
                I’ll help you find the best options based on your profile,
                budget and future goals.
              </p>
            </div>

            <span className="mt-3 block text-xs text-slate-400">10:30 AM</span>
          </div>
        </div>
      </div>

      <div className="px-4 pb-3">
        <div className="flex items-center rounded-2xl border border-pink-200 p-2">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 bg-transparent px-3 py-2 text-sm outline-none"
          />

          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-full bg-primary text-white transition hover:bg-pink-700"
          >
            <Send size={18} />
          </button>
        </div>
      </div>

      <div className="bg-pink-50 py-3 text-center text-xs text-slate-700">
        🛡️ Powered by{" "}
        <span className="font-semibold text-pink-600">Medcity</span> Abroad
        Mentor
      </div>
    </div>
  );
}