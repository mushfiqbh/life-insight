"use client";

import { useInView } from "react-intersection-observer";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { useEffect } from "react";
import { useInfiniteRelatedPosts } from "@/hooks/useInfiniteRelatedPosts";
import ItemGrid from "./ItemGrid";

const RelatedPostGrid = ({ postId }: { postId: string }) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteRelatedPosts(postId);

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

  // Remove the current post from related posts
  relatedPosts = relatedPosts.filter((post) => post._id !== postId);

  if (relatedPosts.length === 0) {
    return (
      <div className="w-full mt-12 p-5 md:p-20 text-center">
        <p className="text-gray-500">No related posts found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {relatedPosts.length &&
        relatedPosts?.map((post, index) => (
          <ItemGrid key={index} post={post} />
        ))}
      {isFetchingNextPage && <LoadingSpinner />}
      <div ref={ref} className="h-8"></div>
    </div>
  );
};

export default RelatedPostGrid;
