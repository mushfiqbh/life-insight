"use client";

import { useEffect, useState } from "react";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { Button } from "@/components/ui/button";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchOverviews } from "@/redux/catalogSlice";
import CatalogList from "@/components/showcase/cataloglist";
import { useAdminContext } from "@/context/AdminContext";

const OverviewPagination = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { overviewList, totalPages } = useSelector(
    (state: RootState) => state.catalogs.overviews
  );

  const [loading, setLoading] = useState(false);
  const { page2: page, setPage2: setPage } = useAdminContext();

  useEffect(() => {
    dispatch(fetchOverviews(page));
    setLoading(false);
  }, [dispatch, page]);

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <CatalogList data={overviewList} />
      <div className="flex justify-center mt-4 space-x-2">
        <Button onClick={handlePrev} disabled={page === 1}>
          Previous
        </Button>
        <span className="px-4 py-2 border rounded-md bg-white">
          Page {page} of {totalPages}
        </span>
        <Button onClick={handleNext} disabled={page === totalPages}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default OverviewPagination;
