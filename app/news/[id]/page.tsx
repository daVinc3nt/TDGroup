
"use client"
import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import BlogPost from '@/components/NewsBlog/NewsPost/BlogPost';
import { Bitter } from 'next/font/google';
import Posts from '@/app/api/data';
import { getFile, getPosts } from '@/lib/main';

const bitter = Bitter({ subsets: ['latin'] });

interface PageProps {
  fallback: any;
}

async function getPost(id){
  const response = await getFile({ id: id });
  if (!response.error)
  {
    const result = await fetch(response.data)
    return response;
  }
  else return null
}

export default function PostList({params}) {
  const data =  getPost(params.id);
  console.log(data)
  return (
    <>
     {/* {data && <BlogPost post={data}></BlogPost>} */}
    </>
  );
};
