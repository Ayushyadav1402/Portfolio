import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const Background = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create floating orbs with random positions and animations
      const orbs = containerRef.current?.querySelectorAll(".floating-orb");

      if (orbs) {
        orbs.forEach((orb, index) => {
          // Random initial position
          gsap.set(orb, {
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            scale: 0.5 + Math.random() * 0.5,
          });

          // Continuous floating animation
          gsap.to(orb, {
            x: `+=${Math.random() * 200 - 100}`,
            y: `+=${Math.random() * 200 - 100}`,
            rotation: 360,
            duration: 20 + Math.random() * 10,
            ease: "none",
            repeat: -1,
            yoyo: true,
            delay: index * 0.5,
          });

          // Pulsing glow effect
          gsap.to(orb, {
            opacity: 0.3 + Math.random() * 0.4,
            duration: 3 + Math.random() * 2,
            ease: "power2.inOut",
            repeat: -1,
            yoyo: true,
            delay: Math.random() * 2,
          });
        });
      }

      // Parallax effect for grid lines
      const gridLines = containerRef.current?.querySelectorAll(".grid-line");
      if (gridLines) {
        gridLines.forEach((line, index) => {
          gsap.to(line, {
            x: index % 2 === 0 ? "-=100" : "+=100",
            duration: 30 + index * 5,
            ease: "none",
            repeat: -1,
            yoyo: true,
          });
        });
      }

      // Animated particles
      const particles = containerRef.current?.querySelectorAll(".particle");
      if (particles) {
        particles.forEach((particle, index) => {
          gsap.set(particle, {
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          });

          gsap.to(particle, {
            y: "-=100vh",
            duration: 15 + Math.random() * 10,
            ease: "none",
            repeat: -1,
            delay: index * 0.2,
            onRepeat: () => {
              gsap.set(particle, {
                x: Math.random() * window.innerWidth,
                y: window.innerHeight + 50,
              });
            },
          });
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      // Reposition elements on resize
      const orbs = containerRef.current?.querySelectorAll(".floating-orb");
      if (orbs) {
        orbs.forEach((orb) => {
          gsap.set(orb, {
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          });
        });
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
    >
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-radial from-mystery-700/10 via-mystery-800/5 to-mystery-900" />

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-10">
        {/* Vertical grid lines */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={`v-${i}`}
            className="grid-line absolute w-px h-full bg-gradient-to-b from-transparent via-neon-cyan/20 to-transparent"
            style={{ left: `${(i + 1) * 12.5}%` }}
          />
        ))}
        {/* Horizontal grid lines */}
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={`h-${i}`}
            className="grid-line absolute w-full h-px bg-gradient-to-r from-transparent via-neon-purple/20 to-transparent"
            style={{ top: `${(i + 1) * 16.67}%` }}
          />
        ))}
      </div>

      {/* Floating Orbs */}
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={`orb-${i}`}
          className="floating-orb absolute rounded-full blur-sm"
          style={{
            width: `${20 + i * 10}px`,
            height: `${20 + i * 10}px`,
            background: `radial-gradient(circle, ${
              i % 3 === 0
                ? "hsl(280 100% 70% / 0.6)"
                : i % 3 === 1
                  ? "hsl(200 100% 60% / 0.6)"
                  : "hsl(320 100% 75% / 0.6)"
            } 0%, transparent 70%)`,
          }}
        />
      ))}

      {/* Floating Particles */}
      {Array.from({ length: 15 }).map((_, i) => (
        <div
          key={`particle-${i}`}
          className="particle absolute w-1 h-1 rounded-full"
          style={{
            background:
              i % 4 === 0
                ? "hsl(280 100% 70% / 0.8)"
                : i % 4 === 1
                  ? "hsl(200 100% 60% / 0.8)"
                  : i % 4 === 2
                    ? "hsl(320 100% 75% / 0.8)"
                    : "hsl(180 100% 50% / 0.8)",
            boxShadow: `0 0 6px currentColor`,
          }}
        />
      ))}

      {/* Mysterious Mist Effect */}
      <div className="absolute bottom-0 left-0 w-full h-1/3">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background: `
              radial-gradient(ellipse at 20% 100%, hsl(280 100% 70% / 0.15) 0%, transparent 50%),
              radial-gradient(ellipse at 80% 100%, hsl(200 100% 60% / 0.15) 0%, transparent 50%),
              radial-gradient(ellipse at 50% 100%, hsl(320 100% 75% / 0.10) 0%, transparent 60%)
            `,
          }}
        />
      </div>

      {/* Animated Light Rays */}
      <div className="absolute top-0 left-1/4 w-px h-full opacity-5">
        <div className="w-full h-full bg-gradient-to-b from-neon-cyan via-transparent to-neon-purple animate-pulse" />
      </div>
      <div className="absolute top-0 right-1/3 w-px h-full opacity-5">
        <div
          className="w-full h-full bg-gradient-to-b from-neon-purple via-transparent to-neon-cyan animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      {/* Corner Accent Glows */}
      <div className="absolute top-0 left-0 w-1/3 h-1/3">
        <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/5 to-transparent rounded-br-full" />
      </div>
      <div className="absolute bottom-0 right-0 w-1/3 h-1/3">
        <div className="absolute inset-0 bg-gradient-to-tl from-neon-cyan/5 to-transparent rounded-tl-full" />
      </div>

      {/* Scan Line Effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-neon-cyan/30 to-transparent animate-scan-line top-[30%]" />
      </div>
    </div>
  );
};

export default Background;
