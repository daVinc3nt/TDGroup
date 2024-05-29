"use client";
import React, { useEffect, useRef, useState } from "react";
import "quill/dist/quill.snow.css";
import {
  UploadingPostPayload,
  uploadPost,
  getFile,
  getPosts,
} from "@/lib/main";
import RecentProjects from "../ui/CardBlog";
interface PostProps {
  author: string;
  date_created: string;
  date_modified: string;
  file: string;
  id: string;
  title: string;
  type: any;
}
export default function Test() {
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
    const response = await getPosts({
      title: searchTitle || undefined,
    });

    console.log(response);
    setPost(response.data);
  };
  const handlefetchFile = async (e: string) => {
    const response = await getFile({ id: e });

    console.log("id", e);
    console.log(response);
  };
  return (
    <div className="flex flex-col  bg-white z-20 px-10 ">
      <a
        className="absolute bg-blue animate-bounce left-5 top-5
        border text-sm font-medium border-neutral-200 dark:border-white/[0.2] text-black dark:text-white px-4 py-2 rounded-full
        "
        href="/"
      >
        <span>Back</span>
        <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent  h-px text-black-100" />
      </a>
      <div className="flex flex-col bg-white text-black mt-28">
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Tìm kiếm"
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}
            className="bg-white border border-gray-300 rounded-lg px-4 py-2 w-2/3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
          />
          <div
            className="
            bg-white border border-gray-300 rounded-lg px-4 py-2 w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black
          "
          >
            <span className="text-gray-400 font-bold mx-2"> Thời gian từ</span>
            <select
              name="date_start"
              id=""
              onChange={(e) => setSearchDateStart(e.target.value)}
              className="bg-white border border-gray-300 rounded-lg px-4 py-2 w-1/4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
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

            <span className=" text-gray-400 font-bold mx-2">Đến</span>
            <select
              name="date_end"
              id=""
              onChange={(e) => setSearchDateEnd(e.target.value)}
              className="bg-white border border-gray-300 rounded-lg px-4 py-2 w-1/4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
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
        <div className="grid grid-cols-5 gap-5 my-5 h-16 border-b-slate-300 border-spacing-2 border-b-2">
          <button
            onClick={() => setSearchType(1)}
            className="bg-white text-gray-400 hover:bg-gray-200  font-bold py-2 px-4 rounded"
          >
            Tin tức
          </button>
          <button
            onClick={() => setSearchType(2)}
            className="bg-white text-gray-400 hover:bg-gray-200  font-bold py-2 px-4 rounded"
          >
            Sự kiện
          </button>
          <button
            onClick={() => setSearchType(3)}
            className="bg-white text-gray-400 hover:bg-gray-200  font-bold py-2 px-4 rounded"
          >
            Hình ảnh
          </button>
          <button
            onClick={() => setSearchType(4)}
            className="bg-white text-gray-400 hover:bg-gray-200  font-bold py-2 px-4 rounded"
          >
            Video
          </button>
          <button
            onClick={() => setSearchType(5)}
            className="bg-white text-gray-400 hover:bg-gray-200  font-bold py-2 px-4 rounded"
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
            />
          </div>
        ))}
      </div>
    </div>
  );
}
