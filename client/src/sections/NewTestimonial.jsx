import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlus, FiChevronDown, FiChevronUp, FiStar, FiUser } from "react-icons/fi";

// Mock components to match your structure
const TitleHeader = ({ title, sub }) => (
  <div className="text-center mb-16">
    <motion.h2 
      className="text-4xl md:text-6xl font-bold text-white mb-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {title}
    </motion.h2>
    <motion.p 
      className="text-lg text-gray-400"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      {sub}
    </motion.p>
  </div>
);

// Mock store hook
const useAuthStore = () => ({
  fetchReview: async () => {},
  reviewData: [
    { name: "John Doe", message: "Amazing experience! The attention to detail and quality of work exceeded my expectations. Highly recommended for anyone looking for professional services." },
    { name: "Sarah Johnson", message: "Outstanding service and support. The team was responsive, professional, and delivered exactly what we needed on time." },
    { name: "Mike Chen", message: "Incredible results! The project was completed flawlessly and the communication throughout was excellent. Will definitely work with them again." },
    { name: "Emily Davis", message: "Top-notch quality and exceptional customer service. They went above and beyond to ensure our satisfaction. Truly impressed!" },
    { name: "Alex Rodriguez", message: "Professional, reliable, and innovative. The final product exceeded our expectations and was delivered ahead of schedule." },
    { name: "Lisa Wang", message: "Fantastic experience from start to finish. Great communication, attention to detail, and outstanding final results." },
    { name: "David Thompson", message: "Exceptional work quality and professional service. They understood our requirements perfectly and delivered beyond expectations." },
    { name: "Rachel Kim", message: "Impressive technical skills and creative solutions. The team was collaborative and delivered exactly what we envisioned." }
  ]
});

// Enhanced Add Feedback Button
const AddFeedbackButton = ({ onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="relative group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-semibold text-white overflow-hidden border border-blue-500/30 shadow-2xl"
    >
      {/* Animated background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600"
        initial={{ x: "-100%" }}
        animate={{ x: isHovered ? "0%" : "-100%" }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 blur-xl group-hover:blur-2xl transition-all duration-300" />
      
      {/* Content */}
      <div className="relative flex items-center gap-3">
        <motion.div
          animate={{ rotate: isHovered ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <FiPlus className="w-5 h-5" />
        </motion.div>
        <span>Add Feedback</span>
        <motion.div
          animate={{ x: isHovered ? 4 : 0 }}
          transition={{ duration: 0.3 }}
        >
          →
        </motion.div>
      </div>
      
      {/* Shine effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
        initial={{ x: "-100%" }}
        animate={{ x: isHovered ? "200%" : "-100%" }}
        transition={{ duration: 1, repeat: isHovered ? Infinity : 0, repeatDelay: 1 }}
      />
    </motion.button>
  );
};

// Enhanced Read More Button
const ReadMoreButton = ({ onClick, showMore, count }) => (
  <motion.button
    onClick={onClick}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="group relative px-6 py-3 bg-gray-800/80 hover:bg-gray-700/80 rounded-lg border border-gray-600/50 hover:border-blue-500/50 transition-all duration-300 overflow-hidden"
  >
    {/* Glow effect */}
    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    
    <div className="relative flex items-center gap-2 text-gray-300 group-hover:text-white">
      <span>{showMore ? "Show Less" : `Show More (${count} hidden)`}</span>
      <motion.div
        animate={{ rotate: showMore ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <FiChevronDown className="w-4 h-4" />
      </motion.div>
    </div>
  </motion.button>
);

// Enhanced Review Card
const ReviewCard = ({ review, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const isLongMessage = review.message.length > 100;
  const displayMessage = isExpanded || !isLongMessage 
    ? review.message 
    : review.message.substring(0, 100) + "...";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative"
    >
      {/* Card background with gradient border */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500" />
      
      <div className="relative bg-gray-900/90 backdrop-blur-sm border border-gray-700/50 group-hover:border-blue-500/30 rounded-xl p-6 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10">
        {/* Shine effect on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12"
          initial={{ x: "-100%" }}
          animate={{ x: isHovered ? "200%" : "-100%" }}
          transition={{ duration: 1 }}
        />
        
        {/* Header */}
        <div className="flex items-center gap-4 mb-4">
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <FiUser className="w-6 h-6 text-white" />
            </div>
            {/* Pulse ring */}
            <motion.div
              className="absolute inset-0 border-2 border-blue-400/50 rounded-full"
              animate={{ scale: isHovered ? [1, 1.2, 1] : 1, opacity: isHovered ? [0.5, 0, 0.5] : 0 }}
              transition={{ duration: 2, repeat: isHovered ? Infinity : 0 }}
            />
          </div>
          
          <div className="flex-1">
            <h3 className="font-semibold text-white group-hover:text-blue-300 transition-colors duration-300">
              {review.name}
            </h3>
            <div className="flex items-center gap-1 mt-1">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: (index * 0.1) + (i * 0.1) }}
                >
                  <FiStar className="w-4 h-4 text-yellow-400 fill-current" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Message */}
        <div className="relative">
          <motion.p 
            className="text-gray-300 leading-relaxed"
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {displayMessage}
          </motion.p>
          
          {/* Read more/less button for long messages */}
          {isLongMessage && (
            <motion.button
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-2 text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isExpanded ? "Show less" : "Read more"}
            </motion.button>
          )}
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-40 transition-opacity duration-300">
          <div className="text-6xl text-blue-400">"</div>
        </div>
      </div>
    </motion.div>
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

        if (Array.isArray(reviewData)) {
          setReviews(reviewData);
        } else if (reviewData && typeof reviewData === "object") {
          setReviews([reviewData]);
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

  const displayedReviews = reviews.length > 6 && !showAllReviews 
    ? reviews.slice(0, 6) 
    : reviews;

  const remainingCount = reviews.length - 6;

  return (
    <section id="testimonials" className="min-h-screen bg-black py-20">
      {/* Background effects */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-900/5 to-purple-900/5" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1)_0%,transparent_50%)]" />
      
      <div className="relative container mx-auto px-5 md:px-10">
        <TitleHeader
          title="Viewers Expression ❤️"
          sub="Feedback highlights ⭐️"
        />

        {/* Empty state */}
        {!reviews || reviews.length === 0 ? (
          <motion.div 
            className="text-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-8">
              <div className="w-24 h-24 mx-auto bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center mb-6">
                <FiStar className="w-12 h-12 text-gray-400" />
              </div>
              <p className="text-xl text-gray-400 mb-2">No reviews yet</p>
              <p className="text-gray-500">Be the first to share your experience!</p>
            </div>
            <AddFeedbackButton onClick={scrollToContact} />
          </motion.div>
        ) : reviews.length < 3 ? (
          // Less than 3 reviews - center them
          <div className="flex flex-col items-center gap-6 mt-16 max-w-2xl mx-auto">
            <AnimatePresence>
              {reviews.map((review, index) => (
                <motion.div key={index} className="w-full">
                  <ReviewCard review={review} index={index} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          // Regular grid and scrollable for more reviews
          <div className="mt-16 space-y-8">
            {reviews.length > 6 && (
              <div className="text-center">
                <p className="text-gray-400 text-sm">
                  Showing {showAllReviews ? reviews.length : 6} of {reviews.length} reviews
                </p>
              </div>
            )}

            {/* Reviews grid */}
            <AnimatePresence mode="wait">
              <motion.div
                key={showAllReviews ? 'all' : 'limited'}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {reviews.length > 6 && showAllReviews ? (
                  // Scrollable container for all reviews
                  <div className="relative border border-gray-700/50 rounded-xl p-6 bg-gray-900/50 backdrop-blur-sm shadow-2xl">
                    <div className="max-h-[600px] overflow-y-auto pr-2 space-y-4 custom-scrollbar">
                      {reviews.map((review, index) => (
                        <ReviewCard key={index} review={review} index={index} />
                      ))}
                    </div>
                  </div>
                ) : (
                  // Grid layout
                  <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
                    {displayedReviews.map((review, index) => (
                      <ReviewCard key={index} review={review} index={index} />
                    ))}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Show more/less button */}
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

      {/* Custom scrollbar styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(31, 41, 55, 0.5);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(45deg, #3b82f6, #8b5cf6);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(45deg, #2563eb, #7c3aed);
        }
      `}</style>
    </section>
  );
};

export default Testimonials;