"use client";
import NewsBlogSec1 from "@/components/NewsBlog/NewsBlogSec1";
import NewsBlogSec2 from "@/components/NewsBlog/NewsBlogSec2";
import NewsBlogSec3 from "@/components/NewsBlog/NewsBlogSec3";
import ScrollToTopButton from "@/components/NewsBlog/ScrollToTop";
import Slider from "@/components/Slider/ImageSlider";
import RecentProjects from "./components/CardBlog";
import { GettingPostCriteria, getProjects } from "@/lib/main";
import { useContext, useEffect, useState } from "react";
import OptionButton from "./components/OptionButton";
import { motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useSearchContext } from "@/providers/SearchProvider";

export default function News() {

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

  const [post, setPost] = useState<PostProps[]>();
  const [post2, setPost2] = useState<PostProps[]>(null);
  const { searchTitle, setSearchTitle } = useSearchContext();
  const [searchType, setSearchType] = useState<number>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    handlefetchPost2();
  }, []);

  const handlefetchPost = async () => {
    const data: GettingPostCriteria = {};
    if (searchTitle) {
      data.title = searchTitle;
    }
    if (searchType) {
      data.type = searchType;
    }
    const response = await getProjects(data);
    setPost(response.data);
  };

  const handlefetchPost2 = async () => {
    const data: GettingPostCriteria = {};
    const response = await getProjects(data);
    setPost2(response.data);
  };

  const [POSTS_PER_PAGE, setPOSTS_PER_PAGE] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastPost = currentPage * POSTS_PER_PAGE;
  const indexOfFirstPost = indexOfLastPost - POSTS_PER_PAGE;
  const currentPosts = post?.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const PAGE_NUMBERS_TO_SHOW = 5;
  const totalPosts = post?.length || 0;
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

  let startPage = Math.max(
    currentPage - Math.floor(PAGE_NUMBERS_TO_SHOW / 2),
    1
  );
  let endPage = Math.min(startPage + PAGE_NUMBERS_TO_SHOW - 1, totalPages);

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

  const handleChangeType = async (e: number) => {
    setSearchType(e);
  };

  useEffect(() => {
    handlefetchPost();
  }, [searchType, searchTitle]);

  const buttonLabels = [
    { id: null, label: "Tất cả" },
    { id: 1, label: "Tin tức" },
    { id: 2, label: "Sự kiện" },
    { id: 3, label: "Hình ảnh" },
    { id: 4, label: "Video" },
    { id: 5, label: "Tài liệu" },
    { id: 6, label: "Khác" },
    { id: 7, label: "Dự án" },
  ];

  const renderButton = (id, label) => (
    <button
      key={id}
      onClick={() => handleChangeType(id)}
      className={`text-gray-400 font-bold py-2 px-4 rounded pb-1 whitespace-nowrap
      ${searchType === id ? "bg-gray-200" : "bg-white"}
      ${id === null ? "md:col-span-1" : ""}
    `}
    >
      {label}
    </button>
  );

  const handleButtonClick = () => {
    const heightInput = document.getElementById("posts");
    if (heightInput) {
      const elementPosition = heightInput.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - 180;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="relative w-full overflow-y-auto">
      <NewsBlogSec1 search={searchTitle} setSearch={setSearchTitle} />
      {post2 ? <NewsBlogSec2 post={post2} /> : <div className="h-[450px] bg-red-500 w-full"></div>}
      <div className="flex flex-col bg-white z-20 px-4 md:px-10 md:pt-10 mt-4 w-full" id="posts">
        <div className="flex flex-col bg-white text-black">
          <div className="flex gap-3 lg:flex-row flex-col">
            <input
              type="text"
              placeholder="Tìm kiếm"
              value={searchTitle}
              onChange={(e) => setSearchTitle(e.target.value)}
              className={`bg-white border border-gray-300 rounded-full px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-black`}
            />
          </div>
          <div className="hidden md:block relative w-full mt-4">
            <div className="flex flex-grow w-full">
              {buttonLabels.map(({ id, label }) => (
                <OptionButton
                  key={id}
                  id={id}
                  labelId={label}
                  option={searchType}
                  setOption={setSearchType}
                />
              ))}
            </div>
            <motion.div
              className="absolute bottom-0 h-[2px] bg-red-500"
              initial={{ width: 0 }}
              animate={{
                width: "12.5%",
                left: `${(1 / 8) * 100 * (searchType !== null ? searchType : 0)}%`,
              }}
              exit={{ width: 0 }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <div className="md:hidden mt-4">
            <div className="border border-gray-300 pr-2 bg-white rounded-full">
              <select
                className="px-4 py-2 w-full focus:outline-none text-black rounded-full"
                value={searchType !== null ? searchType : ""}
                onChange={(e) => handleChangeType(e.target.value ? Number(e.target.value) : null)}
              >
                {buttonLabels.map(({ id, label }) => (
                  <option key={id} value={id !== null ? id : ""}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

          </div>
        </div>

        <div className="justify-center grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
                  news="news"
                />
              </div>
            ))}
        </div>
        {post?.length === 0 && (
          <div className="text-center w-full h-96 flex justify-center place-items-center">
            Không có bài viết nào
          </div>
        )}
        <div className="flex justify-center my-2">
          <div className="rounded-full px-4 py-2">
            <div className="flex justify-center my-2">
              <div className="rounded-full px-4 py-2">
                <div className="flex items-center gap-2 text-gray-600 font-medium">
                  <button
                    className={`rounded-full px-4 py-2 transition duration-300 ease-in-out ${currentPage === 1
                      ? "text-gray-300 cursor-not-allowed"
                      : "hover:bg-white hover:text-gray-600"
                      }`}
                    onClick={() => {
                      if (currentPage > 1) {
                        paginate(currentPage - 1);
                      }
                    }}
                    disabled={currentPage === 1}
                  >
                    <FaChevronLeft />
                  </button>
                  {Array.from(
                    { length: endPage - startPage + 1 },
                    (_, i) => startPage + i
                  ).map((pageNumber) => (
                    <button
                      className={`rounded-full px-4 py-2 transition duration-300 ease-in-out ${currentPage === pageNumber
                        ? "text-white bg-[#EE0033]"
                        : "hover:bg-white hover:text-gray-600 bg-white shadow-inner"
                        }`}
                      key={pageNumber}
                      onClick={() => paginate(pageNumber)}
                    >
                      {pageNumber}
                    </button>
                  ))}
                  <button
                    className={`rounded-full px-4 py-2 transition duration-300 ease-in-out ${currentPage >= totalPages
                      ? "text-gray-300 cursor-not-allowed"
                      : "hover:bg-white hover:text-gray-600"
                      }`}
                    onClick={() => {
                      if (currentPage < totalPages) {
                        paginate(currentPage + 1);
                      }
                    }}
                    disabled={currentPage >= totalPages}
                  >
                    <FaChevronRight />
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
      <ScrollToTopButton />
    </div>
  );
}
