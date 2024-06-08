'use client'
import { useMotionValue, useTransform, animate, motion, useAnimation, useInView } from "framer-motion";
import ButtonLink from "./Sec1ChildComponent/ButtonLink";
import { useEffect, useRef, useState } from "react";
import CursorBlinker from "./Sec1ChildComponent/CursorBlinker";
import { Spotlight } from "../ui/Spotlight";
import { FiSearch } from "react-icons/fi";
const NewsBlogSec1 = ({ search, setSearch }) => {
  const textIndex = useMotionValue(0);
  const texts = [
    'Tin tức & sự kiện',
  ];
  const baseText = useTransform(textIndex, (latest) => texts[latest] || "");
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const displayText = useTransform(rounded, (latest) =>
    baseText.get().slice(0, latest)
  );
  const updatedThisRound = useMotionValue(true);
  const refSec1 = useRef(null);
  const isInView = useInView(refSec1, { once: true });
  const mainControls = useAnimation();
  const slideControls = useAnimation();
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleButtonClick = () => {
    const heightInput = document.getElementById("posts");
    if (heightInput) {
      const elementPosition = heightInput.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - 100; // Adjust scroll position by -100px

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };
  useEffect(() => {
    animate(count, 180, {
      type: "tween",
      duration: 5,
      ease: "easeIn",
      repeat: Infinity,
      repeatType: "reverse",
      repeatDelay: 1,
      onUpdate(latest) {
        if (updatedThisRound.get() === true && latest > 0) {
          updatedThisRound.set(false);
        } else if (updatedThisRound.get() === false && latest === 0) {
          if (textIndex.get() === texts.length - 1) {
            textIndex.set(0);
          } else {
            textIndex.set(textIndex.get() + 1);
          }
          updatedThisRound.set(true);
        }
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const handleDocumentClick = (event: any) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsSearchFocused(false);
      } else setIsSearchFocused(true);
    };

    document.addEventListener("mousedown", handleDocumentClick);

    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
    };
  }, []);

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible")
      slideControls.start("visible")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInView])

  return (
    <>
      <div className="sm:px-[4.5rem] px-2 lg:px-[5.5rem] pt-20 h-[calc(3/4*100dvh)] flex relative w-full overflow-clip">
        <div
          className="h-[calc(3/4*100dvh)] w-full bg-grid-red-300/[0.1]
       absolute top-0 left-0 flex items-center justify-center overflow-clip z-0"
        >
          <div
            // change the bg to bg-black-100, so it matches the bg color and will blend in
            className="absolute pointer-events-none inset-0 flex items-center justify-center
        [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"
          />
        </div>
        <div>
          <Spotlight
            className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen"
            fill="white"
          />
          <Spotlight
            className="h-[80vh] w-[50vw] top-10 left-full"
            fill="red"
          />
          <Spotlight className="left-80 top-28 h-[80vh] w-[50vw]" fill="pink" />
        </div>
        <motion.section
          ref={refSec1}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          initial="hidden"
          animate={mainControls}
          transition={{ duration: .7, delay: .25 }}
          className="relative p-4 rounded-3xl h-full w-full flex flex-col justify-center gap-4 z-10">
          <div className="flex flex-col w-full justify-center">
            <span className="self-center pb-4 text-center">
              <motion.span className="font-bold whitespace-nowrap text-4xl md:text-6xl lg:pt-8 text-gray-800">
                {displayText}
              </motion.span>
              <CursorBlinker />
            </span>
            <div className="relative pb-4">
              <div className="relative font-extralight text-md sm:text-xl lg:text-2xl text-center text-gray-800">
                Nơi cập nhật thông tin, tin tức và sự kiện liên quan đến TDGroup
              </div>
            </div>
          </div>
          <div className="h-14 p-1 flex justify-center">
            <div
              ref={containerRef}
              className={`relative flex border-2 transition-all transform duration-500 h-full items-center rounded-full text-navy-700 w-full md:w-2/3 ${isSearchFocused ? "border-gray-600 bg-white" : "bg-transparent border-gray-300"}`}
            >
              <motion.button
                onClick={handleButtonClick}
                className={`absolute text-xl h-8 w-8 px-2 flex justify-center rounded-full place-items-center transition-all duration-500  ${isSearchFocused ? "bg-red-500 shadow-sm" : ""
                  } transform`}
                initial={{ left: 2 }}
                animate={{
                  left: isSearchFocused ? "calc(100% - 2rem - 6px)" : "4px",
                }}
              >
                <FiSearch
                  className={`h-4 w-4 ${isSearchFocused ? "text-white" : "text-gray-600"
                    }`}
                />
              </motion.button>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                placeholder={"Tìm kiếm..."}
                className={`block h-full w-full rounded-full text-sm text-black font-medium bg-transparent text-navy-700 outline-none placeholder:!text-gray-600 transition-all duration-500 ${isSearchFocused ? "pl-4 pr-12" : "pl-10"
                  }`}
              />
            </div>
          </div>
        </motion.section>
      </div>
    </>
  )
}

export default NewsBlogSec1;