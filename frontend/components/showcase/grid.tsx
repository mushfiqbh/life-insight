"use client";

import { incrementViews } from "@/redux/postsSlice";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Post from "@/types/postProps";
import LoadMore from "@/components/ui/load-more";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";

export default function ShowGrid({ data }: { data: Post[] }) {
  const url = process.env.NEXT_PUBLIC_SERVER_URL;
  const [activeIndex, setActiveIndex] = useState(0);
  const items: Post[] = data?.slice(0, (activeIndex + 1) * 12);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <>
      <div className="grid grid-cols-4 gap-5">
        {items?.map((item, index) => (
          <Link
            href={`/post/${item._id}`}
            key={index}
            onClick={() => item._id && dispatch(incrementViews(item._id))}
            className="bg-white rounded-lg border shadow-lg overflow-hidden"
          >
            <Image
              src={`${url}/api/images/image3.jpg`}
              alt=""
              width={300}
              height={200}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <b className="text-green-600 uppercase">{item.label}</b>
              <h3 className="text-lg font-semibold text-gray-900">
                {item.title}
              </h3>
              <p className="text-gray-500">{item.author.name}</p>
            </div>
          </Link>
        ))}
      </div>
      <LoadMore
        length={data.length}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
      />
    </>
  );
}
