"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Post from "@/types/postProps";
import LoadMore from "@/components/ui/load-more";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { deletePost } from "@/redux/postsSlice";

export default function PostList({ data }: { data: Post[] }) {
  const url = process.env.NEXT_PUBLIC_SERVER_URL;
  const [activeIndex, setActiveIndex] = useState(0);
  const items = data?.slice(activeIndex * 10, (activeIndex + 1) * 10);
  const router = useRouter();
  const userInfo = useSelector((state: RootState) => state.users.userInfo);
  const adminChoice = useSelector(
    (state: RootState) => state.posts.adminChoice
  );
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="showcase_list">
      {items?.map((item, index) => {
        return (
          <div className="showcase_list_single" key={index}>
            <Link
              href={"/admin/post/" + item._id}
              className="showcase_list_flex"
            >
              <div className="showcase_list_image">
                <Image
                  src={url + "/images/" + item.image}
                  alt=""
                  width={50}
                  height={50}
                />
              </div>
              <div className="showcase_list_title">
                <h3>
                  <b style={{ color: "red" }}>
                    {adminChoice._id === item._id ? "* " : ""}
                  </b>
                  {item.title}
                </h3>
                <p style={{ overflowY: "hidden" }}>
                  <b>{item.label} </b>
                  {item.subtitle.slice(0, 90)}
                </p>
              </div>
            </Link>

            <div className="flex justify-between gap-2">
              <button
                className="h-min"
                onClick={() => router.push("/post/" + item._id)}
              >
                View
              </button>
              {userInfo?.permission?.includes("deletePost") && (
                <button
                  className="h-min"
                  color="error"
                  onClick={() => {
                    const yes = confirm("Are you sure to delete?");
                    if (yes && item._id) {
                      dispatch(deletePost(item._id));
                    }
                  }}
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        );
      })}

      <LoadMore
        length={data.length}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
      />
    </div>
  );
}
