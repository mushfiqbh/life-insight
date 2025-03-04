"use client";

import { incrementViews } from "@/redux/postsSlice";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import LoadMore from "@/components/ui/load-more";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import CatalogProps from "@/types/catalogProps";
import PostProps from "@/types/postProps";

export default function SearchList({
  data,
}: {
  data: (PostProps | CatalogProps)[];
}) {
  const url = process.env.NEXT_PUBLIC_SERVER_URL;
  const [activeIndex, setActiveIndex] = useState(0);
  const items = data?.slice(activeIndex * 10, (activeIndex + 1) * 10);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="showcase_list">
      {items?.map((item, index) => (
        <Link
          href={
            "views" in item ? "/post/" + item._id : "/overview/" + item.label
          }
          key={index}
          onClick={() => item._id && dispatch(incrementViews(item._id))}
          className="showcase_list_single"
        >
          <div className="showcase_list_title">
            <h4>{item.label}</h4>
            <h3>{item.title}</h3>
            <p>{item.subtitle}</p>
          </div>
          <div className="showcase_list_image">
            <Image
              src={
                url +
                "/api/images/" +
                ("image" in item ? item.image : "defaultCatalog.jpg")
              }
              alt=""
              height={50}
              width={50}
            />
          </div>
        </Link>
      ))}
      <LoadMore
        length={data.length}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
      />
    </div>
  );
}
