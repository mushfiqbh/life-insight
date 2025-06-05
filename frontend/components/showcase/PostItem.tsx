"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import PostProps from "@/types/postProps";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { franc } from "franc-min";
import { deletePost } from "@/redux/postsSlice";

const detectLanguage = (text: string) => {
  const langCode = franc(text);
  const langMap: Record<string, string> = {
    eng: "en",
    ben: "bn",
    hin: "hi",
    spa: "es",
    fra: "fr",
  };
  return langMap[langCode] || "en";
};

const PostItem = ({ post }: { post: PostProps }) => {
  const [language, setLanguage] = useState<string>("en");
  const userInfo = useSelector((state: RootState) => state.user.userInfo);
  const { adminChoice } = useSelector(
    (state: RootState) => state.posts.selectedPosts
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    setLanguage(detectLanguage(post?.title));
  }, [post, setLanguage]);

  return (
    <div
      lang={language}
      className="flex items-center justify-between p-4 border rounded-lg shadow-sm text-foreground bg-background hover:shadow-md transition"
    >
      <Link
        href={`/post/${post._id}`}
        className="flex items-center gap-4 flex-1"
      >
        <div className="w-14 h-14 flex-shrink-0 overflow-hidden rounded-md border">
          <Image
            src={post.image}
            alt={post.title}
            width={56}
            height={56}
            className="object-cover"
          />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold">
            {adminChoice._id === post._id && (
              <span className="text-red-500 font-bold">*</span>
            )}
            {post.title}
          </h3>
          <p className="text-sm line-clamp-1">
            <b className="">{post.label} </b>
            {post.subtitle.slice(0, 90)}
          </p>
        </div>
      </Link>

      <div className="flex gap-2">
        {userInfo?.permissions?.includes("editPost") && (
          <Link
            href={`admin/post/${post._id}`}
            className="px-3 py-1 text-sm font-medium text-blue-600 border border-blue-600 rounded-md hover:bg-blue-600 hover:text-white transition"
          >
            Edit
          </Link>
        )}
        {userInfo?.permissions?.includes("deletePost") && (
          <button
            className="px-3 py-1 text-sm font-medium text-red-600 border border-red-600 rounded-md hover:bg-red-600 hover:text-white transition"
            onClick={() => {
              if (confirm("Are you sure to delete?") && post._id) {
                dispatch(deletePost(post._id));
              }
            }}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default PostItem;
