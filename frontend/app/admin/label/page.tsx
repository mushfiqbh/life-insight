"use client";

import { useState } from "react";
import CatalogProps from "@/types/catalogProps";
import CreateLabel from "@/app/_private/create-label";

const Page = () => {
  const [data, setData] = useState<CatalogProps>({
    _id: "",
    title: "",
    subtitle: "",
    desc: "",
    label: "",
    author: {
      name: "",
      bio: "",
    },
    faqs: [{ question: "", answer: "" }],
    keyterms: [{ key: "", terms: "" }],
    date: new Date().toISOString().split("T")[0],
  });

  return <CreateLabel data={data} setData={setData} />;
};

export default Page;
