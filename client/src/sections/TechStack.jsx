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
    });

    // Mouse follow effect for extra interactivity
    const cards = document.querySelectorAll('.tech-card');
    cards.forEach((card, index) => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          scale: 1.15,
          rotationY: 10,
          z: 50,
          duration: 0.4,
          ease: "power2.out",
        });
        
        // Enhanced glow on hover
        gsap.to(card, {
          boxShadow: `${glowColors[index % glowColors.length]}, 0 10px 30px rgba(0,0,0,0.3)`,
          duration: 0.3,
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          scale: 1,
          rotationY: 0,
          z: 0,
          duration: 0.4,
          ease: "power2.out",
        });
        
        gsap.to(card, {
          boxShadow: "0 0 0 transparent",
          duration: 0.3,
        });
      });

      // Random pulse effect
      gsap.to(card, {
        scale: 1.05,
        duration: 0.8,
        ease: "power2.inOut",
        yoyo: true,
        repeat: 1,
        delay: Math.random() * 10 + 5, // Random delay between 5-15 seconds
        repeatDelay: Math.random() * 15 + 10, // Random repeat delay
      });
    });
  });

  return (
    <div id="skills" className="flex-center section-padding min-h-screen">
      <div className="w-full max-w-6xl px-5 md:px-10">
        <TitleHeader
          title="How I Serve You, With My Skills"
          sub="What is Inside mind's Pocket 🧠"
        />
        <div className="tech-grid grid grid-cols-2 md:grid-cols-4 gap-8 justify-center items-center perspective-1000">
          {techStackImgs.map((techStackIcon, index) => (
            <div
              key={index}
              className="card-border tech-card overflow-hidden group xl:rounded-full rounded-lg transition-all duration-500 cursor-pointer transform-gpu"
              style={{
                filter: `drop-shadow(0 0 0 transparent)`,
                transformStyle: 'preserve-3d',
              }}
            >
              <div className="tech-card-animated-bg" />
              <div className="tech-card-content relative">
                <div className="tech-icon-wrapper transition-transform duration-500 transform-gpu">
                  <img
                    src={techStackIcon.imgPath}
                    alt={techStackIcon.name}
                    className="w-28 h-28 object-contain transition-all duration-500 transform-gpu"
                    style={{ willChange: 'transform' }}
                  />
                </div>
                <div className="padding-x w-full text-center">
                  <p className="font-semibold text-white text-sm md:text-base">
                    {techStackIcon.name}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
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
