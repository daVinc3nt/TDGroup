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
async function getPost(){
  const res = await getProjects()
  return res.data;
}

export default async function News() {
  const post =await getPost()
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

  return (
    <div className="relative w-full bg-red-800 overflow-y-auto">
      <NewsBlogSec1 />
      <NewsBlogSec2 post={post}/>
      {newsCategories.map(({ title, category, id }) => (
        <NewsBlogSec3 listPost={post} key={id} title={title} category={category} id={id} />
      ))}
      <ScrollToTopButton />
    </div>
  );
};
