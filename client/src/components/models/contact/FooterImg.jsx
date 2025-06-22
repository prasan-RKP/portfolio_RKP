import React, { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { gsap } from 'gsap';

const FooterImg = ({ 
  imageSrc = "/mern/ft1.jpg",
  alt = "Contact Experience",
  overlayText = "Let's Connect",
  subText = "Ready to bring your ideas to life"
}) => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const overlayRef = useRef(null);
  const glowRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  // Mouse position tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Enhanced spring animations
  const springConfig = { damping: 20, stiffness: 200 };
  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [12, -12]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-12, 12]), springConfig);
  
  // Magnetic effect values
  const magneticX = useSpring(0, { damping: 15, stiffness: 150 });
  const magneticY = useSpring(0, { damping: 15, stiffness: 150 });
  
  // Handle mouse movement with magnetic effect
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;
    
    mouseX.set(deltaX);
    mouseY.set(deltaY);
    
    // Magnetic effect - stronger pull when closer to center
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const maxDistance = 200;
    const magneticStrength = Math.max(0, 1 - distance / maxDistance) * 15;
    
    magneticX.set(deltaX * magneticStrength * 0.01);
    magneticY.set(deltaY * magneticStrength * 0.01);
    
    // Update mouse position for spotlight effect
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height
    });
  };
  
  // Reset on mouse leave
  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    magneticX.set(0);
    magneticY.set(0);
    setIsHovered(false);
    setMousePos({ x: 0.5, y: 0.5 });
  };

  // Enhanced GSAP animations
  useEffect(() => {
    const tl = gsap.timeline({ paused: true });
    
    // Image transformations
    tl.to(imageRef.current, {
      scale: 1.15,
      filter: "brightness(1.3) contrast(1.2) saturate(1.1)",
      duration: 0.8,
      ease: "power3.out"
    })
    // Overlay animations
    .to(overlayRef.current, {
      opacity: 0.95,
      backdropFilter: "blur(3px)",
      duration: 0.5,
      ease: "power2.out"
    }, 0.1)
    // Glow effect
    .to(glowRef.current, {
      opacity: 0.8,
      scale: 1.1,
      duration: 0.6,
      ease: "power2.out"
    }, 0.2);
    
    if (isHovered) {
      tl.play();
    } else {
      tl.reverse();
    }
  }, [isHovered]);

  // Ripple effect on click
  const createRipple = (e) => {
    const rect = containerRef.current.getBoundingClientRect();
    const ripple = document.createElement('div');
    const size = 100;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
    ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
    ripple.classList.add('ripple-effect');
    
    containerRef.current.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 1000);
  };

  return (
    <>
      <style jsx>{`
        .ripple-effect {
          position: absolute;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(251, 146, 60, 0.3) 0%, transparent 70%);
          animation: ripple 1s ease-out;
          pointer-events: none;
          z-index: 10;
        }
        
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
        
        .glass-morphism {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .neon-glow {
          filter: drop-shadow(0 0 20px rgba(251, 146, 60, 0.5));
        }
        
        .perspective-container {
          perspective: 1000px;
          transform-style: preserve-3d;
        }
        
        .floating-animation {
          animation: float 6s ease-in-out infinite;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-10px) rotate(1deg); }
          50% { transform: translateY(0px) rotate(0deg); }
          75% { transform: translateY(-5px) rotate(-1deg); }
        }
      `}</style>
      
      <div 
        ref={containerRef}
        className="relative w-full h-full min-h-[22rem] perspective-container cursor-pointer group"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={() => setIsHovered(true)}
        onClick={createRipple}
        style={{ perspective: '1200px' }}
      >
        {/* Ambient glow background */}
        <motion.div
          ref={glowRef}
          className="absolute inset-0 bg-gradient-radial from-orange-400/20 via-amber-300/10 to-transparent rounded-3xl -z-20"
          style={{
            background: `radial-gradient(circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, 
                        rgba(251, 146, 60, 0.3) 0%, 
                        rgba(245, 158, 11, 0.2) 30%, 
                        transparent 70%)`
          }}
          animate={{
            scale: isHovered ? 1.2 : 1,
            opacity: isHovered ? 0.8 : 0.3
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
        
        <motion.div
          className="relative w-full h-full transform-gpu"
          style={{
            rotateX,
            rotateY,
            x: magneticX,
            y: magneticY,
            transformStyle: 'preserve-3d'
          }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          {/* Main Image Container with enhanced styling */}
          <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl group-hover:shadow-orange-500/25 transition-shadow duration-700">
            {/* Background Image with enhanced filters */}
            <img
              ref={imageRef}
              src={imageSrc}
              alt={alt}
              className="w-full h-full object-cover transition-all duration-1000 ease-out"
              style={{
                filter: `
                  brightness(${isHovered ? 1.2 : 1})
                  contrast(${isHovered ? 1.15 : 1})
                  saturate(${isHovered ? 1.1 : 1})
                  hue-rotate(${isHovered ? '5deg' : '0deg'})
                `
              }}
            />
            
            {/* Dynamic gradient overlays */}
            <div 
              className="absolute inset-0 transition-all duration-700"
              style={{
                background: `
                  radial-gradient(circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, 
                    rgba(251, 146, 60, ${isHovered ? 0.3 : 0.1}) 0%, 
                    transparent 50%),
                  linear-gradient(135deg, 
                    rgba(245, 158, 11, 0.2) 0%, 
                    transparent 40%, 
                    rgba(251, 146, 60, 0.2) 100%)
                `
              }}
            />
            
            {/* Animated mesh gradient overlay */}
            <div className="absolute inset-0 opacity-30 mix-blend-overlay">
              <div 
                className="w-full h-full transition-all duration-1000"
                style={{
                  background: `
                    conic-gradient(from ${mousePos.x * 360}deg at 50% 50%, 
                      #ff6b35, #f7931e, #ffd700, #ff6b35)
                  `,
                  opacity: isHovered ? 0.4 : 0.2
                }}
              />
            </div>
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
            
            {/* Enhanced Overlay Content */}
            <motion.div
              ref={overlayRef}
              className="absolute inset-0 flex flex-col justify-center items-center text-white p-8 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.4 }}
            >
              {/* Animated icon with glassmorphism */}
              <motion.div
                className="mb-6"
                initial={{ scale: 0.5, opacity: 0, rotateY: -180 }}
                animate={{ 
                  scale: isHovered ? 1 : 0.5, 
                  opacity: isHovered ? 1 : 0,
                  rotateY: isHovered ? 0 : -180
                }}
                transition={{ delay: 0.1, duration: 0.6, ease: "backOut" }}
              >
                <div className="w-20 h-20 mx-auto mb-4 glass-morphism rounded-full flex items-center justify-center neon-glow floating-animation">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
              </motion.div>
              
              {/* Enhanced text animations */}
              <motion.h2 
                className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-orange-100 to-amber-200 bg-clip-text text-transparent"
                initial={{ y: 30, opacity: 0, scale: 0.8 }}
                animate={{ 
                  y: isHovered ? 0 : 30, 
                  opacity: isHovered ? 1 : 0,
                  scale: isHovered ? 1 : 0.8
                }}
                transition={{ delay: 0.2, duration: 0.6, ease: "backOut" }}
              >
                {overlayText}
              </motion.h2>
              
              <motion.p 
                className="text-lg md:text-xl opacity-90 max-w-md mb-6"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: isHovered ? 0 : 30, opacity: isHovered ? 1 : 0 }}
                transition={{ delay: 0.3, duration: 0.6, ease: "backOut" }}
              >
                {subText}
              </motion.p>
              
              {/* Interactive button */}
              {/* <motion.div
                className="glass-morphism px-8 py-3 rounded-full border border-white/30 hover:border-orange-300/50 transition-all duration-300"
                initial={{ y: 30, opacity: 0, scale: 0.8 }}
                animate={{ 
                  y: isHovered ? 0 : 30, 
                  opacity: isHovered ? 1 : 0,
                  scale: isHovered ? 1 : 0.8
                }}
                transition={{ delay: 0.4, duration: 0.6, ease: "backOut" }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-sm font-medium">Click to explore</span>
              </motion.div> */}
            </motion.div>
            
            {/* Enhanced floating elements */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className={`absolute w-${2 + (i % 3)} h-${2 + (i % 3)} rounded-full backdrop-blur-sm`}
                style={{
                  background: `rgba(${251 - i * 20}, ${146 + i * 15}, 60, 0.${4 + i})`,
                  left: `${15 + i * 15}%`,
                  top: `${10 + i * 12}%`
                }}
                animate={{
                  y: isHovered ? [0, -15 - i * 3, 0] : 0,
                  x: isHovered ? [0, 10 - i * 2, 0] : 0,
                  rotate: isHovered ? [0, 180, 360] : 0,
                  scale: isHovered ? [1, 1.3, 1] : 1,
                }}
                transition={{
                  duration: 3 + i * 0.5,
                  repeat: isHovered ? Infinity : 0,
                  ease: "easeInOut",
                  delay: i * 0.2
                }}
              />
            ))}
            
            {/* Animated border with multiple effects */}
            <motion.div
              className="absolute inset-0 rounded-3xl"
              animate={{
                boxShadow: isHovered 
                  ? [
                      "0 0 0 2px rgba(251, 146, 60, 0.4), 0 0 40px rgba(251, 146, 60, 0.3)",
                      "0 0 0 2px rgba(245, 158, 11, 0.5), 0 0 60px rgba(245, 158, 11, 0.4)",
                      "0 0 0 2px rgba(251, 146, 60, 0.4), 0 0 40px rgba(251, 146, 60, 0.3)"
                    ]
                  : "0 0 0 1px transparent, 0 0 0 transparent"
              }}
              transition={{ duration: 2, repeat: isHovered ? Infinity : 0, ease: "easeInOut" }}
            />
            
            {/* Spotlight effect */}
            <motion.div
              className="absolute inset-0 rounded-3xl pointer-events-none"
              style={{
                background: `radial-gradient(circle 150px at ${mousePos.x * 100}% ${mousePos.y * 100}%, 
                            rgba(255, 255, 255, 0.1) 0%, 
                            transparent 70%)`,
                opacity: isHovered ? 1 : 0
              }}
              transition={{ duration: 0.3 }}
            />
          </div>
          
          {/* Enhanced 3D shadow with blur */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-orange-900/40 to-amber-900/30 rounded-3xl -z-10 blur-xl"
            style={{
              transform: 'translateZ(-80px) scale(0.9) translateY(20px)',
            }}
            animate={{
              opacity: isHovered ? 0.9 : 0.4,
              scale: isHovered ? 0.95 : 0.9,
              y: isHovered ? 10 : 20
            }}
            transition={{ duration: 0.4 }}
          />
        </motion.div>
        
        {/* Enhanced Interactive Particles */}
        {isHovered && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: Math.random() * 4 + 2,
                  height: Math.random() * 4 + 2,
                  background: `rgba(${251 - i * 10}, ${146 + i * 5}, 60, 0.8)`
                }}
                initial={{
                  x: Math.random() * 100 + '%',
                  y: '100%',
                  opacity: 0,
                  scale: 0
                }}
                animate={{
                  opacity: [0, 1, 1, 0],
                  scale: [0, 1, 1.5, 0],
                  y: '-20%',
                  x: `+=${Math.random() * 40 - 20}px`
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "easeOut"
                }}
              />
            ))}
          </div>
        )}
        
        {/* Ambient particles always present */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={`ambient-${i}`}
              className="absolute w-1 h-1 bg-orange-200/40 rounded-full"
              style={{
                left: `${25 + i * 20}%`,
                top: `${30 + i * 15}%`
              }}
              animate={{
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.5, 1],
                y: [0, -10, 0]
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default FooterImg;