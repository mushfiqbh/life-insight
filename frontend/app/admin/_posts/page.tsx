"use client";

import { useEffect, useState } from "react";
import PostList from "@/components/showcase/postlist";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { Button } from "@/components/ui/button";
import { fetchPosts } from "@/redux/postsSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useAdminContext } from "@/context/AdminContext";

const PostPagination = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { postList, totalPages } = useSelector(
    (state: RootState) => state.posts.posts
  );
  const [loading, setLoading] = useState(false);
  const { page1: page, setPage1: setPage } = useAdminContext();

  useEffect(() => {
    dispatch(fetchPosts(page));
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
      <PostList data={postList} />
      <div className="flex justify-center mt-6 space-x-4">
        <Button
          onClick={handlePrev}
          disabled={page === 1}
          className="px-4 py-2 rounded-lg shadow-md disabled:opacity-50"
        >
          Prev
        </Button>
        <span className="px-5 py-2 border rounded-lg bg-gray-100 text-gray-800 shadow-sm flex items-center">
          Page {page} of {totalPages}
        </span>
        <Button
          onClick={handleNext}
          disabled={page === totalPages}
          className="px-4 py-2 rounded-lg shadow-md disabled:opacity-50"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default PostPagination;
