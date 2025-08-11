"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import LoadingSpinner from "@/components/ui/loading-spinner";
import PostContent from "@/components/shared/PostContent";
import { fetchPost } from "@/redux/postsSlice";
import { assets } from "@/assets/assets";
import {
  Facebook,
  Twitter,
  Linkedin,
  Share2,
  Clock,
  User,
  Calendar,
  ArrowLeft,
  Bookmark,
  Heart,
  MessageCircle,
} from "lucide-react";
import RelatedPostGrid from "@/components/showcase/RelatedPostGrid";
import { motion } from "framer-motion";

const Page: React.FC = () => {
  const { postId } = useParams() as { postId: string };
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const { post, error } = useSelector((state: RootState) => state.posts);

  useEffect(() => {
    dispatch(fetchPost(postId)).finally(() => setLoading(false));
  }, [postId, dispatch]);

  if (!post) {
    return (
      <motion.div
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center bg-white rounded-3xl shadow-xl p-12 max-w-md mx-4">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-red-500 text-2xl">📄</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Article Not Found
          </h2>
          <p className="text-gray-600 mb-8">
            The article you&apos;re looking for doesn&apos;t exist or may have
            been moved.
          </p>
          <div className="space-y-3">
            <Link
              href="/conditions"
              className="block w-full bg-primary_green hover:bg-primary_green/90 text-white py-3 px-6 rounded-xl font-semibold transition-colors"
            >
              Explore Conditions
            </Link>
            <Link
              href="/"
              className="block w-full border border-gray-300 hover:bg-gray-50 text-gray-700 py-3 px-6 rounded-xl font-semibold transition-colors"
            >
              Go to Home
            </Link>
          </div>
        </div>
      </motion.div>
    );
  }

  if (loading) return <LoadingSpinner />;

  if (error) {
    return (
      <motion.div
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-red-100"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center bg-white rounded-3xl shadow-xl p-12 max-w-md mx-4">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-red-500 text-2xl">⚠️</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Something went wrong
          </h2>
          <p className="text-gray-600 mb-8">
            We encountered an error while loading this article.
          </p>
          <Link
            href="/"
            className="inline-block bg-primary_blue hover:bg-primary_blue/90 text-white py-3 px-8 rounded-xl font-semibold transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-b from-gray-50 to-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Hero Section */}
      <div className="relative">
        {/* Background Image */}
        <div className="relative h-[50vh] overflow-hidden">
          <Image
            priority
            src={post?.image || assets.dunning_krugar}
            fill
            alt={post?.title || "Post Image"}
            className="object-cover"
          />
        </div>

        {/* Floating Navigation */}
        <motion.div
          className="absolute top-8 left-8"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Link
            href="/conditions"
            className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-md border border-gray-200 text-gray-800 px-4 py-2 rounded-full hover:bg-white transition-all duration-300 shadow-lg"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Articles
          </Link>
        </motion.div>
      </div>

      {/* Article Header - Separate from Image */}
      <motion.div
        className="bg-white"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <div className="max-w-5xl mx-auto px-4 md:px-8 py-12">
          <Link
            href={`/condition/${post.label}`}
            className="inline-flex items-center px-4 py-2 bg-primary_green text-white rounded-full text-sm font-semibold mb-6 hover:bg-primary_green/90 transition-colors"
          >
            {post.label?.toUpperCase()}
          </Link>
          <h1 className="text-4xl font-bold mb-6 leading-tight text-gray-800">
            {post.title}
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            {post.subtitle}
          </p>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>By {post?.author?.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>
                {post?.updatedAt
                  ? new Date(post.updatedAt).toLocaleDateString()
                  : "N/A"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{post.readingTime || 5} min read</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Article Content */}
          <motion.div
            className="flex-1"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {/* Article Content */}
            <div className="prose prose-lg max-w-none">
              <PostContent data={post.content} />
            </div>

            {/* Sources Section */}
            {post?.sources && post.sources.length > 0 && (
              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 mt-12 border border-green-100">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-sm">
                    ✓
                  </span>
                  Verified Sources
                </h3>
                <p className="text-gray-700 mb-6">
                  LifeInsight uses high-quality, peer-reviewed sources to
                  support our content and ensure accuracy.
                </p>
                <ol className="space-y-3">
                  {post.sources.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center font-semibold">
                        {index + 1}
                      </span>
                      <div>
                        <span className="text-gray-700">{item.text}</span>
                        {item.href && (
                          <Link
                            href={item.href}
                            className="ml-2 inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 font-semibold text-sm"
                            target="_blank"
                          >
                            VIEW SOURCE →
                          </Link>
                        )}
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {/* Tags and Share Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mt-12 pt-8 border-t border-gray-200">
              {/* Tags */}
              {post?.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, index) => (
                    <Link
                      key={index}
                      href={`/search?query=${tag}`}
                      className="inline-flex items-center px-4 py-2 bg-gray-100 hover:bg-primary_green hover:text-white text-gray-700 rounded-full text-sm font-medium transition-all duration-300"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              )}

              {/* Share Buttons */}
              <div className="flex items-center gap-3">
                <span className="text-gray-600 font-medium">Share:</span>
                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      window.open(
                        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                          window.location.href
                        )}`,
                        "_blank"
                      )
                    }
                    className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-colors"
                  >
                    <Facebook className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() =>
                      window.open(
                        `https://twitter.com/intent/tweet?url=${encodeURIComponent(
                          window.location.href
                        )}`,
                        "_blank"
                      )
                    }
                    className="p-3 bg-sky-500 hover:bg-sky-600 text-white rounded-full transition-colors"
                  >
                    <Twitter className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() =>
                      window.open(
                        `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                          window.location.href
                        )}`,
                        "_blank"
                      )
                    }
                    className="p-3 bg-blue-700 hover:bg-blue-800 text-white rounded-full transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() =>
                      navigator.share?.({
                        title: post.title,
                        url: window.location.href,
                      })
                    }
                    className="p-3 bg-gray-600 hover:bg-gray-700 text-white rounded-full transition-colors"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            className="w-full lg:w-80 space-y-6"
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            {/* Author Bio */}
            {post?.author?.bio && (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
                <div className="flex items-center gap-4">
                  <div>
                    <h3 className="font-bold text-gray-800">
                      {post.author?.name}
                    </h3>
                    <p className="text-gray-600 text-sm">{post.author?.bio}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h3 className="font-bold text-gray-800 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    isBookmarked
                      ? "bg-primary_green text-white"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                  }`}
                >
                  <Bookmark className="w-5 h-5" />
                  {isBookmarked ? "Bookmarked" : "Bookmark Article"}
                </button>
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    isLiked
                      ? "bg-red-500 text-white"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                  }`}
                >
                  <Heart className="w-5 h-5" />
                  {isLiked ? "Liked" : "Like Article"}
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-all">
                  <MessageCircle className="w-5 h-5" />
                  Leave Feedback
                </button>
              </div>
            </div>

            {/* Table of Contents */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h3 className="font-bold text-gray-800 mb-4">In This Article</h3>
              <nav className="space-y-2">
                <a
                  href="#overview"
                  className="block text-gray-600 hover:text-primary_green transition-colors"
                >
                  Overview
                </a>
                <a
                  href="#symptoms"
                  className="block text-gray-600 hover:text-primary_green transition-colors"
                >
                  Key Points
                </a>
                <a
                  href="#treatment"
                  className="block text-gray-600 hover:text-primary_green transition-colors"
                >
                  Treatment Options
                </a>
                <a
                  href="#resources"
                  className="block text-gray-600 hover:text-primary_green transition-colors"
                >
                  Additional Resources
                </a>
              </nav>
            </div>

            {/* Related Topics */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h3 className="font-bold text-gray-800 mb-4">Related Topics</h3>
              <div className="space-y-3">
                <Link
                  href="/conditions/anxiety"
                  className="block p-3 bg-gray-50 hover:bg-primary_green/10 rounded-xl transition-colors"
                >
                  <h4 className="font-semibold text-gray-800">
                    Anxiety Disorders
                  </h4>
                  <p className="text-sm text-gray-600">
                    Understanding anxiety symptoms and treatment
                  </p>
                </Link>
                <Link
                  href="/conditions/depression"
                  className="block p-3 bg-gray-50 hover:bg-primary_green/10 rounded-xl transition-colors"
                >
                  <h4 className="font-semibold text-gray-800">Depression</h4>
                  <p className="text-sm text-gray-600">
                    Comprehensive guide to depression
                  </p>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Related Articles Section */}
        <motion.div
          className="mt-20"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Continue Reading
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary_green to-primary_blue mx-auto rounded-full" />
          </div>
          <RelatedPostGrid postId={post._id} />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Page;
