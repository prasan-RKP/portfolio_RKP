import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const ShowProject = () => {
  const sectionRef = useRef(null);
  const rydeRef = useRef(null);
  const libraryRef = useRef(null);
  const ycDirectoryRef = useRef(null);

  useGSAP(() => {
    // Animation for the main section
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.5 }
    );

    // Animations for each app showcase
    const cards = [rydeRef.current, libraryRef.current, ycDirectoryRef.current];
    cards.forEach((card, index) => {
      gsap.fromTo(
        card,
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.3 * (index + 1),
          scrollTrigger: {
            trigger: card,
            start: "top bottom-=100",
          },
        }
      );

      // Add hover animations using GSAP
      const imageWrapper = card.querySelector(".image-wrapper");
      const textContent = card.querySelector(".text-content, h2");

      card.addEventListener("mouseenter", () => {
        gsap.to(imageWrapper, {
          scale: 1.05,
          duration: 0.4,
          ease: "power2.out",
        });

        if (textContent) {
          gsap.to(textContent, {
            y: -5,
            duration: 0.3,
            ease: "power2.out",
          });
        }
      });

      card.addEventListener("mouseleave", () => {
        gsap.to(imageWrapper, {
          scale: 1,
          duration: 0.4,
          ease: "power2.out",
        });

        if (textContent) {
          gsap.to(textContent, {
            y: 0,
            duration: 0.3,
            ease: "power2.out",
          });
        }
      });
    });
  }, []);

  // Framer Motion variants for enhanced hover effects
  const projectVariants = {
    hover: {
      y: -8,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  const imageVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  const textVariants = {
    hover: {
      color: "#60A5FA", // Light blue color
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <div id="work" ref={sectionRef} className="app-showcase">
      <div className="w-full">
        <div className="showcaselayout">
          {/* First Project with enhanced hover effects */}
          <motion.div
            ref={rydeRef}
            className="first-project-wrapper group cursor-pointer relative overflow-hidden rounded-2xl"
            variants={projectVariants}
            whileHover="hover"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            {/* Animated background gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <motion.div
              className="image-wrapper relative overflow-hidden rounded-xl"
              variants={imageVariants}
            >
              <img
                src="/mern/proj1.png"
                alt="Ryde App Interface"
                className="transition-all duration-500 group-hover:brightness-110"
              />
              {/* Subtle shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </motion.div>

            <div className="text-content relative z-10">
              <motion.h2
                variants={textVariants}
                className="transition-all duration-300 group-hover:text-shadow-lg"
              >
                Seamless Shopping Made Effortless with a Powerful, User-Friendly
                E-commerce Platform.
              </motion.h2>
              <motion.p
                className="text-white-50 md:text-xl transition-all duration-300 group-hover:text-white-70"
                variants={textVariants}
              >
                Explore, save, and shop effortlessly with features like smart
                cart management, wishlisting, and intuitive UI powered by a
                full-stack MERN solution.
              </motion.p>
            </div>

            {/* Floating particles effect on hover */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-0 group-hover:opacity-60 transition-all duration-1000"
                  style={{
                    left: `${20 + i * 15}%`,
                    top: `${20 + (i % 3) * 20}%`,
                    animationDelay: `${i * 0.2}s`,
                  }}
                ></div>
              ))}
            </div>
          </motion.div>

          <div className="project-list-wrapper overflow-hidden">
            {/* Library Project */}
            <motion.div
              className="project group cursor-pointer relative overflow-hidden rounded-xl"
              ref={libraryRef}
              variants={projectVariants}
              whileHover="hover"
              style={{
                background:
                  "linear-gradient(135deg, rgba(134,132,132,0.1) 0%, rgba(134,132,132,0.05) 100%)",
                backdropFilter: "blur(5px)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gray-500/10 via-slate-500/5 to-zinc-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <motion.div
                className="image-wrapper bg-[#868484] relative overflow-hidden rounded-lg"
                variants={imageVariants}
              >
                <img
                  src="/mern/proj3.png"
                  alt="Library Management Platform"
                  className="transition-all duration-500 group-hover:brightness-110 group-hover:contrast-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.div>

              <motion.h2
                variants={textVariants}
                className="relative z-10 transition-all duration-300 group-hover:transform group-hover:translate-x-2"
              >
                The Private Communication Hub -Start Chat
              </motion.h2>

              {/* Subtle border glow effect */}
              <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-gray-400/30 transition-all duration-300"></div>
            </motion.div>

            {/* YC Directory Project */}
            <motion.div
              className="project group cursor-pointer relative overflow-hidden rounded-xl"
              ref={ycDirectoryRef}
              variants={projectVariants}
              whileHover="hover"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,231,235,0.1) 0%, rgba(255,231,235,0.05) 100%)",
                backdropFilter: "blur(5px)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-rose-500/5 to-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <motion.div
  className="image-wrapper bg-[#FFE7EB] relative overflow-hidden rounded-lg flex items-center justify-center"
  variants={imageVariants}
>
  {/* <img 
    src="/images/project3.png" 
    alt="YC Directory App"
    className="transition-all duration-500 group-hover:brightness-110 group-hover:saturate-110"
  /> */}
  <h3 className=" hover:text-slate-800 text-center text-2xl font-bold text-gray-800 py-10">
    Project 3 Coming Soon ...
  </h3>
  <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
</motion.div>

              {/* <motion.h2 
                variants={textVariants}
                className="relative z-10 transition-all duration-300 group-hover:transform group-hover:translate-x-2"
              >
               Project 3 Coming Soon ...
              </motion.h2> */}

              {/* Animated border */}
              <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-pink-400/30 transition-all duration-300"></div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowProject;
