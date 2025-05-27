import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaExternalLinkAlt } from "react-icons/fa";

const projects = [
  {
    title: "4 Wayanad",
    description: "Disaster relief app providing real-time camp inventory data.",
    link: "https://4wayanad.vercel.app/",
    tags: ["Disaster Relief", "Inventory", "Real-time"],
  },
  {
    title: "DVA",
    description:
      "Digital Vehicle Assistant (DVA) is a smart, open-source navigation tool designed to optimize fuel-efficient driving and streamline vehicle management",
    link: "https://github.com/joeabrahamk/DVA-Backend",
    tags: ["OpenSourceProject", "Navigation website", "FuelEfficiency"],
  },
  {
    title: "Smart Vault",
    description:
      "A Python-based software system that encrypts and decrypts files using AES encryption, controlled by a registered USB device as a physical key.",
    link: "https://github.com/joeabrahamk/Smart_vault",
    tags: ["Python", "AES Encryption", "Security"],
  },
  
  {
    title: "Lumieresalon.in",
    description: "Freelance site for a premium hair and beauty salon.",
    link: "https://lumieresalon.in",
    tags: ["Freelance", "Salon", "SEO"],
  },
  {
    title: "EETIF Website",
    description: "Community site for EETIF with smooth UI and interaction.",
    link: "https://www.eetifoundation.org/",
    tags: ["Community", "Web Design", "Sanity"],
  },
  {
    title: "Code Craft",
    description: "Event site for Code Craft with interactive features.",
    link: "https://www.code-craft.eetifoundation.org/",
    tags: ["Events", "Web Design"],
  },
  
];

const Projects = ({ triggerAnimation }) => {
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    if (triggerAnimation !== undefined) {
      setHasEntered(false);
      requestAnimationFrame(() => setHasEntered(true));
    } else {
      setHasEntered(true);
    }
  }, [triggerAnimation]);

  return (
    <div className="h-screen overflow-y-auto flex flex-col items-center px-6 py-16 text-center md:pt-28 scrollbar-thin scrollbar-thumb-cyan-500/30 scrollbar-track-transparent [&::-webkit-scrollbar]:hidden scrollbar-hide">
      <h2 className="text-4xl font-orbitron mb-10 text-cyan-400">Projects</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-5xl w-full px-2 pb-10">
        {projects.map((project, i) => {
          const isLeft = i % 2 === 0;
          return (
            <motion.div
              key={project.title + (triggerAnimation ?? "")} // <--- key includes triggerAnimation
              initial={{
                opacity: 0,
                x: isLeft ? -100 : 100,
              }}
              animate={
                hasEntered
                  ? {
                      opacity: 1,
                      x: 0,
                    }
                  : {}
              }
              transition={{
                duration: .5, // Increased from 0.6 to 1.2 for a slower animation
                delay: i * 0.15,
                ease: "easeOut",
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="bg-[#181e2a] border border-cyan-400/30 rounded-2xl p-6 shadow-md hover:shadow-cyan-500/30 transition-shadow cursor-pointer group hover:bg-[#1c2333]"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-orbitron text-white">
                  {project.title}
                </h3>
                {project.link !== "#" && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 opacity-70 group-hover:opacity-100 transition"
                    aria-label={`Visit ${project.title}`}
                  >
                    <FaExternalLinkAlt />
                  </a>
                )}
              </div>
              <p className="text-sm text-gray-300 mb-4 font-inter text-left">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 text-xs bg-cyan-900 text-cyan-300 rounded-full font-mono tracking-tight"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Projects;