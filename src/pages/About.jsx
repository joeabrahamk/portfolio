import { useState } from "react";
import MciN from "../components/mcin";
import apple from "../assets/Apple_logo.webp";

const About = () => {
  const [isOn, setIsOn] = useState(true);
  const [isToggling, setIsToggling] = useState(false);

  const handlePowerToggle = () => {
    if (isToggling) return;
    setIsToggling(true);
    setTimeout(() => {
      setIsOn(!isOn);
      setIsToggling(false);
    }, 400); // slight flicker delay
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      {/* Macintosh Shell */}
      <div className="relative w-[480px] h-[600px] bg-[#ede8d5] rounded-[28px] border-[6px] border-[#cfcab5] shadow-[0_20px_30px_rgba(0,0,0,0.6),inset_0_6px_12px_rgba(255,255,255,0.3)]">
        {/* Vent Lines */}
        <div className="absolute right-6 top-8 flex flex-col gap-[4px]">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="w-12 h-[2px] bg-[#a7a4a0] rounded-full" />
          ))}
        </div>

        {/* Apple Rainbow Logo */}
        <img
          src={apple}
          alt="Apple Logo"
          className="absolute top-8 left-8 w-6 h-6 object-contain"
        />

        {/* Title Text */}
        <div className="absolute top-8 left-20 text-base font-bold text-[#444] font-mono tracking-wide">
          Macintosh Plus
        </div>

        {/* Bezel + Screen Frame */}
        <div className="absolute top-32 left-1/2 -translate-x-1/2 w-[360px] h-[270px] bg-[#e2e0d5] rounded-[16px] border-[6px] border-[#aaa] shadow-[inset_0_-4px_8px_rgba(0,0,0,0.2),inset_0_4px_6px_rgba(255,255,255,0.3)] flex items-center justify-center">
          {/* Screen */}
          <div className="relative w-[330px] h-[240px] bg-[#cfcfcf] border-[3px] border-[#888] rounded-[10px] overflow-hidden shadow-inner">
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none z-10" />
            {isOn ? <MciN /> : <div className="w-full h-full bg-black" />}
          </div>
        </div>

        {/* Floppy Drive */}
        <div className="absolute bottom-32 left-1/2 -translate-x-1/2 w-24 h-6 bg-[#b0b0a0] border border-[#888] rounded-b-[3px] shadow-[inset_0_2px_2px_rgba(255,255,255,0.4)]" />
        <div className="absolute bottom-28 left-1/2 -translate-x-1/2 w-6 h-2 bg-[#777] rounded-sm" />

        {/* Speaker Dots */}
        <div className="absolute bottom-14 left-1/2 -translate-x-1/2 flex gap-1">
          {[...Array(6)].map((_, i) => (
            <span key={i} className="w-1.5 h-1.5 bg-[#666] rounded-full" />
          ))}
        </div>

        {/* Power Button */}
        <button
          onClick={handlePowerToggle}
          className={`absolute bottom-8 left-8 w-4 h-4 rounded-full border border-[#666] transition shadow-[0_0_4px_rgba(0,0,0,0.2)] ${
            isOn ? "bg-[#b0ffb0] shadow-[0_0_6px_#b0ffb0]" : "bg-[#444]"
          }`}
          aria-label="Power Button"
        />

        {/* Base Shadow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-4 rounded-b-[28px] shadow-[inset_0_8px_8px_rgba(0,0,0,0.2)]" />
      </div>
    </div>
  );
};

export default About;
