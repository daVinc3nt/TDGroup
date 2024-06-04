"use client";
import React, { useEffect, useRef, useState } from "react";
import "quill/dist/quill.snow.css";
import parse from "html-react-parser";
import {
  uploadFileBelongToProject,
  UploadingFileInfo,
  savePost,
  getFile,
} from "@/lib/main";
import IMGPopUp from "./inputIMG";
import NotiPopup from "@/components/ui/NotificationPop";
import Quill from "quill";
import ImageResize from "quill-image-resize-module-react";
import { useParams } from "next/navigation";

Quill.register("modules/imageResize", ImageResize);

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
  const [editorContent, setEditorContent] = useState("");
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

  const view = useRef<any | null>(null);
  const viewRef = useRef<HTMLDivElement | null>(null);

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
    if (viewRef.current && HTML) {
      viewRef.current.innerHTML = HTML;
      console.log("viewRef", viewRef.current.innerHTML);
      view.current = new Quill(viewRef.current, {
        theme: "snow",
        readOnly: true,
        // Comment out or remove the modules attribute to remove the toolbar
        modules: {
          toolbar: false,
          imageResize: {
            parchment: Quill.import("parchment"),
            modules: ["Resize", "DisplaySize"],
            displayStyles: {
              backgroundColor: "black",
              border: "none",
              color: "white",
              align: "center",
              margin: "0px",
            },
          },
        },
      });
      view.current.clipboard.dangerouslyPasteHTML(HTML);
      console.log("Initialized Quill", view.current);
    }
  }, [HTML]);

  useEffect(() => {
    // replace base64 image to url
    const handleImageUpload = () => {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*";
      input.click();
      input.onchange = async () => {
        const file = input.files[0];
        let randomFileName =
          Math.random().toString(36).substring(2) +
          Date.now().toString() +
          ".png";
        let newFile = new File([file], randomFileName, {
          type: file.type,
        });

        let formData = new FormData();
        formData.append("file", file);
        const data: UploadingFileInfo = {
          file: newFile,
          project_id: project_id,
        };
        console.log("data", data);
        let response = await uploadFileBelongToProject(data);
        console.log("fileimg", response);
        if (response?.error === true) {
          let result = await response.data.pathName;
          let url = `http://localhost:3001/v1/files?path=${result.replace(
            /^C:\\temp3\\TienDungCorp-1\\file_server\\uploads\\main\\/,
            ""
          )}&option=default`;

          http: console.log(url);
          let range = quillRef.current.getSelection(true);
          quillRef.current.insertEmbed(range.index, "image", url);
        } else {
          console.error("Failed to upload image");
        }
      };
    };
    if (typeof window === "undefined") return;
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
            // handlers: {
            //   image: handleImageUpload,
            // },
          },
          imageResize: {
            parchment: Quill.import("parchment"),
            modules: ["Resize", "DisplaySize"],
            displayStyles: {
              backgroundColor: "black",
              border: "none",
              color: "white",
              align: "center",
              margin: "0px",
            },
          },
        },
      });

      // Set the default content
      quillRef.current.clipboard.dangerouslyPasteHTML(HTML);
      console.log("Initialized Quill", quillRef.current);
      quillRef.current.on("text-change", function (delta, oldDelta, source) {
        if (source === "user") {
          setEditorContent(quillRef.current.root.innerHTML);
        }
      });
    }
  }, [HTML]);
  useEffect(() => {
    if (viewRef.current && editorContent) {
      viewRef.current.innerHTML = editorContent;
      if (view.current) {
        view.current.clipboard.dangerouslyPasteHTML(editorContent);
      }
    }
  }, [editorContent]);
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
    try {
      const response = await savePost(fileInfo);
      console.log("response", response);
      if (response.success) {
        onOpen(response.message);
        return;
      }
      onOpen(response.message || "Failed to save post");
    } catch (e) {
      onOpen("Xảy ra lỗi hệ thống, vui lòng thử lại sau!");
    }
  };

  const [content, setContent] = useState("");
  const [files, setFiles] = useState([]);
  const onEditorChange = (value) => {
    setContent(value);
    console.log(content);
  };

  const onFilesChange = (files) => {
    setFiles(files);
  };

  //for upload image
  const [imgOpen, setImgOpen] = useState(false);
  const imgOpenHandler = () => {
    setImgOpen(true);
  };
  const imgCloseHandler = () => {
    setImgOpen(false);
  };

  return (
    <div className="flex flex-col justify-center place-content-center   z-20 px-10 mt-24 ">
      <div>
        {isOpened && <NotiPopup onClose={onClose} message={message} />}
        <a
          className="absolute bg-blue left-5 top-5
        border  border-neutral-200  
         inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white  focus:ring-4 focus:outline-none focus:ring-green-200    "
          href="/specify"
        >
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white  rounded-md group-hover:bg-opacity-0">
            Trở về
          </span>
        </a>
      </div>

      <div className="grid grid-cols-1 gap-2">
        <div>
          <div
            className="text-center text-3xl font-bold mb-4  subpixel-antialiased bg-clip-text 
      text-blacktext-opacity-90  rounded-xl
        border border-white border-spacing-2
      "
          >
            Editor
          </div>
          <div className="border  border-white border-spacing-2 rounded-xl ">
            <div ref={editorRef} className="quill-editor "></div>
          </div>
        </div>
        {/* <div>
          <div
            className="text-center text-3xl font-bold mb-4  subpixel-antialiased bg-clip-text 
      text-blacktext-opacity-90  rounded-xl
        border border-white border-spacing-2
      "
          >
            View
          </div>
          <div ref={viewRef}></div>
        </div> */}
      </div>
      {imgOpen && (
        <IMGPopUp onClose={imgCloseHandler} project_id={project_id} />
      )}
      <div className="w-full flex flex-col mt-4">
        <div className="w-full justify-center flex">
          <button
            className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white focus:ring-4 focus:outline-none "
            onClick={imgOpenHandler}
          >
            <span className="relative px-10 py-2.5 transition-all ease-in duration-75 bg-white  rounded-md group-hover:bg-opacity-0">
              Thêm ảnh hiển thị trên trang chủ
            </span>
          </button>
        </div>
        <div className="w-full justify-center flex">
          <button
            className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white focus:ring-4 focus:outline-none "
            onClick={handleSave}
          >
            <span className="relative px-10 py-2.5 transition-all ease-in duration-75 bg-white  rounded-md group-hover:bg-opacity-0">
              Lưu{" "}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
