import "./global.css";

import { createRoot } from "react-dom/client";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Portfolio Components
import Background from "./components/Background";
import ParticleSystem from "./components/ParticleSystem";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import CommentBox from "./components/CommentBox";
import Footer from "./components/Footer";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Portfolio = () => {
  useEffect(() => {
    // Set the app to dark mode by default for the mysterious theme
    document.documentElement.classList.add("dark");

    // Initialize smooth scrolling behavior
    const lenis = {
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    };

    // GSAP ScrollTrigger refresh on window resize
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Layered Background Systems */}
      <Background />
      <ParticleSystem />

      {/* Main Content */}
      <div className="relative z-10">
        {/* Fixed Header Navigation */}
        <Header />

        {/* Hero Section */}
        <Hero />

        {/* About Section */}
        <section id="about" className="py-20 px-6 relative">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="text-section mb-4 gradient-text">About Me</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-neon-purple to-neon-cyan mx-auto mb-8"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* About Text */}
              <div className="space-y-6">
                <div className="glass-card rounded-xl p-8">
                  <p className="text-lg text-foreground/80 leading-relaxed mb-6">
                    <span className="text-neon-cyan">&gt;</span> Hi, I’m  a final-year student who loves solving complex problems through coding and innovation. I believe in smart work over hard work, leveraging technology to build efficient solutions. With strong communication skills and leadership abilities, I thrive in collaborative environments that push me to grow.

I’m constantly learning, exploring new technologies, and looking for opportunities to make an impact. Let’s connect and build something amazing together!
                  </p>
                  <p className="text-foreground/70 font-mono mb-4">
                    Specializing in React, TypeScript, Node.js, and creative
                    animations with GSAP.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Problem Solver",
                      "Quick Learner",
                      "Tech Enthusiast",
                    ].map((trait) => (
                      <span
                        key={trait}
                        className="px-3 py-1 bg-mystery-700/50 text-neon-cyan/80 rounded-full text-sm font-mono border border-mystery-600/30"
                      >
                        {trait}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Stats/Info Cards */}
              <div className="grid grid-cols-2 gap-6">
               
                <div className="glass-card rounded-xl p-6 text-center">
                  <div className="text-3xl font-bold gradient-text mb-2">
                    5+
                  </div>
                  <div className="text-foreground/70 font-mono text-sm">
                    Projects Completed
                  </div>
                </div>
                
                <div className="glass-card rounded-xl p-6 text-center">
                  <div className="text-3xl font-bold gradient-text mb-2">∞</div>
                  <div className="text-foreground/70 font-mono text-sm">
                    Learning Mode
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <Skills />

        {/* Projects Section */}
        <Projects />

        {/* Comments Section */}
        <CommentBox />

        {/* Footer/Contact Section */}
        <Footer />
      </div>
    </div>
  );
};

const App = () => <Portfolio />;

createRoot(document.getElementById("root")!).render(<App />);
