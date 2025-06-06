"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import LoadingSpinner from "@/components/ui/loading-spinner";
import ContentWithTOC from "@/components/shared/contentTOC";
import { fetchPost } from "@/redux/postsSlice";
import { assets } from "@/assets/assets";
import PostGrid from "@/components/showcase/PostGrid";

const Page: React.FC = () => {
  const { postId } = useParams() as { postId: string };
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(true);
  const { post, error } = useSelector((state: RootState) => state.posts);

  useEffect(() => {
    dispatch(fetchPost(postId)).finally(() => setLoading(false));
  }, [postId, dispatch]);

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
          <li>
            Author: <span className="font-semibold">{post?.author?.name}</span>
          </li>
          <li>Date: {post.updatedAt.split("T")[0]}</li>
          <li>Reading Time: {post.readingTime || 1} min</li>
        </ul>
      </div>
      <div className="w-full mb-6">
        <Image
          priority
          src={assets.dunning_krugar}
          width={1280}
          height={720}
          alt={post?.title || "Post_Image"}
          className="rounded-lg"
        />
      </div>
      <div className="flex flex-col md:flex-row gap-10">
        <div className="w-full md:w-2/3 text-lg leading-relaxed">
          <ContentWithTOC data={post.content} />

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

      <PostGrid label={post.label} postId={post._id} />
    </div>
  );
};

export default Page;
