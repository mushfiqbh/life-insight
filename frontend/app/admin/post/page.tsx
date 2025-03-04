"use client";

import { useState } from "react";
import PostProps from "@/types/postProps";
import CreatePost from "@/app/_private/create-post";

const Page = () => {
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

  return <CreatePost data={data} setData={setData} />;
};

export default Page;
