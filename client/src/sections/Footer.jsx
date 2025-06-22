import { socialImgs } from "../constants";
import { motion, useAnimation } from "framer-motion";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="flex flex-col justify-center">
          <p>Terms & Conditions</p>
        </div>

        <div className="socials flex gap-6 items-center justify-center py-4">
  {socialImgs.map((socialImg, index) => (
    <motion.div
      key={index}
      className="icon"
      whileHover={{
        scale: 1.2,
        rotate: [0, 15, -10, 0],
        filter: [
          "drop-shadow(0 0 0px #fff)",
          "drop-shadow(0 0 8px #00ffcc)",
          "drop-shadow(0 0 12px #00ffcc)",
          "drop-shadow(0 0 0px #fff)",
        ],
      }}
      whileTap={{ scale: 0.9, rotate: 0 }}
      transition={{
        duration: 0.6,
        ease: "easeInOut",
        repeat: 0,
      }}
    >
      <a
        href={socialImg.link}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        <img
          src={socialImg.imgPath}
          alt={`${socialImg.name} icon`}
          className="w-7 h-7 sm:w-8 sm:h-8 hover:cursor-pointer"
        />
      </a>
    </motion.div>
  ))}
</div>


        <div className="flex flex-col justify-center">
          <p className="text-center md:text-end text-sm text-white-50">
            © {new Date().getFullYear()} Prasan. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
