"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { fetchSelectedPosts, incrementViews } from "@/redux/postsSlice";
import LoadingSpinner from "./ui/loading-spinner";
import { RootState } from "@/redux/store";

const Content = () => {
  const url = process.env.NEXT_PUBLIC_SERVER_URL;
  const dispatch = useDispatch<AppDispatch>();
  const { selectedPosts, loading } = useSelector(
    (state: RootState) => state.posts
  );

  useEffect(() => {
    dispatch(fetchSelectedPosts());
  }, [dispatch]);

  if (loading) {
    return <LoadingSpinner />;
  }

  const { latestPost, popularPosts, adminChoice } = selectedPosts;

  return (
    <div
      className="w-full md:w-5/6 py-2 md:m-auto flex flex-col md:flex-row gap-4"
      id="content"
    >
      <div className="w-full md:w-3/4 flex flex-col">
        {latestPost && (
          <Link
            href={`/post/${latestPost?._id}`}
            onClick={() =>
              latestPost?._id && dispatch(incrementViews(latestPost._id))
            }
            className="border border-gray-200 rounded-lg overflow-hidden"
          >
            <div className="h-auto relative overflow-hidden">
              <Image
                priority
                src={`${url}/api/images/${latestPost?.image}`}
                alt={latestPost?.title}
                width={356}
                height={200}
                className="w-full object-cover transition-transform duration-300 hover:scale-110"
              />
            </div>
            <div className="p-2 md:p-4">
              <b className="text-green-600 uppercase">{latestPost?.label}</b>
              <h1 className="text-2xl font-bold">{latestPost?.title}</h1>
              <p className="text-gray-500">{latestPost?.subtitle}</p>
              {/* <p className="text-sm text-gray-700">{latestPost?.author.name}</p> */}
            </div>
          </Link>
        )}

        <div className="flex overflow-x-auto space-x-4 mt-4">
          {popularPosts?.map((item, index) => (
            <Link
              key={index}
              href={`/post/${item._id}`}
              onClick={() => item._id && dispatch(incrementViews(item._id))}
              className="w-1/3 min-w-[200px] p-2 md:p-4 border border-gray-200 rounded-lg"
            >
              <b className="text-green-600 uppercase">{item.label}</b>
              <h2 className="text-lg font-semibold h-16 overflow-y-auto no-scrollbar">
                {item.title}
              </h2>
              <p className="text-sm text-gray-700">{item.author.name}</p>
            </Link>
          ))}
        </div>
      </div>

      <div className="w-full md:w-1/4 flex flex-col gap-4">
        {adminChoice && (
          <Link
            href={`/post/${adminChoice?._id}`}
            onClick={() =>
              adminChoice?._id && dispatch(incrementViews(adminChoice._id))
            }
            className="bg-gray-900 text-white p-4 rounded-lg overflow-hidden"
          >
            <div className="h-72 relative overflow-hidden">
              <Image
                width={1920}
                height={1080}
                src={`${url}/api/images/${adminChoice?.image}`}
                alt={adminChoice?.title}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
              />
            </div>
            <div className="text-center mt-2">
              <span className="bg-green-500 text-white px-3 py-1 rounded-md text-sm">
                জনপ্রিয়
              </span>
              <h2 className="text-lg font-semibold mt-2">
                {adminChoice?.title}
              </h2>
              <button className="mt-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                এখন পড়ুন
              </button>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Content;
