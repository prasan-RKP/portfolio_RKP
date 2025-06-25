import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner"; // Assuming sonner is available or will be handled externally

// --- MOCK COMPONENTS AND HOOKS FOR STANDALONE EXECUTION ---
// IMPORTANT: In your actual project, you will use your original files for these!

// Mock TitleHeader component
const TitleHeader = ({ title, sub }) => (
  <div className="text-center mb-10">
    <h2 className="text-4xl font-extrabold text-white mb-2">{title}</h2>
    <p className="text-lg text-blue-300">{sub}</p>
  </div>
);

// Mock GlowCard component - MODIFIED FOR INTERNAL SCROLLING
const GlowCard = ({ children, index, card }) => {
  const [isMessageExpanded, setIsMessageExpanded] = useState(false);
  const MAX_MESSAGE_LENGTH = 150; // Define maximum characters before truncating

  // Determine if the message needs a "Read More" button
  const shouldShowReadMore = card.message.length > MAX_MESSAGE_LENGTH;
  const displayedMessage = shouldShowReadMore && !isMessageExpanded
    ? `${card.message.substring(0, MAX_MESSAGE_LENGTH)}...`
    : card.message;

  return (
    <motion.div
      className="relative p-6 rounded-xl border border-slate-700/50 bg-gradient-to-br from-slate-800/80 to-slate-900/80 shadow-lg overflow-hidden flex flex-col justify-between h-full" // Added h-full and flex-col
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{
        scale: 1.02,
        boxShadow: "0 0 30px rgba(6, 182, 212, 0.7), 0 0 60px rgba(14, 165, 233, 0.5)",
      }}
      style={{
        boxShadow: "0 0 15px rgba(6, 182, 212, 0.4), 0 0 30px rgba(14, 165, 233, 0.2)",
      }}
    >
      {/* Optional: Add a subtle animated border or background for mock card */}
      <div className="absolute inset-0 rounded-xl pointer-events-none"
           style={{
             border: '1px solid transparent',
             background: 'linear-gradient(45deg, #0ea5e9, #06b6d4, #0ea5e9) border-box',
             WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
             WebkitMaskComposite: 'xor',
             maskComposite: 'exclude',
             opacity: 0.2
           }}
      />
      
      {/* Content area of the GlowCard */}
      <div className="flex-grow flex flex-col"> {/* flex-grow to push button to bottom */}
        <div className="flex items-center gap-3 mb-4">
          <div>
            <img
              src="/mern/man.png" // This image path should be resolved in your actual project
              alt="avatar"
              className="w-12 h-12 rounded-full object-cover"
            />
          </div>
          <div>
            <p className="font-bold text-white">{card.name}</p>
          </div>
        </div>
        
        {/* Scrollable message area */}
        <div 
          className={`text-white-50 leading-relaxed text-sm ${shouldShowReadMore && !isMessageExpanded ? 'max-h-24 overflow-y-auto custom-scrollbar' : 'max-h-full'} pr-2`}
        >
          <p>{displayedMessage}</p>
        </div>

        {/* Read More/Less button for the individual card */}
        {shouldShowReadMore && (
          <button
            onClick={() => setIsMessageExpanded(!isMessageExpanded)}
            className="mt-4 text-blue-400 hover:text-blue-300 self-start text-sm font-semibold focus:outline-none"
          >
            {isMessageExpanded ? "Read Less" : "Read More"}
          </button>
        )}
      </div>

      {/* Custom scrollbar styles for the message area */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(51, 65, 85, 0.2);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(45deg, #0ea5e9, #06b6d4);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(45deg, #0284c7, #0891b2);
        }
      `}</style>
    </motion.div>
  );
};

// Mock useAuthStore hook
const useAuthStore = () => {
  // Dummy review data for testing purposes
  const reviewData = [
    { name: "Alice Johnson", message: "Absolutely fantastic service! Highly recommend. This is a longer message to test the scrollability and the read more/less functionality within the card. We need enough text here to ensure that it exceeds the defined max message length and triggers the scrollbar and the button. This allows us to properly verify the user's request. The goal is to make sure the individual card handles its own overflow without affecting the overall layout of the grid. This also allows for a better user experience, as they can read the full review if they choose to, right within the card.", rating: 5 },
    { name: "Bob Smith", message: "A truly great experience. Very satisfied with the outcome.", rating: 4 },
    { name: "Charlie Brown", message: "Good overall, but a few minor points could be improved. This message is also a bit longer to test the truncation. It's important that each card functions independently regarding its content display.", rating: 3 },
    { name: "Diana Prince", message: "Exceptional quality and support. Will definitely use again.", rating: 5 },
    { name: "Ethan Hunt", message: "Quick and efficient. Met all my expectations.", rating: 4 },
    { name: "Fiona Glenn", message: "Very impressed with the attention to detail and personalized approach. This one is also long to ensure we have multiple scrollable cards.", rating: 5 },
    { name: "George Costanza", message: "It was okay. Nothing to write home about.", rating: 2 },
    { name: "Hannah Montana", message: "Loving it! So easy to use and very effective.", rating: 5 },
    { name: "Ivan Drago", message: "Solid performance, no complaints. Another reasonably long message to fill up some space and check scroll behavior.", rating: 4 },
    { name: "Jasmine Star", message: "Beyond expectations! The best in its class. This is the last long message in our mock data.", rating: 5 },
    { name: "Kelly Green", message: "Fantastic product, highly recommended!", rating: 5 },
    { name: "Leo Grey", message: "Decent, but could use some improvements in UI.", rating: 3 },
    { name: "Mia Hall", message: "Absolutely brilliant, exceeded all my expectations. Will surely be back!", rating: 5 },
    { name: "Noah White", message: "Average experience, nothing special to mention.", rating: 2 },
    { name: "Olivia Black", message: "Simply the best, I'm so happy with this service. Another long review for testing purposes, making sure the scroll continues to work as expected across many cards.", rating: 5 },
  ];

  // Mock fetchReview function
  const fetchReview = async () => {
    // Simulate API call delay
    return new Promise(resolve => setTimeout(() => {
      // In a real app, you would set actual fetched data here.
      // For this mock, reviewData is already defined.
      resolve();
    }, 500));
  };

  return { fetchReview, reviewData };
};
// --- END MOCK COMPONENTS AND HOOKS ---


// 🔥 Enhanced Custom Animated Feedback Button
const AddFeedbackButton = ({ onClick }) => {
  const btnRef = useRef(null);
  const glowRef = useRef(null); // Used for a simulated glow effect with Framer Motion/CSS
  const particlesRef = useRef(null); // Used for a simulated particle effect with CSS

  const [isHovered, setIsHovered] = useState(false);

  // Simplified animations using Framer Motion and CSS
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
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
                opacity: isHovered ? 1 : 0,
                transform: `scale(${isHovered ? 1 : 0}) rotate(${isHovered ? 360 : 0}deg)`,
                transition: "all 0.8s ease-out"
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
            scale: 1.08,
            y: -3,
            boxShadow:
              "0 15px 35px rgba(139, 92, 246, 0.4), 0 5px 15px rgba(236, 72, 153, 0.3)",
          }}
          whileTap={{
            scale: 0.96,
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
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent -translate-x-full transition-transform duration-1000"
            animate={{
              x: isHovered ? "100%" : "-100%",
            }}
            transition={{ duration: 1 }}
          />

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
    const loadReviews = async () => {
      try {
        await fetchReview();
        // Since reviewData from mock is directly an array, we can use it.
        // In a real scenario, you'd ensure it's an array and handle object conversion if needed.
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

    loadReviews();
  }, [fetchReview, reviewData]); // Depend on fetchReview and reviewData from the store

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Display logic for reviews:
  // If showAllReviews is true, display all reviews.
  // If reviews.length > 6 and showAllReviews is false, display only the first 6.
  // Otherwise, display all reviews (for cases with 0-6 reviews).
  const displayedReviews = showAllReviews
    ? reviews
    : reviews.slice(0, 6); // Always slice to 6 if not showing all

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
                <GlowCard card={review} index={index} /> {/* Pass the entire review object to GlowCard */}
              </div>
            ))}
          </div>
        ) : (
          // For 3 to 6 reviews, or 7+ reviews with scrollable container
          <div className="mt-16 space-y-6">
            {/* Reviews count indicator, only show if more than 6 total reviews */}
            {reviews.length > 6 && (
              <div className="text-center">
                <p className="text-white-50 text-sm">
                  Showing {showAllReviews ? reviews.length : displayedReviews.length} of {reviews.length} reviews
                </p>
              </div>
            )}

            {/* Main grid container for reviews (NOT the scrollable part itself) */}
            <div className={`relative border border-slate-700/50 rounded-xl p-6 bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-sm shadow-2xl
              ${reviews.length > 6 ? 'max-h-[600px] overflow-y-auto pr-2 custom-scrollbar' : ''}
            `}>
              <motion.div
                className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                {displayedReviews.map((review, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <GlowCard card={review} index={index} /> {/* Pass the entire review object to GlowCard */}
                  </motion.div>
                ))}
              </motion.div>

              {/* Custom scrollbar styles for the main grid container (if applicable) */}
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

            {/* Read More/Less Button for the overall section, only show if more than 6 total reviews */}
            {reviews.length > 6 && (
              <div className="flex justify-center">
                <ReadMoreButton
                  onClick={() => setShowAllReviews(!showAllReviews)}
                  showMore={showAllReviews}
                  count={remainingCount}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
