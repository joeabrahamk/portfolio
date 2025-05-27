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
    href: "mailto:joeabrahamk2004@gmail.com",
    label: "Email",
    icon: <FaEnvelope className="text-cyan-300" size={28} />,
  },
  {
    href: "https://wa.me/917025120451",
    label: "WhatsApp",
    icon: <FaWhatsapp className="text-green-400" size={28} />,
  },
  {
    href: "https://github.com/joeabrahamk",
    label: "GitHub",
    icon: <FaGithub className="text-gray-200" size={28} />,
  },
  {
    href: "https://www.linkedin.com/in/joe-abraham-k/",
    label: "LinkedIn",
    icon: <FaLinkedin className="text-blue-400" size={28} />,
  },
  {
    href: "https://x.com/Joe_Abraham_K/status/1861644313114870023",
    label: "X (Twitter)",
    icon: <FaXTwitter className="text-white" size={28} />,
  },
  {
    href: "https://www.instagram.com/jo.e_abraham/",
    label: "Instagram",
    icon: <FaInstagram className="text-pink-400" size={28} />,
  },
];

const PixelShip = ({ width = 20, height = 20 }) => (
  <svg width={width} height={height} viewBox="0 0 32 32">
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
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2500);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="h-screen w-full overflow-y-auto scrollbar-hide">
      <div className="min-h-screen w-full flex flex-col items-center scale-[.9] px-4">
        <div className="w-full flex flex-col items-center px-6 text-center relative min-h-screen justify-center">
          <div className="w-full flex flex-col justify-center items-center flex-1">
            <h2 className="text-4xl font-orbitron text-cyan-400 mb-4">Contact</h2>
            <p className="text-lg font-inter mb-8">
              Feel free to reach out via any platform below!
            </p>

            <div className="flex flex-col w-full max-w-2xl mb-6">
              <motion.form
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="w-full max-w-2xl mb-10 flex flex-col sm:flex-row gap-6 text-left"
              >
                <div className="flex-1 flex flex-col justify-end">
                  <div>
                    <label className="block text-cyan-400 font-mono mb-1" htmlFor="name">Name</label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      required
                      placeholder="Your Name"
                      value={form.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg bg-[#22283a] text-white border border-cyan-400/20 focus:border-cyan-400 outline-none font-inter mb-4"
                    />
                  </div>
                  <div className="flex flex-col h-full justify-end">
                    <label className="block text-cyan-400 font-mono mb-1" htmlFor="email">Email</label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      required
                      placeholder="Your Email"
                      value={form.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg bg-[#22283a] text-white border border-cyan-400/20 focus:border-cyan-400 outline-none font-inter"
                    />
                  </div>
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div className="h-full flex flex-col">
                    <label className="block text-cyan-400 font-mono mb-1" htmlFor="message">Message</label>
                    <textarea
                      name="message"
                      id="message"
                      required
                      placeholder="Your Message"
                      value={form.message}
                      onChange={handleChange}
                      rows={5}
                      className="w-full px-4 py-2 rounded-lg bg-[#22283a] text-white border border-cyan-400/20 focus:border-cyan-400 outline-none font-inter resize-none flex-1"
                    />
                  </div>
                </div>
              </motion.form>

              <button
                type="submit"
                disabled={submitted}
                className="bg-cyan-400 text-[#181e2a] font-bold px-6 py-2 rounded-lg shadow hover:bg-cyan-300 transition disabled:opacity-60 mt-2 self-start"
              >
                {submitted ? "Message Sent!" : "Send Message"}
              </button>
            </div>
          </div>

          <motion.div
            onMouseMove={(e) => mouseX.set(e.pageX)}
            onMouseLeave={() => mouseX.set(Infinity)}
            className="bg-[#181e2a]/70 border border-cyan-400 rounded-2xl px-6 py-3 flex items-center gap-2 shadow-lg backdrop-blur-md mb-8 absolute bottom-0"
          >
            {contacts.map((c) => (
              <DockIcon key={c.label} mouseX={mouseX}>
                <a
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={c.label}
                  className="flex items-center justify-center w-full h-full rounded-full bg-[#181e2a] border-2 border-transparent "
                >
                  {c.icon}
                </a>
              </DockIcon>
            ))}
          </motion.div>
        </div>

        <div className="w-full relative mt-12">
          <footer className="text-sm text-white font-mono py-4 flex justify-center items-center">
            <span>© 2025 Joe Abraham K. All rights reserved.</span>
          </footer>
          <button
            className="absolute bottom-4 right-2 sm:right-4 bg-[#222] border-2 border-[#0ff] rounded-lg p-1.5 sm:p-2 shadow-lg hover:scale-110 active:scale-95 transition"
            style={{ imageRendering: "pixelated" }}
            onClick={() => setShowGalaga(true)}
            aria-label="Play Galaga"
          >
            <span className="block sm:hidden"><PixelShip width={16} height={16} /></span>
            <span className="hidden sm:block"><PixelShip width={32} height={32} /></span>
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
              <div className="mt-2 text-xs text-[#0ff] font-mono text-center">
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
    </div>
  );
};

export default Contact;
