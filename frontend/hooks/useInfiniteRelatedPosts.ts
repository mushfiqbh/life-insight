import PostProps from "@/types/postProps";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

type RelatedPostsPage = {
  page: number;
  totalPages: number;
  relatedPosts: PostProps[];
};

export const useInfiniteRelatedPosts = (label: string) => {
  return useInfiniteQuery({
    queryKey: ["relatedPosts", label],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/posts/related?label=${label}&page=${pageParam}`
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
