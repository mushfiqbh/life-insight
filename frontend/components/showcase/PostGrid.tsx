"use client";

import { useInView } from "react-intersection-observer";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { useEffect } from "react";
import ItemGrid from "./ItemGrid";
import { useInfinitePosts } from "@/hooks/useInfinitePosts";

const PostGrid = ({ label }: { label?: string }) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfinitePosts({ label });

  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: false,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  // Flatten all posts from pages
  const posts = data?.pages.flatMap((page) => page.posts) ?? [];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {posts.length &&
        posts?.map((post, index) => <ItemGrid key={index} post={post} />)}
      {isFetchingNextPage && <LoadingSpinner />}
      <div ref={ref} className="h-8"></div>
    </div>
  );
};

export default PostGrid;
