import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import AnimatedCounter from "../components/AnimatedCounter";
import Button from "../components/Button";
import { words } from "../constants";
import HeroRightSide from "../components/models/hero_models/HeroRightSide";
import "../stylesheets/myCustom.css";
import ChaiButton from "../components/ChaiButton";
// Helper to wrap letters with colorful animation spans
const wrapLetters = (text) =>
  text.split("").map((char, index) => {
    const isFlipLetter =
      char.toLowerCase() === "i" || char.toLowerCase() === "e";
    const className = isFlipLetter
      ? `reveal-letter inline-block opacity-0 translate-y-2 font-bold flip-${char.toLowerCase()}`
      : "reveal-letter inline-block opacity-0 translate-y-2 font-bold";

    return (
      <span key={index} className={className}>
        {char}
      </span>
    );
  });

const Hero = () => {
  useGSAP(() => {
    const tl = gsap.timeline({
      defaults: { ease: "back.out(1.7)", duration: 1 },
    });

    tl.from(".anim-shaping", { y: 80, scale: 0.9, opacity: 0 })
      .from(".anim-projects", { y: 60, opacity: 0 }, "-=0.6")
      .from(".anim-results", { y: 60, opacity: 0 }, "-=0.5")
      .from(".anim-paragraph", { y: 40, opacity: 0 }, "-=0.4");

    gsap.fromTo(
      ".anim-projects .reveal-letter",
      { opacity: 0, y: 20, scale: 0.8 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.4,
        ease: "power2.out",
        stagger: 0.05,
        color: "#00ffcc",
        onUpdate: () => {
          const letters = document.querySelectorAll(
            ".anim-projects .reveal-letter"
          );
          letters.forEach((el, i) => {
            const hue = 220 + i * 15;
            el.style.color = `hsl(${hue}, 100%, 70%)`;
          });
        },
      }
    );

    gsap.fromTo(
      ".anim-results .reveal-letter",
      { opacity: 0, y: 20, scale: 0.8 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.4,
        ease: "power2.out",
        stagger: 0.05,
        delay: 0.5,
        color: "#ff6b6b",
        onUpdate: () => {
          const letters = document.querySelectorAll(
            ".anim-results .reveal-letter"
          );
          letters.forEach((el, i) => {
            const hue = 320 + i * 10;
            el.style.color = `hsl(${hue}, 100%, 70%)`;
          });
        },
      }
    );

    // Flip animation
    const createFlipLoop = () => {
      const flipTl = gsap.timeline();
      flipTl
        .to(".flip-i, .flip-e", {
          rotationY: 360,
          duration: 0.8,
          ease: "power2.inOut",
          stagger: 0.1,
          transformOrigin: "center center",
        })
        .set(".flip-i, .flip-e", { rotationY: 0 })
        .call(createFlipLoop, null, 3);
    };

    gsap.delayedCall(2, createFlipLoop);
  }, []);

  return (
   <section id="hero" className="relative overflow-hidden">
      {/* 🔥 Integrated background image on left side */}
      <div className="absolute top-0 left-0 z-10">
        <img src="/images/bg.png" alt="" />
      </div>

      {/* Mobile Layout - FIXED */}
      <div className="xl:hidden">
        <header className="relative z-10 mt-32 px-5 md:px-20 py-10">
          <div className="flex flex-col gap-7">
            <div className="hero-text">
              <h1 className="anim-shaping">
                Shaping
                <span className="slide">
                  <span className="wrapper">
                    {words.map((word, index) => (
                      <span
                        key={index}
                        className="flex items-center gap-1 pb-2"
                      >
                        <img
                          src={word.imgPath}
                          alt="person"
                          className="size-7 p-1 rounded-full bg-white-50"
                        />
                        <span className="my-emig">{word.text}</span>
                      </span>
                    ))}
                  </span>
                </span>
              </h1>
              <h2 className="anim-projects">
                {wrapLetters("into Creative Builds")}
              </h2>
              <h2 className="anim-results">
                {wrapLetters("that Empower People")}
              </h2>
            </div>

            <p className="text-white-50 relative z-10 pointer-events-none anim-paragraph">
               I'm Prasan and passionate about transforming ideas into elegant,
              functional code.
            </p>

            {/* FIXED: Mobile button container */}
            <div className="flex flex-col gap-4 w-full">
              <Button
                text="See My Work"
                className="w-full max-w-xs h-12 my-straw"
                id="counter"
              />
              {/* ADD ChaiButton for mobile too */}
              <ChaiButton
                text="Buy a Chai @25"
                className="w-full max-w-xs h-12 my-straw"
                id="mycounter"
              />
            </div>
          </div>
        </header>

        <figure className="px-5 md:px-20 mb-10">
          <div className="w-full h-[40vh] md:h-[50vh] relative">
            <HeroRightSide />
          </div>
        </figure>
      </div>

      {/* Desktop Layout - Keep existing code */}
      <div className="hero-layout hidden xl:flex">
        <header className="flex flex-col justify-center w-full px-20">
          <div className="flex flex-col gap-7">
            <div className="hero-text">
              <h1 className="anim-shaping">
                Shaping
                <span className="slide">
                  <span className="wrapper">
                    {words.map((word, index) => (
                      <span
                        key={index}
                        className="flex items-center gap-3 pb-2"
                      >
                        <img
                          src={word.imgPath}
                          alt="person"
                          className="size-12 p-2 rounded-full bg-white-50"
                        />
                        <span className="my-emig">{word.text}</span>
                      </span>
                    ))}
                  </span>
                </span>
              </h1>
              <h1 className="anim-projects">
                {wrapLetters("into Creative Builds")}
              </h1>
              <h1 className="anim-results">
                {wrapLetters("that Empower People")}
              </h1>
            </div>

            <p className="text-white-50 text-xl relative z-10 pointer-events-none anim-paragraph">
              I'm Prasan and passionate about transforming ideas into elegant,
              functional code.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-self-end gap-4 sm:gap-6">
              <Button
                text="See My Work"
                className="w-80 h-16 my-straw"
                id="counter"
              />
              <ChaiButton
                text="Buy a Chai @25/-"
                className="w-80 h-16 my-straw"
                id="mycounter"
              />
            </div>
          </div>
        </header>

        <figure>
          <div className="hero-3d-layout">
            <HeroRightSide />
          </div>
        </figure>
      </div>

      <AnimatedCounter />
    </section>
  );
};

export default Hero;
