"use client"
import React, { useEffect } from "react";
import Link from "next/link";
import TypingEffect from "../Typing";
import Image from "next/image";
import { Player } from "@lottiefiles/react-lottie-player";
import AOS from 'aos'
import 'aos/dist/aos.css'
import ParticlesBackground from "../Particle";
interface Props {
  heading: string;
  message: string;
}

const Hero = ({ heading, message }: Props) => {
  useEffect(() => {
    AOS.init({
      once: true,
      disable: 'phone',
      duration: 600,
      easing: 'ease-out-sine',
    })
  })
  return (

    <div className="flex items-center justify-center h-screen ">
      <div className="text-white bg-black-100 w-screen h-screen p-10 justify-center items-center flex flex-col sm:flex-row gap-10">
        <Player
          src='/animation/techNet.json'
          loop
          autoplay
          className="md:block hidden"
          style={{ height: '500px', width: '500px' }}
          rendererSettings={{
            preserveAspectRatio: "xMidYMid slice",
          }}
          data-aos="fade-left"
        />

        <div data-aos="fade-left">
          <p className="text-7xl font-bold wellcome w-56">Tien Dung</p>
          <p className="text-7xl font-bold wellcome2 w-56">CORP</p>
          <div className="text-xs sm:text-xl py-5"><TypingEffect text={[message]} size={5} /></div>
          <Link href="/#gallery" passHref>
            <button className="px-8 py-2 rounded-2xl hover:scale-[calc(110%)] transition text-white duration-150 bg-red-500">HERE</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
