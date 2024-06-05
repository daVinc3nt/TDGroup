"use client"
import { FC } from 'react'
import { HiX } from "react-icons/hi";
import Image from 'next/image';
import { useSidebarContext } from '@/providers/SidebarProvider';
import Links from "./components/Links";

type Props = {}

const Sidebar: FC<Props> = () => {
  const { openSidebar, setOpenSidebar } = useSidebarContext()

  return (
    <div className='md:hidden'>
      <div className={`bg-[#000] bg-opacity-70 fixed inset-0 z-[6000] ${openSidebar ? 'block w-screen h-screen' : 'hidden'}`} onClick={() => setOpenSidebar(false)} />
      <div
        className={`sm:none duration-175 linear fixed !z-[6000] flex min-h-full flex-col bg-white pb-10 shadow-2xl shadow-white/5 transition-all
        ${openSidebar ? "translate-x-0" : "-translate-x-96"}`}
      >
        <span className="absolute top-4 right-4 block cursor-pointer xl:hidden text-black" onClick={() => setOpenSidebar(false)} >
          <HiX />
        </span>

        <div className={`mx-[20px] mt-[50px] flex flex-col items-center relative w-[210px]`}>
          <Image src="/Logo_horizontal.png" alt="Your image" width={210} height={210} />
        </div>

        <div className="mt-[58px] mb-7 h-px bg-gray-300" />

        <ul className="mb-auto pt-1">
          <Links onClickRoute={() => setOpenSidebar(false)} />
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
