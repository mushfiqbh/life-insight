"use client";

import { useInView } from "react-intersection-observer";
import { useInfinitePosts } from "@/hooks/useInfinitePosts";
import ItemPost from "./ItemList";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { useEffect } from "react";

const PostList = ({ label }: { label?: string }) => {
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
    <div>
      {posts.map((post) => (
        <ItemPost key={post._id} post={post} />
      ))}
      {isFetchingNextPage && <LoadingSpinner />}
      <div ref={ref} className="h-8"></div>
    </div>
  );
};

export default PostList;
