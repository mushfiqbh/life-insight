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

export default function CategoryItem({ category }: { category: CatalogProps }) {
  const [language, setLanguage] = useState<string>("en");
  const userInfo = useSelector((state: RootState) => state.user.userInfo);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  useEffect(() => {
    setLanguage(detectLanguage(category?.title));
  }, [category, setLanguage]);

  return (
    <div
      lang={language}
      className="flex items-center justify-between p-4 border rounded-lg shadow-sm text-foreground bg-background hover:shadow-md transition"
    >
      <Link
        href={`/admin/label/${category._id}`}
        className="flex-1 flex items-center gap-4"
      >
        <div className="flex-1">
          <h3 className="text-lg font-semibold">{category.title}</h3>
          <p className="text-sm">
            <b>{category?.posts?.length} Posts</b> Labeled For{" "}
            <b>{category.label}</b> Reviewed By <b>{category.author.name}</b>
          </p>
        </div>
      </Link>

      <div className="flex gap-2">
        <button
          className="px-3 py-1 text-sm font-medium text-blue-600 border border-blue-600 rounded-md hover:bg-blue-600 hover:text-white transition"
          onClick={() => router.push(`/label/${category.label}`)}
        >
          View
        </button>
        {userInfo?.permissions?.includes("deleteOverview") && (
          <button
            className="px-3 py-1 text-sm font-medium text-red-600 border border-red-600 rounded-md hover:bg-red-600 hover:text-white transition"
            onClick={() => {
              if (confirm("Are you sure to delete?") && category._id) {
                dispatch(deleteCatalog(category._id));
              }
            }}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}
