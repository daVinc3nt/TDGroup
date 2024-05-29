"use client";
import React, { useEffect, useRef, useState } from "react";
import "quill/dist/quill.snow.css";
import { UploadingPostPayload, uploadPost } from "@/lib/main";
import NotiPopup from "@/components/ui/NotificationPop";

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
  const [category, setCategory] = useState(null);

  const [isOpened, setIsOpened] = useState(false);
  const [message, setMessage] = useState("");
  const onClose = () => {
    setIsOpened(false);
  };
  const onOpen = (e: any) => {
    setMessage(e);
    setIsOpened(true);
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
      type: category,
    };
    console.log("File data", data);
    console.log("Data Send", dataSend);
    try {
      const response = await uploadPost(dataSend);
      console.log(response);
      if (response.error.success === false) {
        onOpen(response.error.message);
        return;
      }
      onOpen("Đăng bài viết thành công");
    } catch (error) {
      console.log(error);
      onOpen("Đã có lỗi xảy ra, vui lòng thử lại sau");
    }
  };
  return (
    <div className="flex flex-col   z-20 px-10 mt-24 ">
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
      </div>
      <div
        className="text-center text-3xl font-bold mb-4  subpixel-antialiased bg-clip-text 
      text-black
        dark:text-white dark:bg-clip-text dark:text-opacity-90 
      "
      >
        Viết bài viết
      </div>
      <div className="border  border-black border-spacing-2 rounded-lg ">
        <div ref={editorRef} className="min-h-80">
          <p>Hello {"(~^^~)"} </p>
          <p>
            Nôi dung bài viết sẽ được viết ở đây, bạn có thể thêm hình ảnh,
            video, đường dẫn,...
          </p>
          <p>
            <br />
          </p>
        </div>
      </div>

      <div className="self-center mt-4 gap-5 grid grid-cols-1 md:grid-cols-3 ">
        <input
          type="text"
          placeholder="Tiêu đề bài viết"
          onChange={(e) => setTitle(e.target.value)}
          className="border-2 border-black rounded-lg  font-bold text-center w-48 h-14 hover:border-blue-500 focus:border-blue-500 dark:border-gray-500 dark:hover:border-blue-500 dark:focus:border-blue-500
            focus:ring-2 dark:focus:ring-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200"
        />
        <div>
          <button
            id="dropdownSearchButton"
            data-dropdown-toggle="dropdownSearch"
            className="items-center font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 w-48 h-14 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex justify-center " // Thêm flex, justify-center, items-center vào đây
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
            className="z-10 hidden bg-white  rounded-lg shadow dark:bg-gray-700 mt-2"
          >
            <div className="w-full">
              <label htmlFor="input-group-search" className="sr-only">
                Tìm kiếm
              </label>
            </div>
            <ul
              className="h-48 px-3 pb-3  absolute bg-white w-48 rounded-lg overflow-y-scroll text-sm text-gray-700 dark:text-gray-200 border border-spacing-2 border-black
              dark:bg-slate-600
              "
              aria-labelledby="dropdownSearchButton"
            >
              <li>
                <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                  <input
                    id="checkbox-item-11"
                    type="radio"
                    name="category"
                    value="1"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    onChange={() => setCategory(1)}
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
                    type="radio"
                    name="category"
                    value="2"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    onChange={() => setCategory(2)}
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
                    type="radio"
                    name="category"
                    value="3"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    onChange={() => setCategory(3)}
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
                    type="radio"
                    name="category"
                    value="4"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    onChange={() => setCategory(4)}
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
                    type="radio"
                    name="category"
                    value="5"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    onChange={() => setCategory(5)}
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
                    type="radio"
                    name="category"
                    value="6"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    onChange={() => setCategory(6)}
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
          className="flex items-center justify-center  py-2 bg-white border-green-400 border-2 font-bold rounded-lg dark:bg-green-400 dark:border-green-400 dark:text-white
          dark:hover:bg-white dark:hover:text-green-400 dark:hover:border-green-400
  hover:bg-green-400 hover:text-white transition duration-300 ease-in-out text-green-400 h-14 w-48 "
          onClick={handleSubmit}
        >
          <div className=""> Đăng tải </div>
        </button>
      </div>
      <div className="self-center mt-4 grid grid-cols-2 gap-5"></div>
    </div>
  );
}
