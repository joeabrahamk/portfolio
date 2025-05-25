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
		title: "Lumieresalon.in",
		description: "Freelance site for a premium hair and beauty salon.",
		link: "https://lumieresalon.in",
		tags: ["Freelance", "Salon", "SEO"],
	},
	{
		title: "DVA",
		description:
			"Digital Vehicle Assistant (DVA) is a smart, open-source navigation tool designed to optimize fuel-efficient driving and streamline vehicle management",
		link: "#",
		tags: ["OpenSourceProject", "Navigation website", "FuelEfficiency"],
	},
	{
		title: "EETIF Website",
		description: "Community site for EETIF with smooth UI and interaction.",
		link: "#",
		tags: ["Community", "Web Design", "Sanity"],
	},
	{
		title: "Code Craft",
		description: "Event site for Code Craft with interactive features.",
		link: "#",
		tags: ["Events", "Web Design"],
	},
	{
		title: "Smart Vault",
		description:
			"A Python-based software system that encrypts and decrypts files using AES encryption, controlled by a registered USB device as a physical key.",
		link: "#",
		tags: ["Python", "AES Encryption", "Security"],
	},
];

const Projects = () => {
	return (
		<div className="min-h-screen flex flex-col items-center px-6 py-16 text-center md:pt-28">
			<h2 className="text-4xl font-orbitron mb-10 text-cyan-400">Projects</h2>

			<div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-5xl w-full">
				{projects.map((project, i) => (
					<motion.div
						key={project.title}
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.98 }}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.4, delay: i * 0.1 }}
						className="bg-[#181e2a] border border-cyan-400/30 rounded-2xl p-6 shadow-md hover:shadow-cyan-500/20 transition-shadow cursor-pointer group"
					>
						<div className="flex justify-between items-center mb-2">
							<h3 className="text-xl font-orbitron text-white">{project.title}</h3>
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
				))}
			</div>
		</div>
	);
};

export default Projects;
