"use client";

import CatalogProps from "@/types/catalogProps";
import { Button } from "@mui/material";
import React from "react";

const FaqKeyTerms = ({
  data,
  setData,
  handleChange,
}: {
  data: CatalogProps;
  setData: React.Dispatch<React.SetStateAction<CatalogProps>>;
  handleChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index?: number
  ) => void;
}) => {
  return (
    <div className="w-full lg:w-1/2 flex flex-col gap-5">
      <h3 className="text-2xl">FAQs</h3>
      {data.faqs.map((faq, index) => (
        <div key={index} className="flex flex-col gap-2 border p-2 rounded-md">
          <input
            type="text"
            name="question"
            value={faq.question}
            onChange={(e) => handleChange(e, index)}
            placeholder="Question"
            className="p-2 border rounded-md"
          />
          <textarea
            name="answer"
            value={faq.answer}
            onChange={(e) => handleChange(e, index)}
            placeholder="Answer"
            className="p-2 border rounded-md"
          />
        </div>
      ))}

      <Button
        onClick={() =>
          setData((prev) => ({
            ...prev,
            faqs: [...prev.faqs, { question: "", answer: "" }],
          }))
        }
        variant="outlined"
        color="info"
      >
        Add FAQ
      </Button>

      <h3 className="text-2xl">Key Terms</h3>
      {data.keyterms.map((keyterm, index) => (
        <div key={index} className="flex flex-col gap-2 border p-2 rounded-md">
          <input
            type="text"
            name="key"
            value={keyterm.key}
            onChange={(e) => handleChange(e, index)}
            placeholder="Key"
            className="p-2 border rounded-md"
          />
          <textarea
            name="terms"
            value={keyterm.terms}
            onChange={(e) => handleChange(e, index)}
            placeholder="Term"
            className="p-2 border rounded-md"
          />
        </div>
      ))}

      <Button
        onClick={() =>
          setData((prev) => ({
            ...prev,
            keyterms: [...prev.keyterms, { key: "", terms: "" }],
          }))
        }
        variant="outlined"
        color="info"
      >
        Add KeyTerm
      </Button>
    </div>
  );
};

export default FaqKeyTerms;
