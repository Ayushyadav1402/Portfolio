import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface Particle {
  x: number;
  y: number;
  z: number;
  size: number;
  color: string;
  speed: number;
  angle: number;
  element: HTMLDivElement;
}

const ParticleSystem = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const colors = [
      "hsl(280 100% 70%)", // neon purple
      "hsl(200 100% 60%)", // neon blue
      "hsl(180 100% 50%)", // neon cyan
      "hsl(320 100% 75%)", // neon pink
    ];

    // Create particles
    const createParticle = (): Particle => {
      const element = document.createElement("div");
      element.className = "absolute rounded-full pointer-events-none";

      const size = Math.random() * 4 + 1;
      const color = colors[Math.floor(Math.random() * colors.length)];

      element.style.width = `${size}px`;
      element.style.height = `${size}px`;
      element.style.background = `radial-gradient(circle, ${color} 0%, transparent 70%)`;
      element.style.boxShadow = `0 0 ${size * 2}px ${color}`;

      container.appendChild(element);

      return {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        z: Math.random() * 1000,
        size,
        color,
        speed: Math.random() * 0.5 + 0.1,
        angle: Math.random() * Math.PI * 2,
        element,
      };
    };

    // Initialize particles
    for (let i = 0; i < 50; i++) {
      particlesRef.current.push(createParticle());
    }

    // Animation loop
    const animateParticles = () => {
      particlesRef.current.forEach((particle) => {
        // Update position
        particle.x += Math.cos(particle.angle) * particle.speed;
        particle.y += Math.sin(particle.angle) * particle.speed;
        particle.z -= particle.speed * 2;

        // Wrap around screen
        if (particle.x > window.innerWidth + 50) particle.x = -50;
        if (particle.x < -50) particle.x = window.innerWidth + 50;
        if (particle.y > window.innerHeight + 50) particle.y = -50;
        if (particle.y < -50) particle.y = window.innerHeight + 50;
        if (particle.z < 0) particle.z = 1000;

        // Apply 3D perspective
        const scale = 1000 / (1000 + particle.z);
        const opacity = scale * 0.8;

        // Update DOM element
        gsap.set(particle.element, {
          x: particle.x,
          y: particle.y,
          scale: scale,
          opacity: opacity,
        });
      });

      requestAnimationFrame(animateParticles);
    };

    animateParticles();

    // Mouse interaction
    const handleMouseMove = (e: MouseEvent) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      particlesRef.current.forEach((particle) => {
        const dx = mouseX - particle.x;
        const dy = mouseY - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 100) {
          const force = (100 - distance) / 100;
          particle.angle += (Math.atan2(dy, dx) - particle.angle) * 0.1 * force;
          particle.speed = Math.min(particle.speed + force * 0.1, 2);
        }
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      particlesRef.current.forEach((particle) => {
        if (particle.element.parentNode) {
          particle.element.parentNode.removeChild(particle.element);
        }
      });
      particlesRef.current = [];
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={{ perspective: "1000px" }}
    />
  );
};

export default ParticleSystem;
