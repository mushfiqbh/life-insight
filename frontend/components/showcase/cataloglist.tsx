"use client";

import React from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import { deleteCatalog } from "@/redux/catalogSlice";
import CatalogProps from "@/types/catalogProps";

export default function CatalogList({ data }: { data: CatalogProps[] }) {
  const userInfo = useSelector((state: RootState) => state.users.userInfo);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  return (
    <div className="showcase_list">
      {data?.map((item, index) => (
        <div
          className="showcase_list_single"
          key={index}
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <Link
            style={{ width: "100%" }}
            href={"/admin/label/" + item._id}
            className="showcase_list_flex"
          >
            <div className="showcase_list_title">
              <h3>{item.title}</h3>
              <p>
                <b> {item?.posts?.length} Posts</b>
                {" Labeled For "}
                <b>{item.label}</b>
                {" Reviewed By "}
                <b>{item.author.name}</b>
              </p>
            </div>
          </Link>

          <div className="flex justify-between gap-2">
            <button
              className="h-min"
              onClick={() => router.push("/label/" + item.label)}
            >
              View
            </button>
            {userInfo?.permission?.includes("deleteOverview") && (
              <button
                className="h-min"
                color="error"
                onClick={() => {
                  const yes = confirm("Are you sure to delete?");
                  if (yes && item._id) {
                    dispatch(deleteCatalog(item._id));
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
