import { abilities } from "../constants";
import { motion } from "framer-motion";
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

const FeatureCards = () => (
  <div className="w-full padding-x-lg py-20 bg-gradient-to-b from-zinc-900 to-black">
    <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
      {abilities.map(({ imgPath, title, desc }, index) => (
        <motion.div
          key={title}
          className="rounded-3xl p-8 flex flex-col gap-4 relative group border border-zinc-700 bg-zinc-900 shadow-xl transition-all duration-300
            hover:shadow-purple-600/40 hover:bg-zinc-800"
          custom={index}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={cardVariants}
        >
          {/* Gradient Glow */}
          <div className="absolute inset-0 z-0 opacity-5 blur-3xl bg-gradient-to-r from-purple-500 via-indigo-600 to-blue-500 group-hover:opacity-30 transition-opacity duration-500"></div>

          <div className="z-10 size-16 flex items-center justify-center rounded-full bg-gradient-to-tr from-purple-600 via-indigo-700 to-blue-600 p-1">
            <div className="bg-zinc-800 p-2 rounded-full">
              <img src={imgPath} alt={title} className="w-10 h-10" />
            </div>
          </div>

          <h3 className="z-10 text-white text-2xl font-semibold mt-2 group-hover:text-purple-400 transition-colors duration-300 no-underline">
            {title}
          </h3>

          <p className="z-10 text-white/70 text-lg leading-relaxed no-underline my-janda">
            {desc}
          </p>

          {/* Removed the bottom progress bar */}
        </motion.div>
      ))}
    </div>
  </div>
);

export default FeatureCards;
