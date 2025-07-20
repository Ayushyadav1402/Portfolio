import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef(null);
  const nameRef = useRef(null);
  const titleRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([nameRef.current, titleRef.current, ctaRef.current], {
        opacity: 0,
        y: 50,
      });

      const tl = gsap.timeline({ delay: 0.5 });

      tl.to(nameRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
      })
        .to(titleRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        }, "-=0.4")
        .to(ctaRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        }, "-=0.3");

      gsap.to(heroRef.current, {
        yPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const handleExploreClick = () => {
    document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleContactClick = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-32 md:pt-40 lg:pt-48"
    >
      <div className="absolute inset-0 bg-gradient-radial from-mystery-700/20 via-mystery-800/50 to-mystery-900" />

      <div className="relative z-10 text-center px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 mb-8">
         <div className="flex justify-center lg:justify-start mb-8">
  <div className="w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full overflow-hidden border-4 border-neon-purple shadow-lg hover:shadow-neon-cyan transition-all duration-500">
    <img
      src="/images/AyushPhotoOfficial.png"
      alt="Ayush Official Photo"
      className="w-full h-full object-cover"
    />
  </div>
</div>

          {/* Name and Title */}
          <div className="flex-1 text-center lg:text-left max-w-lg">
            <h1 ref={nameRef} className="text-4xl md:text-5xl lg:text-6xl leading-tight mb-4 lg:mb-6 font-unica tracking-wide">
              <span className="block text-foreground/90 mb-1">AYUSH</span>
              <span className="block gradient-text neon-glow">KUMAR</span>
            </h1>

            <div className="flex items-center justify-center lg:justify-start gap-2 mb-4">
              <div className="w-2 h-2 bg-neon-cyan rounded-full animate-pulse" />
              <span className="text-sm text-neon-cyan font-mono">Open To Work</span>
            </div>
          </div>
        </div>

        <p ref={titleRef} className="text-xl md:text-2xl text-foreground/70 mb-8 font-mono max-w-2xl mx-auto leading-relaxed">
          <span className="text-neon-cyan">&gt;</span> Full-Stack Developer
          <br />
          <span className="text-neon-cyan">&gt;</span> Intern at Softpro India Technologies Pvt. Ltd.
        </p>

        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center">
          <button onClick={handleExploreClick} className="neon-button rounded-lg font-medium text-lg">Explore My Work</button>
          <button onClick={handleContactClick} className="px-6 py-3 border border-mystery-600/50 text-foreground/80 rounded-lg hover:border-neon-cyan/50 hover:text-neon-cyan transition-all duration-300 font-medium text-lg">Get In Touch</button>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="flex flex-col items-center space-y-2 text-foreground/50">
            <span className="text-sm font-mono">Scroll Down</span>
            <div className="w-0.5 h-8 bg-gradient-to-b from-neon-cyan to-transparent animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

