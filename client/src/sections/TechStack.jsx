import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import TitleHeader from "../components/TitleHeader";
import { techStackImgs } from "../constants";

const glowColors = [
  "0 0 20px hsl(120, 100%, 65%), 0 0 40px hsl(120, 100%, 55%)",        // green glow
  "0 0 20px hsl(0, 0%, 85%), 0 0 40px hsl(0, 0%, 75%)", // grey + white glow
  "0 0 20px hsl(210, 100%, 65%), 0 0 40px hsl(210, 100%, 55%)", // blue + white glow
  "0 0 20px hsl(90, 100%, 75%), 0 0 40px hsl(90, 100%, 65%)",         // light green glow
];

// Fiery background colors for dynamic effects
const fieryColors = [
  "linear-gradient(45deg, #ff6b35, #f7931e, #ff6b35, #ffaa00)",
  "linear-gradient(45deg, #ff0844, #ffb199, #ff0844, #ff6b9d)",
  "linear-gradient(45deg, #4ecdc4, #44a08d, #4ecdc4, #096a67)",
  "linear-gradient(45deg, #667eea, #764ba2, #667eea, #f093fb)",
  "linear-gradient(45deg, #f093fb, #f5576c, #f093fb, #4ecdc4)",
  "linear-gradient(45deg, #43e97b, #38f9d7, #43e97b, #667eea)",
];

const TechStack = () => {
  useGSAP(() => {
    // Initial entrance animation
    gsap.fromTo(
      ".tech-card",
      {
        y: 80,
        opacity: 0,
        scale: 0.8,
        rotationY: 180,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        rotationY: 0,
        duration: 1.2,
        ease: "back.out(1.7)",
        stagger: 0.15,
        scrollTrigger: {
          trigger: "#skills",
          start: "top center",
        },
      }
    );

    // Enhanced floating animation for each card
    techStackImgs.forEach((_, index) => {
      const card = `.tech-card:nth-child(${index + 1})`;
      
      // Main floating motion - more dramatic
      gsap.to(card, {
        y: -30,
        duration: 2.5 + Math.random() * 1, // Randomize duration for organic feel
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: index * 0.3,
      });

      // Subtle rotation while floating
      gsap.to(card, {
        rotation: 3,
        duration: 3 + Math.random() * 2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: index * 0.2,
      });

      // Image scale breathing effect
      gsap.to(`${card} img`, {
        scale: 1.1,
        duration: 2 + Math.random() * 1,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: index * 0.4,
      });

      // Subtle horizontal drift
      gsap.to(card, {
        x: Math.sin(index) * 15,
        duration: 4 + Math.random() * 2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: index * 0.5,
      });

      // 🔥 FIERY BACKGROUND EFFECTS 🔥
      const fieryBg = `${card} .fiery-background`;
      
      // Animated fiery gradient rotation
      gsap.to(fieryBg, {
        rotation: 360,
        duration: 8 + Math.random() * 4,
        ease: "none",
        repeat: -1,
        delay: index * 0.5,
      });

      // Pulsing fiery intensity
      gsap.to(fieryBg, {
        scale: 1.2,
        opacity: 0.8,
        duration: 1.5 + Math.random() * 1,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: index * 0.3,
      });

      // Fiery particle effect simulation
      gsap.to(`${card} .fire-particle-1`, {
        y: -20,
        x: Math.random() * 10 - 5,
        opacity: 0,
        scale: 0.5,
        duration: 2,
        ease: "power1.out",
        repeat: -1,
        delay: Math.random() * 2,
      });

      gsap.to(`${card} .fire-particle-2`, {
        y: -15,
        x: Math.random() * 8 - 4,
        opacity: 0,
        scale: 0.3,
        duration: 1.8,
        ease: "power1.out",
        repeat: -1,
        delay: Math.random() * 2 + 0.5,
      });

      gsap.to(`${card} .fire-particle-3`, {
        y: -25,
        x: Math.random() * 12 - 6,
        opacity: 0,
        scale: 0.7,
        duration: 2.2,
        ease: "power1.out",
        repeat: -1,
        delay: Math.random() * 2 + 1,
      });

      // Intense fiery glow pulse
      gsap.to(`${card} .fiery-glow`, {
        scale: 1.5,
        opacity: 0.6,
        duration: 1 + Math.random() * 0.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: index * 0.2,
      });
    });

    // Tech-specific color flows for each technology
    const techColors = {
      'React': '#61DAFB',
      'JavaScript': '#F7DF1E', 
      'MongoDB': '#47A248',
      'Node.js': '#339933',
      'Python': '#3776AB',
      'HTML': '#E34F26',
      'CSS': '#1572B6',
      'TypeScript': '#3178C6',
      'Vue': '#4FC08D',
      'Angular': '#DD0031',
      'Express': '#000000',
      'MySQL': '#4479A1',
      'PostgreSQL': '#336791',
      'Docker': '#2496ED',
      'AWS': '#FF9900',
      'Git': '#F05032',
    };

    // Enhanced hover effects with upward color flow
    const cards = document.querySelectorAll('.tech-card');
    cards.forEach((card, index) => {
      const techName = techStackImgs[index]?.name || '';
      const techColor = techColors[techName] || '#FF6B35';
      
      card.addEventListener('mouseenter', () => {
        // Card transformation
        gsap.to(card, {
          scale: 1.2,
          rotationY: 15,
          rotationX: 5,
          z: 100,
          duration: 0.5,
          ease: "power3.out",
        });

        // Create upward flowing effect
        gsap.to(`${card} .color-flow-1`, {
          y: -50,
          opacity: 0,
          scale: 1.5,
          duration: 0.8,
          ease: "power2.out",
        });

        gsap.to(`${card} .color-flow-2`, {
          y: -40,
          opacity: 0,
          scale: 1.3,
          duration: 0.9,
          ease: "power2.out",
          delay: 0.1,
        });

        gsap.to(`${card} .color-flow-3`, {
          y: -60,
          opacity: 0,
          scale: 1.7,
          duration: 1,
          ease: "power2.out",
          delay: 0.2,
        });

        // Intense glow with tech-specific color
        gsap.to(card, {
          boxShadow: `0 0 30px ${techColor}, 0 0 60px ${techColor}80, 0 20px 40px rgba(0,0,0,0.4)`,
          duration: 0.3,
        });

        // Enhanced fiery background with tech color
        gsap.to(`${card} .fiery-background`, {
          scale: 1.6,
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
        });

        // Success ripple effect
        gsap.fromTo(`${card} .success-ripple`, {
          scale: 0,
          opacity: 1,
        }, {
          scale: 3,
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
        });

        // Image enhancement
        gsap.to(`${card} img`, {
          scale: 1.3,
          filter: `brightness(1.2) drop-shadow(0 0 20px ${techColor})`,
          duration: 0.4,
          ease: "power2.out",
        });
      });

      card.addEventListener('mouseleave', () => {
        // Reset card
        gsap.to(card, {
          scale: 1,
          rotationY: 0,
          rotationX: 0,
          z: 0,
          duration: 0.5,
          ease: "power2.out",
        });
        
        gsap.to(card, {
          boxShadow: "0 0 0 transparent",
          duration: 0.4,
        });

        // Reset color flows
        gsap.set(`${card} .color-flow-1, ${card} .color-flow-2, ${card} .color-flow-3`, {
          y: 0,
          opacity: 0.8,
          scale: 1,
        });

        // Reset fiery background
        gsap.to(`${card} .fiery-background`, {
          scale: 1.2,
          opacity: 0.6,
          duration: 0.5,
          ease: "power2.out",
        });

        // Reset image
        gsap.to(`${card} img`, {
          scale: 1.1,
          filter: "brightness(1) drop-shadow(0 0 0 transparent)",
          duration: 0.4,
          ease: "power2.out",
        });
      });

      // Random pulse effect
      gsap.to(card, {
        scale: 1.05,
        duration: 0.8,
        ease: "power2.inOut",
        yoyo: true,
        repeat: 1,
        delay: Math.random() * 10 + 5,
        repeatDelay: Math.random() * 15 + 10,
      });
    });
  });

  return (
    <div id="skills" className="flex-center section-padding min-h-screen">
      <div className="w-full max-w-6xl px-5 md:px-10">
        <TitleHeader
          title="How I Serve You, With My Skills"
          sub="What is Inside mind's Store 🧠"
        />
        <div className="tech-grid grid grid-cols-2 md:grid-cols-4 gap-8 justify-center items-center perspective-1000">
          {techStackImgs.map((techStackIcon, index) => (
            <div
              key={index}
              className="card-border tech-card overflow-hidden group xl:rounded-full rounded-lg transition-all duration-500 cursor-pointer transform-gpu relative"
              style={{
                filter: `drop-shadow(0 0 0 transparent)`,
                transformStyle: 'preserve-3d',
              }}
            >
              {/* 🔥 FIERY BACKGROUND LAYERS 🔥 */}
              <div 
                className="fiery-background absolute inset-0 rounded-lg xl:rounded-full opacity-60 blur-sm"
                style={{
                  background: fieryColors[index % fieryColors.length],
                  backgroundSize: '200% 200%',
                  animation: `fieryMove 4s ease-in-out infinite`,
                }}
              />
              
              <div 
                className="fiery-glow absolute inset-0 rounded-lg xl:rounded-full opacity-40 blur-md"
                style={{
                  background: `radial-gradient(circle, ${fieryColors[index % fieryColors.length].split(',')[0].split('(')[1]}, transparent 70%)`,
                }}
              />

              {/* Success Ripple Effect */}
              <div className="success-ripple absolute inset-0 rounded-lg xl:rounded-full border-2 border-white opacity-0" />

              {/* Upward Color Flow Elements */}
              <div 
                className="color-flow-1 absolute bottom-8 left-1/2 w-3 h-3 rounded-full opacity-80 blur-sm"
                style={{
                  background: `radial-gradient(circle, ${Object.values({
                    'React': '#61DAFB',
                    'JavaScript': '#F7DF1E', 
                    'MongoDB': '#47A248',
                    'Node.js': '#339933',
                    'Python': '#3776AB',
                    'HTML': '#E34F26',
                    'CSS': '#1572B6',
                    'TypeScript': '#3178C6',
                    'Vue': '#4FC08D',
                    'Angular': '#DD0031',
                    'Express': '#000000',
                    'MySQL': '#4479A1',
                    'PostgreSQL': '#336791',
                    'Docker': '#2496ED',
                    'AWS': '#FF9900',
                    'Git': '#F05032',
                  })[index % 16] || '#FF6B35'}, transparent)`,
                }}
              />
              <div 
                className="color-flow-2 absolute bottom-6 left-1/3 w-2 h-2 rounded-full opacity-70 blur-sm"
                style={{
                  background: `radial-gradient(circle, ${Object.values({
                    'React': '#61DAFB',
                    'JavaScript': '#F7DF1E', 
                    'MongoDB': '#47A248',
                    'Node.js': '#339933',
                    'Python': '#3776AB',
                    'HTML': '#E34F26',
                    'CSS': '#1572B6',
                    'TypeScript': '#3178C6',
                    'Vue': '#4FC08D',
                    'Angular': '#DD0031',
                    'Express': '#000000',
                    'MySQL': '#4479A1',
                    'PostgreSQL': '#336791',
                    'Docker': '#2496ED',
                    'AWS': '#FF9900',
                    'Git': '#F05032',
                  })[index % 16] || '#FF6B35'}AA, transparent)`,
                }}
              />
              <div 
                className="color-flow-3 absolute bottom-10 right-1/3 w-4 h-4 rounded-full opacity-60 blur-sm"
                style={{
                  background: `radial-gradient(circle, ${Object.values({
                    'React': '#61DAFB',
                    'JavaScript': '#F7DF1E', 
                    'MongoDB': '#47A248',
                    'Node.js': '#339933',
                    'Python': '#3776AB',
                    'HTML': '#E34F26',
                    'CSS': '#1572B6',
                    'TypeScript': '#3178C6',
                    'Vue': '#4FC08D',
                    'Angular': '#DD0031',
                    'Express': '#000000',
                    'MySQL': '#4479A1',
                    'PostgreSQL': '#336791',
                    'Docker': '#2496ED',
                    'AWS': '#FF9900',
                    'Git': '#F05032',
                  })[index % 16] || '#FF6B35'}66, transparent)`,
                }}
              />

              {/* Fire Particles */}
              <div className="fire-particle-1 absolute bottom-4 left-1/2 w-1 h-1 bg-orange-400 rounded-full opacity-80 blur-sm" />
              <div className="fire-particle-2 absolute bottom-6 left-1/3 w-0.5 h-0.5 bg-red-400 rounded-full opacity-70 blur-sm" />
              <div className="fire-particle-3 absolute bottom-5 right-1/3 w-1.5 h-1.5 bg-yellow-400 rounded-full opacity-60 blur-sm" />

              <div className="tech-card-animated-bg" />
              <div className="tech-card-content relative z-10">
                <div className="tech-icon-wrapper transition-transform duration-500 transform-gpu">
                  <img
                    src={techStackIcon.imgPath}
                    alt={techStackIcon.name}
                    className="w-28 h-28 object-contain transition-all duration-500 transform-gpu relative z-20"
                    style={{ willChange: 'transform' }}
                  />
                </div>
                <div className="padding-x w-full text-center">
                  <p className="font-semibold text-white text-sm md:text-base relative z-20">
                    {techStackIcon.name}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fieryMove {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
      `}</style>
    </div>
  );
};

export default TechStack;

{/* {techStackIcons.map((techStackIcon) => (
            <div
              key={techStackIcon.name}
              className="card-border tech-card overflow-hidden group xl:rounded-full rounded-lg"
            >
              // for 3d card hover
              <div className="tech-card-animated-bg" />
              <div className="tech-card-content">
                
                <div className="tech-icon-wrapper">
                  <TechIconCardExperience model={techStackIcon} />
                </div>
               
                <div className="padding-x w-full">
                  
                  <p className="my-mayan">{techStackIcon.name}</p>
                </div>
              </div>
            </div>
          ))} */}
