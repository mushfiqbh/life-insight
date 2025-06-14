"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import PostProps from "@/types/postProps";
import ConditionProps from "@/types/conditionProps";
import { detectLanguage } from "@/lib/detectLanguage";
import { assets } from "@/assets/assets";

const ItemList = ({ post }: { post: PostProps | ConditionProps }) => {
  const [language, setLanguage] = useState<string>("en");

  useEffect(() => {
    setLanguage(detectLanguage(post?.title));
  }, [post, setLanguage]);

  return (
    <div
      lang={language}
      className="flex items-center justify-between p-4 border rounded-lg shadow-sm text-foreground bg-background hover:shadow-md transition"
    >
      <Link
        target="_blank"
        href={
          "image" in post ? "/post/" + post._id : "/condition/" + post.label
        }
        className="flex items-center gap-4 flex-1"
      >
        <div className="w-14 h-14 flex-shrink-0 overflow-hidden rounded-md border">
          <Image
            src={
              "image" in post && typeof post.image === "string"
                ? post.image
                : assets.search
            }
            alt={post.title}
            width={56}
            height={56}
            className="object-cover"
          />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold">{post.title}</h3>
          <p className="text-sm line-clamp-1">
            {post.subtitle.slice(0, 60)}
            {"image" in post ? null : " (Condition/Category)"}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default ItemList;
