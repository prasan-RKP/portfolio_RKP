import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

import { counterItems } from "../constants";

gsap.registerPlugin(ScrollTrigger);

const AnimatedCounter = () => {
  const counterRef = useRef(null);
  const countersRef = useRef([]);

  useGSAP(() => {
    countersRef.current.forEach((counter, index) => {
      const numberElement = counter.querySelector(".counter-number");
      const item = counterItems[index];

      gsap.set(numberElement, { innerText: "0" });

      gsap.to(numberElement, {
        innerText: item.value,
        duration: 2.5,
        ease: "power2.out",
        snap: { innerText: 1 },
        scrollTrigger: {
          trigger: "#counter",
          start: "top center",
        },
        onUpdate: () => {
          numberElement.style.color = "#f8f9fa";
          numberElement.style.textShadow = "0 0 8px rgba(255,255,255,0.8), 0 0 12px rgba(200,200,200,0.6)";
        },
        onComplete: () => {
          numberElement.textContent = `${item.value}${item.suffix}`;
        },
      });
    }, counterRef);
  }, []);

  return (
    <div
      id="counter"
      ref={counterRef}
      className="padding-x-lg xl:mt-0 mt-32 bg-gradient-to-b from-black via-zinc-900 to-black py-20 rounded-xl shadow-2xl shadow-zinc-800"
    >
      <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {counterItems.map((item, index) => (
          <div
            key={index}
            ref={(el) => el && (countersRef.current[index] = el)}
            className="bg-zinc-800 hover:bg-zinc-700 transition-colors duration-300 rounded-3xl p-10 flex flex-col justify-center items-center group relative overflow-hidden shadow-md shadow-zinc-700 border border-zinc-700 hover:border-cyan-400"
          >
            <div className="absolute inset-0 opacity-10 blur-2xl bg-gradient-to-r from-cyan-400 via-pink-500 to-yellow-400 z-0 animate-pulse"></div>
            <div className="counter-number relative z-10 text-white text-5xl font-extrabold mb-2 tracking-wide group-hover:scale-110 transition-transform duration-300">
              0{item.suffix}
            </div>
            <div className="relative z-10 text-zinc-300 text-lg font-medium group-hover:text-cyan-400 transition-colors duration-300">
              {item.label}
            </div>
            <div className="w-full h-1 mt-4 bg-gradient-to-r from-cyan-400 to-pink-500 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnimatedCounter;
