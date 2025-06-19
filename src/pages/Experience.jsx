"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const experiences = [
	{
		title: "Software Engineer Intern",
		company: "Geojit Technologies",
		time: "2025",
		description:
			"Developed and maintained responsive front-end interfaces using Angular, integrated with SQL databases, as part of a cross-functional team delivering real-world web applications. Focused on performance optimization and enhancing user experience.",
	},
	{
		title: "Student Lead",
		company: "IEDC Bootcamp CEC",
		time: "2024 - Present",
		description:
			"Led innovation bootcamps, organized events, and fostered a startup culture on campus.",
	},
  {
		title: "Notion Campus Leader",
		company: "Notion",
		time: "2024 - Present",
		description:
			"Represented Notion in college, conducted workshops, and promoted productivity tools.",
	},
	{
		title: "Web Lead",
		company: "EETI Foundation",
		time: "2023 - Present",
		description:
			"Managed and built community websites for technical fests and initiatives.",
	},
	{
		title: "Marketing & Social Media Manager",
		company: "IEDC Bootcamp CEC",
		time: "2023 - 2024",
		description:
			"Handled digital outreach and strategy, significantly increasing student participation.",
	},
	
];

const ExperienceCard = ({ exp, index, isVisible }) => {
	const alignRight = index % 2 === 0;

	return (
		<motion.div
			initial={{ opacity: 0, y: 40 }}
			animate={isVisible ? { opacity: 1, y: 0 } : {}}
			transition={{ duration: 0.6, delay: index * 0.15 }}
			className={`relative z-10 mb-20 w-full flex ${
				alignRight ? "justify-end" : "justify-start"
			}`}
		>
			<div
				className={`backdrop-blur-lg bg-white/5 border border-cyan-400/20 shadow-lg p-4 sm:p-6 max-w-xs sm:max-w-md w-full rounded-2xl ${
					alignRight ? "text-right" : "text-left"
				}`}
			>
				<div
					className={`mb-2 flex items-center gap-2 ${
						alignRight ? "justify-end" : "justify-start"
					}`}
				>
					<div className="h-3 w-3 bg-cyan-400 rounded-full shadow shadow-cyan-400/40" />
					<h3 className="font-orbitron text-lg text-cyan-300">{exp.title}</h3>
				</div>
				<p className="text-sm text-cyan-100 font-inter italic">
					{exp.company} &middot; {exp.time}
				</p>
				<p className="mt-3 text-gray-300 text-sm font-inter leading-relaxed">
					{exp.description}
				</p>
			</div>
		</motion.div>
	);
};

const Experience = () => {
	const sectionRef = useRef(null);
	const [visibleIndexes, setVisibleIndexes] = useState([]);
	const [scrollPercent, setScrollPercent] = useState(0);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					const index = parseInt(entry.target.dataset.index);
					if (entry.isIntersecting && !visibleIndexes.includes(index)) {
						setVisibleIndexes((prev) => [...prev, index]);
					}
				});
			},
			{ threshold: 0.3 }
		);

		const nodes = sectionRef.current.querySelectorAll("[data-index]");
		nodes.forEach((node) => observer.observe(node));

		return () => observer.disconnect();
	}, [visibleIndexes]);

	useEffect(() => {
		const section = sectionRef.current;
		if (!section) return;

		const handleScroll = () => {
			const scrollTop = section.scrollTop;
			const scrollHeight = section.scrollHeight - section.clientHeight;
			const percent = scrollTop / scrollHeight;
			setScrollPercent(percent);
		};

		section.addEventListener("scroll", handleScroll);
		handleScroll();

		return () => section.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<div
			className="w-full h-screen px-2 pt-24 relative text-white overflow-y-auto overflow-x-hidden scrollbar-hide"
			ref={sectionRef}
		>
			<h2 className="text-4xl font-orbitron text-center mb-20 text-cyan-400">
				Experience
			</h2>

			<div className="relative max-w-4xl mx-auto">
				{/* Glowing animated timeline */}
				<div className="absolute left-1/2 top-0 w-1 h-full -translate-x-1/2 z-0">
					<div className="w-full h-full bg-cyan-900/20 absolute" />
					<motion.div
						className="w-full bg-cyan-400 rounded-full blur-sm origin-top"
						initial={{ scaleY: 0 }}
						animate={{ scaleY: scrollPercent }}
						transition={{ duration: 0.3, ease: "easeOut" }}
						style={{ height: "100%" }}
					/>
				</div>

				{/* Experience Cards */}
				{experiences.map((exp, i) => (
					<div key={i} data-index={i} className="px-1 sm:px-0">
						<ExperienceCard
							exp={exp}
							index={i}
							isVisible={visibleIndexes.includes(i)}
						/>
					</div>
				))}
			</div>
		</div>
	);
};

export default Experience;
