// ChaiButton.jsx - Perfect structure matching original design
import React from "react";
import { PiCoffee } from "react-icons/pi";
import "../stylesheets/chai.css";
import { toast } from "sonner";

const ChaiButton = ({ text, className, id }) => {
  const handleClick = (e) => {
    e.preventDefault();
    
    toast.info('Feature Coming Soon...')

    const target = document.getElementById("mycounter");
    if (target && id) {
      const offset = window.innerHeight * 0.15;
      const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <a 
      onClick={handleClick} 
      className={`${className ?? ""} chai-wrapper element`}
      href="#"
      role="button"
      aria-label={text}
    >
      <div className="chai-button">
        <div className="chai-bg-circle" />
        <p className="chai-text">{text}</p>
        <div className="chai-icon-wrapper">
          <PiCoffee className="chai-icon" />
        </div>
      </div>
    </a>
  );
};

export default ChaiButton;