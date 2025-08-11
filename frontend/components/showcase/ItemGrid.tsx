"use client";

import { incrementViews } from "@/redux/postsSlice";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import PostProps from "@/types/postProps";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { detectLanguage } from "@/lib/detectLanguage";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";

export default function ItemGrid({ post }: { post: PostProps }) {
  const dispatch = useDispatch<AppDispatch>();
  const [language, setLanguage] = useState<string>("en");

  useEffect(() => {
    setLanguage(detectLanguage(post?.title));
  }, [post, setLanguage]);

  return (
    <motion.div
      lang={language}
      className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-primary_green/20"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Link
        href={`/post/${post._id}`}
        onClick={() => post._id && dispatch(incrementViews(post._id))}
        className="block h-full"
      >
        {/* Image Container */}
        <div className="relative h-32 overflow-hidden">
          <Image
            src={post.image}
            alt={post.title || "Article image"}
            width={400}
            height={240}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <span className="inline-block px-3 py-1 bg-primary_green text-white text-xs font-semibold rounded-full uppercase tracking-wide">
              {post.label}
            </span>
          </div>

          {/* Reading Time Badge */}
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
            <div className="flex items-center gap-1 text-xs text-gray-700">
              <Clock className="w-3 h-3" />
              <span>{post.readingTime || 5} min</span>
            </div>
          </div>
        </div>

        {/* Content Container */}
        <div className="px-4 pt-4">
          {/* Title */}
          <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 leading-tight group-hover:text-primary_green transition-colors duration-300">
            {post.title}
          </h3>

          {/* Subtitle */}
          {post.subtitle && (
            <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
              {post.subtitle}
            </p>
          )}
        </div>

        {/* Bottom Gradient Bar */}
        <div className="h-1 bg-gradient-to-r from-primary_green to-primary_blue transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
      </Link>
    </motion.div>
  );
}
