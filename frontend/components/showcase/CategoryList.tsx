"use client";
import { useInView } from "react-intersection-observer";
import { useInfiniteCategories } from "@/hooks/useInfiniteCateories";
import CategoryItem from "./CategoryItem";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { useEffect } from "react";

const CategoryList = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteCategories();
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: false,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  // Flatten all categories from pages
  const categories = data?.pages.flatMap((page) => page.categories) ?? [];

  return (
    <div>
      {categories.map((category) => (
        <CategoryItem key={category._id} category={category} />
      ))}
      {isFetchingNextPage && <LoadingSpinner />}
      <div ref={ref} className="h-8"></div>
    </div>
  );
};

export default CategoryList;
