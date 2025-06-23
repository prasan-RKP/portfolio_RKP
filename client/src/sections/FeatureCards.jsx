import { abilities } from "../constants";
import { motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import '../stylesheets/myCustom.css';

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      type: "spring",
      stiffness: 120,
    },
  }),
};

const FeatureCards = () => {
  const containerRef = useRef();

  useGSAP(() => {
    // Simplified floating animation - less intensive
    gsap.to(".feature-card", {
      y: -8,
      duration: 3,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
      stagger: 0.5
    });

    // Streamlined hover effects
    const cards = document.querySelectorAll('.feature-card');
    cards.forEach((card, index) => {
      let isHovered = false;
      
      card.addEventListener('mouseenter', () => {
        if (isHovered) return;
        isHovered = true;
        
        // Single smooth animation
        gsap.to(card, {
          scale: 1.05,
          rotationY: 5,
          z: 30,
          duration: 0.4,
          ease: "power2.out",
        });
        
        gsap.to(card.querySelector('.gradient-glow'), {
          opacity: 0.4,
          duration: 0.3,
        });
        
        gsap.to(card.querySelector('.feature-icon'), {
          scale: 1.1,
          duration: 0.3,
        });
        
        gsap.to(card, {
          boxShadow: "0 20px 40px rgba(168, 85, 247, 0.2)",
          duration: 0.3,
        });
      });

      card.addEventListener('mouseleave', () => {
        if (!isHovered) return;
        isHovered = false;
        
        gsap.to(card, {
          scale: 1,
          rotationY: 0,
          z: 0,
          duration: 0.4,
          ease: "power2.out",
        });
        
        gsap.to(card.querySelector('.gradient-glow'), {
          opacity: 0.1,
          duration: 0.3,
        });
        
        gsap.to(card.querySelector('.feature-icon'), {
          scale: 1,
          duration: 0.3,
        });
        
        gsap.to(card, {
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
          duration: 0.3,
        });
      });
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="w-full padding-x-lg py-20 bg-gradient-to-b from-zinc-900 to-black perspective-1000">
      <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {abilities.map(({ imgPath, title, desc }, index) => (
          <motion.div
            key={title}
            className="feature-card rounded-3xl p-8 flex flex-col gap-4 relative group border border-zinc-700 bg-zinc-900 shadow-xl transition-all duration-300 cursor-pointer transform-gpu"
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={cardVariants}
            style={{
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Enhanced Gradient Glow */}
            <div className="gradient-glow absolute inset-0 z-0 opacity-10 bg-gradient-to-r from-purple-500 via-indigo-600 to-blue-500 transition-opacity duration-300 rounded-3xl"></div>

            {/* Icon Container */}
            <div className="z-10 size-16 flex items-center justify-center rounded-full bg-gradient-to-tr from-purple-600 via-indigo-700 to-blue-600 p-1 relative">
              <div className="bg-zinc-800 p-2 rounded-full">
                <img src={imgPath} alt={title} className="feature-icon w-10 h-10 transition-transform duration-300" />
              </div>
            </div>

            {/* Title */}
            <h3 className="card-title z-10 text-white text-2xl font-semibold mt-2 transition-all duration-300 no-underline group-hover:text-purple-400">
              {title}
            </h3>

            {/* Description */}
            <p className="card-desc z-10 text-white/70 text-lg leading-relaxed no-underline my-janda group-hover:text-white/90 transition-colors duration-300">
              {desc}
            </p>

            {/* Bottom Accent Line */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </motion.div>
        ))}
      </div>

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </div>
  );
};

export default FeatureCards;