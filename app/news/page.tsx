import NewsBlogSec1 from "@/components/NewsBlog/NewsBlogSec1";
import NewsBlogSec2 from "@/components/NewsBlog/NewsBlogSec2";
import NewsBlogSec3 from "@/components/NewsBlog/NewsBlogSec3";
import ScrollToTopButton from "@/components/NewsBlog/ScrollToTop";
import Slider from "@/components/Slider/ImageSlider";
import { getProjects } from "@/lib/main";
import { Bitter } from 'next/font/google'
const bitter = Bitter({ subsets: ['latin'] });
const ArrowFix = (arrowProps) => {
  const { carouselState, children, rtl, ...restArrowProps } = arrowProps;
  return <div {...restArrowProps}>{children}</div>;
};
async function getPost() {
  const res = await getProjects()
  return res.data;
}

export default async function News() {
  const post = await getPost()
  console.log(post)
  const newsCategories = [
    { title: 'Tất cả', category: "Tất cả", id: "all" },
    { title: 'Tin tức', category: "Tin tức", id: "news" },
    { title: 'Sự kiện', category: "Sự kiện", id: "customer" },
    { title: 'Hình ảnh', category: "Hình ảnh", id: "driver" },
    { title: 'Video', category: "Video", id: "partner" },
    { title: 'Báo cáo', category: "Báo cáo", id: "brand" },
  ];

  const sliderImageUrl = [
    //First image url
    {
      url: "/data/pic1.jpg"
    },
    {
      url:
        "/data/pic2.jpg"
    },
    //Second image url
    {
      url:
        "/data/pic3.jpg"
    },
    //Third image url
    {
      url:
        "/data/pic4.jpg"
    }
  ];
  const gridItems = [
    {
      id: 1,
      title: "Tất cả",
      description: "",
      className: "lg:col-span-3 md:col-span-6 md:row-span-4 lg:min-h-[60vh]",
      imgClassName: "w-full h-full",
      titleClassName: "justify-end",
      img: "/b1.svg",
      spareImg: "",
    },
    {
      id: 2,
      title: "Tin tức",
      description: "",
      className: "lg:col-span-2 md:col-span-3 md:row-span-2",
      imgClassName: "",
      titleClassName: "justify-start",
      img: "/b1.svg",
      spareImg: "",
    },
    {
      id: 3,
      title: "Sự kiện",
      description: "",
      className: "lg:col-span-2 md:col-span-3 md:row-span-2",
      imgClassName: "",
      titleClassName: "justify-center",
      img: "/b1.svg",
      spareImg: "",
    },
    {
      id: 4,
      title: "Hình ảnh",
      description: "",
      className: "lg:col-span-2 md:col-span-3 md:row-span-1",
      imgClassName: "",
      titleClassName: "justify-start",
      img: "/b1.svg",
      spareImg: "/b4.svg",
    },
    {
      id: 5,
      title: "Video",
      description: "",
      className: "md:col-span-3 md:row-span-2",
      imgClassName: "absolute right-0 bottom-0 md:w-96 w-60",
      titleClassName: "justify-center md:justify-start lg:justify-center",
      img: "/b1.svg",
      spareImg: "/grid.svg",
    },
    {
      id: 6,
      title: "Báo cáo",
      description: "",
      className: "lg:col-span-2 md:col-span-3 md:row-span-1",
      imgClassName: "",
      titleClassName: "justify-center md:max-w-full max-w-60 text-center",
      img: "/b1.svg",
      spareImg: "",
    },
  ];
  return (
    <div className="relative w-full bg-red-800 overflow-y-auto">
      <NewsBlogSec1 />

      <NewsBlogSec2 post={post} />
      {newsCategories.map(({ title, category, id }) => (
        <NewsBlogSec3 listPost={post} key={id} title={title} category={category} id={id} />
      ))}
      <ScrollToTopButton />
    </div>
  );
};
