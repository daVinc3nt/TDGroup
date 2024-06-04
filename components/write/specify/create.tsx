"use client";
import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CreatingProject, createProject } from "@/lib/main";
import NotiPopup from "@/components/ui/NotificationPop";
interface CreateProps {
  onClose: () => void;
  ref?: any;
  reFetch: () => Promise<void>;
}
const CreatePopUp: React.FC<CreateProps> = ({ onClose, ref, reFetch }) => {
  const notificationRef = useRef<HTMLDivElement>(null);
  const [isOpened, setIsOpened] = useState(false);
  const [message, setMessage] = useState("");

  const onClose2 = () => {
    setIsOpened(false);
  };

  const onOpen = (e: any) => {
    setMessage(e);
    setIsOpened(true);
  };
  const [isVisible, setIsVisible] = useState(true);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [type, setType] = useState<number | null>(1);
  const handleCreate = async (e: any) => {
    const data: CreatingProject = {
      name: title,
      title: title,
      author: author,
      type: type,
      description: description,
    };
    try {
      const response = await createProject(data);
      console.log(response);
      if (response.success) {
        onOpen("Tạo bài viết thành công");
        setTitle("");
        setAuthor("");
        setDescription("");
        setType(null);
        reFetch();
        handleClose();
        return;
      }
      onOpen("Tạo bài viết thất bại\n" + response.error.message);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref) {
        if (ref.current && !ref.current.contains(event.target as Node)) {
          handleClose();
        }
      } else {
        if (
          notificationRef.current &&
          !notificationRef.current.contains(event.target as Node)
        ) {
          handleClose();
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const handleAnimationComplete = () => {
    if (!isVisible) {
      onClose();
    }
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <motion.div
      className={`fixed top-0 left-0 right-0 bottom-0 flex backdrop-blur items-center justify-center bg-white bg-opacity-50 z-50 inset-0 ${
        isVisible ? "" : "pointer-events-none"
      }`}
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      onAnimationComplete={handleAnimationComplete}
    >
      <motion.div
        ref={ref ? ref : notificationRef}
        className="relative max-w-full min-w-[250px] sm:min-w-[300px] sm:max-w-screen-sm min-h-44 xs:max-h-64  bg-white rounded-xl p-4 flex flex-col"
        initial={{ scale: 0 }}
        animate={{ scale: isVisible ? 1 : 0 }}
        exit={{ scale: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className=" absolute top-0 right-0 py-2 px-4  bg-red-500 hover:bg-red-600 text-white rounded-full truncate"
          onClick={handleClose}
        >
          X
        </motion.button>
        {isOpened && <NotiPopup onClose={onClose2} message={message} />}
        <h2 className="text-gray-600 text-xl font-bold mb-2 text-center ">
          Tạo mới
        </h2>
        <div className="max-h-full w-full ">
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
                Chọn chủ đề
              </label>
            </div>
          </div>
          <div className="relative h-28  w-full min-w-[50px]">
            <textarea
              placeholder="Mô tả"
              onChange={(e) => setDescription(e.target.value)}
              className="peer h-full w-full  border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100 overflow-y-scroll no-scrollbar"
            />
            <label className="after:content[''] pointer-events-none absolute left-0  -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
              Mô tả
            </label>
          </div>
        </div>

        <div className="flex w-full justify-center gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className=" mt-4 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded truncate"
            onClick={handleCreate}
          >
            Xác nhận
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};
export default CreatePopUp;
