import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Skill {
  name: string;
  level: number;
  category: "frontend" | "backend" | "tools" | "creative";
  icon: string;
}

const Skills = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  const skills: Skill[] = [
    // Frontend
  ,
    { name: "HTML", level: 92, category: "frontend", icon: "💚" },
    { name: "CSS", level: 90, category: "frontend", icon: "▲" },
    { name: "React", level: 75, category: "frontend", icon: "⚛️" },
    { name: "Javascript", level: 73, category: "frontend", icon: "🌈" },
    
    { name: "GSAP", level: 85, category: "frontend", icon: "✨" },

    // Backend
    { name: "Node.js", level: 77, category: "backend", icon: "🟢" },
    // { name: "", level: 60, category: "backend", icon: "🐍" },
    { name: "PostgreSQL", level: 63, category: "backend", icon: "🐘" },
    { name: "MongoDB", level: 78, category: "backend", icon: "🍃" },
    { name: "Express", level: 75, category: "backend", icon: "◉" },

    // Tools
    // { name: "Docker", level: 82, category: "tools", icon: "🐳" },
    { name: "VS Code", level: 76, category: "tools", icon: "☁️" },
    { name: "Git", level: 82, category: "tools", icon: "📋" },
    // { name: "Figma", level: 85, category: "tools", icon: "🎨" },

    // Creative
    // { name: "3D Modeling", level: 70, category: "creative", icon: "🎭" },
    // { name: "UI/UX Design", level: 88, category: "creative", icon: "✏️" },
    // { name: "Animation", level: 85, category: "creative", icon: "🎬" },
    
  ];

  const categoryColors = {
    frontend: "neon-cyan",
    backend: "neon-purple",
    tools: "neon-blue",
    creative: "neon-pink",
  };

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

      // Animate skill items with stagger
      const skillItems = skillsRef.current?.children;
      if (skillItems) {
        gsap.fromTo(
          skillItems,
          {
            opacity: 0,
            y: 30,
            scale: 0.9,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: "back.out(1.7)",
            stagger: {
              amount: 1.5,
              from: "start",
            },
            scrollTrigger: {
              trigger: skillsRef.current,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }

      // Animate skill bars
      skills.forEach((skill, index) => {
        const progressBar = document.querySelector(
          `#skill-${index} .progress-bar`,
        );
        if (progressBar) {
          gsap.fromTo(
            progressBar,
            { width: "0%" },
            {
              width: `${skill.level}%`,
              duration: 1.5,
              ease: "power2.out",
              delay: index * 0.1,
              scrollTrigger: {
                trigger: progressBar,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            },
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" className="py-20 px-6 relative" ref={sectionRef}>
      <div className="container mx-auto max-w-6xl">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 ref={titleRef} className="text-section mb-4 gradient-text">
            Skills & Expertise
          </h2>
          <p className="text-foreground/70 text-lg font-mono max-w-2xl mx-auto">
            <span className="text-neon-cyan">&gt;</span> Technologies and tools
           
          </p>
        </div>

        {/* Skills Grid */}
        <div
          ref={skillsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {skills.map((skill, index) => (
            <div
              key={skill.name}
              id={`skill-${index}`}
              className="glass-card rounded-xl p-6 hover:border-mystery-500/40 transition-all duration-500 group"
            >
              {/* Skill Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{skill.icon}</span>
                  <span className="font-semibold text-foreground group-hover:text-neon-cyan transition-colors duration-300">
                    {skill.name}
                  </span>
                </div>
                <span
                  className={`text-sm font-mono text-${categoryColors[skill.category]}`}
                >
                  {skill.level}%
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-mystery-700/50 rounded-full h-2 mb-3 overflow-hidden">
                <div
                  className={`progress-bar h-full bg-gradient-to-r from-${categoryColors[skill.category]} to-${categoryColors[skill.category]}/70 rounded-full relative`}
                  style={{ width: "0%" }}
                >
                  <div
                    className={`absolute inset-0 bg-${categoryColors[skill.category]}/20 animate-pulse`}
                  />
                </div>
              </div>

              {/* Category Badge */}
              <div className="flex justify-between items-center">
                <span
                  className={`px-2 py-1 text-xs rounded-md bg-${categoryColors[skill.category]}/10 text-${categoryColors[skill.category]} border border-${categoryColors[skill.category]}/30 font-mono capitalize`}
                >
                  {skill.category}
                </span>

                {/* Hover effect indicator */}
                <div className="w-2 h-2 rounded-full bg-mystery-600 group-hover:bg-neon-cyan transition-colors duration-300" />
              </div>
            </div>
          ))}
        </div>

        {/* Floating skill icons */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-20 left-[10%] text-4xl opacity-10 animate-float">
            ⚛️
          </div>
          <div
            className="absolute bottom-32 right-[15%] text-3xl opacity-10 animate-float"
            style={{ animationDelay: "1s" }}
          >
            🐍
          </div>
          <div
            className="absolute top-1/2 right-[5%] text-2xl opacity-10 animate-float"
            style={{ animationDelay: "2s" }}
          >
            🎨
          </div>
          <div
            className="absolute bottom-20 left-[20%] text-3xl opacity-10 animate-float"
            style={{ animationDelay: "0.5s" }}
          >
            🐳
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
