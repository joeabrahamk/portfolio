import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, User, Folder, Briefcase, Mail, FileText } from 'lucide-react';

const navItems = [
  { name: 'Home', icon: <Home size={20} />, id: 'home' },
  { name: 'About', icon: <User size={20} />, id: 'about' },
  { name: 'Projects', icon: <Folder size={20} />, id: 'projects' },
  { name: 'Experience', icon: <Briefcase size={20} />, id: 'experience' },
  { name: 'Contact', icon: <Mail size={20} />, id: 'contact' },
  { name: 'Resume', icon: <FileText size={20} />, id: 'resume', href: '/resume.pdf' }, // Resume button
];

const BORDER_RADIUS = 24; // px

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [lastInteraction, setLastInteraction] = useState(Date.now());
  const [activeId, setActiveId] = useState('home');
  const navRef = useRef(null);
  const [navWidth, setNavWidth] = useState(0);
  const [navHeight, setNavHeight] = useState(64);
  const [glareOffset, setGlareOffset] = useState(0);

  // Only show hamburger menu on mobile
  const isMobile = typeof window !== "undefined" && window.innerWidth < 1024;

  useEffect(() => {
    if (isMobile) {
      const interval = setInterval(() => {
        if (Date.now() - lastInteraction > 30000) {
          setOpen(false);
        }
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [lastInteraction, isMobile]);

  // Dynamically measure nav width and height for SVG overlay
  useEffect(() => {
    function updateSize() {
      if (navRef.current) {
        setNavWidth(navRef.current.offsetWidth);
        setNavHeight(navRef.current.offsetHeight);
      }
    }
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, [open, isMobile]);

  // Animate the glare
  useEffect(() => {
    let frame;
    let offset = 0;
    function animate() {
      offset += 0.008; // speed of glare
      if (offset > 1) offset = -1;
      setGlareOffset(offset);
      frame = requestAnimationFrame(animate);
    }
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  // Intersection Observer for scroll spy
  useEffect(() => {
    const sectionIds = navItems
      .map(item => item.id)
      .filter(id => id !== 'resume');
    const sections = sectionIds
      .map(id => document.getElementById(id))
      .filter(Boolean);

    if (sections.length === 0) return;

    const handleIntersect = (entries) => {
      // Find the section most in view
      const visible = entries
        .filter(entry => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

      if (visible.length > 0) {
        setActiveId(visible[0].target.id);
      }
    };

    const observer = new window.IntersectionObserver(handleIntersect, {
      root: null,
      rootMargin: '0px',
      threshold: Array.from({ length: 21 }, (_, i) => i / 20), // [0, 0.05, ..., 1]
    });

    sections.forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const toggleMenu = () => {
    setLastInteraction(Date.now());
    setOpen(!open);
  };

  const handleNavClick = (id, href) => {
    setLastInteraction(Date.now());
    setOpen(false);
    setActiveId(id);
    if (id === 'resume' && href) {
      window.open(href, '_blank');
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <motion.div
        ref={navRef}
        initial={{ width: 64, height: 64, borderRadius: '9999px' }}
        animate={{
          width: open || !isMobile ? '80vw' : 64,
          height: 64,
          borderRadius: open || !isMobile ? '1.5rem 0 0 1.5rem' : '9999px',
        }}
        transition={{ duration: 3.5, type: 'spring' }}
        className={`relative ${
          open || !isMobile
            ? 'bg-slate-900/60 border border-cyan-500/30 backdrop-blur-md shadow-xl'
            : ''
        } text-white overflow-hidden flex items-center`}
      >
        

        {/* Hamburger Toggle only on mobile */}
        {isMobile && (
          <button
            onClick={toggleMenu}
            className="absolute right-4 text-2xl hover:text-cyan-400 transition z-10 lg:hidden"
          >
            {open ? '✖' : '☰'}
          </button>
        )}

        {/* Nav items always visible on desktop, toggle on mobile */}
        <AnimatePresence>
          {(open || !isMobile) && (
            <motion.ul
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              className="flex justify-between w-full px-16 items-center ml-12"
            >
              {navItems.map((item) => (
                <li
                  key={item.id}
                  onClick={() => handleNavClick(item.id, item.href)}
                  className={`flex items-center gap-2 text-sm hover:text-cyan-400 transition cursor-pointer ${
                    activeId === item.id
                      ? 'font-bold text-cyan-400'
                      : ''
                  }`}
                >
                  <div
                    className={`p-2 rounded-full backdrop-blur-sm transition ${
                      activeId === item.id
                        ? 'bg-cyan-500/20 ring-2 ring-cyan-400'
                        : 'bg-white/10 hover:bg-white/20'
                    }`}
                  >
                    {item.icon}
                  </div>
                  <span>{item.name}</span>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Navbar;