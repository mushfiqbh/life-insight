"use client";
import { useInView } from "react-intersection-observer";
import { useInfiniteConditions } from "@/hooks/useInfiniteCateories";
import ConditionListItem from "./ItemCondition";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { useEffect } from "react";

const ConditionList = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteConditions();
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: false,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  // Flatten all conditions from pages
  const conditions = data?.pages.flatMap((page) => page.conditions) ?? [];

  return (
    <div>
      {conditions.map((condition) => (
        <ConditionListItem key={condition._id} condition={condition} />
      ))}
      {isFetchingNextPage && <LoadingSpinner />}
      <div ref={ref} className="h-8"></div>
    </div>
  );
};

export default ConditionList;
