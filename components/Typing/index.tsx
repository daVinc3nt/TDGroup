import { useMotionValue, useTransform, animate, motion } from "framer-motion";
import { useEffect } from "react";
import CursorBlinker from "./CursorBlinker";

const TypingEffect = ( props: {text: string[], size: number}) => {
  const textIndex = useMotionValue(0);
  const baseText = useTransform(textIndex, (latest) => props.text[latest] || "");
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const displayText = useTransform(rounded, (latest) =>
    baseText.get().slice(0, latest)
  );
  const updatedThisRound = useMotionValue(true);

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
          if (textIndex.get() === props.text.length - 1) {
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
  return (
    <>
        <motion.span >
            { displayText }
        </motion.span>
        <CursorBlinker size={props.size.toString()}/>
    </>
  )
}

export default TypingEffect;