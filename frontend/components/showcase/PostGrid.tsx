"use client";

import { useInView } from "react-intersection-observer";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { useEffect } from "react";
import { useInfiniteRelatedPosts } from "@/hooks/useInfiniteRelatedPosts";
import GridItem from "./GridItem";

const PostGrid = ({ label, postId }: { label: string; postId?: string }) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteRelatedPosts(label);
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
  let relatedPosts = data?.pages.flatMap((page) => page.relatedPosts) ?? [];

  if (postId) {
    // Remove the current post from the list if postId is provided
    relatedPosts = relatedPosts.filter((post) => post._id !== postId);
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {relatedPosts.length &&
        relatedPosts?.map((post, index) => (
          <GridItem key={index} post={post} />
        ))}
      {isFetchingNextPage && <LoadingSpinner />}
      <div ref={ref} className="h-8"></div>
    </div>
  );
};

export default PostGrid;
