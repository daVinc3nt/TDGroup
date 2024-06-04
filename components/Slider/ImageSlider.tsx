"use client"
import { Bitter } from 'next/font/google'
import { useState } from "react";
import { TbChevronsLeft, TbChevronsRight } from "react-icons/tb";
import Carousel from "react-multi-carousel";
const bitter = Bitter({ subsets: ['latin'] });
const ArrowFix = (arrowProps) => {
  const { carouselState, children, rtl, ...restArrowProps } = arrowProps;
  return <div {...restArrowProps}>{children}</div>;
};
  const sliderImageUrl = [
  //First image url
  {
    url: "/data/pic1.jpg"
  },
  {
    url:
      "/data/pic2.jpg"
  },
  //Second image url
  {
    url:
      "/data/pic3.jpg"
  },
  //Third image url
    {
    url:
      "/data/pic4.jpg"
  }
];
export default function Slider(url) {
  const [breakpoint, setBreakpoint] = useState("res1");
  const breakpoints = { res1: 1, res2: 2, res3: 3, res4: 5 };
  const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
    slidesToSlide: 4 // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 768 },
    items: 3,
    slidesToSlide: 3 // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 767, min: 464 },
    items: 2,
    slidesToSlide: 1 // optional, default to 1.
  }
};
  return (
    <div className="w-screen bg-red-500 overflow-y-auto">
            <Carousel
             responsive={responsive}
                autoPlay={true}
                swipeable={true}
                draggable={true}
                showDots={true}
                infinite={true}
                partialVisible={false} 
                itemClass="w-screen"
            >
              {sliderImageUrl.map((imageUrl, index) => {
                return (
                  <div key={index}>
                    <img src={imageUrl.url} alt="movie" />
                  </div>
                );
              })}
            </Carousel>
    </div>
  );
};
