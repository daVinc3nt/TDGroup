"use client";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import "quill/dist/quill.snow.css";

import {
  CreatingProject,
  UploadingFileInfo,
  uploadFileBelongToProject,
  createProject,
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
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const quillRef = useRef<any | null>(null);
  const editorRef = useRef<HTMLDivElement | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [type, setType] = useState<number | null>(null);
  const [isOpened, setIsOpened] = useState(false);
  const [message, setMessage] = useState("");

  const onClose = () => {
    setIsOpened(false);
  };

  const onOpen = (e: any) => {
    setMessage(e);
    setIsOpened(true);
  };
  const handleCreate = async (e: any) => {
    const data: CreatingProject = {
      name: title,
      title: title,
      author: author,
      type: type,
    };
    try {
      const response = await createProject(data);
      console.log(response);
      if (response.success) {
        onOpen("Tạo bài viết thành công");
        setIsCreating(false);
        setTitle("");
        setAuthor("");
        setDescription("");
        setType(null);
        handlefetchPost();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const login2 = async () => {
    try {
      const response = await login("tdadmin", "tdadmin");
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  interface PostProps {
    author: string;
    date_created: string;
    date_modified: string;
    file: string;
    id: string;
    title: string;
    type: any;
    name: string;
  }
  //for fetch data
  const [data, setData] = useState<any>([]);
  const [file, setFile] = useState<File>();
  const [post, setPost] = useState<PostProps[]>();
  const [searchTitle, setSearchTitle] = useState<string>("");
  const [searchType, setSearchType] = useState<number>();
  const [searchDateStart, setSearchDateStart] = useState<string>();
  const [searchDateEnd, setSearchDateEnd] = useState<string>();
  useEffect(() => {
    handlefetchPost();
  }, []);
  const handlefetchPost = async () => {
    const response = await getProjects();

    console.log(response);
    setPost(response.data);
  };

  return (
    <div className="flex flex-col   z-20 px-10 mt-24 w-screen bg-white h-screen ">
      <div>
        {isOpened && <NotiPopup onClose={onClose} message={message} />}
        <a
          className="absolute bg-blue animate-bounce left-5 top-5
        border text-sm font-medium border-neutral-200 dark:border-white/[0.2] text-black dark:text-white px-4 py-2 rounded-full
        "
          href="/"
        >
          <span>Back</span>
          <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent  h-px" />
        </a>
        <button
          className="absolute bg-blue animate-bounce left-5 top-14
        border text-sm font-medium border-neutral-200 dark:border-white/[0.2] text-black dark:text-white px-4 py-2 rounded-full
        "
          onClick={login2}
        >
          <span>Login</span>
          <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent  h-px" />
        </button>
      </div>
      <div className="flex place-content-center">
        <div className="flex flex-col  bg-white z-20 px-10 w-full h-full ">
          <a
            className="absolute bg-blue animate-bounce left-5 top-5
        border text-sm font-medium border-neutral-200 dark:border-white/[0.2] text-black dark:text-white px-4 py-2 rounded-full
        "
            href="/"
          >
            <span>Back</span>
            <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent  h-px text-black-100" />
          </a>

          <div className="flex flex-col  bg-white text-black mt-28">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-40 self-center mb-4
        "
              onClick={() => setIsCreating(!isCreating)}
            >
              <span> Tạo bài viết mới </span>
            </button>
            {isCreating && (
              <div className="flex flex-col md:flex-row gap-4 justify-between w-full mb-4">
                <div className="relative h-11 w-full min-w-[50px]">
                  <input
                    type="text"
                    placeholder="Tiêu đề bài viết"
                    onChange={(e) => setTitle(e.target.value)}
                    className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                  />
                  <label className="after:content[''] pointer-events-none absolute left-0  -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                    Tiêu đề bài viết
                  </label>
                </div>
                <div className="relative h-11 w-full min-w-[50px]">
                  <input
                    type="text"
                    placeholder="Mô tả"
                    onChange={(e) => setDescription(e.target.value)}
                    className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                  />
                  <label className="after:content[''] pointer-events-none absolute left-0  -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                    Mô tả
                  </label>
                </div>
                <div className="relative h-11 w-full min-w-[50px]">
                  <input
                    type="text"
                    placeholder="Tác giả"
                    onChange={(e) => setAuthor(e.target.value)}
                    className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                  />
                  <label className="after:content[''] pointer-events-none absolute left-0  -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                    Tác giả
                  </label>
                </div>
                <div className="relative h-11 w-full min-w-[50px]">
                  <select
                    className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                    onChange={(e) => setType(parseInt(e.target.value))}
                  >
                    <option value={1}>Tin tức</option>
                    <option value={2}>Sự kiện</option>
                    <option value={3}>Hình ảnh</option>
                    <option value={4}>Video</option>
                    <option value={5}>Báo cáo</option>
                    <option value={6}>Khác</option>
                  </select>
                  <label className="after:content[''] pointer-events-none absolute left-0  -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                    Select a City
                  </label>
                </div>

                <button
                  className="w-full min-w-[50px] flex items-center justify-center  bg-white border-green-400 border-2 font-bold rounded-lg dark:bg-green-400 dark:border-green-400 dark:text-white
            dark:hover:bg-white dark:hover:text-green-400 dark:hover:border-green-400
    hover:bg-green-400 hover:text-white transition duration-300 ease-in-out text-green-400 h-11 "
                  onClick={handleCreate}
                >
                  <div className=""> Xác nhận tạo </div>
                </button>
              </div>
            )}
            <div className="flex gap-3 lg:flex-row flex-col">
              <input
                type="text"
                placeholder="Tìm kiếm"
                value={searchTitle}
                onChange={(e) => setSearchTitle(e.target.value)}
                className="bg-white border border-gray-300 rounded-lg px-4 py-2 w-full lg:w-2/3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
              />
              <div
                className="
            bg-white border border-gray-300 rounded-lg px-4 py-2 w-full lg:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black
            flex-row  flex place-content-between
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
                    onChange={(e) => setSearchDateStart(e.target.value)}
                    className="bg-white border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black  min-w-[50px]"
                  >
                    <option value="2015">2015</option>
                    <option value="2016">2016</option>
                    <option value="2017">2017</option>
                    <option value="2018">2018</option>
                    <option value="2019">2019</option>
                    <option value="2020">2020</option>
                    <option value="2021">2021</option>
                    <option value="2022">2022</option>
                    <option value="2023">2023</option>
                    <option value="2024">2024</option>
                  </select>
                </div>
                <div className="flex justify-center">
                  <span className=" text-gray-400 font-bold mx-2 self-center">
                    Đến
                  </span>
                  <select
                    name="date_end"
                    id=""
                    onChange={(e) => setSearchDateEnd(e.target.value)}
                    className="bg-white border border-gray-300 rounded-lg px-4 py-2  min-w-[50px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                  >
                    <option value="2015">2015</option>
                    <option value="2016">2016</option>
                    <option value="2017">2017</option>
                    <option value="2018">2018</option>
                    <option value="2019">2019</option>
                    <option value="2020">2020</option>
                    <option value="2021">2021</option>
                    <option value="2022">2022</option>
                    <option value="2023">2023</option>
                    <option value="2024">2024</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-5 gap-5 my-5 h-16 border-b-slate-300 border-spacing-2 border-b-2 ">
              <button
                onClick={() => setSearchType(1)}
                className="bg-white text-gray-400 hover:bg-gray-200  font-bold py-2 px-4 rounded pb-1"
              >
                Tin tức
              </button>
              <button
                onClick={() => setSearchType(2)}
                className="bg-white text-gray-400 hover:bg-gray-200  font-bold py-2 px-4 rounded pb-1"
              >
                Sự kiện
              </button>
              <button
                onClick={() => setSearchType(3)}
                className="bg-white text-gray-400 hover:bg-gray-200  font-bold py-2 px-4 rounded pb-1"
              >
                Hình ảnh
              </button>
              <button
                onClick={() => setSearchType(4)}
                className="bg-white text-gray-400 hover:bg-gray-200  font-bold py-2 px-4 rounded pb-1"
              >
                Video
              </button>
              <button
                onClick={() => setSearchType(5)}
                className="bg-white text-gray-400 hover:bg-gray-200  font-bold py-2 px-4 rounded pb-1"
              >
                Tài liệu
              </button>
            </div>
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handlefetchPost}
          >
            Tìm kiếm
          </button>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {post?.map((item) => (
              <div key={item.id}>
                <RecentProjects
                  id={item.id}
                  author={item.author}
                  date_created={item.date_created}
                  date_modified={item.date_modified}
                  file={item.file}
                  title={item.title}
                  type={item.type}
                  name={item.name}
                  reloadFunction={handlefetchPost}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="self-center mt-4 grid grid-cols-2 gap-5"></div>
    </div>
  );
}
