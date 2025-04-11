"use client";

import { useParams } from "next/navigation";
import PostForm from "../post-form";

const Page = () => {
  const { postId } = useParams() as { postId: string };

  return <PostForm postId={postId} />;
};

export default Page;
