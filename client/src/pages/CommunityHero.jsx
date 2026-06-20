import { Bell, Megaphone, Globe2, Users, Heart, MessageCircle } from "lucide-react";

const CommunityHero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-pink-50 via-rose-50 to-pink-200 px-6 py-8 md:px-10 lg:px-14 max-w-7xl mx-auto">
      <div className="absolute right-0 top-0 h-full w-1/2 bg-pink-300/20 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-24 w-2/3 rounded-tl-full bg-pink-300/30" />

      <div className="relative z-10 grid items-center gap-8 lg:grid-cols-2">
        <div>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-pink-300 bg-white/60 px-4 py-2 text-sm font-bold text-pink-500">
            <Bell size={16} />
            Stay Updated
          </div>

          <h1 className="text-3xl font-extrabold text-[#6b123b] md:text-5xl lg:text-5xl">
            Community Posts
          </h1>

          <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-600 md:text-lg">
            Explore the latest updates, opportunities, and stories shared by our
            global community.
          </p>

          <div className="mt-7 grid gap-4 sm:grid-cols-3">
            <Feature icon={<Users size={20} />} title="Real Stories" text="From our community" />
            <Feature icon={<Megaphone size={20} />} title="Latest Updates" text="News & Opportunities" />
            <Feature icon={<Globe2 size={20} />} title="Global Network" text="Connect & Grow" />
          </div>
        </div>

        <div className="relative hidden min-h-[220px] lg:block">
          <div className="absolute left-1/2 top-1/2 grid h-36 w-36 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white shadow-xl">
            <div className="grid h-28 w-28 place-items-center rounded-full bg-gradient-to-br from-pink-400 to-pink-600 text-white">
              <Users size={52} />
            </div>
          </div>

          <div className="absolute right-28 top-8 rotate-12 rounded-2xl bg-white p-4 text-pink-500 shadow-lg">
            <Heart size={26} fill="currentColor" />
          </div>

          <div className="absolute bottom-8 right-36 rounded-2xl bg-white p-4 text-pink-500 shadow-lg">
            <MessageCircle size={26} fill="currentColor" />
          </div>

          <div className="absolute right-0 top-4 text-6xl border-0">💗</div>
        </div>
      </div>
    </section>
  );
};

const Feature = ({ icon, title, text }) => {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-white/60 p-3">
      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-pink-100 text-pink-500">
        {icon}
      </div>
      <div>
        <h3 className="text-sm font-bold text-[#6b123b]">{title}</h3>
        <p className="text-xs text-slate-500">{text}</p>
      </div>
    </div>
  );
};

export default CommunityHero;