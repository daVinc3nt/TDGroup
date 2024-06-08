"use client";
import { useState, useEffect } from "react";
import { FaChevronUp } from "react-icons/fa";

const ScrollToTopButton = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const showButtonThreshold = 200;
      setShowButton(scrollY > showButtonThreshold);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      className={`fixed top-[calc(100%-3.5rem)] right-6 ${showButton
        ? "opacity-100 pointer-events-auto"
        : "opacity-0 pointer-events-none"
        } transition-opacity duration-300 z-50 `}
    >
      <button
        className="bg-[#EE0033] hover:bg-red-600 text-white font-bold p-2 rounded-full border-2 border-white"
        onClick={scrollToTop}
      >
        <FaChevronUp />
      </button>
    </div>
  );
};

export default ScrollToTopButton;
