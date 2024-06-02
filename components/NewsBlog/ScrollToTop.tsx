"use client"
import { useState, useEffect } from 'react';
import { FaChevronUp } from 'react-icons/fa';

const ScrollToTopButton = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const showButtonThreshold = 200;
      setShowButton(scrollY > showButtonThreshold);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div
      className={`fixed top-20 right-1/2 translate-x-1/2 lg:top-[calc(100%-3.5rem)] lg:right-6 lg:translate-x-0 ${
        showButton ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      } transition-opacity duration-300`}
    >
      <button
        className="bg-black/50 hover:bg-black text-white font-bold p-2 rounded-full outline outline-[3px] outline-white"
        onClick={scrollToTop}
      >
        <FaChevronUp />
      </button>
    </div>
  );
};

export default ScrollToTopButton;
