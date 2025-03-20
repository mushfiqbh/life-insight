"use client";

import { useEffect, useState } from "react";
import CreatePost from "@/app/_private/create-post";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchPost } from "@/redux/postsSlice";
import { AppDispatch } from "@/redux/store";
import { useAdminContext } from "@/context/AdminContext";
import { RootState } from "@/redux/store";

const Page = () => {
  const { postId } = useParams() as { postId: string };
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(true);
  const { setData } = useAdminContext();
  const { post } = useSelector((state: RootState) => state.posts.post);

  useEffect(() => {
    dispatch(fetchPost(postId));
    setData(post);
    setLoading(false);    
  }, [dispatch, postId, post, setData]);

  return <CreatePost loading={loading} />;
};

export default Page;
