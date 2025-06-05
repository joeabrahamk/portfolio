import React from "react";

import { IoLogoHtml5 } from "react-icons/io5";
import { IoLogoCss3 } from "react-icons/io";
import { FaJsSquare } from "react-icons/fa";
import { FaReact } from "react-icons/fa6";
import { FaPython } from "react-icons/fa6";
import { FaJava } from "react-icons/fa6";
import { FaGitAlt } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { FaFigma } from "react-icons/fa6";

import { VscVscode } from "react-icons/vsc";

import {
  SiTailwindcss, SiMysql, SiPostgresql, SiFlask, SiCplusplus,
  SiPostman, SiNotion, SiVite, SiSanity, SiFirebase,
  SiNetlify, SiVercel, 
} from "react-icons/si";

// All icons in a glowing card
const IconCard = ({ icon, label }) => (
  <div className="w-16 h-16 sm:w-20 sm:h-20 flex flex-col items-center justify-center rounded-lg border border-cyan-400/30 bg-white/5 backdrop-blur-sm shadow-[0_0_8px_#22d3ee55] text-cyan-300 m-1 sm:m-2">
    <div className="text-2xl sm:text-3xl">{icon}</div>
    <span className="text-[10px] sm:text-xs mt-1 text-center font-medium text-white/80">{label}</span>
  </div>
);

// Marquee implementation included here
const Marquee = ({
  children,
  reverse = false,
  pauseOnHover = false,
  className = "",
  repeat = 3,
}) => {
  const direction = reverse ? "reverse" : "normal";
  const marqueeStyle = {
    animation: `scroll-x var(--duration, 20s) linear infinite`,
    animationDirection: direction,
    animationPlayState: "running",
    transition: "animation-play-state 0.4s cubic-bezier(0.4,0,0.2,1)",
  };

  return (
    <div className={`overflow-hidden w-full relative ${pauseOnHover ? "group/marquee" : ""}`}>
      <div
        className={`flex w-max gap-8 will-change-transform ${pauseOnHover ? "marquee" : ""} ${className}`}
        style={marqueeStyle}
      >
        {Array(repeat)
          .fill(children)
          .flat()
          .map((child, idx) => (
            <div key={idx}>{child}</div>
          ))}
      </div>

      <style jsx="true">{`
        @keyframes scroll-x {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .group\\/marquee:hover .marquee {
          animation-play-state: paused !important;
          transition: animation-play-state 0.4s cubic-bezier(0.4,0,0.2,1);
        }
      `}</style>
    </div>
  );
};

// Icons split into two rows
const techIcons1 = [
  { icon: <IoLogoHtml5 />, label: "HTML5" },
  { icon: <IoLogoCss3 />, label: "CSS3" },
  { icon: <FaJsSquare />, label: "JavaScript" },
  { icon: <FaReact />, label: "React" },
  { icon: <SiTailwindcss />, label: "Tailwind CSS" },
  { icon: <FaJava />, label: "Java" },
  { icon: <FaPython />, label: "Python" },
  { icon: <SiMysql />, label: "MySQL" },
  { icon: <SiPostgresql />, label: "PostgreSQL" },
  { icon: <SiCplusplus />, label: "C++" },
  { icon: <SiFlask />, label: "Flask" },
  { icon: <FaGitAlt />, label: "Git" },
];

const techIcons2 = [
  { icon: <FaGithub />, label: "GitHub" },
  { icon: <SiVercel />, label: "Vercel" },
  { icon: <SiNetlify />, label: "Netlify" },
  { icon: <VscVscode />, label: "VS Code" },
  { icon: <SiPostman />, label: "Postman" },
  { icon: <SiNotion />, label: "Notion" },
  { icon: <FaFigma />, label: "Figma" },
  { icon: <SiVite />, label: "Vite" },
  { icon: <SiSanity />, label: "Sanity" },
  { icon: <SiFirebase />, label: "Firebase" },
];

// Main Component
const TechStackMarquee = () => {
  return (
    <div className="mt-8 w-full px-0 sm:px-4">
      <Marquee pauseOnHover className="[--duration:30s]">
        {techIcons1.map((tech) => (
          <IconCard key={tech.label} icon={tech.icon} label={tech.label} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:30s] mt-2 sm:mt-4">
        {techIcons2.map((tech) => (
          <IconCard key={tech.label} icon={tech.icon} label={tech.label} />
        ))}
      </Marquee>
    </div>
  );
};

export default TechStackMarquee;
