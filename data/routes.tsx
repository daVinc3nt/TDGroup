import { FaCircleInfo, FaMapLocationDot, FaRegNewspaper } from "react-icons/fa6";
import { FaCar, FaRoad, FaChartPie, FaHistory } from "react-icons/fa";
import { FaPersonBiking } from "react-icons/fa6";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import { BsFileEarmarkPerson } from "react-icons/bs";
import { CiBookmarkPlus } from "react-icons/ci";
const routes = [
  {
    name: "Về chúng tôi",
    layout: "/dashboard",
    path: "about",
    icon: <FaCircleInfo className="h-5 w-5 ml-0.5" />,
  },
  {
    name: "Dự án",
    layout: "/dashboard",
    path: "project",
    icon: <AiOutlineFundProjectionScreen className="h-6 w-6" />,
  },
  {
    name: "Ngành nghề",
    layout: "/dashboard",
    path: "career",
    icon: <BsFileEarmarkPerson className="h-5 w-5 ml-0.5" />,
  },
  {
    name: "Tin tức & sự kiện",
    layout: "/dashboard",
    path: "news",
    icon: <FaRegNewspaper className="h-5 w-5 ml-0.5" />,
  },
  {
    name: "Đăng bài",
    layout: "/dashboard",
    path: "specify",
    icon: <CiBookmarkPlus className="h-6 w-6" />,
  },
];

export default routes;
