"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import insertAtCursor from "@/lib/insertAtCursor";
import {
  Button,
  Checkbox,
  FormControlLabel,
  Stack,
  TextField,
} from "@mui/material";
import Image from "next/image";
import PostProps, { ContentDataProps } from "@/types/postProps";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { assets } from "@/assets/assets";
import axios from "axios";
import parse from "html-react-parser";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { SaveIcon } from "lucide-react";

const PostForm = ({ postId }: { postId?: string }) => {
  const [data, setData] = useState<PostProps>({
    _id: "",
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
  });

  const url = process.env.NEXT_PUBLIC_SERVER_URL;
  const router = useRouter();
  const { token, userInfo } = useSelector((state: RootState) => state.users);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [buttonText, setButtonText] = useState("Save");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState(false);
  const [contentData, setContentData] = useState<ContentDataProps>({
    markup: "",
    input1: "",
    input2: "",
    placeholder1: "",
    placeholder2: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (postId) {
      const getPostById = async (postId: string) => {
        const response = await fetch(`${url}/api/posts/${postId}`, {
          headers: { token },
        });
        return response.json();
      };

      setLoading(true);
      getPostById(postId)
        .then((response) => {
          setData(response.data.post);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [postId, url, token]);

  const handleInsertText = () => {
    let textToInsert = "";
    if (contentData.markup === "title") {
      textToInsert = "<h2>" + contentData.input1 + "</h2>";
    } else if (contentData.markup === "blockquote") {
      textToInsert = `<blockquote>${contentData.input1}</blockquote>`;
    } else if (contentData.markup === "quote") {
      textToInsert = `<div class='quote'>${contentData.input1}<b>${contentData.input2}</b></div>`;
    } else if (contentData.markup === "advice") {
      textToInsert = `<div class='advice'>${contentData.input1}<hr/></div>`;
    }

    const newValue = insertAtCursor(textareaRef.current, textToInsert);
    setData({
      ...data,
      content: newValue,
    });
    setContentData({
      markup: "",
      input1: "",
      input2: "",
      placeholder1: "",
      placeholder2: "",
    });
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index?: number
  ) => {
    const { name, value } = event.target;
    setButtonText("Save");

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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!postId && !file) {
      alert("Image is required when creating a new post.");
      return;
    }

    setButtonText("Saving");

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
      if (file) formData.append("image", file);
      return formData;
    };

    const sendRequest = async (formData: FormData) => {
      const config = {
        headers: {
          token,
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
        setButtonText("Saved");
        setData({
          _id: "",
          views: 0,
          adminChoice: false,
          label: "",
          title: "",
          subtitle: "",
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
      setButtonText("Save");
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="w-4/5 mt-20 mx-auto my-5 flex flex-col gap-5">
      <form
        onSubmit={handleSubmit}
        className="w-full py-10 flex flex-col md:flex-row justify-between gap-3"
      >
        {/*================================ Left Section ============================*/}

        <div className="w-full md:w-1/2 flex flex-col gap-3">
          <Stack direction="row" spacing={3}>
            <Button
              variant="contained"
              color="error"
              onClick={() =>
                confirm("Exit without Saving?") ? router.back() : null
              }
            >
              EXIT
            </Button>

            <Button
              type="submit"
              size="small"
              color="info"
              startIcon={<SaveIcon />}
              variant="contained"
              disabled={buttonText === "Saved" ? true : false}
            >
              {buttonText}
            </Button>
          </Stack>

          <Stack direction="row" spacing={5}>
            <label htmlFor="image">
              <Image
                width={100}
                height={100}
                className="cursor-pointer"
                src={file ? URL.createObjectURL(file) : assets.upload_area}
                alt=""
              />
            </label>

            <input
              onChange={(e) => {
                if (e.target.files) {
                  setFile(e.target.files[0]);
                }
              }}
              type="file"
              id="image"
              hidden
            />

            {postId && (
              <Image
                src={`${url}/api/image/${data.image}`}
                width={100}
                height={100}
                alt=""
              />
            )}
          </Stack>

          <TextField
            label="Label"
            variant="standard"
            lang="en"
            name="label"
            value={data.label}
            onChange={handleChange}
            placeholder="Label (English Only)"
            required
          />

          <TextField
            label="Title"
            variant="standard"
            type="text"
            name="title"
            value={data.title}
            onChange={handleChange}
            placeholder="শিরোনাম"
          />

          <TextField
            label="Subtitle"
            variant="standard"
            type="text"
            name="subtitle"
            value={data.subtitle}
            onChange={handleChange}
            placeholder="সাবটাইটেল"
          />

          <Stack width="100%" direction="row" spacing={3}>
            <TextField
              label="Author Name"
              variant="standard"
              type="text"
              name="author.name"
              value={data.author?.name}
              onChange={handleChange}
            />
            <TextField
              label="Author Bio"
              variant="standard"
              type="text"
              name="author.bio"
              value={data.author?.bio}
              onChange={handleChange}
            />
          </Stack>

          {data?.sources?.map((_, index) => (
            <Stack key={index} direction="row" spacing={3}>
              <TextField
                label={`Source ${index + 1} Title`}
                variant="standard"
                type="text"
                name="text"
                value={data.sources[index].text}
                onChange={(event) => handleChange(event, index)}
              />
              <TextField
                label={`Source ${index + 1} Link`}
                variant="standard"
                type="text"
                name="href"
                value={data.sources[index].href}
                onChange={(event) => handleChange(event, index)}
              />
            </Stack>
          ))}

          <Button
            type="button"
            variant="outlined"
            color="error"
            className="w-fit"
            onClick={() => {
              setData({
                ...data,
                sources: [
                  ...data.sources,
                  {
                    text: "",
                    href: "",
                  },
                ],
              });
            }}
          >
            + Add Source
          </Button>

          <FormControlLabel
            control={
              <Checkbox
                checked={!!data?.adminChoice}
                disabled={!userInfo?.permission?.includes("adminChoice")}
                onChange={() =>
                  setData({
                    ...data,
                    adminChoice: !data.adminChoice,
                  })
                }
              />
            }
            label={
              data?.adminChoice
                ? "Admin Choiced Post"
                : "Make This Post Admin Choice"
            }
          />
        </div>

        {/*================================ Right Section ============================*/}

        <div className="w-full md:w-1/2 flex-col gap-3">
          <Button
            variant="outlined"
            type="button"
            onClick={() => setPreview(!preview)}
            className="float-right"
          >
            {preview ? "Editing" : "Preview"}
          </Button>

          {preview ? (
            <div>{parse(data.content || "")}</div>
          ) : (
            <div>
              <Stack direction="row" flexWrap="wrap">
                <Button
                  variant="text"
                  color="warning"
                  onClick={() =>
                    setContentData({
                      ...contentData,
                      markup: "title",
                      placeholder1: "Title",
                      placeholder2: "",
                    })
                  }
                >
                  Title
                </Button>
                <Button
                  variant="text"
                  color="warning"
                  onClick={() =>
                    setContentData({
                      ...contentData,
                      markup: "blockquote",
                      placeholder1: "Quote Text",
                      placeholder2: "",
                    })
                  }
                >
                  Blockquote
                </Button>
                <Button
                  variant="text"
                  color="warning"
                  onClick={() =>
                    setContentData({
                      ...contentData,
                      markup: "quote",
                      placeholder1: "Quote Text",
                      placeholder2: "Who Said?",
                    })
                  }
                >
                  Quote
                </Button>
                <Button
                  variant="text"
                  color="warning"
                  onClick={() =>
                    setContentData({
                      ...contentData,
                      markup: "advice",
                      placeholder1: "Quote Title",
                      placeholder2: "",
                    })
                  }
                >
                  Advice
                </Button>
              </Stack>

              {contentData.markup && (
                <Stack direction="column" gap={3}>
                  {contentData.placeholder1 && (
                    <TextField
                      label=""
                      variant="standard"
                      type="text"
                      name="input1"
                      value={contentData.input1}
                      placeholder={contentData.placeholder1}
                      onChange={(e) =>
                        setContentData({
                          ...contentData,
                          input1: e.target.value,
                        })
                      }
                    />
                  )}

                  {contentData.placeholder2 && (
                    <TextField
                      label=""
                      variant="standard"
                      type="text"
                      name="input2"
                      value={contentData.input2}
                      placeholder={contentData.placeholder2}
                      onChange={(e) =>
                        setContentData({
                          ...contentData,
                          input2: e.target.value,
                        })
                      }
                    />
                  )}

                  <Stack direction="row" gap={3}>
                    <Button
                      type="button"
                      color="warning"
                      variant="outlined"
                      className="w-fit"
                      onClick={handleInsertText}
                    >
                      MOVE CURSOR WHERE TO INSERT THAN CLICK ME
                    </Button>
                    <Button
                      type="button"
                      color="warning"
                      variant="outlined"
                      className="w-fit"
                      onClick={() =>
                        setContentData({ ...contentData, markup: "" })
                      }
                    >
                      CLOSE
                    </Button>
                  </Stack>
                </Stack>
              )}

              <textarea
                className="w-full min-h-screen focus:outline-none p-5"
                ref={textareaRef}
                name="content"
                value={data.content}
                onChange={handleChange}
                placeholder="Type HTML/CSS/Rich Text Code Here"
              />
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default PostForm;
