"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import insertAtCursor from "@/lib/insertAtCursor";
import { Button, Stack } from "@mui/material";
import Image from "next/image";
import PostProps, { ContentDataProps } from "@/types/postProps";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { assets } from "@/assets/assets";
import parse from "html-react-parser";
import axios from "axios";
import LoadingSpinner from "@/components/ui/loading-spinner";

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
  const [step, setStep] = useState(1);
  const [file, setFile] = useState<File | null>(null);
  const [contentData, setContentData] = useState<ContentDataProps>({
    markup: "",
    input1: "",
    input2: "",
    placeholder1: "",
    placeholder2: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPostById = async (postId: string) => {
      const res = await fetch(`${url}/api/posts/${postId}`);
      return res.json();
    };

    if (postId) {
      setLoading(true);
      getPostById(postId)
        .then((response) => {
          setData(response.data.post);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [postId, url]);

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
    setButtonText("Saving");
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(
        key,
        typeof value === "object" ? JSON.stringify(value) : value
      );
    });
    if (file) formData.append("image", file);
    const response = postId
      ? await axios.put(`${url}/api/posts/${data._id}`, formData, {
          headers: { token },
        })
      : await axios.post(`${url}/api/posts/`, formData, { headers: { token } });
    if (response.data.success) setData({} as PostProps);
    setButtonText("Saved");
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="w-4/5 mt-20 mx-auto my-5 flex flex-col lg:flex-row gap-5">
      <form onSubmit={handleSubmit}>
        <Stack spacing={2} direction="row" justifyContent="space-between">
          <Button
            variant="contained"
            color="error"
            onClick={() => router.back()}
          >
            EXIT
          </Button>
          <div>
            {postId && (
              <div
                hidden={buttonText !== "Saved" ? true : false}
                className="inline"
                onClick={() => router.push("/admin/post/" + data._id)}
              >
                <Button
                  variant="text"
                  type="button"
                  style={{ marginLeft: "20px" }}
                >
                  Edit Saved Post
                </Button>
              </div>
            )}

            {step == 1 ? (
              <Button
                variant="outlined"
                onClick={() => setStep(2)}
                disabled={data.label && data.author ? false : true}
              >
                Next
              </Button>
            ) : (
              <Button variant="outlined" onClick={() => setStep(1)}>
                Back
              </Button>
            )}

            <Button
              variant="contained"
              type="submit"
              style={{ marginLeft: "20px" }}
              disabled={buttonText === "Saved" ? true : false}
            >
              {buttonText}
            </Button>
          </div>
        </Stack>
        <br />

        {step === 1 && (
          <div className="form_metadata">
            <div className="add_image_upload">
              <label htmlFor="image">
                <Image
                  width={100}
                  height={100}
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
                  src={url + "/images/" + "image3.jpg"} // data.image
                  width={100}
                  height={100}
                  alt=""
                />
              )}
            </div>

            <div>
              <label htmlFor="label">Label</label>
              <input
                lang="en"
                type="text"
                name="label"
                value={data.label}
                onChange={handleChange}
                placeholder="Label (English Only)"
                required
              />
            </div>

            <div>
              <label htmlFor="title">Title</label>
              <input
                type="text"
                name="title"
                value={data.title}
                onChange={handleChange}
                placeholder="শিরোনাম"
              />
            </div>
            <div>
              <label htmlFor="subtitle">Subtitle</label>
              <input
                type="text"
                name="subtitle"
                value={data.subtitle}
                onChange={handleChange}
                placeholder="সাবটাইটেল"
              />
            </div>

            <div className="mui_input">
              <label htmlFor="author">Author</label>
              <input
                type="text"
                name="author.name"
                value={data.author?.name}
                onChange={handleChange}
              />
            </div>

            <div className="mui_input">
              <label htmlFor="author">Author</label>
              <input
                type="text"
                name="author.bio"
                value={data.author?.bio}
                onChange={handleChange}
              />
            </div>

            <div className="form_sources">
              <label htmlFor="sources"></label>
              {data?.sources?.map((item, index) => (
                <fieldset key={index}>
                  <legend>{"Source " + (index + 1)}</legend>
                  <input
                    type="text"
                    name="text"
                    value={data.sources[index].text}
                    onChange={(event) => handleChange(event, index)}
                    placeholder={"উৎস যোগ করুন " + (index + 1)}
                  />
                  <input
                    type="text"
                    name="href"
                    value={data.sources[index].href}
                    onChange={(event) => handleChange(event, index)}
                    placeholder={"উৎস লিঙ্ক যোগ করুন " + (index + 1)}
                  />
                </fieldset>
              ))}
              <Button
                type="button"
                variant="outlined"
                color="info"
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
                ADD ANOTHOR SOURCE
              </Button>
            </div>

            {userInfo?.permission?.includes("adminChoice") && (
              <Stack direction="row">
                <Button
                  type="button"
                  color="success"
                  onClick={() => {
                    setData({
                      ...data,
                      adminChoice: !data.adminChoice,
                    });
                  }}
                >
                  {data?.adminChoice
                    ? "Admin Choiced *"
                    : "Make Admin Choice *"}
                </Button>
              </Stack>
            )}
          </div>
        )}
        {step === 2 && (
          <div className="form_content">
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
              <Stack direction="column">
                {contentData.placeholder1 && (
                  <input
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
                  <input
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

                <Button
                  type="button"
                  color="warning"
                  variant="outlined"
                  onClick={handleInsertText}
                >
                  MOVE CURSOR WHERE TO INSERT THAN CLICK ME
                </Button>
              </Stack>
            )}

            <div>
              <textarea
                ref={textareaRef}
                name="content"
                value={data.content}
                onChange={handleChange}
                placeholder="Type HTML/CSS/Rich Text Code Here"
              />
            </div>
          </div>
        )}
      </form>

      <div className="w-full lg:w-1/2 p-5 rounded-lg shadow">
        <h2 className="text-lg font-bold mb-2">Post Preview</h2>
        <div>{parse(data.content || "")}</div>
      </div>
    </div>
  );
};

export default PostForm;
