'use client'
import { useMotionValue, useTransform, animate, motion, useAnimation, useInView } from "framer-motion";
import ButtonLink from "./Sec1ChildComponent/ButtonLink";
import { useEffect, useRef } from "react";
import CursorBlinker from "./Sec1ChildComponent/CursorBlinker";
const NewsBlogSec1 = () => {
  const textIndex = useMotionValue(0);
  const texts = [
     'NewsBlog.MainPage.title',
  ];
  const baseText = useTransform(textIndex, (latest) => texts[latest] || "");
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const displayText = useTransform(rounded, (latest) =>
    baseText.get().slice(0, latest)
  );
  const updatedThisRound = useMotionValue(true);
  const refSec1 = useRef(null);
  const isInView = useInView(refSec1, {once: true});
  const mainControls = useAnimation();
  const slideControls = useAnimation();

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

  useEffect(()=>{
    if (isInView){
      mainControls.start("visible")
      slideControls.start("visible")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInView])

  return (
    <>
      <div className="sm:px-[4.5rem] px-2 lg:px-[5.5rem] bg-black/70 pt-20 pb-2">
        <motion.section  
          ref={refSec1}
          variants={{
            hidden: {opacity:0 , y:20},
            visible: {opacity:1 , y:0},
          }}
          initial="hidden"
          animate={mainControls}
          transition={{ duration: .7, delay: .25}}
          className="relative p-4 rounded-3xl h-full w-full">
          <div className="flex flex-col h-full w-full items-center">
            <span className="self-center pb-4 text-center">
              <motion.span className="font-bold text-4xl lg:text-6xl lg:pt-8 text-white">
                {displayText}
              </motion.span>
              <CursorBlinker />
            </span>
            <div className="relative pb-4">
              <div className="relative font-thin text-sm sm:text-xl lg:text-2xl text-center text-white">
                NewsBlog.MainPage.subTitle
              </div>
            </div>
          </div>
          <div className="flex flex-wrap w-full justify-center">
            <ButtonLink href="#allnews" buttonText={ 'NewsBlog.MainPage.button1'}/>
            <ButtonLink href="#customer" buttonText={ 'NewsBlog.MainPage.button2'}/>
            <ButtonLink href="#driver" buttonText={ 'NewsBlog.MainPage.button3'}/>
            <ButtonLink href="#partner" buttonText={ 'NewsBlog.MainPage.button4'}/>
            <ButtonLink href="#brand" buttonText={ 'NewsBlog.MainPage.button5'}/> 
          </div>
        </motion.section>
      </div>
    </>
  )
}

export default NewsBlogSec1;