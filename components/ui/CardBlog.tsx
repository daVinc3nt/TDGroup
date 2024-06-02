"use client";
import { useRouter } from "next/navigation";
import { FaLocationArrow } from "react-icons/fa6";
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
  file: string;
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
      const response = await deleteProject({
        project_id: projects.id,
      });
      console.log(response);
      projects.reloadFunction();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="">
      <div className="flex flex-wrap items-center justify-center p-4 gap-16">
        <div
          className="lg:min-h-[32.5rem] h-[25rem] flex items-center justify-center sm:w-96 w-[80vw]"
          key={projects.id}
        >
          <PinContainer
            title="/ui.aceternity.com"
            href="https://twitter.com/mannupaaji"
          >
            <button
              className="end-0 self-end
          bg-red-500 text-white rounded-lg p-2
          hover:bg-red-600 transition duration-300 ease-in-out
            
          "
              onClick={handleDelete}
            >
              Delete
            </button>
            <div className="relative flex items-center justify-center sm:w-96 w-[80vw] overflow-hidden h-[20vh] lg:h-[30vh] mb-10">
              <div
                className="relative w-full h-full overflow-hidden lg:rounded-3xl"
                style={{ backgroundColor: "#13162D" }}
              >
                <img src="/bg.png" alt="bgimg" />
              </div>
              {/* <img
                  src={projects.}
                  alt="cover"
                  className="z-10 absolute bottom-0"
                /> */}
            </div>

            <p
              className="lg:text-xl lg:font-normal font-light text-sm line-clamp-2"
              style={{
                color: "#BEC1DD",
                margin: "1vh 0",
              }}
            >
              Tiêu đề: {projects.title}
            </p>
            <p
              className="lg:text-xl lg:font-normal font-light text-sm line-clamp-2"
              style={{
                color: "#BEC1DD",
                margin: "1vh 0",
              }}
            >
              Tác giả: {projects.author}
            </p>
            <p
              className="lg:text-xl lg:font-normal font-light text-sm line-clamp-2"
              style={{
                color: "#BEC1DD",
                margin: "1vh 0",
              }}
            >
              Ngày đăng tải{" "}
              {new Date(projects.date_created).toLocaleDateString()}
            </p>

            <a
              className="flex items-center justify-between mt-7 mb-3"
              href={`/specify/${projects.id}/${projects.name}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="flex justify-center items-center">
                <p className="flex lg:text-xl md:text-xs text-sm text-purple">
                  Xem chi tiết
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
