"use client";
import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  uploadFileBelongToProject,
  saveImgDescription,
  UploadingFileInfo,
} from "@/lib/main";
import NotiPopup from "@/components/ui/NotificationPop";
interface CreateProps {
  onClose: () => void;
  ref?: any;
  project_id: string;
}
const IMGPopUp: React.FC<CreateProps> = ({ onClose, ref, project_id }) => {
  const notificationRef = useRef<HTMLDivElement>(null);
  const [isOpened, setIsOpened] = useState(false);
  const [message, setMessage] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const onClose2 = () => {
    setIsOpened(false);
  };

  const onOpen = (e: any) => {
    setMessage(e);
    setIsOpened(true);
  };
  const [isVisible, setIsVisible] = useState(true);
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

  const handleUpload = async () => {
    if (!file) {
      onOpen("Chưa chọn ảnh");
      return;
    }
    const newFile = new File([file], "default.png", { type: file.type });
    const data: UploadingFileInfo = {
      project_id: project_id,
      file: newFile,
    };
    try {
      const response = await saveImgDescription(data);
      console.log("response", response);
      if (response.success) {
        onOpen(response.message);
      } else {
        onOpen(response.message);
      }
    } catch (e) {
      // console.log(e);
    }
  };

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
        className="relative max-w-full min-w-[250px] sm:min-w-[600px] sm:max-w-screen-sm min-h-44 xs:max-h-64  bg-white rounded-xl p-4 flex flex-col"
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

        <div className="flex flex-col items-center justify-center w-full h-auto  bg-white  sm:rounded-lg sm:shadow-xl">
          <div className="mt-10 mb-10 text-center">
            <h2 className="text-2xl font-semibold mb-2">Tải ảnh lên</h2>
            <p className="text-xs text-gray-500">
              Ảnh sẽ được hiển thị trên trang chủ
            </p>
          </div>
          <div className="relative w-full h-full max-w-xs mb-10  bg-gray-100 rounded-lg shadow-inner">
            <input
              type="file"
              id="file-upload"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setFile(file);
                }
              }}
            />
            <label
              htmlFor="file-upload"
              className="z-20 flex flex-col-reverse items-center justify-center w-full h-full cursor-pointer"
            >
              {file && (
                <img
                  className="object-cover w-full h-full rounded-lg"
                  src={URL.createObjectURL(file)}
                  alt="preview"
                />
              )}
              {!file && (
                <>
                  <p className="z-10 text-xs font-light text-center text-gray-500">
                    Kéo thả hoặc chọn ảnh
                  </p>
                  <svg
                    className="z-10 w-8 h-8 text-indigo-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"></path>
                  </svg>
                </>
              )}
            </label>
          </div>

          <div className="flex w-full justify-center gap-2 mb-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className=" mt-4 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded truncate"
              onClick={handleUpload}
            >
              Xác nhận
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
export default IMGPopUp;
