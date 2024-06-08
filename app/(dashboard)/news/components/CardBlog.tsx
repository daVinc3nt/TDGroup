"use client";
import { useRouter } from "next/navigation";
import { FaLocationArrow } from "react-icons/fa6";
import { useState, useEffect } from "react";
import {
    getFile,
    GettingFileCriteria,
    deleteProject,
    conditionQueryProject,
    UploadingFileInfo,
} from "@/lib/main";
import Link from "next/link";
import { cn } from "@nextui-org/react";
interface PostProps {
    author: string;
    date_created: string;
    date_modified: string;
    files: any;
    id: string;
    title: string;
    type: any;
    name: string;
    description: string;
    reloadFunction: () => Promise<void>;
    news?: string;
}
const PinContainer = ({
    children,
    title,
    href,
    className,
    containerClassName,
}: {
    children: React.ReactNode;
    title?: string;
    href?: string;
    className?: string;
    containerClassName?: string;
}) => {
    const [transform, setTransform] = useState(
        "translate(-50%,-50%) rotateX(0deg)"
    );

    const onMouseEnter = () => {
        setTransform("translate(-50%,-50%) rotateX(10deg) scale(0.8)");
    };
    const onMouseLeave = () => {
        setTransform("translate(-50%,-50%) rotateX(0deg) scale(1)");
    };

    return (
        <div
            className={cn(
                "relative group/pin z-40 cursor-pointer w-full h-full",
                containerClassName
            )}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <div
                style={{
                    perspective: "1000px",
                    transform: "rotateX(70deg) translateZ(0deg)",
                }}
                className="absolute left-1/2 top-1/2 ml-[0.09375rem] mt-4 -translate-x-1/2 -translate-y-1/2 w-full h-full"
            >
                <div
                    style={{
                        transform: transform,
                    }}
                    // remove  bg-black
                    className="absolute left-1/2 p-4 top-1/2  flex justify-start items-start  rounded-lg border transition duration-700 overflow-hidden w-full h-full"
                >
                    <div className={cn(" relative z-40 ", className)}>{children}</div>
                </div>
            </div>
            {/* <PinPerspective title={title} href={href} /> */}
        </div>
    );
};
const RecentProjects = (projects: PostProps) => {
    const handleDelete = async () => {
        const result = window.confirm("Bạn có chắc chắn muốn xóa không?");
        if (!result) return;
        try {
            console.log("hehehehe", projects.id);
            const response = await deleteProject({
                project_id: projects.id,
            });
            // console.log("hehehehe", response);
            projects.reloadFunction();
        } catch (error) {
            // console.log(error);
        }
    };
    const [img, setImg] = useState(null);
    useEffect(() => {
        const fetchIMG = async () => {
            try {
                const response = await getFile({
                    project_id: projects.id,
                    file: "default.png",
                });
                // console.log("response", response);
                if (response.status === 404) return;
                setImg(response.data);
            } catch (err) {
                // console.log(err);
            }
        };
        fetchIMG();
    }, []);
    const daysOfWeek = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
    const dayOfWeek = daysOfWeek[new Date(projects?.date_created).getDay()];
    const dayOfMonth = new Date(projects?.date_created).getDate();
    const month = new Date(projects?.date_created).getMonth() + 1;
    const year = new Date(projects?.date_created).getFullYear();
    return (
        <div className="w-full">
            <div className="flex flex-wrap items-center justify-center gap-4 w-full">
                <div
                    className="h-[20rem] flex items-center justify-center w-full"
                    key={projects.id}
                >
                    <Link href={`/news/${projects.id}`} className="h-full w-full">

                        <PinContainer
                            // title={`/specify/${projects.id}/${projects.name}`}
                            // href={`/specify/${projects.id}/${projects.name}`}
                            className="w-full h-full"
                        >

                            <div
                                style={{ backgroundImage: `url(${img})` }}
                                className="h-[70%] bg-center bg-no-repeat bg-cover bg-red-500/30 rounded-t-xl"
                            ></div>
                            <p className="text-sm font-bold text-black hover:underline hover:text-black/70 line-clamp-2 text-center px-2 pt-2">
                                {projects?.title}
                            </p>
                            <p className="text-gray-800 hover:text-gray-600 text-center pr-2 text-xs pt-2">
                                - {dayOfWeek} {dayOfMonth}/{month}/{year} -
                            </p>
                        </PinContainer>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default RecentProjects;
