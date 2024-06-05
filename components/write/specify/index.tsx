"use client";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import "quill/dist/quill.snow.css";
import CreatePopUp from "./create";
import ScrollToTopButton from "@/components/NewsBlog/ScrollToTop";
import {
  CreatingProject,
  UploadingFileInfo,
  uploadFileBelongToProject,
  createProject,
  GettingPostCriteria,
  savePost,
  login,
  getProjects,
} from "@/lib/main";
import RecentProjects from "@/components/ui/CardBlog";
import NotiPopup from "@/components/ui/NotificationPop";
import Quill from "quill";
import ImageResize from "quill-image-resize-module-react";
import { Delta } from "quill/core";
import { randomBytes } from "crypto";
Quill.register("modules/imageResize", ImageResize);
// Quill.register("modules/handler", handlerModule);
export default function Writing2() {
  const [isCreating, setIsCreating] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const [message, setMessage] = useState("");
  const [isOpened2, setIsOpened2] = useState(false);
  const onClose = () => {
    setIsOpened(false);
  };

  const onOpen = (e: any) => {
    setMessage(e);
    setIsOpened(true);
  };

  const onOpen2 = (e: any) => {
    setIsOpened2(true);
  };

  const onClose2 = () => {
    setIsOpened2(false);
  };

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
  }
  //for fetch data
  const [data, setData] = useState<any>([]);
  const [file, setFile] = useState<File>();
  const [post, setPost] = useState<PostProps[]>();
  const [searchTitle, setSearchTitle] = useState<string>();
  const [searchType, setSearchType] = useState<number>();
  const [searchDateStart, setSearchDateStart] = useState<number>(2024);
  const [searchDateEnd, setSearchDateEnd] = useState<number>(2024);
  const [error, setError] = useState(false);
  useEffect(() => {
    handlefetchPost();
  }, []);
  const handlefetchPost = async () => {
    const data: GettingPostCriteria = {};
    if (searchDateEnd < searchDateStart) {
      setError(true);
      return;
    } else {
      setError(false);
    }
    if (searchTitle) {
      data.title = searchTitle;
    }
    if (searchType) {
      data.type = searchType;
    }
    if (searchDateStart) {
      data.yearStart = searchDateStart;
    }
    if (searchDateEnd) {
      data.yearEnd = searchDateEnd;
    }
    const response = await getProjects(data);
    // console.log("dataporject", response);
    setPost(response.data);
  };

  //for pagination
  const [POSTS_PER_PAGE, setPOSTS_PER_PAGE] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastPost = currentPage * POSTS_PER_PAGE;
  const indexOfFirstPost = indexOfLastPost - POSTS_PER_PAGE;
  const currentPosts = post?.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const PAGE_NUMBERS_TO_SHOW = 5; // Số lượng trang để hiển thị
  const totalPosts = post?.length || 0;
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

  // Tính toán trang bắt đầu và kết thúc
  let startPage = Math.max(
    currentPage - Math.floor(PAGE_NUMBERS_TO_SHOW / 2),
    1
  );
  let endPage = Math.min(startPage + PAGE_NUMBERS_TO_SHOW - 1, totalPages);

  // Điều chỉnh nếu chúng ta ở gần đầu hoặc cuối danh sách trang
  if (endPage - startPage + 1 < PAGE_NUMBERS_TO_SHOW) {
    if (currentPage < totalPages / 2) {
      endPage = Math.min(
        endPage + (PAGE_NUMBERS_TO_SHOW - (endPage - startPage + 1)),
        totalPages
      );
    } else {
      startPage = Math.max(
        startPage - (PAGE_NUMBERS_TO_SHOW - (endPage - startPage + 1)),
        1
      );
    }
  }
  const login2 = async () => {
    try {
      await login("tdadmin", "tdadmin");
      // console.log(response);
    } catch (error) {
      // console.log(error);
    }
  };
  const handleChangeType = async (e: number) => {
    setSearchType(e);
  };
  useEffect(() => {
    handlefetchPost();
  }, [searchType, searchDateStart, searchDateEnd, searchTitle]);
  return (
    <div className="flex flex-col   z-20 px-10 mt-24  bg-white h-full  ">
      <ScrollToTopButton />
      <div>
        {isOpened && <NotiPopup onClose={onClose} message={message} />}
        <a
          className="absolute bg-blue left-5 top-5
        border  border-neutral-200  
         inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white  focus:ring-4 focus:outline-none focus:ring-green-200    "
          href="/"
        >
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white  rounded-md group-hover:bg-opacity-0">
            Trở về
          </span>
        </a>
        <button
          className="absolute bg-blue left-5 top-10
        border  border-neutral-200  
         inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white  focus:ring-4 focus:outline-none focus:ring-green-200    "
          onClick={login2}
        >
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white  rounded-md group-hover:bg-opacity-0">
            Login
          </span>
        </button>
      </div>
      {isCreating && (
        <CreatePopUp onClose={onClose2} reFetch={handlefetchPost} />
      )}
      <div className="flex place-content-center">
        <div className="flex flex-col  bg-white z-20 px-2 md:px-10 w-full h-full ">
          <div className="flex flex-col  bg-white text-black">
            <div className="flex gap-3 lg:flex-row flex-col">
              <input
                type="text"
                placeholder="Tìm kiếm"
                value={searchTitle}
                onChange={(e) => setSearchTitle(e.target.value)}
                className="bg-white border border-gray-300 rounded-lg px-4 py-2 w-full lg:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
              />
              <div
                className="
            bg-white border border-gray-300 rounded-lg md:px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black
             grid place-content-between grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3
          "
              >
                <div className="flex justify-center">
                  <span className="text-gray-400 font-bold mx-2 self-center ">
                    {" "}
                    Thời gian từ
                  </span>
                  <select
                    name="date_start"
                    id=""
                    value={searchDateStart}
                    onChange={(e) =>
                      setSearchDateStart(parseInt(e.target.value))
                    }
                    className={`bg-white border  rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black  min-w-[50px]
${error ? "border-red-500" : "border-gray-300"}
                    `}
                  >
                    <option value={2024}>2024</option>
                    <option value={2025}>2025</option>
                    <option value={2026}>2026</option>
                    <option value={2027}>2027</option>
                    <option value={2028}>2028</option>
                    <option value={2029}>2029</option>
                  </select>
                </div>
                <div className="flex justify-center">
                  <span className=" text-gray-400 font-bold mx-2 self-center">
                    Đến
                  </span>
                  <select
                    name="date_end"
                    id=""
                    value={searchDateEnd}
                    onChange={(e) => setSearchDateEnd(parseInt(e.target.value))}
                    className={`bg-white border  rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black  min-w-[50px]
${error ? "border-red-500" : "border-gray-300"}
                    `}
                  >
                    <option value={2024}>2024</option>
                    <option value={2025}>2025</option>
                    <option value={2026}>2026</option>
                    <option value={2027}>2027</option>
                    <option value={2028}>2028</option>
                    <option value={2029}>2029</option>
                  </select>
                </div>
                <div className="flex justify-center">
                  <span className="text-gray-400 font-bold mx-2 self-center ">
                    {" "}
                    Hiển thị
                  </span>
                  <select
                    name="date_start"
                    id=""
                    value={POSTS_PER_PAGE}
                    onChange={(e) => {
                      setPOSTS_PER_PAGE(parseInt(e.target.value));
                      setCurrentPage(1);
                    }}
                    className={`bg-white border  rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black  min-w-[50px] border-gray-300}
                    `}
                  >
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={4}>4</option>
                    <option value={8}>8</option>
                    <option value={16}>16</option>
                  </select>
                </div>
                <div className="flex justify-center">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full self-center w-40
        "
                    onClick={() => setIsCreating(!isCreating)}
                  >
                    <span> Tạo bài viết mới </span>
                  </button>
                </div>
              </div>
              {error && (
                <span className="text-red-500 font-bold mx-2 self-center">
                  {" "}
                  Thời gian không hợp lệ{" "}
                </span>
              )}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-8 gap-5 my-5 border-b-slate-300 border-spacing-2 border-b-2 ">
              <button
                onClick={() => handleChangeType(1)}
                className={` text-gray-400 font-bold py-2 px-4 rounded pb-1
                ${searchType == 1 ? "bg-gray-200 " : "bg-white"}
                `}
              >
                Tin tức
              </button>
              <button
                onClick={() => handleChangeType(2)}
                className={` text-gray-400 font-bold py-2 px-4 rounded pb-1
                ${searchType == 2 ? "bg-gray-200 " : "bg-white"}
                `}
              >
                Sự kiện
              </button>
              <button
                onClick={() => handleChangeType(3)}
                className={` text-gray-400 font-bold py-2 px-4 rounded pb-1
                ${searchType == 3 ? "bg-gray-200 " : "bg-white"}
                `}
              >
                Hình ảnh
              </button>
              <button
                onClick={() => handleChangeType(4)}
                className={` text-gray-400 font-bold py-2 px-4 rounded pb-1
                ${searchType == 4 ? "bg-gray-200 " : "bg-white"}
                `}
              >
                Video
              </button>
              <button
                onClick={() => handleChangeType(5)}
                className={` text-gray-400 font-bold py-2 px-4 rounded pb-1
                ${searchType == 5 ? "bg-gray-200 " : "bg-white"}
                `}
              >
                Tài liệu
              </button>
              <button
                onClick={() => handleChangeType(6)}
                className={` text-gray-400 font-bold py-2 px-4 rounded pb-1
                ${searchType == 6 ? "bg-gray-200 " : "bg-white"}
                `}
              >
                Khác
              </button>
              <button
                onClick={() => handleChangeType(7)}
                className={` text-gray-400 font-bold py-2 px-4 rounded pb-1
                ${searchType == 7 ? "bg-gray-200 " : "bg-white"}
                `}
              >
                Dự án
              </button>
              <button
                onClick={() => handleChangeType(null)}
                className={` text-gray-400 font-bold py-2 px-4 rounded pb-1
                ${searchType == null ? "bg-gray-200 " : "bg-white"}
                md:col-span-1 
                `}
              >
                Tất cả
              </button>
            </div>
          </div>

          <div
            className="flex flex-wrap 
            justify-center 
          "
          >
            {post &&
              currentPosts?.map((item) => (
                <div key={item.id}>
                  <RecentProjects
                    id={item.id}
                    author={item.author}
                    date_created={item.date_created}
                    date_modified={item.date_modified}
                    files={item.files}
                    title={item.title}
                    type={item.type}
                    name={item.name}
                    description={item.description}
                    reloadFunction={handlefetchPost}
                  />
                </div>
              ))}
          </div>
          {post?.length == 0 && (
            <div className="text-center w-full">Không có bài viết nào</div>
          )}
          <div className="flex justify-center my-2">
            <div className="bg-gray-200 rounded-full px-4 py-2 ">
              <div className="flex text-gray-600 gap-4 font-medium py-2">
                <button
                  className="
                    rounded-full px-4 py-2 hover:bg-white hover:text-gray-600 transition duration-300 ease-in-out
                    "
                  onClick={() => {
                    if (currentPage <= 1) {
                      paginate(1);
                    } else {
                      paginate(currentPage - 1);
                    }
                  }}
                >
                  {"<"}
                </button>
                {Array.from(
                  { length: endPage - startPage + 1 },
                  (_, i) => startPage + i
                ).map((pageNumber) => (
                  <button
                    className={`${
                      currentPage == pageNumber
                        ? "rounded-full px-4 py-2 bg-white text-gray-600"
                        : "rounded-full px-4 py-2 hover:bg-white hover:text-gray-600 transition duration-300 ease-in-out"
                    } `}
                    key={pageNumber}
                    onClick={() => paginate(pageNumber)}
                  >
                    {pageNumber}
                  </button>
                ))}
                <button
                  className="
                    rounded-full px-4 py-2 hover:bg-white hover:text-gray-600 transition duration-300 ease-in-out
                    "
                  onClick={() => {
                    if (
                      currentPage >= Math.ceil(post.length / POSTS_PER_PAGE)
                    ) {
                      paginate(Math.ceil(post.length / POSTS_PER_PAGE));
                    } else {
                      paginate(currentPage + 1);
                    }
                  }}
                >
                  {">"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="self-center mt-4 grid grid-cols-2 gap-5"></div>
    </div>
  );
}
