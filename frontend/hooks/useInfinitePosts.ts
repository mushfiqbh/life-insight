import PostProps from "@/types/postProps";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

type PostsPage = {
  page: number;
  totalPages: number;
  posts: PostProps[];
};

export const useInfinitePosts = ({ label }: { label?: string }) => {
  return useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/posts?label=${label}&page=${pageParam}`
      );
      return res.data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage: PostsPage) => {
      if (lastPage.page < lastPage.totalPages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
  });
};
