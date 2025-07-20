import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  status: "Live" | "In Development" | "Concept";
  year: number;
  link?: string;
  github?: string;
}

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  // Sample projects data - in a real app, this would come from an API or CMS
  const projects: Project[] = [
    {
      id: 1,
      title: "Employee Dashboard Management",
      description:
        "AI-powered analytics platform with real-time data visualization and predictive modeling. Features custom D3.js charts and WebGL rendering.",
      tech: ["React", "JavaScript", "HTML", "CSS", "Localstorage", "Node.js"],
      status: "Live",
      year: 2025,
      link: "#",
      github: "https://github.com/Ayushyadav1402/Employee-Management-System",
    },
    {
      id: 2,
      title: "Local Labour Hub",
      description:
        "A full-stack web platform that connects homeowners with skilled local professionals—like electricians, plumbers, and carpenters.",
      tech: ["React.js", "Node.js", "Mongodb", "Express.js"],
      status: "Live",
      year: 2025,
      link: "#",
      github: "#",
    },
    // {
    //   id: 3,
    //   title: "CryptoTracker Pro",
    //   description:
    //     "Real-time cryptocurrency tracking application with advanced charting, portfolio management, and price alerts using WebSocket connections.",
    //   tech: ["Vue.js", "Chart.js", "Socket.io", "Express", "MongoDB"],
    //   status: "In Development",
    //   year: 2024,
    //   github: "https://github.com/alexblackwood/crypto-tracker",
    // },
    // {
    //   id: 4,
    //   title: "MindMaze VR",
    //   description:
    //     "Virtual reality puzzle game built with Unity and C#. Features procedural level generation and hand tracking using Oculus SDK.",
    //   tech: ["Unity", "C#", "VR", "Oculus SDK", "Blender"],
    //   status: "Concept",
    //   year: 2024,
    //   github: "https://github.com/alexblackwood/mindmaze-vr",
    // },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate section title
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // Animate project cards with stagger
      const cards = cardsRef.current?.children;
      if (cards) {
        gsap.fromTo(
          cards,
          {
            opacity: 0,
            y: 80,
            rotationX: 15,
          },
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.2,
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const getStatusColor = (status: Project["status"]) => {
    switch (status) {
      case "Live":
        return "text-neon-cyan border-neon-cyan/30 bg-neon-cyan/10";
      case "In Development":
        return "text-neon-purple border-neon-purple/30 bg-neon-purple/10";
      case "Concept":
        return "text-neon-pink border-neon-pink/30 bg-neon-pink/10";
      default:
        return "text-foreground/60 border-mystery-600/30 bg-mystery-600/10";
    }
  };

  return (
    <section id="projects" className="py-20 px-6 relative" ref={sectionRef}>
      <div className="container mx-auto max-w-6xl">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 ref={titleRef} className="text-section mb-4 gradient-text">
            Featured Projects
          </h2>
          <p className="text-foreground/70 text-lg font-mono max-w-2xl mx-auto">
            <span className="text-neon-cyan">&gt;</span> A collection of digital
            experiences that push the boundaries of web technology
          </p>
        </div>

        {/* Projects Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group glass-card rounded-xl p-6 hover:border-mystery-500/40 transition-all duration-500 hover:scale-[1.02] hover:shadow-xl hover:shadow-mystery-500/10"
            >
              {/* Project Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-neon-cyan transition-colors duration-300">
                    {project.title}
                  </h3>
                  <div className="flex items-center space-x-3 text-sm">
                    <span
                      className={`px-2 py-1 rounded-md border text-xs font-mono ${getStatusColor(project.status)}`}
                    >
                      {project.status}
                    </span>
                    <span className="text-foreground/50 font-mono">
                      {project.year}
                    </span>
                  </div>
                </div>
              </div>

              {/* Project Description */}
              <p className="text-foreground/80 mb-6 leading-relaxed">
                {project.description}
              </p>

              {/* Tech Stack */}
              <div className="mb-6">
                <p className="text-sm text-foreground/60 mb-2 font-mono">
                  Tech Stack:
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 text-xs bg-mystery-700/50 text-neon-cyan/80 rounded border border-mystery-600/30 font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Project Links */}
              <div className="flex space-x-4">
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-neon-purple hover:text-neon-cyan transition-colors duration-300 font-mono"
                  >
                    View Live →
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-foreground/60 hover:text-neon-cyan transition-colors duration-300 font-mono"
                  >
                    GitHub →
                  </a>
                )}
              </div>

              {/* Hover Effect Overlay */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-neon-purple/5 via-transparent to-neon-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <p className="text-foreground/70 mb-6 font-mono">
            Want to see more of my work?
          </p>
          <a
            href="https://github.com/Ayushyadav1402"
            target="_blank"
            rel="noopener noreferrer"
            className="neon-button rounded-lg inline-block"
          >
            View All Projects
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
