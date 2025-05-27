import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Experience from './pages/Experience';
import Contact from './pages/Contact';
import Starfield from './components/Starfield';

const App = () => {
  const [activeId, setActiveId] = useState('home');

  return (
    <div className="bg-[#0a0417] text-white font-sans w-full overflow-x-hidden scrollbar-hide">
      <Starfield />
      <Navbar activeId={activeId} setActiveId={setActiveId} />
      <main className="relative z-10 snap-y snap-mandatory h-screen overflow-y-scroll scroll-smooth scrollbar-hide">
        <section id="home" className="snap-start h-screen"><Home /></section>
        <section id="about" className="snap-start h-screen"><About /></section>
        <section id="projects" className="snap-start h-screen">
          <Projects triggerAnimation={activeId === 'projects'} />
        </section>
        <section id="experience" className="snap-start h-screen"><Experience /></section>
        <section id="contact" className="snap-start h-screen"><Contact /></section>
      </main>
    </div>
  );
};

export default App;
