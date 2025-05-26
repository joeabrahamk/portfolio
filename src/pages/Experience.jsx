import { useState } from "react";
import { motion } from "framer-motion";

const experiences = [
  {
    title: "Student Lead",
    position: "IEDC Bootcamp CEC",
    time: "2024 - Present",
    description: "Led innovation bootcamps, organized events, and fostered a startup culture on campus."
  },
  {
    title: "Web Lead",
    position: "EETI Foundation",
    time: "2023 - Present",
    description: "Managed and built community websites for technical fests and initiatives."
  },
  {
    title: "Marketing & Social Media Manager",
    position: "IEDC Bootcamp CEC",
    time: "2023",
    description: "Handled digital outreach and strategy, significantly increasing student participation."
  },
  {
    title: "Notion Campus Leader",
    position: "Notion",
    time: "2023",
    description: "Represented Notion in college, conducted workshops, and promoted productivity tools."
  }
];

const ExperienceNode = ({ exp, index, setHoveredIndex, hoveredIndex }) => {
  const horizontalOffset = index * 220;

  return (
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.2 }}
      className="absolute"
      style={{ top: `50%`, left: `${horizontalOffset}px`, transform: "translateY(-50%)" }}
    >
      <div
        className="relative group"
        onMouseEnter={() => setHoveredIndex(index)}
        onMouseLeave={() => setHoveredIndex(null)}
      >
        <div className="bg-cyan-400 h-4 w-4 rounded-full shadow-md shadow-cyan-500/40 mx-auto"></div>
        <div className="mt-2 text-xs text-white font-orbitron text-center w-40">
          <p>{exp.title}</p>
          <p className="text-xs font-inter text-cyan-300">{exp.position}</p>
          <p className="text-xs text-gray-400">{exp.time}</p>
        </div>
        {hoveredIndex === index && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-16 left-1/2 transform -translate-x-1/2 w-64 p-3 bg-[#181e2a] border border-cyan-400 text-white rounded-xl shadow-xl z-10"
          >
            <p className="text-xs text-gray-300 font-inter">{exp.description}</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

const Experience = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className="min-h-screen relative px-6 pt-24 text-center overflow-hidden">
      <h2 className="text-4xl font-orbitron mb-28 text-cyan-400">Experience</h2>
      <div className="relative w-full max-w-7xl mx-auto h-[300px]">
        {experiences.map((exp, i) => (
          <ExperienceNode
            key={i}
            exp={exp}
            index={i}
            hoveredIndex={hoveredIndex}
            setHoveredIndex={setHoveredIndex}
          />
        ))}
        <svg className="absolute top-1/2 left-0 w-full h-[2px] transform -translate-y-1/2 pointer-events-none">
          <polyline
            fill="none"
            stroke="#22d3ee"
            strokeWidth="2"
            points={experiences.map((_, i) => `${i * 220 + 2},1`).join(" ")}
          />
        </svg>
      </div>
    </div>
  );
};

export default Experience;
