import CatalogProps from "@/types/catalogProps";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

type CategoryPage = {
  page: number;
  totalPages: number;
  categories: CatalogProps[];
};

export const useInfiniteCategories = () => {
  return useInfiniteQuery({
    queryKey: ["categories"],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/catalogs?page=${pageParam}`
      );
      return res.data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage: CategoryPage) => {
      if (lastPage.page < lastPage.totalPages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
  });
};
