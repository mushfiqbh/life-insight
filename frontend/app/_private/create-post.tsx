"use client";

import { useState, useRef } from "react";
import axios from "axios";
import insertAtCursor from "@/lib/insertAtCursor";
import { Button, Stack } from "@mui/material";
import Image from "next/image";
import PostProps, { ContentDataProps } from "@/types/postProps";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { useParams, useRouter } from "next/navigation";
import { updateAdminChoice } from "@/redux/postsSlice";
import { assets } from "@/assets/assets";

import parse from "html-react-parser";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { useAdminContext } from "@/context/AdminContext";

const CreatePost = ({
  loading = false,
  reset = false,
}: {
  loading?: boolean;
  reset?: boolean;
}) => {
  const router = useRouter();
  const { postId } = useParams() as { postId: string };
  const { adminChoice } = useSelector(
    (state: RootState) => state.posts.selectedPosts
  );
  const url = process.env.NEXT_PUBLIC_SERVER_URL;
  const { data, setData } = useAdminContext();
  const { token, userInfo } = useSelector((state: RootState) => state.users);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [buttonText, setButtonText] = useState("Save");
  const [step, setStep] = useState(1);
  const [file, setFile] = useState<File | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const [contentData, setContentData] = useState<ContentDataProps>({
    markup: "",
    input1: "",
    input2: "",
    placeholder1: "",
    placeholder2: "",
  });

  if (reset) {
    setData({} as PostProps);
  }

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
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const name = event.target.name;
    const value = event.target.value;
    setButtonText("Save");
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSourcesChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const name = event.target.name;
    const value = event.target.value;
    setButtonText("Save");
    const sourcesDataCopy = [...data.sources];

    if (name === "text") {
      sourcesDataCopy[index].text = value;
    } else if (name === "href") {
      sourcesDataCopy[index].href = value;
    }

    setData({
      ...data,
      sources: sourcesDataCopy,
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setButtonText("Saving");

    const { label, title, subtitle, author, editors, sources, content, date } =
      data;

    // if (!editors.includes(userInfo._id)) {
    //   setData({
    //     ...data,
    //     editors: [...editors, userInfo._id],
    //   });
    // }

    let response;
    // Update Existing Post
    if (postId) {
      response = await axios.put(
        url + "/api/post/update/" + postId,
        {
          ...data,
          label: label.toLowerCase(),
        },
        { headers: { token } }
      );
      setButtonText("Saved");
    } else if (!file) {
      alert("Please upload an image");
      setButtonText("Save");
      // Create New Post
    } else {
      const formData = new FormData();
      formData.append("label", label.toLowerCase());
      formData.append("title", title);
      formData.append("subtitle", subtitle);
      formData.append("author", JSON.stringify(author));
      formData.append("editors", JSON.stringify(editors));
      formData.append("sources", JSON.stringify(sources));
      formData.append("content", content);
      formData.append("date", date);
      formData.append("image", file);

      response = await axios.post(url + "/api/post/create", formData, {
        headers: { token },
      });
      if (response.data.success) {
        setData({
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
          date: new Date().toISOString()
        });
        setFile(null);
      }
      setButtonText("Saved");
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="w-4/5 mt-20 mx-auto my-5 flex flex-col lg:flex-row gap-5">
      <form onSubmit={handleSubmit}>
        <Stack spacing={2} direction="row" justifyContent="space-between">
          <Button variant="contained" color="error">
            EXIT
          </Button>
          <div>
            <div
              hidden={buttonText !== "Saved" ? true : false}
              className="inline"
              onClick={() => router.push("/admin/post/" + postId)}
            >
              <Button
                variant="text"
                type="button"
                style={{ marginLeft: "20px" }}
              >
                Edit Saved Post
              </Button>
            </div>

            {step == 1 ? (
              <Button
                variant="outlined"
                onClick={() => setStep(2)}
                // disabled={
                //   data.label && data.author && data.author ? false : true
                // }
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
              <Image
                src={postId && url + "/images/" + "image3.jpg"} // data.image
                width={100}
                height={100}
                alt=""
              />
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
              {/* <input
                type="text"
                name="author"
                value={data.author.name}
                onChange={handleChange}
              /> */}
            </div>

            <div>
              <label htmlFor="date">Date</label>
              <input
                type="date"
                name="date"
                value={data.date}
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
                    onChange={(event) => handleSourcesChange(event, index)}
                    placeholder={"উৎস যোগ করুন " + (index + 1)}
                  />
                  <input
                    type="text"
                    name="href"
                    value={data.sources[index].href}
                    onChange={(event) => handleSourcesChange(event, index)}
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

            {userInfo?.permission?.includes("adminChoice") && postId && (
              <Stack direction="row">
                <Button
                  type="button"
                  color="success"
                  onClick={() => dispatch(updateAdminChoice(postId))}
                >
                  {adminChoice._id === postId
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

export default CreatePost;
