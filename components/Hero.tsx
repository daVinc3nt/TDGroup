import React from "react";
import { FaLocationArrow } from "react-icons/fa6";
import { motion } from "framer-motion";
import Image from "next/image";
import "react-multi-carousel/lib/styles.css";
import MagicButton from "./MagicButton";
import { Spotlight } from "./ui/Spotlight";
import { TextGenerateEffect } from "./ui/TextGenerateEffect";
import Carousel from "react-multi-carousel";

const Hero = () => {
  return (
    <div className="pb-20 pt-36 h-dvh flex justify-end">
      {/**
       *  UI: Spotlights
       *  Link: https://ui.aceternity.com/components/spotlight
       */}

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

      {/**
       *  UI: grid
       *  change bg color to bg-black-100 and reduce grid color from
       *  0.2 to 0.03
       */}
      <div
        className="h-screen w-full bg-white bg-grid-red-300/[0.1]
       absolute top-0 left-0 flex items-center justify-center"
      >
        <div
          // change the bg to bg-black-100, so it matches the bg color and will blend in
          className="absolute pointer-events-none inset-0 flex items-center justify-center
         bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"
        />
      </div>

      <div className="flex justify-center relative my-20 z-10 w-full gap-4">
        <div className="relative w-full h-full flex justify-center place-items-center">
          {/* Circle Segments */}
          <motion.div
            className="h-96 w-96 border-r-4 overflow-clip border-b-4 border-red-500"
            initial={{ opacity: 0, scale: 0.7, rotate: 0 }}
            animate={{ opacity: 1, scale: 1, rotate: 360 }}
            transition={{ duration: 1, ease: "linear" }}
            style={{ borderBottomLeftRadius: "50%", borderTopRightRadius: "40%" }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, ease: "linear" }}
              className="relative w-full h-full" >
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
                <div className="h-96">
                  <Image
                    src={"/img/auth/person1.png"}
                    alt={`Image`}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="h-96">
                  <Image
                    src={"/img/auth/person2.png"}
                    alt={`Image`}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="h-96">
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
        <div className="max-w-[89vw] md:max-w-2xl lg:min-w-[45vw] flex flex-col justify-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="uppercase tracking-widest text-xs text-center md:text-left text-gray-800 w-full"
          >
            TDLogistics - Theo cách của bạn
          </motion.p>

          {/**
           *  Link: https://ui.aceternity.com/components/text-generate-effect
           *
           *  change md:text-6xl, add more responsive code
           */}
          <TextGenerateEffect
            words="Sáng tạo vì con người"
            className="text-center md:text-left text-[40px] md:text-5xl lg:text-6xl w-full"
          />

          <motion.a
            href="#about"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <MagicButton
              title="Tìm hiểu thêm"
              icon={<FaLocationArrow />}
              position="left"
            />
          </motion.a>
        </div>
      </div>
    </div>
  );
};

export default Hero;
