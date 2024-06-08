import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import BlogPost from '@/components/NewsBlog/NewsPost/BlogPost';
import { Bitter } from 'next/font/google';
import Posts from '@/app/api/data';
import { getFile, getProjects } from '@/lib/main';

const bitter = Bitter({ subsets: ['latin'] });

interface PageProps {
  fallback: any;
}

async function getPost(id){
  const response = await getFile({ project_id: id, file: "main.html" });
  if (!response.error)
  {
    const result = await fetch(response.data)
    return result.text();
  }
  else return null
}
async function getPosts(id){
  const response = await getFile({ project_id: id, file: "main.html" });
  const data = await getProjects({id: id})
  if (!response.error)
  {
    const result = await fetch(response.data)
    return data;
  }
  else return null
}
export default async function PostList({params}) {
  const data = await  getPost(params.id);
  const data2 = await  getPosts(params.id);
  return (
    <>
     {data && <BlogPost info={data2.data[0]} post={data}></BlogPost>}
    </>
  );
};
