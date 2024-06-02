import React from "react";

const ButtonLink = ({ href, buttonText }) => {

    const handleClick = () => {
        const targetElement = document.querySelector(href);
        if (targetElement) {
        const offsetTop = targetElement.offsetTop;
        window.scrollTo({
            top: offsetTop - 150,
            behavior: "smooth",
        });
        }
    };

    return (
    <button
      className="relative inline-flex items-center justify-center p-4 px-6 py-3 mb-2 overflow-hidden font-medium text-white transition duration-300 ease-out border-2 border-white rounded-full shadow-md group mx-2 max-h-12"
      onClick={handleClick}
    >
      <span className="absolute inset-0 flex items-center justify-center w-full h-full text-black duration-300 -translate-x-full bg-white group-hover:translate-x-0 ease">
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M14 5l7 7m0 0l-7 7m7-7H3"
          ></path>
        </svg>
      </span>
      <span className="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease text-sm">
        {buttonText}
      </span>
      <span className="relative invisible text-sm">{buttonText}</span>
    </button>
  );
};

export default ButtonLink;
