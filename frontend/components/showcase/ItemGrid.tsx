"use client";

import { incrementViews } from "@/redux/postsSlice";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import PostProps from "@/types/postProps";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { detectLanguage } from "@/lib/detectLanguage";

export default function ItemGrid({ post }: { post: PostProps }) {
  const dispatch = useDispatch<AppDispatch>();
  const [language, setLanguage] = useState<string>("en");

  useEffect(() => {
    setLanguage(detectLanguage(post?.title));
  }, [post, setLanguage]);

  return (
    <div
      lang={language}
      className="border rounded-lg shadow-lg bg-slate-200 hover:shadow-md transition overflow-hidden"
    >
      <Link
        href={`/post/${post._id}`}
        onClick={() => post._id && dispatch(incrementViews(post._id))}
      >
        <Image
          src={post.image}
          alt=""
          width={300}
          height={200}
          className="w-full h-40 object-cover"
        />
        <div className="p-4">
          <b className="text-green-600 uppercase">{post.label}</b>
          <h3 className="text-lg font-semibold text-gray-900">{post.title}</h3>
          <p className="text-gray-500">{post.author.name}</p>
        </div>
      </Link>
    </div>
  );
}
