import { Canvas } from '@react-three/fiber';
import { Float, Html, OrbitControls } from '@react-three/drei';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Define your tech images with their paths and glow colors
const techImages = [
  { name: 'MongoDB', img: '/mern/MongoDB.png', glow: 'shadow-[0_0_15px_15px_#00ff00]' },
  { name: 'Express', img: '/mern/Express.png', glow: 'shadow-[0_0_15px_15px_#cccccc]' },
  { name: 'ReactJS', img: '/mern/React.png', glow: 'shadow-[0_0_15px_15px_#00ffff]' },
  { name: 'NodeJS', img: '/mern/Nodejs.png', glow: 'shadow-[0_0_15px_15px_#66ff66]' },
];

/**
 * FloatingImage Component
 * Renders a single tech image within a floating 3D container.
 * The image is now explicitly placed inside a circular div container.
 */
const FloatingImage = ({ img, position, name, glow }) => {
  const [hovered, setHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1280); // xl breakpoint
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMouseEnter = () => {
    if (!isMobile) {
      setHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      setHovered(false);
    }
  };

  return (
    <Float speed={2.5} rotationIntensity={0.4} floatIntensity={2} position={position}>
      <Html center>
        <div className="flex flex-col items-center">
          {/* Circular container for the image - now a motion.div */}
          <motion.div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={`
              transition-all duration-300
              w-16 h-16 md:w-20 md:h-20 xl:w-28 xl:h-28
              rounded-full border border-white bg-white
              flex items-center justify-center overflow-hidden
              ${hovered && !isMobile ? glow : 'shadow-lg'}
              ${isMobile ? 'pointer-events-none' : 'cursor-pointer'}
            `}
            // Framer Motion effects - only on desktop
            whileHover={!isMobile ? { scale: 1.15 } : {}}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            {/* Image itself, taking full width/height of the container with added padding */}
            <img
              src={img}
              alt={name}
              className="w-full h-full object-contain p-2 xl:p-3"
            />
          </motion.div>
          <span className="text-white text-xs md:text-sm mt-2 font-semibold drop-shadow-lg">
            {name}
          </span>
        </div>
      </Html>
    </Float>
  );
};

/**
 * HeroRightSide Component
 * Displays multiple FloatingImage components arranged in a circle.
 */
const HeroRightSide = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1280); // xl breakpoint
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Adjust radius and positioning based on screen size
  const radius = isMobile ? 1.8 : 2.2;
  const centerYOffset = isMobile ? -0.3 : -0.8;
  const cameraPosition = isMobile ? [0, 0, 8] : [0, 0, 12];
  const fov = isMobile ? 50 : 45;

  return (
    <Canvas 
      camera={{ position: cameraPosition, fov: fov }} 
      className="w-full h-full"
      style={{ pointerEvents: isMobile ? 'none' : 'auto' }}
    >
      {/* Ambient light to illuminate all objects equally */}
      <ambientLight intensity={1} />
      {/* OrbitControls for interactivity, auto-rotating for a dynamic look */}
      <OrbitControls 
        enableZoom={false} 
        autoRotate 
        autoRotateSpeed={1}
        enabled={!isMobile} // Disable controls on mobile
      />

      {/* Map through techImages to render each FloatingImage */}
      {techImages.map((item, index) => {
        // Calculate position in a circle
        const angle = (index / techImages.length) * 2 * Math.PI;
        const x = radius * Math.cos(angle);
        const y = radius * Math.sin(angle) + centerYOffset;

        return (
          <FloatingImage
            key={index}
            img={item.img}
            name={item.name}
            glow={item.glow}
            position={[x, y, 0]}
          />
        );
      })}
    </Canvas>
  );
};

export default HeroRightSide;