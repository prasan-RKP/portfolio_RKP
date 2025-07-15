import { useState, useEffect } from "react";
import { navLinks } from "../constants";
import { motion } from "framer-motion";
import '../stylesheets/myCustom.css';

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const colors = ["#FF9933", "#FFFFFF", "#138808"]; // Saffron, White, Green
  const name = "Prasan RKP";

  const getColorByIndex = (i) => {
    if (i <= 2) return colors[0];
    if (i <= 5) return colors[1];
    return colors[2];
  };

  return (
    <header className={`navbar ${scrolled ? "scrolled" : "not-scrolled"}`}>
      <div className="inner flex items-center justify-between px-6 py-4">

        {/* Tricolor Animated Name */}
        <motion.a
          href="#hero"
          className="logo cursor-pointer select-none text-2xl font-bold flex"
          initial="hidden"
          animate="visible"
        >
          {[...name].map((char, i) => {
            const color = getColorByIndex(i);
            return (
              <motion.span
                className="my-straw"
                key={i}
                style={{ color }}
                variants={{
                  hidden: { y: 40, opacity: 0 },
                  visible: {
                    y: 0,
                    opacity: 1,
                    transition: {
                      delay: i * 0.1,
                      type: "spring",
                      stiffness: 500,
                      damping: 30,
                    },
                  },
                }}
                whileHover={{
                  scale: 1.2,
                  textShadow: `0 0 8px ${color}, 0 0 16px ${color}`,
                  transition: {
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                  },
                }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            );
          })}
        </motion.a>

        {/* Navigation Links with Animated Hover */}
        <nav className="desktop my-chick">
          <ul className="flex gap-6 nav-hover-list">
            {navLinks.map(({ link, name }, index) => (
              <li key={name} className={`hover-item`}>
                <a href={link}>
                  <span className="actual-text">&nbsp;{name}&nbsp;</span>
                  <span className="hover-text" aria-hidden="true">&nbsp;{name}&nbsp;</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact Button */}
        <a href="#contact" className="contact-btn group">
          <motion.div
            className="inner cursor-pointer px-6 py-3 rounded-lg bg-gray-800 text-white select-none"
            whileHover={{
              scale: 1.05,
              boxShadow: `
                0 0 8px 2px #00fff7,
                0 0 12px 6px #ff00ff,
                0 0 20px 8px #ffffff,
                0 0 30px 12px #00fff7,
                0 0 40px 16px #ff00ff
              `,
              textShadow: `
                0 0 6px #00fff7,
                0 0 8px #ff00ff,
                0 0 12px #ffffff
              `,
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <span className="font-semibold tracking-wide my-mayan">Let’s connect</span>
          </motion.div>
        </a>
      </div>
    </header>
  );
};

export default NavBar;
