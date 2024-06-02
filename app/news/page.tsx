import NewsBlogSec1 from "@/components/NewsBlog/NewsBlogSec1";
import NewsBlogSec2 from "@/components/NewsBlog/NewsBlogSec2";
import NewsBlogSec3 from "@/components/NewsBlog/NewsBlogSec3";
import ScrollToTopButton from "@/components/NewsBlog/ScrollToTop";
import { getPosts } from "@/lib/main";
import type { NextPage } from "next";
import { Bitter } from 'next/font/google'
const bitter = Bitter({ subsets: ['latin'] });
async function getPost(){
  const res = await getPosts({})
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

  return (
    <div className={`relative w-full bg-fixed bg-center bg-cover bg-mainpage overflow-y-auto ${bitter.className}`}>
      <NewsBlogSec1 />
      <NewsBlogSec2 post={post}/>
      {newsCategories.map(({ title, category, id }) => (
        <NewsBlogSec3 listPost={post} key={id} title={title} category={category} id={id} />
      ))}
      <ScrollToTopButton />
    </div>
  );
};
