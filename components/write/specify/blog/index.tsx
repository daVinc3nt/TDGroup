"use client";
import React, { useEffect, useRef, useState } from "react";
import "quill/dist/quill.snow.css";
import {
  uploadFileBelongToProject,
  UploadingFileInfo,
  savePost,
  getFile,
  GettingFileCriteria,
  login,
} from "@/lib/main";
import NotiPopup from "@/components/ui/NotificationPop";
import Quill from "quill";
import ImageResize from "quill-image-resize-module-react";
import { Delta } from "quill/core";
import { randomBytes } from "crypto";
import { useParams } from "next/navigation";
Quill.register("modules/imageResize", ImageResize);
// Quill.register("modules/handler", handlerModule);
export default function BlogItem({
  project_id,
  fileName,
}: {
  project_id: string;
  fileName: string;
}) {
  const params = useParams<{ tag: string; item: string }>();
  console.log("hahaha", params);
  const [HTML, setHTML] = useState("");
  useEffect(() => {
    const fetchFile = async () => {
      const response = await getFile({
        project_id: project_id,
        file: "main.html",
      });
      console.log("id&name", project_id, fileName);
      console.log("Openfile", response);
      const blobResponse = await fetch(response.data);
      const html = await blobResponse.text();
      setHTML(html);
      console.log("Blob data as HTML", html);
    };
    fetchFile();
  }, []);
  useEffect(() => {
    const button = document.getElementById("dropdownSearchButton");
    const dropdown = document.getElementById("dropdownSearch");

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

    return () => {
      if (button) {
        button.removeEventListener("click", toggleDropdown);
      }
    };
  }, []);

  const quillRef = useRef<any | null>(null);
  const editorRef = useRef<HTMLDivElement | null>(null);
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
    //replace base64 image to url
    // const handleImageUpload = () => {
    //   const input = document.createElement("input");
    //   input.type = "file";
    //   input.accept = "image/*";
    //   input.click();
    //   input.onchange = async () => {
    //     const file = input.files[0];
    //     let randomFileName =
    //       Math.random().toString(36).substring(2) +
    //       Date.now().toString() +
    //       ".png";
    //     let newFile = new File([file], randomFileName, {
    //       type: file.type,
    //     });

    //     let formData = new FormData();
    //     formData.append("file", file);
    //     const data: uploadImg2 = {
    //       file: newFile,
    //     };
    //     let response = await uploadImg(data);
    //     console.log("fileimg", response);
    //     if (response?.error === true) {
    //       let result = await response.data.pathName;
    //       let url = `http://localhost:3001/v1/files?path=${result.replace(
    //         /^C:\\temp3\\TienDungCorp-1\\file_server\\uploads\\main\\/,
    //         ""
    //       )}&option=default`;

    //       http: console.log(url);
    //       let range = quillRef.current.getSelection(true);
    //       quillRef.current.insertEmbed(range.index, "image", url);
    //     } else {
    //       console.error("Failed to upload image");
    //     }
    //   };
    // };
    // //replace base64 video to url
    // const handleVideoUpload = () => {
    //   const input = document.createElement("input");
    //   input.type = "file";
    //   input.accept = "video/*";
    //   input.click();
    //   input.onchange = async () => {
    //     const file = input.files[0];
    //     let randomFileName =
    //       Math.random().toString(36).substring(2) +
    //       Date.now().toString() +
    //       ".mp4";
    //     let newFile = new File([file], randomFileName, {
    //       type: file.type,
    //     });

    //     let formData = new FormData();
    //     formData.append("file", file);
    //     const data: uploadImg2 = {
    //       file: newFile,
    //     };
    //     let response = await uploadImg(data);
    //     console.log("fileimg", response);
    //     if (response?.error === true) {
    //       let result = await response.data.pathName;
    //       let url = `http://localhost:3001/v1/files?path=${result.replace(
    //         /^C:\\temp3\\TienDungCorp-1\\file_server\\uploads\\main\\/,
    //         ""
    //       )}&option=default`;

    //       http: console.log(url);
    //       let range = quillRef.current.getSelection(true);
    //       quillRef.current.insertEmbed(range.index, "video", url);
    //     } else {
    //       console.error("Failed to upload image");
    //     }
    //   };
    // };
    if (editorRef.current && !quillRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
        modules: {
          toolbar: {
            container: [
              ["bold", "italic", "underline", "strike"],
              ["blockquote", "code-block"],
              [{ header: 1 }, { header: 2 }],
              [{ list: "ordered" }, { list: "bullet" }],
              [{ script: "sub" }, { script: "super" }],
              [{ indent: "-1" }, { indent: "+1" }],
              [{ direction: "rtl" }],
              [{ size: ["small", false, "large", "huge"] }],
              [{ header: [1, 2, 3, 4, 5, 6, false] }],
              [{ color: [] }, { background: [] }],
              [{ font: [] }],
              [{ align: [] }],
              ["clean"],
              ["link", "image", "video"],
            ],
          },
          imageResize: {
            parchment: Quill.import("parchment"),
            modules: ["Resize", "DisplaySize"],
            displayStyles: {
              backgroundColor: "black",
              border: "none",
              color: "white",
              align: "center",
            },
          },
        },
      });

      // Set the default content
      quillRef.current.clipboard.dangerouslyPasteHTML(HTML);
      console.log("Initialized Quill", quillRef.current);
    }
  }, [HTML]);
  useEffect(() => {
    if (HTML && quillRef.current) {
      quillRef.current.clipboard.dangerouslyPasteHTML(HTML);
      console.log("Quill content", quillRef.current.getContents()); // Check the Quill content
    }
  }, [HTML]);

  const handleSave = async () => {
    const data = quillRef.current.root.innerHTML;
    console.log("data", data);

    const file = new File([data], "main.html", {
      type: "text/html",
    });
    const fileInfo: UploadingFileInfo = {
      project_id: project_id,
      file: file,
    };
    const response = await savePost(fileInfo);
    console.log("response", response);
  };
  return (
    <div className="flex flex-col   z-20 px-10 mt-24 ">
      <div>
        {isOpened && <NotiPopup onClose={onClose} message={message} />}
        <a
          className="absolute bg-blue animate-bounce left-5 top-5
        border text-sm font-medium border-neutral-200 dark:border-white/[0.2] text-black dark:text-white px-4 py-2 rounded-full
        "
          href="/specify"
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
        <div ref={editorRef} className="min-h-80"></div>
      </div>

      <div className="self-center mt-4 gap-5 grid grid-cols-1 md:grid-cols-3 ">
        <button
          className="flex items-center justify-center  py-2 bg-white border-green-400 border-2 font-bold rounded-lg dark:bg-green-400 dark:border-green-400 dark:text-white
          dark:hover:bg-white dark:hover:text-green-400 dark:hover:border-green-400
  hover:bg-green-400 hover:text-white transition duration-300 ease-in-out text-green-400 h-14 w-48 "
          onClick={handleSave}
        >
          <div className=""> Lưu </div>
        </button>
      </div>
      <div className="self-center mt-4 grid grid-cols-2 gap-5"></div>
    </div>
  );
}
