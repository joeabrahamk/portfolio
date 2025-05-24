import React, { useState, useEffect } from "react";

const MacWindowBar = () => (
  <div className="flex items-center px-2 py-1 bg-[#e5e5dc] rounded-t-[4px] border-b border-[#b0b0a0]">
    <span className="w-2 h-2 rounded-full bg-[#b0b0a0] mr-1 border border-[#888]" />
    <span className="w-2 h-2 rounded-full bg-[#b0b0a0] mr-1 border border-[#888]" />
    <span className="w-2 h-2 rounded-full bg-[#b0b0a0] border border-[#888]" />
    <span className="ml-2 text-[10px] text-[#444] font-mono tracking-wide select-none">About</span>
  </div>
);

const fullText = ` HHi, I'm Joe Abraham K — a tech enthusiast, developer, and community builder from Kerala, India. Currently pursuing my B.Tech in Computer Science at the College of Engineering, Chengannur, I’m passionate about turning ideas into scalable, impactful digital solutions.

I thrive at the intersection of creativity, collaboration, and execution — whether it’s organizing events, mentoring peers, or bringing people together with purpose. I believe in learning fast, leading with intention, and staying grounded — especially when things get chaotic.

Over the years, I’ve taken on roles that challenged me to step up, solve problems, and empower others. Above all, I enjoy creating things that matter — whether it’s for people, projects, or progress.`;

const MciN = () => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + fullText.charAt(index));
      index++;
      if (index === fullText.length) clearInterval(interval);

      // Auto-scroll
      const container = document.getElementById("mac-scroll");
      if (container) container.scrollTop = container.scrollHeight;
    }, 25);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="w-full h-full flex flex-col items-center justify-start"
      style={{
        background: "repeating-linear-gradient(135deg, #e5e5dc 0 2px, #d6d6c2 2px 4px)",
        fontFamily: "'VT323', monospace",
        fontSize: "10px",
      }}
    >
      <div className="w-full border border-[#b0b0a0] rounded-[4px] overflow-hidden h-full flex flex-col">
        <MacWindowBar />
        <div
          id="mac-scroll"
          className="bg-[#f8f8f2] px-2 py-2 text-[#222] overflow-y-auto flex-1"
          style={{ whiteSpace: "pre-wrap", lineHeight: "1.4", scrollbarWidth: "thin" }}
        >
          {displayedText}
        </div>
      </div>
    </div>
  );
};

export default MciN;
