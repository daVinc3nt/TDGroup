"use client"
import Carousel from "react-multi-carousel";
import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import "react-multi-carousel/lib/styles.css";
import { TbChevronsLeft, TbChevronsRight } from "react-icons/tb";
import Link from "next/link";
import getPost from "@/lib/helper";
import Posts from "@/app/api/data";

export enum Type {
	"Tin tức",
	"Sự kiện",
	"Hình ảnh",
	"Video",
  "Báo cáo"
}

const NewsBlogSec3 = ({listPost, category, id, title}) => {
  const refSec3 = useRef(null);
  const isInView = useInView(refSec3, { once: true });
  const mainControls = useAnimation();
  const slideControls = useAnimation();
  // const [data, setData] = useState([]);
  const data = listPost;
  const [breakpoint, setBreakpoint] = useState("res1");
  const sortPosts = category == "Tất cả" ? data: data.filter(post => post.type && Type[post.type -1].includes(category));
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width >= 1200) {
        setBreakpoint("res4");
      } else if (width >= 800) {
        setBreakpoint("res3");
      } else if (width >= 550) {
        setBreakpoint("res2");
      } else {
        setBreakpoint("res1");
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const breakpoints = { res1: 1, res2: 2, res3: 3, res4: 5 };

  // useEffect(() => {
  //   getPost(null).then((res) => {
  //     setData(res);
  //   });
  // }, []);

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
      slideControls.start("visible");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInView]);

  const ArrowFix = (arrowProps) => {
    const { carouselState, children, rtl, ...restArrowProps } = arrowProps;
    return <div {...restArrowProps}>{children}</div>;
  };
    const date = new Date(data?.date_created);

    // Create a new formatter object using Intl.DateTimeFormat
    const formatter = new Intl.DateTimeFormat("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZone: "UTC",
    });

      return (
    <>
      <div id={id}
        className="h-[350px] sm:px-[4.5rem] px-2 lg:px-[5.5rem] bg-black/70 pb-2"
      >
        <motion.section 
          variants={{ hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0 }}}
          initial="hidden"
          animate={mainControls}
          transition={{ duration: 0.7, delay: 0.25 }}
          ref={refSec3} className="relative bg-white/90 p-4 rounded-3xl h-full w-full">
          <div className="flex flex-col mx-auto h-full w-full justify-center items-center">
            <motion.h1 className="font-bold sm:text-xl lg:text-2xl pt-1 pb-4 text-center lg:text-left w-full lg:pl-4 whitespace-nowrap">
              {title}
            </motion.h1>
            <Carousel
              customRightArrow={
                <ArrowFix className="absolute right-2 top-[53%]">
                  <TbChevronsRight className="h-8 w-8 text-white text-center rounded-full bg-gray-800 outline outline-[3px] lg:outline-4 outline-white" />
                </ArrowFix>
              }
              customLeftArrow={
                <ArrowFix className="absolute left-2 top-[53%]">
                  <TbChevronsLeft className="h-8 w-8 text-white text-center rounded-full bg-gray-800 outline outline-[3px] lg:outline-4 outline-white" />
                </ArrowFix>
              }
              additionalTransfrom={0} draggable keyBoardControl
              swipeable minimumTouchDrag={80} pauseOnHover 
              renderArrowsWhenDisabled={false}
              renderButtonGroupOutside={false}
              renderDotsOutside={false}
              responsive={{
                res1: { breakpoint: { max: 550, min: 0 }, items: 1, partialVisibilityGutter: 0 },
                res2: { breakpoint: { max: 800, min: 550 }, items: 2, partialVisibilityGutter: 0 },
                res3: { breakpoint: { max: 1200, min: 800 }, items: 3, partialVisibilityGutter: 0 },
                res5: { breakpoint: { max: 3000, min: 1200 }, items: 5, partialVisibilityGutter: 0 },
              }}
              rewind={false} rewindWithAnimation={false} showDots={false}
              slidesToSlide={breakpoints[breakpoint]}
              containerClass="h-full grow w-full rounded-2xl"
            >
              {sortPosts.slice(0, 10).map((post) => (
                
                <div key={post.id} className="h-64 bg-white rounded-xl mx-2">
                  <Link href={`/news/${post.id}`}>
                    <div
                      style={{ backgroundImage: `url(${post.img})` }}
                      className="h-[70%] bg-center bg-no-repeat bg-cover rounded-t-xl"
                    ></div>
                    <p className="text-sm font-bold text-black hover:underline hover:text-black/70 line-clamp-2 text-center px-2 pt-2">
                      {post?.title}
                    </p>
                    <p className="text-gray-800 hover:text-gray-600 text-center pr-2 text-xs pt-2">
                      - {formatter.format(new Date(post?.date_created))} -
                    </p>
                  </Link>
                </div>
              ))}
            </Carousel>
          </div>
        </motion.section>
      </div>
    </>
  );
};

export default NewsBlogSec3;
