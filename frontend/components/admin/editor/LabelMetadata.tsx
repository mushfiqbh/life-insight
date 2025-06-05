"use client";

import CatalogProps from "@/types/catalogProps";
import { Stack, TextareaAutosize, TextField } from "@mui/material";
import React from "react";

const LabelMetadata = ({
  data,
  handleChange,
}: {
  data: CatalogProps;
  handleChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index?: number
  ) => void;
}) => {
  return (
    <div className="flex flex-col gap-5 mt-5">
      <TextField
        label="Title"
        variant="standard"
        name="title"
        value={data.title}
        onChange={handleChange}
        placeholder="বাংলায় নাম দিন"
        className="p-2 border rounded-md"
      />

      <TextField
        label="Subtitle (Label)"
        variant="standard"
        name="subtitle"
        value={data.subtitle}
        onChange={handleChange}
        placeholder="Label (English Only)"
        required
        className="p-2 border rounded-md"
      />

      <Stack direction="row" spacing={3}>
        <TextField
          variant="standard"
          label="Author Name"
          name="author.name"
          value={data.author.name}
          onChange={handleChange}
          required
        />
        <TextField
          variant="standard"
          label="Author Bio"
          name="author.bio"
          value={data.author.bio}
          onChange={handleChange}
          required
        />
      </Stack>

      <TextareaAutosize
        name="desc"
        value={data.desc}
        onChange={handleChange}
        placeholder="বর্ণনা লিখুন"
        className="p-2 border rounded-md focus:outline-none"
      />
    </div>
  );
};

export default LabelMetadata;
