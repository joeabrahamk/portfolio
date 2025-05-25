import { useState, useRef } from "react";
import {
  FaEnvelope,
  FaWhatsapp,
  FaGithub,
  FaLinkedin,
  FaXTwitter,
  FaInstagram,
} from "react-icons/fa6";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

const DockIcon = ({
  children,
  mouseX,
  size = 48,
  magnification = 70,
  distance = 120,
}) => {
  const ref = useRef(null);
  const defaultMouseX = useMotionValue(Infinity);

  const distanceCalc = useTransform(mouseX ?? defaultMouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const sizeTransform = useTransform(
    distanceCalc,
    [-distance, 0, distance],
    [size, magnification, size]
  );

  const scaleSize = useSpring(sizeTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  return (
    <motion.div
      ref={ref}
      style={{ width: scaleSize, height: scaleSize }}
      className="flex aspect-square cursor-pointer items-center justify-center rounded-full transition-all"
    >
      {children}
    </motion.div>
  );
};

const contacts = [
  {
    href: "mailto:joe@example.com",
    label: "Email",
    icon: <FaEnvelope className="text-cyan-300" size={28} />,
  },
  {
    href: "https://wa.me/919876543210",
    label: "WhatsApp",
    icon: <FaWhatsapp className="text-green-400" size={28} />,
  },
  {
    href: "https://github.com/yourusername",
    label: "GitHub",
    icon: <FaGithub className="text-gray-200" size={28} />,
  },
  {
    href: "https://linkedin.com/in/yourusername",
    label: "LinkedIn",
    icon: <FaLinkedin className="text-blue-400" size={28} />,
  },
  {
    href: "https://x.com/yourusername",
    label: "X (Twitter)",
    icon: <FaXTwitter className="text-white" size={28} />,
  },
  {
    href: "https://instagram.com/yourusername",
    label: "Instagram",
    icon: <FaInstagram className="text-pink-400" size={28} />,
  },
];

const PixelShip = () => (
  <svg width="32" height="32" viewBox="0 0 32 32">
    <rect x="14" y="2" width="4" height="8" fill="#fff" />
    <rect x="12" y="10" width="8" height="4" fill="#fff" />
    <rect x="10" y="14" width="12" height="4" fill="#fff" />
    <rect x="8" y="18" width="16" height="4" fill="#fff" />
    <rect x="14" y="22" width="4" height="6" fill="#0ff" />
    <rect x="12" y="28" width="8" height="2" fill="#f00" />
  </svg>
);

const Contact = () => {
  const [showGalaga, setShowGalaga] = useState(false);
  const mouseX = useMotionValue(Infinity);

  return (
    <div className="w-full flex flex-col items-center px-6 text-center relative min-h-screen justify-center">
      <div className="w-full flex flex-col justify-center items-center flex-1">
        <h2 className="text-4xl font-orbitron mb-4">Contact</h2>
        <p className="text-lg font-inter mb-8">
          Feel free to reach out via any platform below!
        </p>

        
      </div>

      {/* Dock Container with mouse tracking */}
        <motion.div
          onMouseMove={(e) => mouseX.set(e.pageX)}
          onMouseLeave={() => mouseX.set(Infinity)}
          className="bg-[#181e2a]/70 border border-cyan-400 rounded-2xl px-6 py-3 flex items-center gap-2 shadow-lg backdrop-blur-md"
        >
          {/* Optional: Add ModeToggle component here */}
          {/* <ModeToggle /> */}

          {contacts.map((c) => (
            <DockIcon key={c.label} mouseX={mouseX}>
              <a
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  c.href.startsWith("http") ? "noopener noreferrer" : undefined
                }
                aria-label={c.label}
                className="flex items-center justify-center w-full h-full rounded-full bg-[#181e2a] border-2 border-transparent hover:border-cyan-400 transition"
              >
                {c.icon}
              </a>
            </DockIcon>
          ))}
        </motion.div>

      <div className="w-full relative mt-12">
        <footer className="text-sm text-white font-mono py-4 flex justify-center items-center">
          <span>© 2025 Joe Abraham K. All rights reserved.</span>
        </footer>
        <button
          className="absolute bottom-4 right-4 bg-[#222] border-2 border-[#0ff] rounded-lg p-2 shadow-lg hover:scale-110 active:scale-95 transition"
          style={{ imageRendering: "pixelated" }}
          onClick={() => setShowGalaga(true)}
          aria-label="Play Galaga"
        >
          <PixelShip />
        </button>
      </div>

      {showGalaga && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="relative bg-[#222] rounded-xl p-4 shadow-2xl flex flex-col items-center">
            <button
              className="absolute top-2 right-2 text-white bg-[#f00] rounded-full w-8 h-8 flex items-center justify-center font-bold text-lg hover:bg-[#c00] transition"
              onClick={() => setShowGalaga(false)}
              aria-label="Close"
            >
              ×
            </button>
            <iframe
              src="https://galaga-js.vercel.app/"
              title="Galaga Game"
              width="400"
              height="500"
              className="rounded-lg border-4 border-[#222] bg-black"
              style={{ imageRendering: "pixelated" }}
              allow="autoplay"
            />
            <div className="mt-2 text-xs text-[#0ff] font-mono">
              Enjoy Galaga! (ESC to close)
              <br />
              <span className="text-[#1a7d9e] font-mono text-[10px]">
                “That man is playing Galaga! He thought we wouldn't notice... but we did.” <br />- Tony Stark
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contact;
