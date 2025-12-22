import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
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
    <>
      <Helmet>
        <html lang="en" />
        <title>Joe Abraham K | Full Stack Developer & Tech Leader</title>
        <meta name="description" content="Joe Abraham K is a passionate full-stack developer, team leader, and community builder. Explore projects, experience, and get in touch." />
      </Helmet>
      <div className="bg-[#0a0417] text-white font-sans w-full overflow-x-hidden scrollbar-hide">
        <Starfield />
        <Navbar activeId={activeId} setActiveId={setActiveId} />
        <main className="relative z-10 snap-y snap-mandatory h-screen overflow-y-scroll scroll-smooth scrollbar-hide" role="main">
          <section id="home" className="snap-start h-screen" aria-label="Home - Introduction">
            <Home />
          </section>
          <section id="about" className="snap-start h-screen" aria-label="About Me">
            <About />
          </section>
          <section id="projects" className="snap-start h-screen" aria-label="My Projects">
            <Projects triggerAnimation={activeId === 'projects'} />
          </section>
          <section id="experience" className="snap-start h-screen" aria-label="Work Experience">
            <Experience />
          </section>
          <section id="contact" className="snap-start h-screen" aria-label="Contact Information">
            <Contact />
          </section>
        </main>
      </div>
    </>
  );
};

export default App;
