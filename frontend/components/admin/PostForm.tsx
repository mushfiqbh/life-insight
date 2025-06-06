"use client";

import { useEffect, useState } from "react";
import PostProps, { ContentDataProps } from "@/types/postProps";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import axios from "axios";
import LoadingSpinner from "@/components/ui/loading-spinner";
import TextContent from "./editor/TextContent";
import PostMetadata from "./editor/PostMetadata";
import ControlPanel from "./Control-Panel";

const PostForm = ({ postId }: { postId?: string }) => {
  const url = process.env.NEXT_PUBLIC_SERVER_URL;
  const [loading, setLoading] = useState(true);
  const { token } = useSelector((state: RootState) => state.user);
  const [buttonText, setButtonText] = useState(postId ? "Update" : "Save");
  const [file, setFile] = useState<File | null>(null);
  const [data, setData] = useState<PostProps>({
    _id: "",
    views: 0,
    adminChoice: false,
    label: "",
    title: "",
    subtitle: "",
    tags: [],
    author: {
      name: "",
      bio: "",
    },
    editors: [],
    sources: [{ text: "", href: "" }],
    content: "",
    image: "",
  });
  const [contentData, setContentData] = useState<ContentDataProps>({
    markup: "",
    input1: "",
    input2: "",
    placeholder1: "",
    placeholder2: "",
  });

  useEffect(() => {
    setButtonText(postId ? "Update" : "Save");
  }, [postId, data, contentData]);

  useEffect(() => {
    if (postId && token) {
      const getPostById = async (postId: string) => {
        const response = await fetch(`${url}/api/posts/${postId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        return await response.json();
      };

      setLoading(true);
      getPostById(postId)
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching post:", error);
          alert("Failed to load post data. Please try again later.");
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [postId, url, token]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index?: number
  ) => {
    const { name, value } = event.target;

    if (typeof index === "number") {
      const sourcesData = [...data.sources];
      if (name === "text" || name === "href") {
        sourcesData[index][name] = value;
        setData({ ...data, sources: sourcesData });
      }
    } else if (name.startsWith("author.")) {
      const field = name.split(".")[1];
      setData({
        ...data,
        author: { ...data.author, [field]: value },
      });
    } else {
      setData({ ...data, [name]: value });
    }
  };

  const createPost = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!postId && !file) {
      alert("Cover Image is required when creating a new post.");
      return;
    }

    if (!data.label.trim().length) {
      alert("Please select a condition for the post.");
      return;
    }

    setButtonText(postId ? "Updating" : "Saving");

    const buildFormData = (): FormData => {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          const isObject = typeof value === "object";
          formData.append(
            key,
            isObject ? JSON.stringify(value) : String(value)
          );
        }
      });

      formData.append("image", file ? file : data.image);

      return formData;
    };

    const sendRequest = async (formData: FormData) => {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const endpoint = postId
        ? `${url}/api/posts/${data._id}`
        : `${url}/api/posts/`;

      const method = postId ? axios.put : axios.post;
      return method(endpoint, formData, config);
    };

    try {
      const formData = buildFormData();

      const response = await sendRequest(formData);

      if (!postId && response.data?.success) {
        setButtonText(postId ? "Updated" : "Saved");
        setData({
          _id: "",
          views: 0,
          adminChoice: false,
          label: "",
          title: "",
          subtitle: "",
          tags: [],
          author: { name: "", bio: "" },
          editors: [],
          sources: [{ text: "", href: "" }],
          content: "",
          image: "",
        });
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error.response?.data || error.message);
      } else {
        console.error("Unexpected error:", error);
      }
    } finally {
      setButtonText(postId ? "Updated" : "Saved");
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="w-4/5 mt-20 mx-auto my-5">
      <form onSubmit={createPost} className="w-full py-10">
        <ControlPanel buttonText={buttonText} />

        <PostMetadata
          postId={postId}
          file={file}
          setFile={setFile}
          data={data}
          setData={setData}
          handleChange={handleChange}
        />

        <TextContent
          data={data}
          setData={setData}
          contentData={contentData}
          setContentData={setContentData}
          handleChange={handleChange}
        />
      </form>
    </div>
  );
};

export default PostForm;
