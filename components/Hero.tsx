import React from "react";
import { FaLocationArrow } from "react-icons/fa6";
import { motion } from "framer-motion";
import Image from "next/image";
import "react-multi-carousel/lib/styles.css";
import MagicButton from "./MagicButton";
import { Spotlight } from "./ui/Spotlight";
import { TextGenerateEffect } from "./ui/TextGenerateEffect";
import Carousel from "react-multi-carousel";
import { Player } from "@lottiefiles/react-lottie-player";
const Hero = () => {
  const handleButtonClick = () => {
    const heightInput = document.getElementById("career");
    if (heightInput) {
      const elementPosition = heightInput.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - 150; // Adjust scroll position by -100px

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };
  return (
    <div className="pb-20 pt-36 h-dvh flex justify-end overflow-clip">
      {/**
       *  UI: Spotlights
       *  Link: https://ui.aceternity.com/components/spotlight
       */}



      {/**
       *  UI: grid
       *  change bg color to bg-black-100 and reduce grid color from
       *  0.2 to 0.03
       */}
      <div
        className="h-dvh w-full bg-grid-red-300/[0.1]
       absolute top-0 left-0 flex items-center justify-center overflow-clip"
      >
        <div
          // change the bg to bg-black-100, so it matches the bg color and will blend in
          className="absolute pointer-events-none inset-0 flex items-center justify-center
        [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"
        />
      </div>

      <div className="flex justify-center relative my-20 z-10 w-full flex-col md:flex-row">
        <div className="relative w-full h-full flex justify-center place-items-center">
          <motion.div
            className="h-60 w-60 md:h-80 md:w-80 lg:h-96 lg:w-96 border-r-4 overflow-clip border-b-4 border-red-500"
            initial={{ opacity: 0, scale: 0.5, rotate: 180 }}
            animate={{ opacity: 1, scale: 1, rotate: 370 }}
            transition={{ duration: 2, ease: "linear" }}
            style={{ borderBottomLeftRadius: "50%", borderTopRightRadius: "40%" }}
          >
            <motion.div
              initial={{ opacity: 0, rotate: 350 }}
              animate={{ opacity: 1, rotate: 350 }}
              transition={{ delay: 1.5, duration: 1, ease: "linear" }}
              className="relative w-[17rem] md:w-[22rem] lg:w-[26rem] h-full mt-8" >
              <Carousel
                additionalTransfrom={0}
                draggable={false}
                keyBoardControl
                autoPlay
                showDots={false}
                autoPlaySpeed={3000}
                shouldResetAutoplay={true}
                swipeable
                minimumTouchDrag={80}
                responsive={{
                  res1: {
                    breakpoint: { max: 40000, min: 0 },
                    items: 1,
                    partialVisibilityGutter: 0,
                  },
                }}
                containerClass="flex h-full w-full"
                rewind={true}
                pauseOnHover={false}
                rewindWithAnimation={true}
                infinite
                arrows={false}
                transitionDuration={1000}
              >
                <div className="h-60 w-60 md:h-80 md:w-80 lg:h-96 lg:w-96 rotate-[20]">
                  <Image
                    src={"/img/auth/person2.png"}
                    alt={`Image`}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="h-60 w-60 md:h-80 md:w-80 lg:h-96 lg:w-96">
                  <Image
                    src={"/img/auth/person1.png"}
                    alt={`Image`}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="h-60 w-60 md:h-80 md:w-80 lg:h-96 lg:w-96">
                  <Image
                    src={"/img/auth/person3.png"}
                    alt={`Image`}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              </Carousel>
            </motion.div>
          </motion.div>

        </div>
        <div className="w-full md:min-w-55vw] lg:min-w-[45vw] flex flex-col justify-center mt-10 md:mt-0">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="uppercase tracking-widest text-xs text-center md:text-left text-gray-800 w-full"
          >
            TD Group - Thật tuyệt khi được là chính mình
          </motion.p>
          <TextGenerateEffect
            words="NGÀNH NGHỀ"
            className="text-center md:text-left text-[40px] md:text-5xl lg:text-6xl w-full font-bold"
          />

          <TextGenerateEffect
            words="Sáng tạo, phát triển vì con người"
            className="text-center uppercase md:text-left tracking-widest mb-4 text-sm md:text-lg lg:text-[26px] text-gray-800 -mt-4 whitespace-nowrap font-medium"
          />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex justify-center md:justify-start -mt-4"
          >
            <MagicButton
              title="Tìm hiểu thêm"
              icon={<FaLocationArrow />}
              position="left"
              handleClick={handleButtonClick}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
