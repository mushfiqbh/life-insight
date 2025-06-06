import React, { useState, SyntheticEvent } from "react";
import PostProps from "@/types/postProps";
import { Autocomplete, Chip, TextField } from "@mui/material";

interface TagsFieldProps {
  data: PostProps;
  setData: React.Dispatch<React.SetStateAction<PostProps>>;
}

const TagsField: React.FC<TagsFieldProps> = ({ data, setData }) => {
  const tags = data.tags || [];

  // Local state to control the input field
  const [inputValue, setInputValue] = useState("");

  const handleChange = (
    _: SyntheticEvent<Element, Event>,
    newValue: string[]
  ) => {
    const uniqueTags = Array.from(
      new Set(newValue.map((tag) => tag.trim()))
    ).filter(Boolean);
    setData({
      ...data,
      tags: uniqueTags,
    });
  };

  const handleInputChange = (
    _: SyntheticEvent<Element, Event>,
    value: string,
    reason: string
  ) => {
    if (reason === "input" && (value.endsWith(",") || value.endsWith(" "))) {
      const newTag = value.slice(0, -1).trim();
      if (newTag && !tags.includes(newTag)) {
        const updatedTags = [...tags, newTag];
        setData({
          ...data,
          tags: updatedTags,
        });
      }
      // Clear the input field
      setInputValue("");
    } else {
      setInputValue(value);
    }
  };

  return (
    <Autocomplete
      multiple
      freeSolo
      options={[]} // No predefined options
      value={tags}
      onChange={handleChange}
      inputValue={inputValue}
      onInputChange={handleInputChange}
      renderTags={(value: readonly string[], getTagProps) =>
        value.map((option: string, index: number) => {
          const { key, ...otherProps } = getTagProps({ index });
          return (
            <Chip
              key={key}
              variant="outlined"
              label={option}
              {...otherProps}
            />
          );
        })
      }
      renderInput={(params) => (
        <TextField
          {...params}
          variant="standard"
          label="Post Tags"
          placeholder="Type a tag and press space or comma"
        />
      )}
      filterSelectedOptions
    />
  );
};

export default TagsField;
