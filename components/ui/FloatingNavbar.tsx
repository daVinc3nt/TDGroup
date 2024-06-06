"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { FiAlignJustify, FiSearch } from "react-icons/fi";
import { useSidebarContext } from "@/providers/SidebarProvider";

export const FloatingNav = ({
  className,
}: {
  className?: string;
}) => {
  const router = useRouter();
  const [role, setRole] = useState("ADMIN");
  const { scrollYProgress } = useScroll();
  const navItems = [
    { name: "Về chúng tôi", link: "/" },
    { name: "Dự án", link: "#projects" },
    { name: "Ngành nghề", link: "#testimonials" },
    { name: "Tin tức", link: "/news", hasDropdown: role == "ADMIN" ? true : false },
  ];
  const [search, setSearch] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { openSidebar, setOpenSidebar } = useSidebarContext()
  const handleSearch = () => {
    if (search == "") return;
    //@ts-ignore
    window.find(search);
  };
  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      let direction = current - scrollYProgress.getPrevious();
      if (scrollYProgress.get() < 0.05) {
        setVisible(true);
      } else {
        setVisible(direction < 0);
      }
    }
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleDocumentClick = (event: any) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsSearchFocused(false);
      } else setIsSearchFocused(true);
    };

    document.addEventListener("mousedown", handleDocumentClick);

    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: -100,
        }}
        animate={{
          y: visible ? -20 : -20,
        }}
        transition={{
          duration: 0.2,
        }}
        className={cn(
          "flex max-w-fit min-w-[90vw] md:min-w-[70vw] fixed z-[5000] top-10 inset-x-0 mx-auto px-10 md:pr-2 py-2 rounded-full bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] items-center justify-between space-x-4",
          className
        )}
      >
        <div className="absolute w-10 h-10 md:hidden left-4 flex justify-center place-items-center border-r-2 pr-2 border-gray-300/30">
          <span
            className="flex cursor-pointer text-xl text-gray-400"
            onClick={() => setOpenSidebar(true)}
          >
            <FiAlignJustify className="h-6 w-6" />
          </span>
        </div>
        <div className="pb-1 md:pr-12 h-10 relative w-[calc(100%-30px)] md:w-60">
          <Image src="/Logo_horizontal.png" alt="Your image" layout="fill" objectFit="contain" />
        </div>
        <div className="hidden md:flex items-center justify-center space-x-4 border-r-2 w-full border-gray-300/30 h-10">
          {navItems.map((navItem, idx) => (
            <div key={`link=${idx}`} className="relative group">
              {!navItem.hasDropdown && <Link
                href={navItem.link}
                className={cn(
                  "relative items-center flex space-x-1 text-neutral-600 hover:text-neutral-500"
                )}
              >
                <span className="text-sm !cursor-pointer">{navItem.name}</span>
              </Link>}
              {navItem.hasDropdown && role === "ADMIN" && (
                <div ref={dropdownRef}>
                  <button
                    onMouseEnter={() => setDropdownOpen(true)}
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="relative items-center flex space-x-1 text-neutral-600 hover:text-neutral-500"
                  >
                    <span className="text-sm !cursor-pointer">Tin tức</span>
                  </button>
                  <AnimatePresence>
                    {dropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute transform origin-top-right mt-7 -ml-8 bg-white border border-gray-200 rounded-md shadow-lg z-50"
                      >
                        <div className="flex flex-col w-28">
                          <button
                            className="block w-full px-4 py-2 text-left text-sm text-neutral-600 hover:bg-gray-100 whitespace-nowrap"
                            onClick={() => {
                              router.push("/write");
                              setDropdownOpen(false);
                            }}
                          >
                            Đăng tin tức
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="hidden md:block md:h-12 -mr-8">
          <div
            ref={containerRef}
            className={`relative flex h-full items-center rounded-full bg-lightPrimary text-navy-700 xl:w-[225px]`}
          >
            <motion.button
              onClick={handleSearch}
              className={`absolute text-xl h-8 w-8 px-2 flex justify-center rounded-full place-items-center transition-all duration-500  ${isSearchFocused ? "bg-red-500 shadow-sm" : ""
                } transform`}
              initial={{ left: 2 }}
              animate={{
                left: isSearchFocused ? "calc(100% - 2rem - 6px)" : "4px",
              }}
            >
              <FiSearch
                className={`h-4 w-4 ${isSearchFocused ? "text-white" : "text-gray-400"
                  }`}
              />
            </motion.button>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder={"Tìm kiếm..."}
              className={`block h-full w-full rounded-full bg-lightPrimary text-sm text-black font-medium text-navy-700 outline-none placeholder:!text-gray-400 transition-all duration-500 ${isSearchFocused ? "pl-4 pr-6" : "pl-10"
                }`}
            />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
