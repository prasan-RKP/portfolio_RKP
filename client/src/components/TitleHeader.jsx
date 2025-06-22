import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

const TitleHeader = ({ title, sub }) => {
  const titleRef = useRef(null);
  const subRef = useRef(null);
  const rippleRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      titleRef.current,
      {
        opacity: 0,
        y: 40,
        textShadow: "0px 0px 0px rgba(255,255,255,0)",
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.3,
        textShadow: "0px 0px 12px rgba(255,255,255,0.6)",
        ease: "power3.out",
      }
    );

    gsap.fromTo(
      subRef.current,
      {
        opacity: 0,
        y: -20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.1,
        ease: "power2.out",
      }
    );

    // Water ripple hover effect for title
    const titleElement = titleRef.current;
    if (titleElement) {
      titleElement.addEventListener('mouseenter', createRipple);
      titleElement.addEventListener('mousemove', createRipple);
      
      return () => {
        titleElement.removeEventListener('mouseenter', createRipple);
        titleElement.removeEventListener('mousemove', createRipple);
      };
    }
  }, []);

  const createRipple = (e) => {
    const rect = titleRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Create ripple element
    const ripple = document.createElement('div');
    ripple.style.position = 'absolute';
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.style.width = '0px';
    ripple.style.height = '0px';
    ripple.style.borderRadius = '50%';
    ripple.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
    ripple.style.border = '2px solid rgba(255, 255, 255, 0.6)';
    ripple.style.pointerEvents = 'none';
    ripple.style.transform = 'translate(-50%, -50%)';
    ripple.style.zIndex = '1';

    // Append to title container
    const container = titleRef.current.parentElement;
    container.style.position = 'relative';
    container.style.overflow = 'visible';
    container.appendChild(ripple);

    // Animate ripple expansion
    gsap.to(ripple, {
      width: '200px',
      height: '200px',
      backgroundColor: 'rgba(255, 255, 255, 0)',
      borderColor: 'rgba(255, 255, 255, 0)',
      duration: 0.8,
      ease: "power2.out",
      onComplete: () => {
        ripple.remove();
      }
    });

    // Secondary ripple for more depth
    setTimeout(() => {
      const ripple2 = document.createElement('div');
      ripple2.style.position = 'absolute';
      ripple2.style.left = `${x}px`;
      ripple2.style.top = `${y}px`;
      ripple2.style.width = '0px';
      ripple2.style.height = '0px';
      ripple2.style.borderRadius = '50%';
      ripple2.style.backgroundColor = 'rgba(64, 224, 255, 0.2)';
      ripple2.style.border = '1px solid rgba(64, 224, 255, 0.4)';
      ripple2.style.pointerEvents = 'none';
      ripple2.style.transform = 'translate(-50%, -50%)';
      ripple2.style.zIndex = '0';

      container.appendChild(ripple2);

      gsap.to(ripple2, {
        width: '300px',
        height: '300px',
        backgroundColor: 'rgba(64, 224, 255, 0)',
        borderColor: 'rgba(64, 224, 255, 0)',
        duration: 1.2,
        ease: "power2.out",
        onComplete: () => {
          ripple2.remove();
        }
      });
    }, 100);

    // Text wave effect on hover
    const chars = titleRef.current.innerText.split('');
    const originalText = titleRef.current.innerHTML;
    
    titleRef.current.innerHTML = chars
      .map((char, index) => `<span style="display: inline-block; transition: transform 0.3s ease ${index * 0.02}s">${char === ' ' ? '&nbsp;' : char}</span>`)
      .join('');

    const charSpans = titleRef.current.querySelectorAll('span');
    
    // Wave animation
    charSpans.forEach((span, index) => {
      gsap.to(span, {
        y: -10,
        duration: 0.4,
        delay: index * 0.03,
        ease: "power2.out",
        yoyo: true,
        repeat: 1,
      });
    });

    // Reset text after animation
    setTimeout(() => {
      titleRef.current.innerHTML = originalText;
    }, 1000);
  };

  return (
    <motion.div
      className="flex flex-col items-center gap-5"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div ref={subRef} className="hero-badge">
        <p>{sub}</p>
      </div>

      <div style={{ position: 'relative', overflow: 'visible' }}>
        <h2
          ref={titleRef}
          className="font-semibold md:text-5xl text-3xl text-center my-straw mt-4 pt-2.5 cursor-pointer select-none"
          style={{ 
            position: 'relative',
            zIndex: 2,
            transition: 'all 0.3s ease'
          }}
        >
          {title}
        </h2>
      </div>
    </motion.div>
  );
};

export default TitleHeader;