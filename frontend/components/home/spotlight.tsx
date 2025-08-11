"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { fetchSelectedPosts, incrementViews } from "@/redux/postsSlice";
import LoadingSpinner from "../ui/loading-spinner";
import { RootState } from "@/redux/store";
import { useTranslations } from "next-intl";
import { assets } from "@/assets/assets";
import { motion } from "framer-motion";
import { Clock, User, TrendingUp, Star } from "lucide-react";

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
    <div className="w-full max-w-7xl mx-auto px-4 my-16" id="spotlight">
      {/* Featured Article Section */}
      <motion.div
        className="mb-16"
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Featured Post */}
          <motion.div
            className="lg:col-span-2"
            initial={{ x: -30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {latestPost && (
              <Link
                href={`/post/${latestPost?._id}`}
                onClick={() =>
                  latestPost?._id && dispatch(incrementViews(latestPost._id))
                }
                className="group block"
              >
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 border border-gray-100">
                  <div className="relative h-[300px] md:h-[400px] overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
                    <Image
                      priority
                      src={latestPost?.image ?? assets.dunning_krugar}
                      alt={latestPost?.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 66vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute bottom-6 left-6 z-20">
                      <span className="inline-flex items-center px-3 py-1 bg-primary_green text-white rounded-full text-sm font-medium mb-3">
                        <TrendingUp className="w-4 h-4 mr-1" />
                        {latestPost?.label}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 md:p-8">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 group-hover:text-primary_blue transition-colors line-clamp-2">
                      {latestPost?.title}
                    </h1>
                    <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed">
                      {latestPost?.subtitle}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        <span>{latestPost?.author?.name}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>5 min read</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            )}
          </motion.div>

          {/* Admin Choice Sidebar */}
          <motion.div
            className="space-y-6"
            initial={{ x: 30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            {adminChoice && (
              <div className="bg-gradient-to-br from-primary_blue to-deep_blue text-white rounded-3xl overflow-hidden shadow-xl">
                <Link
                  href={`/post/${adminChoice?._id}`}
                  onClick={() =>
                    adminChoice?._id &&
                    dispatch(incrementViews(adminChoice._id))
                  }
                  className="group block"
                >
                  <div className="relative h-48 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                    <Image
                      priority
                      src={adminChoice?.image ?? assets.dunning_krugar}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      alt={adminChoice?.title}
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4 z-20">
                      <span className="inline-flex items-center px-3 py-1 bg-yellow-500 text-black rounded-full text-sm font-bold">
                        <Star className="w-4 h-4 mr-1" />
                        {t("popular")}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h2 className="text-xl font-bold mb-4 group-hover:text-primary_green transition-colors line-clamp-2">
                      {adminChoice?.title}
                    </h2>
                    <button className="w-full py-3 bg-primary_green hover:bg-primary_green/90 text-white rounded-xl font-semibold transition-colors">
                      {t("readnow")}
                    </button>
                  </div>
                </Link>
              </div>
            )}
          </motion.div>
        </div>
      </motion.div>

      {/* Popular Posts Grid */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularPosts?.map((item, index) => (
            <motion.div
              key={index}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <Link
                href={`/post/${item._id}`}
                onClick={() => item._id && dispatch(incrementViews(item._id))}
                className="group block"
              >
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 h-full">
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 bg-primary_green/10 text-primary_green rounded-full text-sm font-medium">
                      {item.label}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-3 group-hover:text-primary_blue transition-colors line-clamp-3">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mt-auto">
                    <User className="w-4 h-4" />
                    <span>{item.author.name}</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Spotlight;
