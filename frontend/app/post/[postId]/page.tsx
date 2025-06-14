"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import LoadingSpinner from "@/components/ui/loading-spinner";
import PostContent from "@/components/shared/PostContent";
import { fetchPost } from "@/redux/postsSlice";
import { assets } from "@/assets/assets";
import { Facebook, Twitter } from "lucide-react";
import RelatedPostGrid from "@/components/showcase/RelatedPostGrid";

const Page: React.FC = () => {
  const { postId } = useParams() as { postId: string };
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(true);
  const { post, error } = useSelector((state: RootState) => state.posts);

  useEffect(() => {
    dispatch(fetchPost(postId)).finally(() => setLoading(false));
  }, [postId, dispatch]);

  if (!post) {
    return (
      <div className="w-full mt-12 p-5 md:p-20 bg-white">
        Post Not Found
        <Link href="/conditions" className="p-1 text-blue-700 underline">
          Explore Conditions
        </Link>
        <Link href="/" className="p-1 text-blue-700 underline">
          Goto Home
        </Link>
      </div>
    );
  }

  if (loading) return <LoadingSpinner />;

  // this not working - bug
  if (error) {
    return <div className="w-full mt-12 p-5 md:p-20">Post Not Found</div>;
  }

  return (
    <div className="w-full mt-16 p-5 md:p-20">
      <div className="mb-6">
        <Link
          href={`/condition/${post.label}`}
          className="text-xl font-bold text-blue-600"
        >
          {post.label?.toUpperCase()}
        </Link>
        <h1 className="text-4xl font-bold">{post.title}</h1>
        <p className="text-lg text-gray-600">{post.subtitle}</p>
        <ul className="flex gap-4 text-gray-500 mt-2">
          <li className="relative group">
            Author:
            <span className="font-semibold ml-1">{post?.author?.name}</span>
            {/* Popover */}
            {post?.author?.bio && (
              <div className="absolute left-0 top-full mt-1 w-64 bg-white p-3 border border-gray-300 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                <h3 className="text-lg font-semibold">{post.author?.name}</h3>
                <p className="text-sm text-gray-700">{post.author?.bio}</p>
              </div>
            )}
          </li>
          <li>Date: {post?.updatedAt?.split("T")[0]}</li>
          <li>Reading Time: {post.readingTime || 1} min</li>
        </ul>
      </div>
      <div className="w-full mb-6">
        <Image
          priority
          src={post?.image || assets.dunning_krugar}
          width={720}
          height={400}
          alt={post?.title || "Post_Image"}
          className="h-auto rounded-lg"
        />
      </div>
      <div className="flex flex-col md:flex-row gap-10">
        <div className="w-full md:w-2/3 text-lg leading-relaxed">
          <PostContent data={post.content} />

          <div className="bg-green-100 dark:bg-green-500 p-4 mt-6 rounded-md">
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
          <div className="mt-6 flex flex-wrap items-center justify-between">
            <div className="mt-6 flex flex-wrap items-center gap-4">
              {/* tags */}
              {post?.tags?.map((tag, index) => (
                <Link
                  key={index}
                  href={`/search?query=${tag}`}
                  className="text-sm text-blue-600 hover:bg-slate-200 border-b-2 border-2 rounded-full px-2 py-1"
                >
                  #{tag}
                </Link>
              ))}
            </div>
            <div className="mt-6 flex items-center gap-4">
              {/* Share on Social Media */}
              <p className="text-sm">Share this page </p>
              <Link
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                  window.location.href
                )}`}
                target="_blank"
                className="text-blue-600 hover:text-blue-800"
              >
                <Facebook />
              </Link>
              <Link
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                  window.location.href
                )}`}
                target="_blank"
                className="text-blue-600 hover:text-blue-800"
              >
                <Twitter />
              </Link>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/3"></div>
      </div>
      <h2 className="text-2xl font-bold mt-10">Related Articles</h2>

      <RelatedPostGrid postId={post._id} />
    </div>
  );
};

export default Page;
