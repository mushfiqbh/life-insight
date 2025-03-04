"use client";

import { useState, useEffect } from "react";
import CatalogProps from "@/types/catalogProps";
import CreateLabel from "@/app/_private/create-label";
import { useParams } from "next/navigation";
import axios from "axios";

const Page = () => {
  const { labelId } = useParams() as { labelId: string };
  const url = process.env.NEXT_PUBLIC_SERVER_URL;
  const [loading, setLoading] = useState<boolean>(true);
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

  useEffect(() => {
    const fetchLabelData = async () => {
      const response = await axios.get(`${url}/api/catalogs/${labelId}`);
      const labelData = response.data.data;
      setData(labelData);
      setLoading(false);
    };
    fetchLabelData();
  }, [labelId, url]);

  return <CreateLabel data={data} setData={setData} loading={loading} />;
};

export default Page;
