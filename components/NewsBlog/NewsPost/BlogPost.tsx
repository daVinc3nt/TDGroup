"use client"
import { useEffect, useRef, useState } from 'react';
import CursorBlinker from './CursorBlinker';
import { animate, motion, useAnimation, useInView, useMotionValue, useTransform } from 'framer-motion';
import Image from 'next/image';
import { Bitter } from 'next/font/google';
import ScrollToTopButton from '@/components/NewsBlog/ScrollToTop';

const bitter = Bitter({ subsets: ['latin'] });

interface BlogPostProps {
  post: any;
}

const BlogPost: React.FC<BlogPostProps> = ({ post}) => {
  const textIndex = useMotionValue(0);
  const texts = [post?.title];
  const baseText = useTransform(textIndex, (latest) => texts[latest] || "");
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const displayText = useTransform(rounded, (latest) => baseText.get().slice(0, latest));
  const updatedThisRound = useMotionValue(true);
  const refSec1 = useRef(null);
  const isInView = useInView(refSec1, { once: true });
  const mainControls = useAnimation();
  const slideControls = useAnimation();
  const [hello , setHello]=useState()
  console.log(post)
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

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: post.replace(/"/g, '')}}/>  
      <div className="sm:px-[4.5rem] px-2 lg:px-[5.5rem] bg-black/70 pt-20 pb-2 min-h-screen">
        <ScrollToTopButton />
        <motion.article
          ref={refSec1}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          initial="hidden"
          animate={mainControls}
          transition={{ duration: 0.7, delay: 0.25 }}
          className='bg-white/90 rounded-3xl min-h-[650px]'>
          <motion.section
            className="relative p-4 rounded-3xl h-full w-full">
            <div className="flex flex-col h-full w-full items-center">
              <span className="self-center pt-4 text-center">
                <motion.span className="font-bold text-2xl lg:text-3xl text-gray-800 hover:text-gray-600">
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
                - {post.published} -
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
                  {post?.subtitle}
                  {/* không có sub */}
                </motion.div>
              </div>
            </div>
          </motion.section>
          {post?.img && (
            <div className="flex flex-col lg:flex-row p-4 pt-0 lg:p-6 lg:pt-0 rounded-lg h-full justify-center">
              <div className="image lg:w-[70%] lg:h-[450px] overflow-hidden rounded-t-lg lg:rounded-lg">
                <motion.div
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0 },
                  }}
                  initial="hidden"
                  animate={mainControls}
                  transition={{ duration: 0.7, delay: 0.85 }}
                  style={{ backgroundImage: `url(${post.img})` }} 
                  // không có img
                  className="h-56 lg:h-full bg-center bg-no-repeat bg-cover rounded-lg"
                />
              </div>
              <div className="info relative flex flex-col justify-between w-full lg:px-6 py-4 lg:py-0 overflow-y-scroll px-2">
                <motion.div 
                  variants={{
                    hidden: { opacity: 0, x: 20 },
                    visible: { opacity: 1, x: 0 },
                  }}
                  initial="hidden"
                  animate={mainControls}
                  transition={{ duration: 0.7, delay: 0.65 }}
                  className="text-gray-800 pt-2 lg:pt-0 text-justify">
                  <p>{post?.description}</p>
                  {/* khôgn có  */}
                </motion.div>
                <motion.div 
                  variants={{
                    hidden: { opacity: 0, x: 20 },
                    visible: { opacity: 1, x: 0 },
                  }}
                  initial="hidden"
                  animate={mainControls}
                  transition={{ duration: 0.7, delay: 0.85 }}
                  className="author flex w-full justify-center lg:justify-end mt-4">
                  <div className="flex flex-col justify-center px-4">
                    <span className="text-gray-800">{post.author.name || "No Name"}</span>
                    {/* không có name */}
                  </div>
                  {/* không có author.img  */}
                  {post.author.img && (
                    <Image
                      src={post.author.img}
                      width={45}
                      height={45}
                      className="rounded-full"
                      alt={`Profile picture of ${post.author.name}`}
                    />
                  )}
                  {/* không có author.name */}
                </motion.div>
              </div>
            </div>
          )}
        </motion.article>
      </div>
    </>
  );
};

export default BlogPost;
