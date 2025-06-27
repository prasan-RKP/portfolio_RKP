import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { toast } from "sonner";
import TitleHeader from "../components/TitleHeader.jsx";
import GlowCard from "../components/GlowCard";
import { useAuthStore } from "../store/useAuthStore.js";

// 🔥 Enhanced Custom Animated Feedback Button
const AddFeedbackButton = ({ onClick }) => {
  const btnRef = useRef(null);
  const glowRef = useRef(null);
  const particlesRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);

    // Enhanced GSAP animations
    const tl = gsap.timeline();

    // Button transformation
    tl.to(btnRef.current, {
      scale: 1.08,
      y: -3,
      boxShadow:
        "0 15px 35px rgba(139, 92, 246, 0.4), 0 5px 15px rgba(236, 72, 153, 0.3)",
      duration: 0.4,
      ease: "back.out(1.7)",
    })
      // Background gradient shift
      .to(
        btnRef.current,
        {
          backgroundPosition: "200% 0%",
          duration: 0.6,
          ease: "power2.out",
        },
        0
      )
      // Glow effect
      .to(
        glowRef.current,
        {
          opacity: 0.8,
          scale: 1.2,
          duration: 0.5,
          ease: "power2.out",
        },
        0.1
      )
      // Particles activation
      .to(
        particlesRef.current?.children || [],
        {
          opacity: 1,
          scale: 1,
          rotation: 360,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.1,
        },
        0.2
      );
  };

  const handleMouseLeave = () => {
    setIsHovered(false);

    const tl = gsap.timeline();

    // Reset button
    tl.to(btnRef.current, {
      scale: 1,
      y: 0,
      boxShadow:
        "0 8px 25px rgba(139, 92, 246, 0.2), 0 3px 10px rgba(236, 72, 153, 0.1)",
      duration: 0.5,
      ease: "power2.out",
    })
      // Reset background
      .to(
        btnRef.current,
        {
          backgroundPosition: "0% 0%",
          duration: 0.4,
          ease: "power2.out",
        },
        0
      )
      // Reset glow
      .to(
        glowRef.current,
        {
          opacity: 0.3,
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        },
        0
      )
      // Hide particles
      .to(
        particlesRef.current?.children || [],
        {
          opacity: 0,
          scale: 0,
          rotation: 0,
          duration: 0.4,
          ease: "power2.out",
          stagger: 0.05,
        },
        0
      );
  };

  const handleClick = (e) => {
    // Ripple effect on click
    const rect = btnRef.current.getBoundingClientRect();
    const ripple = document.createElement("div");
    const size = Math.max(rect.width, rect.height);

    ripple.style.width = ripple.style.height = size + "px";
    ripple.style.left = e.clientX - rect.left - size / 2 + "px";
    ripple.style.top = e.clientY - rect.top - size / 2 + "px";
    ripple.style.position = "absolute";
    ripple.style.borderRadius = "50%";
    ripple.style.background = "rgba(255, 255, 255, 0.6)";
    ripple.style.pointerEvents = "none";
    ripple.style.animation = "ripple 0.6s ease-out";

    btnRef.current.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);

    onClick();
  };

  return (
    <>
      <style jsx>{`
        @keyframes ripple {
          0% {
            transform: scale(0);
            opacity: 1;
          }
          100% {
            transform: scale(4);
            opacity: 0;
          }
        }

        @keyframes pulse-glow {
          0%,
          100% {
            box-shadow: 0 0 20px rgba(6, 182, 212, 0.5),
              0 0 40px rgba(14, 165, 233, 0.3);
          }
          50% {
            box-shadow: 0 0 30px rgba(6, 182, 212, 0.7),
              0 0 60px rgba(14, 165, 233, 0.5);
          }
        }

        .gradient-border {
          position: relative;
          background: linear-gradient(
            45deg,
            #ec4899,
            #8b5cf6,
            #3b82f6,
            #10b981,
            #f59e0b,
            #ef4444
          );
          background-size: 400% 400%;
          animation: gradient-shift 3s ease infinite;
        }

        @keyframes gradient-shift {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .btn-content {
          background: linear-gradient(
            135deg,
            rgba(236, 72, 153, 0.9) 0%,
            rgba(139, 92, 246, 0.9) 25%,
            rgba(59, 130, 246, 0.9) 50%,
            rgba(16, 185, 129, 0.9) 75%,
            rgba(245, 158, 11, 0.9) 100%
          );
          background-size: 300% 300%;
        }
      `}</style>

      <div className="relative inline-block">
        {/* Animated glow background */}
        <div
          ref={glowRef}
          className="absolute inset-0 rounded-xl opacity-30 blur-lg"
          style={{
            background: isHovered
              ? "linear-gradient(45deg, #0ea5e9, #06b6d4, #0891b2, #0284c7)"
              : "linear-gradient(45deg, #334155, #475569, #64748b)",
            animation: isHovered
              ? "pulse-glow 2s ease-in-out infinite"
              : "none",
          }}
        />

        {/* Floating particles */}
        <div
          ref={particlesRef}
          className="absolute inset-0 pointer-events-none"
        >
                      {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full opacity-0 scale-0"
              style={{
                background: [
                  "#06b6d4",
                  "#0ea5e9",
                  "#3b82f6",
                  "#8b5cf6",
                  "#06b6d4",
                  "#0ea5e9",
                ][i],
                left: `${15 + i * 12}%`,
                top: `${20 + (i % 2) * 60}%`,
              }}
            />
          ))}
        </div>

        {/* Main button */}
        <motion.button
          ref={btnRef}
          onClick={handleClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          whileHover={{
            scale: 1.02,
            transition: { duration: 0.2 },
          }}
          whileTap={{
            scale: 0.96,
            transition: { duration: 0.1 },
          }}
          className="relative overflow-hidden px-8 py-4 rounded-xl font-bold text-white text-lg transition-all duration-300 border-2 bg-slate-800 border-slate-600"
          style={{
            boxShadow: isHovered
              ? "0 0 25px rgba(6, 182, 212, 0.6), 0 0 50px rgba(14, 165, 233, 0.4), inset 0 0 25px rgba(6, 182, 212, 0.1)"
              : "0 8px 25px rgba(0, 0, 0, 0.3), 0 3px 10px rgba(0, 0, 0, 0.2)",
            borderColor: isHovered ? "#06b6d4" : "#475569",
            background: isHovered
              ? "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)"
              : "#1e293b",
            transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          {/* Animated background overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent -translate-x-full transition-transform duration-1000" 
               style={{
                 transform: isHovered ? "translateX(100%)" : "translateX(-100%)",
               }} />

          {/* Button content */}
          <div className="relative flex items-center gap-2">
            <motion.span
              animate={{
                scale: isHovered ? [1, 1.05, 1] : 1,
                color: isHovered ? "#67e8f9" : "#ffffff",
              }}
              transition={{
                duration: 0.5,
                repeat: isHovered ? Infinity : 0,
                repeatType: "reverse",
              }}
            >
              ✨
            </motion.span>
            <span className={`font-semibold tracking-wide ${isHovered ? "text-cyan-300" : "text-white"}`}>
              Add Feedback
            </span>
            <motion.span
              animate={{
                x: isHovered ? [0, 3, 0] : 0,
                rotate: isHovered ? [0, 15, 0] : 0,
                color: isHovered ? "#67e8f9" : "#ffffff",
              }}
              transition={{
                duration: 1,
                repeat: isHovered ? Infinity : 0,
                repeatType: "reverse",
              }}
            >
              →
            </motion.span>
          </div>

          {/* Neon shine effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent -skew-x-12"
            initial={{ x: "-100%" }}
            animate={{ x: isHovered ? "200%" : "-100%" }}
            transition={{
              duration: 1.5,
              repeat: isHovered ? Infinity : 0,
              repeatDelay: 1,
              ease: "easeInOut",
            }}
          />
          
          {/* Pulse border effect */}
          <motion.div
            className="absolute inset-0 rounded-xl border-2 border-cyan-400/50"
            initial={{ opacity: 0, scale: 1 }}
            animate={{ 
              opacity: isHovered ? [0, 0.6, 0] : 0,
              scale: isHovered ? [1, 1.05, 1] : 1
            }}
            transition={{
              duration: 2,
              repeat: isHovered ? Infinity : 0,
              ease: "easeInOut",
            }}
          />
        </motion.button>
      </div>
    </>
  );
};

// 🚀 Enhanced Read More Button with Dark Theme & Neon Glow
const ReadMoreButton = ({ onClick, showMore, count }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative overflow-hidden px-6 py-3 rounded-lg font-semibold text-white bg-slate-800 border border-slate-600 transition-all duration-300 group"
      style={{
        boxShadow: isHovered 
          ? "0 0 20px rgba(6, 182, 212, 0.6), 0 0 40px rgba(14, 165, 233, 0.4), inset 0 0 20px rgba(6, 182, 212, 0.1)"
          : "0 4px 15px rgba(0, 0, 0, 0.2)",
      }}
    >
      {/* Neon glow effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Animated border glow */}
      <motion.div
        className="absolute inset-0 rounded-lg"
        style={{
          background: isHovered 
            ? "linear-gradient(45deg, transparent, rgba(6, 182, 212, 0.3), transparent)"
            : "transparent",
          backgroundSize: "200% 200%",
        }}
        animate={{
          backgroundPosition: isHovered ? ["0% 0%", "100% 100%", "0% 0%"] : "0% 0%",
        }}
        transition={{
          duration: 2,
          repeat: isHovered ? Infinity : 0,
          ease: "linear",
        }}
      />
      
      <div className="relative flex items-center gap-2">
        <span className={isHovered ? "text-cyan-300" : "text-slate-300"}>
          {showMore ? "Show Less" : `Read More (${count} more)`}
        </span>
        <motion.span
          animate={{ 
            rotate: showMore ? 180 : 0,
            color: isHovered ? "#67e8f9" : "#cbd5e1"
          }}
          transition={{ duration: 0.3 }}
        >
          ↓
        </motion.span>
      </div>
      
      {/* Pulse effect on hover */}
      <motion.div
        className="absolute inset-0 bg-cyan-400/10 rounded-lg"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ 
          scale: isHovered ? [0, 1.2, 0] : 0,
          opacity: isHovered ? [0, 0.3, 0] : 0
        }}
        transition={{
          duration: 1.5,
          repeat: isHovered ? Infinity : 0,
          ease: "easeOut",
        }}
      />
    </motion.button>
  );
};

const Testimonials = () => {
  const { fetchReview, reviewData } = useAuthStore();
  const [reviews, setReviews] = useState([]);
  const [showAllReviews, setShowAllReviews] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        await fetchReview();

        // 💡 Ensure reviewData is an array before setting
        if (Array.isArray(reviewData)) {
          setReviews(reviewData);
        } else if (reviewData && typeof reviewData === "object") {
          setReviews([reviewData]); // convert single object to array
        } else {
          setReviews([]);
        }
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
        setReviews([]);
      }
    };

    fetchReviews();
  }, [fetchReview, reviewData]);

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Display logic for reviews
  const displayedReviews = reviews.length > 6 && !showAllReviews 
    ? reviews.slice(0, 6) 
    : reviews;

  const remainingCount = reviews.length - 6;

  

  return (
    <section id="testimonials" className="flex-center section-padding">
      <div className="w-full h-full md:px-10 px-5">
        <TitleHeader
          title="Viewers Expression ❤️"
          sub="Feedback highlights ⭐️"
        />

        {/* Empty state */}
        {!reviews || reviews.length === 0 ? (
          <div className="text-center mt-16">
            <p className="text-lg text-white-50 mb-6">
              No reviews yet. Be the first to share your experience!
            </p>
            <div className="flex justify-center">
              <AddFeedbackButton onClick={scrollToContact} />
            </div>
          </div>
        ) : reviews.length < 3 ? (
          // Less than 3 reviews - center them
          <div className="flex flex-col items-center gap-6 mt-16">
            {reviews.map((review, index) => (
              <div className="max-w-xl w-full" key={index}>
                <GlowCard card={review} index={index}>
                  <div className="flex items-center gap-3">
                    <div>
                      <p className="font-bold">{review.name}</p>
                      <p className="text-white-50">{review.message}</p>
                    </div>
                  </div>
                </GlowCard>
              </div>
            ))}
          </div>
        ) : reviews.length > 6 ? (
          // 7+ reviews - ALL in scrollable container
          <div className="mt-16 space-y-6">
            {/* Reviews count indicator */}
            <div className="text-center">
              <p className="text-white-50 text-sm">
                Showing {showAllReviews ? reviews.length : 6} of {reviews.length} reviews
              </p>
            </div>

            {/* Scrollable container with ALL reviews */}
            <div className="relative border border-slate-700/50 rounded-xl p-6 bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-sm shadow-2xl">
              <motion.div 
                className={`${
                  showAllReviews 
                    ? 'max-h-[600px] overflow-y-auto' 
                    : 'max-h-none overflow-hidden'
                } pr-2 custom-scrollbar`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-5">
                  {displayedReviews.map((review, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <GlowCard card={review} index={index}>
                        <div className="flex items-center gap-3">
                          
                          <div>
                            <p className="font-bold">{review.name}</p>
                            <p className="text-white-50">{review.message}</p>
                          </div>
                        </div>
                      </GlowCard>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Custom scrollbar styles */}
              <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                  width: 8px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                  background: rgba(51, 65, 85, 0.4);
                  border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                  background: linear-gradient(45deg, #0ea5e9, #06b6d4);
                  border-radius: 10px;
                  box-shadow: 0 0 10px rgba(6, 182, 212, 0.5);
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                  background: linear-gradient(45deg, #0284c7, #0891b2);
                  box-shadow: 0 0 15px rgba(6, 182, 212, 0.8);
                }
              `}</style>
            </div>

            {/* Read More/Less Button */}
            <div className="flex justify-center">
              <ReadMoreButton
              
                onClick={() => setShowAllReviews(!showAllReviews)}
                showMore={showAllReviews}
                count={remainingCount}
              />
            </div>
          </div>
        ) : (
          // Regular grid for 3-6 reviews
          <motion.div 
            className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 mt-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {reviews.map((review, index) => (
              <GlowCard card={review} key={index} index={index}>
                <div className="flex items-center gap-3">
                  <div>
                    <p className="font-bold">{review.name}</p>
                    <p className="text-white-50">{review.message}</p>
                  </div>
                </div>
              </GlowCard>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;

//