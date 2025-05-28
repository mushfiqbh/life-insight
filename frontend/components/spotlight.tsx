"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { fetchSelectedPosts, incrementViews } from "@/redux/postsSlice";
import LoadingSpinner from "./ui/loading-spinner";
import { RootState } from "@/redux/store";
import { useTranslations } from "next-intl";

const Spotlight = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { selectedPosts, loading } = useSelector(
    (state: RootState) => state.posts
  );
  const t = useTranslations();

  useEffect(() => {
    dispatch(fetchSelectedPosts());
  }, [dispatch]);

  if (loading) {
    return <LoadingSpinner />;
  }

  const { latestPost, popularPosts, adminChoice } = selectedPosts;

  return (
    <div className="w-full md:w-5/6 md:m-auto" id="spotlight">
      {/* First Section */}
      <div className="w-full flex flex-col md:flex-row gap-3 my-4">
        {/* Left Spotlight Content */}
        <div className="w-full md:w-3/4 shadow1 rounded-lg">
          {latestPost && (
            <Link
              href={`/post/${latestPost?._id}`}
              onClick={() =>
                latestPost?._id && dispatch(incrementViews(latestPost._id))
              }
            >
              <div className="max-h-[22rem] relative overflow-hidden rounded-tl-lg rounded-tr-lg">
                <Image
                  priority
                  src={latestPost?.image}
                  alt={latestPost?.title}
                  width={1920}
                  height={1080}
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
        </div>

        {/* Right Spotlight Content */}
        <div className="w-full md:w-1/4 flex-col">
          {/* Admin Choice Post */}
          <div className="bg-gray-900 text-white p-4 rounded-lg overflow-hidden">
            {adminChoice && (
              <Link
                href={`/post/${adminChoice?._id}`}
                onClick={() =>
                  adminChoice?._id && dispatch(incrementViews(adminChoice._id))
                }
              >
                <div className="h-72 relative overflow-hidden rounded-lg">
                  <Image
                    priority
                    width={1920}
                    height={1080}
                    src={adminChoice?.image}
                    alt={adminChoice?.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                </div>
                <div className="text-center -mt-2 relative">
                  <span className="bg-green-500 text-white px-3 py-1 rounded-md text-sm">
                    {t("popular")}
                  </span>
                  <h2 className="text-lg font-semibold mt-2">
                    {adminChoice?.title}
                  </h2>
                  <button className="mt-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                    {t("readnow")}
                  </button>
                </div>
              </Link>
            )}
          </div>

          {/* Advertisement */}
          <div className="ad"></div>
        </div>
      </div>

      {/* Second Section: Top 4 Popular Posts */}
      <div className="w-full flex flex-wrap justify-between gap-5 mt-4 mb-6">
        {popularPosts?.map((item, index) => (
          <div
            key={index}
            className="w-full md:w-[290px] p-2 md:p-4 shadow1 rounded-lg"
          >
            <Link
              href={`/post/${item._id}`}
              onClick={() => item._id && dispatch(incrementViews(item._id))}
            >
              <b className="text-green-600 uppercase">{item.label}</b>
              <h2 className="text-lg font-semibold">{item.title}</h2>
              <p className="text-sm text-gray-700">{item.author.name}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Spotlight;
