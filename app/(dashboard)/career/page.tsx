"use client";
import { useEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import Hero from "@/components/Hero";
import Image from 'next/image';
import { FaLocationArrow } from "react-icons/fa6";
import MagicButton from "@/components/MagicButton";

const CareerPage = () => {
    const controls1 = useAnimation();
    const controls2 = useAnimation();
    const section1Ref = useRef(null);
    const section2Ref = useRef(null);
    const [section1Visible, setSection1Visible] = useState(false);
    const [section2Visible, setSection2Visible] = useState(false);

    useEffect(() => {
        const observer1 = new IntersectionObserver(
            ([entry]) => {
                setSection1Visible(entry.isIntersecting);
                if (entry.isIntersecting) {
                    controls1.start('visible');
                } else {
                    controls1.start('hidden');
                }
            },
            { threshold: 0.5 }
        );

        const observer2 = new IntersectionObserver(
            ([entry]) => {
                setSection2Visible(entry.isIntersecting);
                if (entry.isIntersecting) {
                    controls2.start('visible');
                } else {
                    controls2.start('hidden');
                }
            },
            { threshold: 0.5 }
        );

        if (section1Ref.current) {
            observer1.observe(section1Ref.current);
        }
        if (section2Ref.current) {
            observer2.observe(section2Ref.current);
        }

        return () => {
            if (section1Ref.current) {
                observer1.unobserve(section1Ref.current);
            }
            if (section2Ref.current) {
                observer2.unobserve(section2Ref.current);
            }
        };
    }, [controls1, controls2]);

    const sectionVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    return (
        <div className="w-full">
            <Hero />
            <motion.div
                className="w-full bg-[#EE0033] overflow-clip" id="career"
            >
                <motion.div
                    ref={section1Ref}
                    initial="hidden"
                    animate={controls1}
                    variants={sectionVariants}
                    className="text-white flex place-items-center justify-center py-[10px] h-full flex-col md:flex-row">
                    <div className="text-center md:text-left md:w-2/3 px-10 md:px-20 flex flex-col justify-between h-full py-6 md:py-32 w-full">
                        <div>
                            <h1 className="text-center md:text-left text-[40px] md:text-5xl lg:text-5xl w-full font-bold">TIẾN DŨNG LOGISTICS</h1>
                            <p className="text-center md:text-left tracking-wider mb-4 text-md md:text-lg mt-4 text-white font-medium">
                                Tiên phong dựng xây các nền để mỗi cá nhân và tổ chức cùng nhau tạo nên những giá trị riêng và cộng hưởng những giá trị khác biệt ấy để kiến tạo xã hội.
                            </p>
                        </div>
                        <div className="flex w-full justify-center md:justify-start">
                            <MagicButton
                                title="Tìm hiểu thêm"
                                icon={<Image src="/Logo.png" alt="Your image" width={20} height={20} />}
                                position="left"
                                handleClick={() => { }}
                                otherClasses="bg-white text-[#EE0033]"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 sm:h-[480px] sm:w-[480px] w-[90dvw] h-[90dvw] grid-rows-3 md:mr-[10px] rounded-md overflow-clip">
                        <div className="col-span-2 row-span-2">
                            <Image
                                src="/img/auth/hcmut.jpg"
                                alt="Image 1"
                                width={300}
                                height={300}
                                className="object-cover w-full h-full"
                            />
                        </div>
                        <div className="row-span-1">
                            <Image
                                src="/img/auth/auth.png"
                                alt="Image 2"
                                width={300}
                                height={300}
                                className="object-cover w-full h-full"
                            />
                        </div>
                        <div className="row-span-1">
                            <Image
                                src="/img/auth/hcmut.jpg"
                                alt="Image 3"
                                width={300}
                                height={300}
                                className="object-cover w-full h-full"
                            />
                        </div>
                        <div className="row-span-1 col-span-1">
                            <Image
                                src="/img/auth/auth.png"
                                alt="Image 4"
                                width={300}
                                height={300}
                                className="object-cover w-full h-full"
                            />
                        </div>
                        <div className="col-span-2 row-span-1">
                            <Image
                                src="/img/auth/hcmut.jpg"
                                alt="Image 1"
                                width={300}
                                height={300}
                                className="object-cover w-full h-full"
                            />
                        </div>
                    </div>
                </motion.div>
            </motion.div>
            <motion.div
                className="w-full overflow-clip" id="career"
            >
                <motion.div
                    ref={section2Ref}
                    initial="hidden"
                    animate={controls2}
                    variants={sectionVariants}
                    className="text-gray-800 flex place-items-center justify-center py-[10px] h-full flex-col md:flex-row-reverse">
                    <div className="text-center md:text-right md:w-2/3 px-10 md:px-20 flex flex-col justify-between h-full py-6 md:py-32 w-full">
                        <div>
                            <h1 className="text-center md:text-right text-[40px] md:text-5xl lg:text-5xl w-full font-bold">TIẾN DŨNG LOGISTICS</h1>
                            <p className="text-center md:text-right tracking-wider mb-4 text-md md:text-lg mt-4 font-medium">
                                Tiên phong dựng xây các nền để mỗi cá nhân và tổ chức cùng nhau tạo nên những giá trị riêng và cộng hưởng những giá trị khác biệt ấy để kiến tạo xã hội.
                            </p>
                        </div>
                        <div className="flex w-full justify-center md:justify-end">
                            <MagicButton
                                title="Tìm hiểu thêm"
                                icon={<FaLocationArrow />}
                                position="left"
                                handleClick={() => { }}
                                otherClasses="bg-[#EE0033] text-white"
                            />
                        </div>

                    </div>
                    <div className="grid grid-cols-3 gap-4 sm:h-[480px] sm:w-[480px] w-[90dvw] h-[90dvw] grid-rows-3 md:ml-[10px] rounded-md overflow-clip">
                        <div className="col-span-2 row-span-2">
                            <Image
                                src="/img/auth/hcmut.jpg"
                                alt="Image 1"
                                width={300}
                                height={300}
                                className="object-cover w-full h-full"
                            />
                        </div>
                        <div className="row-span-1">
                            <Image
                                src="/img/auth/auth.png"
                                alt="Image 2"
                                width={300}
                                height={300}
                                className="object-cover w-full h-full"
                            />
                        </div>
                        <div className="row-span-1">
                            <Image
                                src="/img/auth/hcmut.jpg"
                                alt="Image 3"
                                width={300}
                                height={300}
                                className="object-cover w-full h-full"
                            />
                        </div>
                        <div className="row-span-1 col-span-1">
                            <Image
                                src="/img/auth/auth.png"
                                alt="Image 4"
                                width={300}
                                height={300}
                                className="object-cover w-full h-full"
                            />
                        </div>
                        <div className="col-span-2 row-span-1">
                            <Image
                                src="/img/auth/hcmut.jpg"
                                alt="Image 1"
                                width={300}
                                height={300}
                                className="object-cover w-full h-full"
                            />
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default CareerPage;
