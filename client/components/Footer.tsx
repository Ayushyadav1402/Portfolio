import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate footer content when it comes into view
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const socialLinks = [
    {
      name: "GitHub",
      url: "https://github.com/Ayushyadav1402",
      icon: "🔗",
    },
    {
      name: "LinkedIn",
      url: "www.linkedin.com/in/ayush-kumar-8034302a3",
      icon: "💼",
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/ayush_yadav1402/?igsh=b2F2cnNvdWRyMWx4#",
      icon: "📸",
    },
    {
      name: "Email",
      url: "gamerayush380@gmail.com",
      icon: "📧",
    },
  ];

  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer
      id="contact"
      ref={footerRef}
      className="relative py-16 px-6 border-t border-mystery-600/20"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-mystery-900 via-mystery-800/50 to-transparent" />

      <div
        ref={contentRef}
        className="container mx-auto max-w-4xl relative z-10"
      >
        {/* Main Footer Content */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-unica mb-4">
            <span className="gradient-text">Let's Connect</span>
          </h2>
          <p className="text-foreground/70 text-lg font-mono max-w-2xl mx-auto mb-8">
            <span className="text-neon-cyan">&gt;</span> Ready to bring your
            ideas to life? <br />
            <span className="text-neon-purple">&gt;</span> Let's build something
            extraordinary together
          </p>

          {/* Contact Email */}
          <a
            href="mailto:alex@blackwood.dev"
            className="inline-block text-xl md:text-2xl font-mono text-neon-cyan hover:text-neon-purple transition-colors duration-300 mb-8 neon-glow"
          >
           Connect ME!!
          </a>
        </div>

        {/* Social Links */}
        <div className="flex justify-center space-x-8 mb-12">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center space-y-2 p-3 rounded-lg hover:bg-mystery-700/30 transition-all duration-300"
              aria-label={link.name}
            >
              <span className="text-2xl group-hover:scale-110 transition-transform duration-300">
                {link.icon}
              </span>
              <span className="text-sm font-mono text-foreground/60 group-hover:text-neon-cyan transition-colors duration-300">
                {link.name}
              </span>
            </a>
          ))}
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-mystery-600/50 to-transparent mb-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-foreground/50 font-mono text-sm">
            © {currentYear} Ayush  Crafted with{" "}
            <span className="text-neon-pink">passion</span> and{" "}
            <span className="text-neon-cyan">code</span>.
          </div>

          <div className="flex items-center space-x-6">
            {/* Back to Top Button */}
            <button
              onClick={scrollToTop}
              className="text-sm font-mono text-foreground/60 hover:text-neon-cyan transition-colors duration-300"
            >
              Back to Top ↑
            </button>

            {/* Tech Stack Info */}
            <div className="text-xs font-mono text-foreground/40">
              Built with React + GSAP + ❤️
            </div>
          </div>
        </div>

        {/* Easter Egg - Hidden Matrix-style effect */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-10">
          <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-neon-cyan to-transparent animate-pulse" />
          <div
            className="absolute top-0 left-3/4 w-px h-full bg-gradient-to-b from-transparent via-neon-purple to-transparent animate-pulse"
            style={{ animationDelay: "1s" }}
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
