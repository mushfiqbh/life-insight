"use client";

import ContentWithTOC from "@/components/contentTOC";
import { Button, Stack, TextField } from "@mui/material";
import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import insertAtCursor from "@/lib/insertAtCursor";
import PostProps, { ContentDataProps } from "@/types/postProps";

const TextEditor = ({
  data,
  setData,
  contentData,
  setContentData,
  handleChange,
}: {
  data: PostProps;
  setData: Dispatch<SetStateAction<PostProps>>;
  contentData: ContentDataProps;
  setContentData: Dispatch<SetStateAction<ContentDataProps>>;
  handleChange: React.ChangeEventHandler<HTMLTextAreaElement>;
}) => {
  const [preview, setPreview] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

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

  return (
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
        <div>
          <ContentWithTOC data={data.content} noTOC />
        </div>
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
                  onClick={() => setContentData({ ...contentData, markup: "" })}
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
  );
};

export default TextEditor;
