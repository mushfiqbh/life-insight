import ConditionProps from "@/types/conditionProps";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

type ConditionPage = {
  page: number;
  totalPages: number;
  conditions: ConditionProps[];
};

export const useInfiniteConditions = () => {
  return useInfiniteQuery({
    queryKey: ["conditions"],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/conditions?page=${pageParam}`
      );
      return res.data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage: ConditionPage) => {
      if (lastPage.page < lastPage.totalPages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
  });
};
