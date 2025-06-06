import PostProps from "@/types/postProps";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

type RelatedPostsPage = {
  page: number;
  totalPages: number;
  relatedPosts: PostProps[];
};

export const useInfiniteRelatedPosts = (postId: string, limit?: number) => {
  return useInfiniteQuery({
    queryKey: ["relatedPosts"],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await axios.get(
        `${
          process.env.NEXT_PUBLIC_SERVER_URL
        }/api/posts/related?postId=${postId}&page=${pageParam}&limit=${
          limit || 4
        }`
      );

      return res.data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage: RelatedPostsPage) => {
      if (lastPage.page < lastPage.totalPages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
  });
};
