import { useState } from "react";

// Simple pixel spaceship SVG
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

// Galaga iframe (replace src with your preferred Galaga game)
const GalagaIframe = () => (
  <iframe
    src="https://galaga-js.vercel.app/"
    title="Galaga Game"
    width="400"
    height="500"
    className="rounded-lg border-4 border-[#222] bg-black"
    style={{ imageRendering: "pixelated" }}
    allow="autoplay"
  />
);

const Contact = () => {
  const [showGalaga, setShowGalaga] = useState(false);

  return (
    <div className="h-full min-h-screen flex flex-col justify-center items-center px-6 text-center relative">
      <h2 className="text-4xl font-orbitron mb-4">Contact</h2>
      <p className="text-lg font-inter">
        Reach out via email:{" "}
        <a href="mailto:joe@example.com" className="text-blue-400">
          joe@example.com
        </a>
      </p>

      {/* Page content here */}

      <div className="w-full flex justify-end items-end mt-20">
        <button
          className="bg-[#222] border-2 border-[#0ff] rounded-lg p-2 shadow-lg hover:scale-110 active:scale-95 transition"
          style={{ imageRendering: "pixelated" }}
          onClick={() => setShowGalaga(true)}
          aria-label="Play Galaga"
        >
          <PixelShip />
        </button>
      </div>

      {/* Galaga Pop-up */}
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
            <GalagaIframe />
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
