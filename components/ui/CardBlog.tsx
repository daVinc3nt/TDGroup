"use client";

import { FaLocationArrow } from "react-icons/fa6";
import { getFile, GettingFileCriteria } from "@/lib/main";
import { PinContainer } from "./Pin";
interface PostProps {
  author: string;
  date_created: string;
  date_modified: string;
  file: string;
  id: string;
  title: string;
  type: any;
}
const RecentProjects = (projects: PostProps) => {
  const handlefetchFile = async (e: string) => {
    try {
      const response = await getFile({ id: e });

      console.log("id", e);
      console.log(response);
      if (response.error) {
        alert("Error fetching file");
      } else {
        alert("File fetched successfully");
        window.open(response.data, "_blank");
      }
    } catch (e) {
      console.log(e);
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
              {projects.title}
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

            <button
              className="flex items-center justify-between mt-7 mb-3"
              onClick={() => handlefetchFile(projects.id)}
            >
              <div className="flex justify-center items-center">
                <p className="flex lg:text-xl md:text-xs text-sm text-purple">
                  Read more
                </p>
                <FaLocationArrow className="ms-3" color="#CBACF9" />
              </div>
            </button>
          </PinContainer>
        </div>
      </div>
    </div>
  );
};

export default RecentProjects;