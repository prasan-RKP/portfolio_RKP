import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiCheck } from "react-icons/fi";


const ContactSkeleton = ({onClose}) => {
  const [showSuccess, setShowSuccess] = useState(false);

  // Simulate the transition from loading to success after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSuccess(true);
    }, 2000); // Show success after 2 seconds

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    // This would trigger a state change in the parent component
    // to show the form again and reset isUploading to false
    //window.location.reload(); // Temporary solution - in real app, you'd call a parent function
     if (onClose) onClose();
  };

  return (
    <div className="xl:col-span-5">
      <div className="flex-center card-border rounded-xl p-10 my-janda">
        <AnimatePresence mode="wait">
          {!showSuccess ? (
            // Loading Skeleton
            <motion.div
              key="skeleton"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full flex flex-col gap-7"
            >
              {/* Name Field Skeleton */}
              <div className="animate-pulse">
                <div className="h-4 bg-gray-300 rounded w-20 mb-2"></div>
                <div className="h-12 bg-gray-200 rounded-lg"></div>
              </div>

              {/* Email Field Skeleton */}
              <div className="animate-pulse">
                <div className="h-4 bg-gray-300 rounded w-24 mb-2"></div>
                <div className="h-12 bg-gray-200 rounded-lg"></div>
              </div>

              {/* Message Field Skeleton */}
              <div className="animate-pulse">
                <div className="h-4 bg-gray-300 rounded w-28 mb-2"></div>
                <div className="h-24 bg-gray-200 rounded-lg"></div>
              </div>

              {/* Button Skeleton */}
              <div className="animate-pulse">
                <div className="h-14 bg-gray-300 rounded-lg"></div>
              </div>

              {/* Loading Animation */}
              <div className="flex justify-center mt-4">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            </motion.div>
          ) : (
            // Success Message
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="w-full flex flex-col items-center justify-center py-12"
            >
              {/* Success Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 200, 
                  damping: 10,
                  delay: 0.2 
                }}
                className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-6"
              >
                <FiCheck className="text-white text-3xl" />
              </motion.div>

              {/* Success Message */}
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-2xl font-semibold text-center mb-2"
              >
                Thank you for your response!
              </motion.h3>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-gray-600 text-center mb-8"
              >
                Your message has been sent successfully. Thn'x for your contribution!
              </motion.p>

              {/* Close Button */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                onClick={handleClose}
                className="group relative px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 flex items-center gap-2 "
              >
                <FiX className="text-lg" />
                <span>Close</span>
                
                {/* Hover effect */}
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-10 transition-opacity duration-200"></div>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ContactSkeleton;