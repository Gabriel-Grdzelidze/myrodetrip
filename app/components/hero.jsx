import { Bus, Utensils, Users, Dot, ArrowRight , MapPin } from "lucide-react";

const Hero = () => {
  const stats = [
    { icon: MapPin, number: "50+", label: "Destinations" },
    { icon: Users, number: "10k+", label: "Happy Students" },
    { icon: Utensils, number: "100+", label: "Menu Options" },
  ];

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center ">
      <div className="absolute inset-0 -z-10">
        <img
          src="/images/hero-bus-trip.jpg"
          alt="bg"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/40 to-transparent" />
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-[75%] -translate-y-[55%] flex flex-col items-start w-200 px-6">
        <h1 className="text-[13px] font-semibold text-center text-[#f1f1f1] bg-[#0AC4E0]/20 pr-2 rounded-2xl border border-[#3BC1A8] flex items-center gap-2 mb-5">
          <Dot size={40} color="#FF7F11" className="animate-pulse" /> Georgia's
          #1 School Trip Platform
        </h1>

        <h1 className="text-[54px] w-full text-[#f1f1f1] font-bold leading-none">
          Plan Unforgettable <br />
          <span className="text-[#FF7F11]">School Adventures</span> with <br />{" "}
          Ease
        </h1>

        <h5 className="text-[16px] mt-5 text-[#f1f1f1] font-medium w-120">
          Connect with trusted bus drivers, choose perfect destinations, and
          plan delicious meals — all in one place. Make every school trip
          memorable.
        </h5>

        <div className="flex items-center gap-5">
          <>
            <style>
              {`
              @keyframes pulseShadow {
                0%, 100% { box-shadow: 0 0 5px rgba(255, 255, 255, 0); }
                50% { box-shadow: 0 0 25px rgba(255, 255, 255, 0.6); }
              }
            `}
            </style>

            <button
              style={{ animation: "pulseShadow 2s infinite ease-in-out" }}
              className="text-[15px] mt-7 text-[#f1f1f1] rounded-2xl bg-linear-to-br from-[#FF7F11] to-[#F2B50B] py-2.5 px-8 cursor-pointer tracking-normal font-bold hover:scale-105 transition flex items-center"
            >
              Start Planing Now
              <ArrowRight size={18} color="#fff" className="ml-2" />
            </button>
          </>

          <button className="text-[#f1f1f1] text-[15px] mt-7 rounded-2xl py-2 px-12 cursor-pointer font-bold border-2 border-[#f1f1f1] hover:bg-white/20 transition">
            View Destination
          </button>
        </div>

        <div className="flex justify-center gap-24 mt-8">
          {stats.map((item, i) => (
            <div key={i} className="flex flex-col items-center group">
              <div className="flex justify-center items-baseline gap-2">
                <item.icon className="w-4 h-4 text-[#FF7F11] transition-transform group-hover:scale-110 drop-shadow-lg" />
                <span className="text-2xl font-black mt-2 text-white drop-shadow-md">
                  {item.number}
                </span>
              </div>
              <p className="text-slate-200 font-bold uppercase tracking-widest text-[9px] drop-shadow-md mt-2.5">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;