import { useState } from "react";
import { FaEnvelope, FaWhatsapp, FaGithub, FaLinkedin, FaXTwitter, FaInstagram } from "react-icons/fa6";

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

const contacts = [
  {
    href: "mailto:joe@example.com",
    label: "Email",
    display: "joe@example.com",
    color: "border-cyan-400 text-cyan-100 hover:bg-cyan-900/40",
    icon: <FaEnvelope className="text-cyan-300" size={22} />,
  },
  {
    href: "https://wa.me/919876543210",
    label: "WhatsApp",
    display: "WhatsApp",
    color: "border-green-400 text-green-100 hover:bg-green-900/40",
    icon: <FaWhatsapp className="text-green-400" size={22} />,
  },
  {
    href: "https://github.com/yourusername",
    label: "GitHub",
    display: "GitHub",
    color: "border-gray-400 text-gray-100 hover:bg-gray-900/40",
    icon: <FaGithub className="text-gray-200" size={22} />,
  },
  {
    href: "https://linkedin.com/in/yourusername",
    label: "LinkedIn",
    display: "LinkedIn",
    color: "border-blue-400 text-blue-100 hover:bg-blue-900/40",
    icon: <FaLinkedin className="text-blue-400" size={22} />,
  },
  {
    href: "https://x.com/yourusername",
    label: "X (Twitter)",
    display: "X (Twitter)",
    color: "border-white text-white hover:bg-white/10",
    icon: <FaXTwitter className="text-white" size={22} />,
  },
  {
    href: "https://instagram.com/yourusername",
    label: "Instagram",
    display: "Instagram",
    color: "border-pink-400 text-pink-100 hover:bg-pink-900/40",
    icon: <FaInstagram className="text-pink-400" size={22} />,
  },
];

const Contact = () => {
  const [showGalaga, setShowGalaga] = useState(false);

  return (
    <div className="w-full flex flex-col items-center px-6 text-center relative min-h-screen justify-center">
      <div className="w-full flex flex-col justify-center items-center flex-1">
        <h2 className="text-4xl font-orbitron mb-4">Contact</h2>
        <p className="text-lg font-inter mb-8">
          Feel free to reach out via any platform below!
        </p>

        <div className="flex flex-wrap justify-center gap-4 w-full max-w-3xl">
          {contacts.map((c) => (
            <a
              key={c.label}
              href={c.href}
              target={c.href.startsWith("http") ? "_blank" : undefined}
              rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg bg-[#181e2a] border-2 font-mono transition text-base ${c.color}`}
            >
              {c.icon}
              <span className="truncate">{c.display}</span>
            </a>
          ))}
        </div>
        
      </div>

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
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contact;
