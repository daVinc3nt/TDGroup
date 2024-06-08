"use client"
import { useEffect, useRef, useState } from 'react';
import CursorBlinker from './CursorBlinker';
import { animate, motion, useAnimation, useInView, useMotionValue, useTransform } from 'framer-motion';
import Image from 'next/image';
import { Bitter } from 'next/font/google';
import ScrollToTopButton from '@/components/NewsBlog/ScrollToTop';
import { FaArrowLeft } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';

const bitter = Bitter({ subsets: ['latin'] });

interface BlogPostProps {
  post: any;
  info: any
}

const BlogPost: React.FC<BlogPostProps> = ({ post, info }) => {
  const textIndex = useMotionValue(0);
  const texts = [info?.title];
  const baseText = useTransform(textIndex, (latest) => texts[latest] || "");
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const displayText = useTransform(rounded, (latest) => baseText.get().slice(0, latest));
  const updatedThisRound = useMotionValue(true);
  const refSec1 = useRef(null);
  const isInView = useInView(refSec1, { once: true });
  const mainControls = useAnimation();
  const slideControls = useAnimation();
  console.log("helo", info)
  // Create a new formatter object using Intl.DateTimeFormat
  const formatter = new Intl.DateTimeFormat("vi-VN", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZone: "Asia/Ho_Chi_Minh",
  });
  useEffect(() => {
    animate(count, 180, {
      type: "tween",
      duration: 7,
      ease: "easeIn",
      repeat: 0,
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
    if (isInView) {
      mainControls.start("visible");
      slideControls.start("visible");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInView]);
  const router = useRouter()
  return (
    <>
      <div className="sm:px-[4.5rem] bg-gray-100 px-2 lg:px-[5.5rem] pt-20 pb-2 min-h-screen flex flex-col">
        <ScrollToTopButton />
        <div className="grid grid-cols-5 col-start-3 w-full">
          <div
            onClick={() => router.push("/news")}
            className="active:scale-125 duration-300 h-fit w-fit p-3 rounded-full bg-red-400 text-white">
            <FaArrowLeft className=" h-8 w-8" />
          </div>
          <img src="/data/Logo_vertical.png" height={200} width={200}
            className="col-start-3 justify-self-center pb-10" />
        </div>
        <motion.article
          ref={refSec1}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          initial="hidden"
          animate={mainControls}
          transition={{ duration: 0.7, delay: 0.25 }}
          className='bg-white  shadow-xl rounded-3xl min-h-[650px]'>
          <motion.section
            className="relative p-4  rounded-3xl h-full w-full">
            <div className="flex flex-col h-full w-full items-center border-b-2 border-gray-400 pb-2">
              <span className="self-center pt-4 text-center">
                <motion.span className="font-bold text-4xl lg:text-4xl text-gray-800 hover:text-gray-600">
                  {displayText}
                </motion.span>
                <CursorBlinker />
              </span>
              <motion.p
                variants={{
                  hidden: { opacity: 0, x: 20 },
                  visible: { opacity: 1, x: 0 },
                }}
                initial="hidden"
                animate={mainControls}
                transition={{ duration: 0.7, delay: 0.35 }}
                className="text-gray-800 hover:text-gray-600 text-center pr-2 text-lg">
                - {formatter.format(new Date(info?.date_created))} -
              </motion.p>
              <div className="relative pb-2">
                <motion.div
                  variants={{
                    hidden: { opacity: 0, x: 20 },
                    visible: { opacity: 1, x: 0 },
                  }}
                  initial="hidden"
                  animate={mainControls}
                  transition={{ duration: 0.7, delay: 0.45 }}
                  className="relative font-semibold text-sm lg:text-xl text-center text-gray-700">
                  {/* {post?.subtitle} */}
                  {/* không có sub */}
                </motion.div>
              </div>
            </div>
          </motion.section>
          <div className="p-4 pt-0 lg:p-6 lg:pt-0 rounded-lg h-full w-full justify-center">
            <div className="w-full lg:px-6 py-4 lg:py-0 px-2">
              <motion.div
                variants={{
                  hidden: { opacity: 0, x: 20 },
                  visible: { opacity: 1, x: 0 },
                }}
                initial="hidden"
                animate={mainControls}
                transition={{ duration: 0.7, delay: 0.65 }}
                className="text-gray-800 w-full pt-2 lg:pt-0 text-justify  border-b-2 border-gray-400 pb-10"
                dangerouslySetInnerHTML={{ __html: post }}
              >
              </motion.div>
              <motion.div
                variants={{
                  hidden: { opacity: 0, x: 20 },
                  visible: { opacity: 1, x: 0 },
                }}
                initial="hidden"
                animate={mainControls}
                transition={{ duration: 0.7, delay: 0.85 }}
                className="flex w-full justify-center lg:justify-end mt-4">
                <div className="flex gap-2 items-center justify-center px-4">
                  <img src="/data/SunGlass.jpg" height={100} width={100} className="rounded-full" />
                  <span className="text-gray-800 text-xl">{info.author || "No Name"}</span>
                  {/* không có name */}
                </div>
                {/* không có author.img  */}
                {/* {post.author.img && (
                    <Image
                      src={post.author.img}
                      width={45}
                      height={45}
                      className="rounded-full"
                      alt={`Profile picture of ${post.author.name}`}
                    />
                  )} */}
                {/* không có author.name */}
              </motion.div>
            </div>
          </div>
        </motion.article>
      </div>
    </>
  );
};

export default BlogPost;
