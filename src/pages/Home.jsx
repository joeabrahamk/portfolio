const name = "Joe Abraham K";

const starfield =
  "url(\"data:image/svg+xml;utf8,<svg width='40' height='40' xmlns='http://www.w3.org/2000/svg'><circle cx='10' cy='10' r='1.5' fill='white'/><circle cx='30' cy='20' r='1' fill='white'/><circle cx='20' cy='30' r='0.7' fill='white'/><circle cx='35' cy='35' r='1.2' fill='white'/><circle cx='5' cy='25' r='0.8' fill='white'/></svg>\")";

const Home = () => {
  return (
    <div className="h-full flex flex-col justify-center items-center px-6 relative">
      {/* Shooting star SVG for space effect */}
      <svg
        className="absolute left-10 top-10 opacity-60 animate-pulse"
        width="60"
        height="20"
        viewBox="0 0 60 20"
        fill="none"
      >
        
      </svg>

      <div className="flex flex-col items-center mb-6 group transition-transform duration-500">
        {/* Badge style for "Hey, I'm" */}
        <span className="text-xs font-semibold uppercase tracking-widest text-cyan-400 bg-cyan-400/10 px-3 py-1 rounded-full mb-2 shadow-sm">
          Hey, I'm
        </span>
        <h1
          className="text-5xl md:text-6xl font-orbitron font-bold text-center select-none transition-transform duration-700 group-hover:scale-110"
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
      </div>
      <p className="text-lg font-inter max-w-xl text-slate-300 text-center">
        A passionate Web Developer & Student Lead with experience in building digital solutions, currently exploring new frontiers in <span className="text-cyan-300 font-semibold">space-themed</span> portfolios.
      </p>

      {/* Social Icons */}
{/* Social Icons */}
<div className="flex gap-4 mt-6">
  {[
    {
      href: "https://instagram.com/yourusername",
      label: "Instagram",
      svg: (
        <>
          <rect x="3" y="3" width="18" height="18" rx="5" className="icon-stroke" />
          <circle cx="12" cy="12" r="4" className="icon-stroke" />
          <circle cx="17" cy="7" r="1.2" fill="currentColor" />
        </>
      ),
    },
    {
      href: "https://github.com/yourusername",
      label: "GitHub",
      svg: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.867 8.166 6.839 9.489.5.092.682-.217.682-.483 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.091-.647.35-1.088.636-1.339-2.22-.253-4.555-1.112-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.848-2.338 4.695-4.566 4.944.359.309.678.919.678 1.852 0 1.336-.012 2.417-.012 2.747 0 .268.18.579.688.481C19.135 20.163 22 16.417 22 12c0-5.523-4.477-10-10-10Z"
          className="icon-stroke"
        />
      ),
    },
    {
      href: "https://linkedin.com/in/yourusername",
      label: "LinkedIn",
      svg: (
        <>
          <rect x="2" y="2" width="20" height="20" rx="5" className="icon-stroke" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 10v7M7 7v.01M12 10v7m0-7c0-1.105.895-2 2-2s2 .895 2 2v7" className="icon-stroke" />
        </>
      ),
    },
  ].map(({ href, label, svg }, idx) => (
    <a
      key={idx}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="group p-2 rounded-full bg-white/10 hover:bg-cyan-400/20 transition shadow backdrop-blur-sm"
    >
      <svg
        width="26"
        height="26"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        viewBox="0 0 24 24"
        className="icon"
      >
        {svg}
      </svg>
    </a>
  ))}
</div>

    </div>
  );
};

export default Home;