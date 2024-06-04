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
import { PinContainer } from "./Pin";
interface PostProps {
  author: string;
  date_created: string;
  date_modified: string;
  files: any;
  id: string;
  title: string;
  type: any;
  name: string;
  reloadFunction: () => Promise<void>;
}
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
  return (
    <div className="">
      <div className="flex flex-wrap items-center justify-center p-2 gap-4">
        <div
          className="lg:min-h-[32.5rem] h-[25rem] flex items-center justify-center sm:w-96 w-[60vw]"
          key={projects.id}
        >
          <PinContainer
          // title={`/specify/${projects.id}/${projects.name}`}
          // href={`/specify/${projects.id}/${projects.name}`}
          >
            <button
              className="
          bg-red-500 text-white rounded-lg p-2
          hover:bg-red-600 transition duration-300 ease-in-out
          flex end-0 self-end z-20 absolute
            
          "
              onClick={handleDelete}
            >
              Delete
            </button>

            <a
              className="relative flex items-center justify-center sm:w-48 lg:w-64 w-[40vw] overflow-hidden h-[15vh] lg:h-[20vh] mb-5"
              href={`/specify/${projects.id}/${projects.name}`}
              target="_blank"
            >
              <div
                className="relative w-full h-full overflow-hidden lg:rounded-3xl"
                // style={{ backgroundColor: "#13162D" }}
              >
                {!img ? (
                  <img src="/bg.png" alt="bgimg" />
                ) : (
                  <img
                    src={img}
                    alt="blobURL"
                    className="z-10 absolute center object-cover w-full h-full rounded-lg"
                  />
                )}
              </div>
            </a>

            <a
              className="lg:text-xl lg:font-normal font-light text-sm line-clamp-2"
              style={{
                color: "#BEC1DD",
                margin: "1vh 0",
              }}
              href={`/specify/${projects.id}/${projects.name}`}
              target="_blank"
            >
              Tiêu đề: {projects.title}
            </a>
            <a
              className="lg:text-xl lg:font-normal font-light text-sm line-clamp-2"
              style={{
                color: "#BEC1DD",
                margin: "1vh 0",
              }}
              href={`/specify/${projects.id}/${projects.name}`}
              target="_blank"
            >
              Tác giả: {projects.author}
            </a>
            <a
              className="lg:text-xl lg:font-normal font-light text-sm line-clamp-2"
              style={{
                color: "#BEC1DD",
                margin: "1vh 0",
              }}
              href={`/specify/${projects.id}/${projects.name}`}
              target="_blank"
            >
              Ngày đăng tải{" "}
              {new Date(projects.date_created).toLocaleDateString()}
            </a>

            <a
              className="flex items-center justify-between mt-7 mb-3"
              href={`/specify/${projects.id}/${projects.name}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="flex justify-center items-center">
                <p className="flex lg:text-xl md:text-xs text-sm text-purple">
                  Chỉnh sửa
                </p>
                <FaLocationArrow className="ms-3" color="#CBACF9" />
              </div>
            </a>
          </PinContainer>
        </div>
      </div>
    </div>
  );
};

export default RecentProjects;
