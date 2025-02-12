"use client";

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import DOMPurify from "dompurify";
import FreeSoloCreateOptionDialog from "@/lib/SelectDialogue";
import insertAtCursor from "@/lib/insertAtCursor";
import { Button, Stack } from "@mui/material";
import PostProps from "@/types/postProps";
import { ContentDataProps } from "@/types/postProps";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";

const Page = () => {
  const postId = useParams<{ postId: string }>();
  const url = process.env.NEXT_PUBLIC_SERVER_URL;
  const { token, userInfo } = useSelector((state: RootState) => state.users);

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const router = useRouter();
  const [buttonText, setButtonText] = useState("Save");
  const [step, setStep] = useState(1);
  const [file, setFile] = useState<File | null>(null);
  const [contentData, setContentData] = useState<ContentDataProps>({
    markup: "",
    input1: "",
    input2: "",
    placeholder1: "",
    placeholder2: "",
  });

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
    if (postId) {
      fetchPostData();
    }
  }, [postId]);

  const fetchPostData = async () => {
    const response = await axios.get(`${url}/api/posts/${postId}`);
    const postData = response.data.data;
    setData({
      ...postData,
      date: new Date(postData.date).toISOString().split("T")[0],
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setButtonText("Save");
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const createPost = async (event: React.FormEvent) => {
    event.preventDefault();
    setButtonText("Saving");

    if (postId) {
      await axios.put(
        `${url}/api/post/update/${postId}`,
        { ...data, label: data.label.toLowerCase() },
        { headers: { token } }
      );
    } else if (!file) {
      alert("Please upload an image");
      setButtonText("Save");
    } else {
      const formData = new FormData();
      formData.append("image", file);
      Object.entries(data).forEach(([key, value]) =>
        formData.append(
          key,
          typeof value === "string" ? value : JSON.stringify(value)
        )
      );
      await axios.post(`${url}/api/post/create`, formData, {
        headers: { token },
      });
      setButtonText("Saved");
    }
  };

  return (
    <div className="w-4/5 mx-auto my-5 flex flex-col lg:flex-row gap-5">
      <form
        onSubmit={createPost}
        className="w-full lg:w-1/2 p-5 bg-white rounded-lg shadow"
      >
        <Stack spacing={2} direction="row" justifyContent="space-between">
          <Button
            variant="contained"
            color="error"
            onClick={() => router.push("/admin")}
          >
            EXIT
          </Button>
          <Button
            variant="contained"
            type="submit"
            disabled={buttonText === "Saved"}
          >
            {buttonText}
          </Button>
        </Stack>
        <div className="mt-5 flex flex-col gap-4">
          <label className="block">
            Label:
            <input
              type="text"
              name="label"
              value={data.label}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </label>
          <label className="block">
            Title:
            <input
              type="text"
              name="title"
              value={data.title}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </label>
          <label className="block">
            Subtitle:
            <input
              type="text"
              name="subtitle"
              value={data.subtitle}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </label>
          <label className="block">
            Date:
            <input
              type="date"
              name="date"
              value={data.date}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </label>
          <label className="block">
            Image:
            <input
              type="file"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="w-full p-2 border rounded"
            />
          </label>
        </div>
      </form>
      <div className="w-full lg:w-1/2 p-5 bg-gray-100 rounded-lg shadow">
        <h2 className="text-lg font-bold mb-2">Post Preview</h2>
        <div
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data.content) }}
          className="prose"
        ></div>
      </div>
    </div>
  );
};

export default Page;
