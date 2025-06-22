// Landing.jsx
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from 'gsap/all';
import "../stylesheets/landing.css"; // We'll extract your styles here

gsap.registerPlugin(ScrollTrigger);

const Landing = () => {
  const wrapperRef = useRef(null);
  const imageRef = useRef(null);
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top top",
            end: "+=150%",
            scrub: true,
            pin: true,
            markers: true,
          },
        })
        .to(imageRef.current, {
          scale: 2,
          z: 350,
          transformOrigin: "center center",
          ease: "power1.inOut",
        })
        .to(
          heroRef.current,
          {
            scale: 1.1,
            transformOrigin: "center center",
            ease: "power1.inOut",
          },
          "<"
        );
    }, wrapperRef);

    return () => ctx.revert(); // Cleanup
  }, []);

  return (
    <div className="wrapper" ref={wrapperRef}>
      <div className="content">
        <section className="section hero" ref={heroRef}></section>
        <section className="section gradient-purple"></section>
        <section className="section gradient-blue"></section>
      </div>
      <div className="image-container">
        <img
          ref={imageRef}
          src="https://assets-global.website-files.com/63ec206c5542613e2e5aa784/643312a6bc4ac122fc4e3afa_main%20home.webp"
          alt="Main Visual"
        />
      </div>
    </div>
  );
};

export default Landing;
