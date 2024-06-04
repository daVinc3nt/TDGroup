"use client"
import { motion, useAnimation, useInView } from "framer-motion"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
const Slide = (data:any) => {
  // const [data, setData] = useState(null);
  // useEffect(() => {
  //   getPost(1).then((res) => {setData(res)});
  // }, [])
  const date = new Date(data?.date_created);

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

// Format the date object using the formatter
const formattedDate = formatter.format(date);
  return (
      <Link href={`/news/${data.id}`} className="flex h-full justify-between flex-col lg:flex-row hover:bg-gray-300/70 lg:p-4 rounded-2xl">
          <div className="image h-1/3 lg:h-full lg:w-[30%]">
            <div
              style={{ backgroundImage: `url(${data?.img})` }}
              className="h-full bg-center bg-no-repeat bg-contain lg:bg-cover bg-white/50 rounded-t-2xl lg:rounded-2xl"
            >
            </div>
          </div>
          <div className="info flex justify-start pt-4 flex-col w-full lg:w-[65%] h-2/3 lg:h-full relative px-2 xs:px-4 lg:px-0">
              <div className="title pt-2">
                  <p className="text-center lg:text-left text-xl lg:text-3xl font-bold text-gray-800 hover:text-gray-600 line-clamp-4 xs:line-clamp-none">{data?.title}</p>
              </div>
              <div className="text-center lg:text-left">
                <p className="text-orange-600 hover:text-orange-800">{data?.category}</p>
                <p className="lg:pl-2 text-gray-800 hover:text-gray-600">- {formattedDate} -</p>
              </div>
              <p className="text-gray-500 pt-2 lg:pt-8 truncate-text invisible xs:visible line-clamp-2 sm:line-clamp-3">{data?.description}</p>
              <h1 className="self-center lg:self-end absolute bottom-2 lg:bottom-0 text-sm">-{data?.author}-</h1>
          </div>
      </Link>
  )
}

const NewsBlogSec2 = (data:any) => {
  const refSec2 = useRef(null);
  const isInView = useInView(refSec2, {once: true});
  const mainControls = useAnimation();
  const slideControls = useAnimation();

  useEffect(()=>{
    if (isInView){
      mainControls.start("visible")
      slideControls.start("visible")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInView])

  return (
    <>
      <div className="h-[450px] sm:px-[4.5rem] px-2 lg:px-[5.5rem]  pb-2">
        <section 
          ref = {refSec2}
          className="relative bg-white p-4 rounded-3xl h-full w-full">
          <motion.div 
            variants={{
              hidden: {opacity:0 , y:20},
              visible: {opacity:1 , y:0},
            }}
            initial="hidden"
            animate={mainControls}
            transition={{ duration: .7, delay: .25}}
            className="flex flex-col mx-auto h-full w-full">
              <h1 className="font-bold text-2xl sm:text-3xl lg:text-4xl text-black pt-0 pb-2 lg:pb-4 text-center">NewsBlog.Blog2.title</h1>
              { Object.keys(data).length !== 0 && Slide(data.post[0]) }
          </motion.div>
        </section>
      </div>
    </>
  )
}

export default NewsBlogSec2;
