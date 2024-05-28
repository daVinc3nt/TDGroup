"use client";
import React, { useEffect, useRef, useState } from "react";
import "quill/dist/quill.snow.css";
import { UploadingPostPayload, uploadPost } from "@/lib/main";
export default function Writing() {
  useEffect(() => {
    const button = document.getElementById("dropdownSearchButton");
    const dropdown = document.getElementById("dropdownSearch");

    // Đảm bảo rằng dropdown ban đầu được ẩn
    if (dropdown) {
      dropdown.style.display = "none";
    }

    const toggleDropdown = () => {
      if (dropdown.style.display === "none") {
        dropdown.style.display = "block";
      } else {
        dropdown.style.display = "none";
      }
    };

    if (button) {
      button.addEventListener("click", toggleDropdown);
    }

    // Dọn dẹp khi component unmount
    return () => {
      if (button) {
        button.removeEventListener("click", toggleDropdown);
      }
    };
  }, []);
  const quillRef = useRef<any | null>(null);
  const editorRef = useRef<HTMLDivElement | null>(null);
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [category, setCategory] = useState<string[] | undefined>([]);
  const handleCategory = (event: any) => {
    if (event.target.checked) {
      setCategory([...category, event.target.value]);
    } else {
      setCategory(category.filter((item) => item !== event.target.value));
    }
    console.log(category);
  };
  useEffect(() => {
    const Quill = require("quill");
    if (editorRef.current && !quillRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"], // toggled buttons
            ["blockquote", "code-block"],

            [{ header: 1 }, { header: 2 }], // custom button values
            [{ list: "ordered" }, { list: "bullet" }],
            [{ script: "sub" }, { script: "super" }], // superscript/subscript
            [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
            [{ direction: "rtl" }], // text direction

            [{ size: ["small", false, "large", "huge"] }], // custom dropdown
            [{ header: [1, 2, 3, 4, 5, 6, false] }],

            [{ color: [] }, { background: [] }], // dropdown with defaults from theme
            [{ font: [] }],
            [{ align: [] }],

            ["clean"], // remove formatting button

            ["link", "image", "video"], // link and image, video
          ],
        },
      });
    }
    console.log(quillRef.current);
  }, []);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const data = quillRef.current?.root.innerHTML;

    const dataSend: UploadingPostPayload = {
      title: title,
      author: "admin",
      file: new File(
        [new Blob([JSON.stringify(data)], { type: "application/json" })],
        `${title}.json`
      ),
    };
    console.log("File data", data);
    console.log("Data Send", dataSend);
    try {
      const response = await uploadPost(dataSend);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col   z-20 px-10 mt-52 ">
      <div
        className="text-center text-3xl font-bold mb-4  subpixel-antialiased  text-transparent bg-clip-text 
      text-black-100"
      >
        Write your News here !!!
      </div>
      <div className="border  border-black border-spacing-2 rounded-lg ">
        <div ref={editorRef} className="">
          <p>Hello World!</p>
          <p>
            Some initial <strong>bold</strong> text
          </p>
          <p>
            <br />
          </p>
        </div>
      </div>

      <div className="self-center mt-4 gap-5 grid grid-cols-2 ">
        <input
          type="text"
          placeholder="Tiêu đề bài viết"
          onChange={(e) => setTitle(e.target.value)}
          className="border-2 border-black rounded-lg  font-bold text-center w-48 h-14"
        />
        <input
          type="text"
          placeholder="Mô tả bài viết"
          onChange={(e) => setDescription(e.target.value)}
          className="border-2 border-black rounded-lg  font-bold text-center w-48 h-14"
        />
      </div>
      <div className="self-center mt-4 grid grid-cols-2 gap-5">
        <div>
          <button
            id="dropdownSearchButton"
            data-dropdown-toggle="dropdownSearch"
            className="items-center text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 w-48 h-14 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex justify-center " // Thêm flex, justify-center, items-center vào đây
            type="button"
          >
            Chủ đề
            <svg
              className="w-2.5 h-2.5 ms-2.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>

          <div
            id="dropdownSearch"
            className="z-10 hidden bg-white rounded-lg shadow dark:bg-gray-700 "
          >
            <div className="w-full">
              <label htmlFor="input-group-search" className="sr-only">
                Tìm kiếm
              </label>
              <div className="relative items-center">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  id="input-group-search"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-48 ps-10 py-2.5  dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search "
                />
              </div>
            </div>
            <ul
              className="h-48 px-3 pb-3   overflow-y-hidden text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownSearchButton"
            >
              <li>
                <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                  <input
                    id="checkbox-item-11"
                    type="checkbox"
                    value="1"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    onChange={handleCategory}
                  />
                  <label
                    htmlFor="checkbox-item-11"
                    className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                  >
                    Tin tức
                  </label>
                </div>
              </li>
              <li>
                <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                  <input
                    id="checkbox-item-12"
                    type="checkbox"
                    value="2"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    onChange={handleCategory}
                  />
                  <label
                    htmlFor="checkbox-item-12"
                    className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                  >
                    Sự kiện
                  </label>
                </div>
              </li>
              <li>
                <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                  <input
                    id="checkbox-item-13"
                    type="checkbox"
                    value="3"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    onChange={handleCategory}
                  />
                  <label
                    htmlFor="checkbox-item-13"
                    className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                  >
                    Công nghệ
                  </label>
                </div>
              </li>
              <li>
                <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                  <input
                    id="checkbox-item-14"
                    type="checkbox"
                    value="4"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    onChange={handleCategory}
                  />
                  <label
                    htmlFor="checkbox-item-14"
                    className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                  >
                    Dịch vụ
                  </label>
                </div>
              </li>
              <li>
                <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                  <input
                    id="checkbox-item-15"
                    type="checkbox"
                    value="5"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    onChange={handleCategory}
                  />
                  <label
                    htmlFor="checkbox-item-15"
                    className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                  >
                    Lịch sử
                  </label>
                </div>
              </li>
              <li>
                <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                  <input
                    id="checkbox-item-16"
                    type="checkbox"
                    value="6"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    onChange={handleCategory}
                  />
                  <label
                    htmlFor="checkbox-item-16"
                    className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                  >
                    Khác
                  </label>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <button
          className="flex items-center justify-center  py-2 bg-white border-red-400 border-2 font-bold rounded-lg
  hover:bg-red-400 hover:text-white transition duration-300 ease-in-out text-red-400 h-14 w-48 "
          onClick={handleSubmit}
        >
          <div className=""> Đăng tải </div>
        </button>
      </div>
    </div>
  );
}
