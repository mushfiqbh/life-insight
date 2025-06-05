"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import axios from "axios";
import ConditionProps from "@/types/conditionProps";
import LoadingSpinner from "@/components/ui/loading-spinner";
import ConditionMetadata from "./editor/ConditionMetadata";
import FaqKeyTerms from "./editor/FaqKeyTerms";
import ControlPanel from "./Control-Panel";

const ConditionForm = ({ conditionId }: { conditionId?: string }) => {
  const url = process.env.NEXT_PUBLIC_SERVER_URL;
  const { token } = useSelector((state: RootState) => state.user);
  const [buttonText, setButtonText] = useState(conditionId ? "Update" : "Save");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<ConditionProps>({
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
    setButtonText(conditionId ? "Update" : "Save");
  }, [conditionId, data]);

  useEffect(() => {
    if (conditionId && token) {
      const fetchLabelData = async () => {
        const response = await fetch(
          `${url}/api/conditions/byid/${conditionId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
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
  }, [conditionId, url, token]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index?: number
  ) => {
    setButtonText(conditionId ? "Update" : "Save");
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

  const createCondition = async (event: React.FormEvent) => {
    event.preventDefault();
    setButtonText(conditionId ? "Updating" : "Saving");

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

      const endpoint = conditionId
        ? `${url}/api/conditions/${conditionId}`
        : `${url}/api/conditions/`;

      const method = conditionId ? axios.put : axios.post;
      return method(endpoint, formData, config);
    };

    try {
      const formData = buildFormData();
      const response = await sendRequest(formData);

      if (!conditionId && response.data?.success) {
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

      setButtonText(conditionId ? "Updated" : "Saved");
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
      <form onSubmit={createCondition} className="w-full py-10 space-y-5">
        <ControlPanel buttonText={buttonText} />

        <ConditionMetadata data={data} handleChange={handleChange} />

        <FaqKeyTerms
          data={data}
          setData={setData}
          handleChange={handleChange}
        />
      </form>
    </div>
  );
};

export default ConditionForm;
