"use client";

import { assets } from "@/assets/assets";
import {
  Autocomplete,
  Button,
  Checkbox,
  FormControlLabel,
  Stack,
  TextField,
} from "@mui/material";
import { RootState } from "@/redux/store";
import Image from "next/image";
import React, { Dispatch, SetStateAction } from "react";
import { useSelector } from "react-redux";
import PostProps from "@/types/postProps";
import TagsField from "./TagsField";

const PostMetadata = ({
  file,
  setFile,
  postId,
  data,
  setData,
  handleChange,
}: {
  file: File | null;
  setFile: Dispatch<SetStateAction<File | null>>;
  postId: string | undefined;
  data: PostProps;
  setData: Dispatch<SetStateAction<PostProps>>;
  handleChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index?: number
  ) => void;
}) => {
  const { index: labels } = useSelector((state: RootState) => state.conditions);
  const { userInfo } = useSelector((state: RootState) => state.user);

  return (
    <div className="w-full shadow-xl p-5 rounded-md flex flex-col gap-3">
      <Stack direction="row" spacing={5}>
        <label htmlFor="image">
          <Image
            width={100}
            height={100}
            className="cursor-pointer"
            src={assets.upload_area}
            alt="Upload"
          />
        </label>

        <input
          onChange={(e) => {
            const selectedFile = e.target.files?.[0];
            if (selectedFile) {
              setFile(selectedFile);
            } else {
              setFile(null);
            }
          }}
          type="file"
          id="image"
          hidden
        />

        {file && (
          <figure>
            <Image
              width={100}
              height={100}
              src={URL.createObjectURL(file)}
              alt="Uploaded Image"
              className="object-cover"
            />
            <figcaption>New Cover Image</figcaption>
          </figure>
        )}

        {postId && data.image && (
          <figure>
            <Image
              src={data.image}
              width={100}
              height={100}
              alt="Uploaded Image"
            />
            <figcaption>Cover Image</figcaption>
          </figure>
        )}
      </Stack>

      <Autocomplete
        lang="en"
        value={data.label}
        onChange={(event, newValue) => {
          setData({ ...data, label: newValue || "" });
        }}
        disablePortal
        options={labels.map((item) => item.label)}
        sx={{ width: 300 }}
        renderInput={(params) => (
          <TextField {...params} label="Condition" variant="standard" />
        )}
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

      <TagsField data={data} setData={setData} />

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
            disabled={!userInfo?.permissions?.includes("adminChoice")}
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
  );
};

export default PostMetadata;
