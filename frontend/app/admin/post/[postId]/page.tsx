"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import PostProps from "@/types/postProps";
import CreatePost from "@/app/_private/create-post";
import { useParams } from "next/navigation";

const Page = () => {
  const { postId } = useParams() as { postId: string };
  const url = process.env.NEXT_PUBLIC_SERVER_URL;
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<PostProps>({
    _id: "",
    readingTime: 0,
    views: 0,
    adminChoice: false,
    label: "",
    title: "",
    subtitle: "",
    author: {
      name: "",
      bio: "",
    },
    editors: [],
    sources: [{ text: "", href: "" }],
    content: "",
    image: "",
    date: new Date().toISOString().split("T")[0],
  });

  useEffect(() => {
    const fetchPostData = async () => {
      const response = await axios.get(`${url}/api/posts/${postId}`);
      const postData = response.data.data;      
      setData(postData);
      setLoading(false);
    };
    fetchPostData();
  }, [postId, url]);

  return <CreatePost data={data} setData={setData} loading={loading} />;
};

export default Page;
