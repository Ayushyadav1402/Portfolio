import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Comment {
  id: string;
  name: string;
  message: string;
  timestamp: number;
}

const CommentBox = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const commentsRef = useRef<HTMLDivElement>(null);

  // Load comments from localStorage on component mount
  useEffect(() => {
    const savedComments = localStorage.getItem("portfolio-comments");
    if (savedComments) {
      try {
        const parsedComments = JSON.parse(savedComments);
        setComments(parsedComments);
      } catch (error) {
        console.error("Error parsing saved comments:", error);
        // Clear corrupted data
        localStorage.removeItem("portfolio-comments");
      }
    }
  }, []);

  // Save comments to localStorage whenever comments change
  useEffect(() => {
    if (comments.length > 0) {
      localStorage.setItem("portfolio-comments", JSON.stringify(comments));
    }
  }, [comments]);

  // GSAP animations
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

      // Animate form
      gsap.fromTo(
        formRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Animate new comments when they appear
  useEffect(() => {
    if (commentsRef.current && comments.length > 0) {
      const lastComment = commentsRef.current.lastElementChild;
      if (lastComment) {
        gsap.fromTo(
          lastComment,
          { opacity: 0, scale: 0.9, y: 20 },
          { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: "back.out(1.7)" },
        );
      }
    }
  }, [comments]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !message.trim()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate a brief loading state for better UX
    setTimeout(() => {
      const newComment: Comment = {
        id: Date.now().toString(),
        name: name.trim(),
        message: message.trim(),
        timestamp: Date.now(),
      };

      setComments((prev) => [newComment, ...prev]);
      setName("");
      setMessage("");
      setIsSubmitting(false);
    }, 500);
  };

  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 1) {
      const diffInMinutes = Math.floor(diffInHours * 60);
      return diffInMinutes <= 1 ? "Just now" : `${diffInMinutes}m ago`;
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}d ago`;
    }
  };

  const clearAllComments = () => {
    setComments([]);
    localStorage.removeItem("portfolio-comments");
  };

  return (
    <section id="comments" className="py-20 px-6 relative" ref={sectionRef}>
      <div className="container mx-auto max-w-4xl">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 ref={titleRef} className="text-section mb-4 gradient-text">
            Leave a Message
          </h2>
          <p className="text-foreground/70 text-lg font-mono max-w-2xl mx-auto">
            <span className="text-neon-cyan">&gt;</span> Share your thoughts,
            feedback, or just say hello
          </p>
        </div>

        {/* Comment Form */}
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="glass-card rounded-xl p-6 mb-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm text-foreground/80 mb-2 font-mono"
              >
                Your Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 bg-mystery-800/50 border border-mystery-600/30 rounded-lg text-foreground placeholder-foreground/50 focus:border-neon-cyan/50 focus:ring-1 focus:ring-neon-cyan/30 transition-all duration-300"
                placeholder="Enter your name"
                maxLength={50}
                required
              />
            </div>
            <div className="md:col-span-1">
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="message"
                  className="block text-sm text-foreground/80 font-mono"
                >
                  Your Message
                </label>
                <span className="text-xs text-foreground/50 font-mono">
                  {message.length}/500
                </span>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-4 py-3 bg-mystery-800/50 border border-mystery-600/30 rounded-lg text-foreground placeholder-foreground/50 focus:border-neon-cyan/50 focus:ring-1 focus:ring-neon-cyan/30 transition-all duration-300 resize-none"
              placeholder="What's on your mind?"
              rows={4}
              maxLength={500}
              required
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
            <div className="text-xs text-foreground/50 font-mono">
              Comments are stored locally in your browser
            </div>
            <button
              type="submit"
              disabled={isSubmitting || !name.trim() || !message.trim()}
              className="neon-button rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Posting..." : "Post Comment"}
            </button>
          </div>
        </form>

        {/* Comments List */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-semibold text-foreground font-mono">
              Messages{" "}
              <span className="text-neon-cyan">({comments.length})</span>
            </h3>
            {comments.length > 0 && (
              <button
                onClick={clearAllComments}
                className="text-sm text-foreground/50 hover:text-neon-pink transition-colors duration-300 font-mono"
              >
                Clear All
              </button>
            )}
          </div>

          {comments.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-mystery-700/30 flex items-center justify-center">
                <span className="text-2xl text-neon-cyan/60">💬</span>
              </div>
              <p className="text-foreground/60 font-mono">
                No messages yet. Be the first to leave one!
              </p>
            </div>
          ) : (
            <div ref={commentsRef} className="space-y-6">
              {comments.map((comment) => (
                <div
                  key={comment.id}
                  className="glass-card rounded-lg p-4 hover:border-mystery-500/40 transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-neon-purple to-neon-cyan flex items-center justify-center text-sm font-bold text-mystery-900">
                        {comment.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">
                          {comment.name}
                        </p>
                        <p className="text-xs text-foreground/50 font-mono">
                          {formatTimestamp(comment.timestamp)}
                        </p>
                      </div>
                    </div>
                  </div>
                  <p className="text-foreground/90 leading-relaxed">
                    {comment.message}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CommentBox;
