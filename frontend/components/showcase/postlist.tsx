"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Post from "@/types/postProps";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { deletePost } from "@/redux/postsSlice";
import { franc } from "franc-min";

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

export default function PostList({ data }: { data: Post[] }) {
  const url = process.env.NEXT_PUBLIC_SERVER_URL;
  const router = useRouter();
  const [language, setLanguage] = useState<string>("en");
  const userInfo = useSelector((state: RootState) => state.users.userInfo);
  const { adminChoice } = useSelector(
    (state: RootState) => state.posts.selectedPosts
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    setLanguage(detectLanguage(data?.[0]?.title));
  }, [data, setLanguage]);

  return (
    <div className="w-full space-y-4 my-5">
      {data?.map((item, index) => (
        <div
          key={index}
          lang={language}
          className="flex items-center justify-between p-4 border rounded-lg shadow-sm text-foreground bg-background hover:shadow-md transition"
        >
          <Link
            href={`/admin/post/${item._id}`}
            className="flex items-center gap-4 flex-1"
          >
            <div className="w-14 h-14 flex-shrink-0 overflow-hidden rounded-md border">
              <Image
                src={`${url}/api/image/${item.image}`}
                alt={item.title}
                width={56}
                height={56}
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold">
                {adminChoice._id === item._id && (
                  <span className="text-red-500 font-bold">*</span>
                )}
                {item.title}
              </h3>
              <p className="text-sm line-clamp-1">
                <b className="">{item.label} </b>
                {item.subtitle.slice(0, 90)}
              </p>
            </div>
          </Link>

          <div className="flex gap-2">
            <button
              className="px-3 py-1 text-sm font-medium text-blue-600 border border-blue-600 rounded-md hover:bg-blue-600 hover:text-white transition"
              onClick={() => router.push(`/post/${item._id}`)}
            >
              View
            </button>
            {userInfo?.permission?.includes("deletePost") && (
              <button
                className="px-3 py-1 text-sm font-medium text-red-600 border border-red-600 rounded-md hover:bg-red-600 hover:text-white transition"
                onClick={() => {
                  if (confirm("Are you sure to delete?") && item._id) {
                    dispatch(deletePost(item._id));
                  }
                }}
              >
                Delete
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
