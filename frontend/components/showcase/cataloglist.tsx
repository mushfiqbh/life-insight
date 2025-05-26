"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import { deleteCatalog } from "@/redux/catalogSlice";
import CatalogProps from "@/types/catalogProps";
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

export default function CatalogList({ data }: { data: CatalogProps[] }) {
  const [language, setLanguage] = useState<string>("en");
  const userInfo = useSelector((state: RootState) => state.user.userInfo);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

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
            href={`/admin/label/${item._id}`}
            className="flex-1 flex items-center gap-4"
          >
            <div className="flex-1">
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-sm">
                <b>{item?.posts?.length} Posts</b> Labeled For{" "}
                <b>{item.label}</b> Reviewed By <b>{item.author.name}</b>
              </p>
            </div>
          </Link>

          <div className="flex gap-2">
            <button
              className="px-3 py-1 text-sm font-medium text-blue-600 border border-blue-600 rounded-md hover:bg-blue-600 hover:text-white transition"
              onClick={() => router.push(`/label/${item.label}`)}
            >
              View
            </button>
            {userInfo?.permissions?.includes("deleteOverview") && (
              <button
                className="px-3 py-1 text-sm font-medium text-red-600 border border-red-600 rounded-md hover:bg-red-600 hover:text-white transition"
                onClick={() => {
                  if (confirm("Are you sure to delete?") && item._id) {
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
