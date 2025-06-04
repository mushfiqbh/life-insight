"use client";

import CatalogProps from "@/types/catalogProps";
import { Button, Stack, TextareaAutosize, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import { SaveIcon } from "lucide-react";
import React from "react";

const LabelMetadata = ({
  data,
  handleChange,
  buttonText,
}: {
  data: CatalogProps;
  handleChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index?: number
  ) => void;
  buttonText: string;
}) => {
  const router = useRouter();

  return (
    <div className="w-full lg:w-1/2">
      <Stack spacing={2} direction="row">
        <Button
          variant="contained"
          color="error"
          onClick={() =>
            confirm("Are you sure you want to exit?") ? router.back() : null
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
          disabled={
            buttonText === "Saved" || buttonText === "Updated" ? true : false
          }
        >
          {buttonText}
        </Button>
      </Stack>

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
    </div>
  );
};

export default LabelMetadata;
