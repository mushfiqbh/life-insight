"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import axios from "axios";
import LoadingSpinner from "@/components/ui/loading-spinner";
import CatalogProps from "@/types/catalogProps";
import LabelMetadata from "@/components/admin/LabelMetadata";
import FaqKeyTerms from "@/components/admin/FaqKeyTerms";

const LabelForm = ({ labelId }: { labelId?: string }) => {
  const url = process.env.NEXT_PUBLIC_SERVER_URL;
  const { token } = useSelector((state: RootState) => state.user);
  const [buttonText, setButtonText] = useState(labelId ? "Update" : "Save");
  const [loading, setLoading] = useState(true);
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
  });

  useEffect(() => {
    setButtonText(labelId ? "Update" : "Save");
  }, [labelId, data]);

  useEffect(() => {
    if (labelId && token) {
      const fetchLabelData = async () => {
        const response = await fetch(`${url}/api/catalogs/byid/${labelId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        return response.json();
      };

      setLoading(true);
      fetchLabelData()
        .then((response) => {
          setData(response.data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [labelId, url, token]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index?: number
  ) => {
    setButtonText(labelId ? "Update" : "Save");
    const { name, value } = event.target;

    if (index !== undefined) {
      setData((prev) => {
        const updatedFaqs = [...prev.faqs];
        const updatedKeyTerms = [...prev.keyterms];

        if (name === "question") updatedFaqs[index].question = value;
        else if (name === "answer") updatedFaqs[index].answer = value;
        else if (name === "key") updatedKeyTerms[index].key = value;
        else if (name === "terms") updatedKeyTerms[index].terms = value;

        return { ...prev, faqs: updatedFaqs, keyterms: updatedKeyTerms };
      });
    } else {
      if (name.includes("author")) {
        setData((prev) => ({
          ...prev,
          author: {
            ...prev.author,
            [name.split(".")[1]]: value,
          },
        }));
      } else {
        setData((prev) => ({ ...prev, [name]: value }));
      }
    }
  };

  const createOverview = async (event: React.FormEvent) => {
    event.preventDefault();
    setButtonText(labelId ? "Updating" : "Saving");

    const buildFormData = (): FormData => {
      const formData = new FormData();

      // Clean FAQs and Keyterms
      const faqs = data.faqs.filter((faq) => faq.question && faq.answer);
      const keyterms = data.keyterms.filter((term) => term.key && term.terms);

      const finalData = {
        ...data,
        faqs: faqs.length ? faqs : [{ question: "", answer: "" }],
        keyterms: keyterms.length ? keyterms : [{ key: "", terms: "" }],
      };

      Object.entries(finalData).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          const isObject = typeof value === "object";
          formData.append(
            key,
            isObject ? JSON.stringify(value) : String(value)
          );
        }
      });

      return formData;
    };

    const sendRequest = async (formData: FormData) => {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };

      const endpoint = labelId
        ? `${url}/api/catalogs/${labelId}`
        : `${url}/api/catalogs/`;

      const method = labelId ? axios.put : axios.post;
      return method(endpoint, formData, config);
    };

    try {
      const formData = buildFormData();
      const response = await sendRequest(formData);

      if (!labelId && response.data?.success) {
        setData({
          _id: "",
          title: "",
          subtitle: "",
          desc: "",
          label: "",
          author: { name: "", bio: "" },
          faqs: [{ question: "", answer: "" }],
          keyterms: [{ key: "", terms: "" }],
        });
      }

      setButtonText(labelId ? "Updated" : "Saved");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error.response?.data || error.message);
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="w-4/5 mx-auto mt-20 my-5 p-5">
      <form
        onSubmit={createOverview}
        className="w-full flex flex-col lg:flex-row gap-10"
      >
        <LabelMetadata
          data={data}
          handleChange={handleChange}
          buttonText={buttonText}
        />

        <FaqKeyTerms
          data={data}
          setData={setData}
          handleChange={handleChange}
        />
      </form>
    </div>
  );
};

export default LabelForm;
