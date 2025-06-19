import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import TechStackMarquee from "../components/TechStackMarquee";


const name = "Joe Abraham K";

const starfield =
  "url(\"data:image/svg+xml;utf8,<svg width='40' height='40' xmlns='http://www.w3.org/2000/svg'><circle cx='10' cy='10' r='1.5' fill='white'/><circle cx='30' cy='20' r='1' fill='white'/><circle cx='20' cy='30' r='0.7' fill='white'/><circle cx='35' cy='35' r='1.2' fill='white'/><circle cx='5' cy='25' r='0.8' fill='white'/></svg>\")";

const socialLinks = [
  {
    href: "https://github.com/joeabrahamk",
    label: "GitHub",
    icon: <FaGithub className="text-cyan-300 transition-colors duration-300" size={22} />,
  },
  {
    href: "https://www.linkedin.com/in/joe-abraham-k/",
    label: "LinkedIn",
    icon: <FaLinkedin className="text-blue-400 transition-colors duration-300" size={22} />,
  },
  {
    href: "https://x.com/Joe_Abraham_K",
    label: "X (Twitter)",
    icon: <FaXTwitter className="text-cyan-300 transition-colors duration-300" size={22} />,
  },
];

const Home = () => {
  return (

<div className="h-full flex flex-col justify-between items-center relative overflow-x-hidden">
      {/* Side Notch Socials - fixed only on Home */}
      <div className="hidden sm:block absolute left-0 top-1/2 -translate-y-1/2 z-40">
        <div className="bg-[#101624]/90 rounded-r-3xl shadow-[0_0_10px_#22d3ee66,_0_2px_8px_#000a] py-5 px-2 md:py-7 md:px-4 flex flex-col gap-4 md:gap-6 items-center group transition-all duration-300 scale-105
          border-t-2 border-b-2 border-r-2 border-cyan-400 border-l-0">
          {socialLinks.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="group p-2 rounded-full bg-white/10 group-hover:text-blue-100 transition-all duration-300 shadow flex items-center hover:translate-x-2 active:scale-95"
            >
              {s.icon}
            </a>
          ))}
        </div>
      </div>

      {/* Shooting star SVG for space effect */}
      <svg
        className="absolute left-4 top-4 sm:left-10 sm:top-10 opacity-60 animate-pulse"
        width="40"
        height="20"
        viewBox="0 0 60 20"
        fill="none"
      >
        {/* ... */}
      </svg>

      {/* Centered content */}
      <div className="flex flex-1 flex-col items-center justify-center w-full mt-[-10vh]">
        {/* Badge style for "Hey, I'm" */}
        <span className="text-xs font-semibold uppercase tracking-widest text-cyan-400 bg-cyan-400/10 px-3 py-1 rounded-full mb-2 shadow-sm">
          Hey, I'm
        </span>
        <h1
          className="text-4xl xs:text-xl sm:text-6xl md:text-6xl font-orbitron font-bold text-center select-none transition-transform duration-700 hover:scale-110"
          style={{
            color: "transparent",
            WebkitTextFillColor: "white",
            textFillColor: "transparent",
            textShadow: "0 0 3px #22d3ee, 0 0 6px #22d3ee88",
            transition: "all 0.7s ease-in-out",
          }}
          onMouseEnter={e => {
            e.target.style.backgroundImage = starfield;
            e.target.style.backgroundSize = "40px 40px";
            e.target.style.backgroundRepeat = "repeat";
            e.target.style.color = "black";
            e.target.style.WebkitBackgroundClip = "text";
            e.target.style.backgroundClip = "text";
            e.target.style.WebkitTextFillColor = "black";
            e.target.style.textFillColor = "black";
            e.target.style.filter = "brightness(1.25)";
            e.target.style.textShadow = "0 0 5px #22d3ee, 0 0 15px #22d3ee88";
          }}
          onMouseLeave={e => {
            e.target.style.backgroundImage = "";
            e.target.style.color = "transparent";
            e.target.style.WebkitTextFillColor = "white";
            e.target.style.textFillColor = "transparent";
            e.target.style.filter = "";
            e.target.style.textShadow = "0 0 3px #22d3ee, 0 0 6px #22d3ee88";
          }}
        >
          {name}
        </h1>
        {/* Subtitle/description */}
        <p className="text-sm xs:text-base sm:text-lg font-inter max-w-xs sm:max-w-xl text-slate-300 text-center mt-4">
          A passionate developer, team leader, and community builder passionate about crafting meaningful digital experiences. Thrive on collaboration, purposeful execution, and enabling others to succeed through technology and innovation.
        </p>
      </div>

      {/* Mobile Socials - now below the text */}
      <div className="flex sm:hidden gap-6 mt-6 mb-2"></div>

      {/* <div className="absolute left-1/2 bottom-20 sm:bottom-7 -translate-x-1/2 w-[105vw] max-w-none">
        <TechStackMarquee />
      </div>*/}
    </div>
  );
};

export default Home;
