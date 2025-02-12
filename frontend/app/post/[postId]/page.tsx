"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import DOMPurify from "dompurify";
import Link from "next/link";
import Image from "next/image";
import PostProps from "@/types/postProps";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import ShowGrid from "@/components/showcase/grid";
import LoadingSpinner from "@/components/ui/loading-spinner";

const Page: React.FC = () => {
  const { postId } = useParams() as { postId: string };
  const url = process.env.NEXT_PUBLIC_SERVER_URL;
  const { posts, loading } = useSelector((state: RootState) => state.posts);
  const [post, setPost] = useState<PostProps | null>(null);
  const [readingTime, setReadingTime] = useState(1);

  const calculateReadingTime = (text: string) => {
    const words = text?.split(" ")?.length || 0;
    const averageWPM = 225;
    setReadingTime(Math.ceil(words / averageWPM));
  };

  useEffect(() => {
    const thePost = posts.find((item) => item._id === postId);
    setPost(thePost || ({} as PostProps));
    if (thePost) {
      calculateReadingTime(thePost.content);
    }
    // setLoading(false);
  }, [posts, postId]);

  if (loading) return <LoadingSpinner />;

  if (!post)
    return (
      <div className="text-center text-red-500">
        Page not found.{" "}
        <Link href="/overview" className="underline">
          Go to Overview
        </Link>
      </div>
    );

  const sanitizedContent = DOMPurify.sanitize(post.content);
  const relatedPosts = posts.filter(
    (item) => item.label === post.label && item._id !== postId
  );

  return (
    <div className="w-full p-10 bg-white text-black">
      <div className="mb-6">
        <Link
          href={`/overview/${post.label}`}
          className="text-xl font-bold text-blue-600"
        >
          {post.label?.toUpperCase()}
        </Link>
        <h1 className="text-4xl font-bold">{post.title}</h1>
        <p className="text-lg text-gray-600">{post.subtitle}</p>
        <ul className="flex gap-4 text-gray-500 mt-2">
          <li>
            Author: <span className="font-semibold">{post?.author?.name}</span>
          </li>
          <li>Date: {post?.date?.split("T")[0]}</li>
          <li>Reading Time: {readingTime} min</li>
        </ul>
      </div>
      <div className="w-full mb-6">
        <Image
          src={`${url}/api/images/image3.jpg`} // ${post.image}
          width={300}
          height={200}
          alt={post?.title}
          className="w-3/4 rounded-lg mx-auto"
        />
      </div>
      <div className="flex flex-col md:flex-row gap-10">
        <div className="w-full md:w-2/3 text-lg leading-relaxed">
          <div dangerouslySetInnerHTML={{ __html: sanitizedContent }}></div>
          <div className="bg-green-100 p-4 mt-6 rounded-md">
            <p>
              Verywell Mind uses high-quality sources, including peer-reviewed
              research, to support our content.
            </p>
            <ol className="mt-2 list-decimal pl-5">
              {post?.sources?.map((item, index: number) => (
                <li key={index}>
                  {item.text}{" "}
                  {item.href && (
                    <Link href={item.href} className="text-blue-600">
                      VIEW SOURCE
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </div>
          <div className="mt-6 flex items-center gap-4">
            <div>
              <b>
                By{" "}
                <a href="#" className="text-blue-600">
                  {post.author?.name}
                </a>
              </b>
              <p className="text-gray-600">{post.author?.bio}</p>
            </div>
          </div>
          <div className="mt-6 flex gap-4">
            <a href="#" className="text-blue-600">
              Facebook
            </a>
            <a href="#" className="text-blue-600">
              X
            </a>
            <a href="#" className="text-blue-600">
              Whatsapp
            </a>
            <a href="#" className="text-blue-600">
              Instagram
            </a>
          </div>
        </div>
        <div className="w-full md:w-1/3"></div>
      </div>
      <h2 className="text-2xl font-bold mt-10">Related Articles</h2>
      <ShowGrid data={relatedPosts} />
    </div>
  );
};

export default Page;
