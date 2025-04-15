"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Stack, TextareaAutosize, TextField } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import axios from "axios";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { SaveIcon } from "lucide-react";
import CatalogProps from "@/types/catalogProps";

const LabelForm = ({ labelId }: { labelId?: string }) => {
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

  const url = process.env.NEXT_PUBLIC_SERVER_URL;
  const router = useRouter();
  const { token } = useSelector((state: RootState) => state.users);
  const [buttonText, setButtonText] = useState("Save");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (labelId) {
      const fetchLabelData = async () => {
        const response = await fetch(`${url}/api/catalogs/byid/${labelId}`, {
          headers: { token },
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
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setButtonText("Save");
    const { name, value } = event.target;
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
  };

  const handleFaqsChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    setButtonText("Save");
    const { name, value } = event.target;
    setData((prev) => {
      const updatedFaqs = [...prev.faqs];
      const updatedKeyTerms = [...prev.keyterms];

      if (name === "question") updatedFaqs[index].question = value;
      else if (name === "answer") updatedFaqs[index].answer = value;
      else if (name === "key") updatedKeyTerms[index].key = value;
      else if (name === "terms") updatedKeyTerms[index].terms = value;

      return { ...prev, faqs: updatedFaqs, keyterms: updatedKeyTerms };
    });
  };

  const createOverview = async (event: React.FormEvent) => {
    event.preventDefault();
    setButtonText("Saving");

    const filteredFaqs = data.faqs.filter((faq) => faq.question && faq.answer);
    const filteredKeyterms = data.keyterms.filter(
      (keyterm) => keyterm.key && keyterm.terms
    );

    const formData = {
      ...data,
      faqs: filteredFaqs.length ? filteredFaqs : [{ question: "", answer: "" }],
      keyterms: filteredKeyterms.length
        ? filteredKeyterms
        : [{ key: "", terms: "" }],
    };

    try {
      if (labelId) {
        const response = await axios.put(
          `${url}/api/catalogs/${labelId}`,
          formData,
          {
            headers: { token },
          }
        );
        if (response.data.success) {
          console.log("Overview Updated Successfully");
        } else {
          console.error(response.data.message);
        }
      } else {
        const response = await axios.post(`${url}/api/catalogs/`, formData, {
          headers: { token },
        });
        if (response.data.success) {
          setData({
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
        } else {
          console.error(response.data.message);
        }
      }

      setButtonText("Saved");
    } catch (error) {
      console.error("Error saving overview:", error);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="w-4/5 mx-auto mt-20 my-5 p-5">
      <form
        onSubmit={createOverview}
        className="w-full flex flex-col lg:flex-row gap-10"
      >
        <div className="w-full lg:w-1/2">
          <Stack spacing={2} direction="row">
            <Button
              variant="contained"
              color="error"
              onClick={() => router.push("/admin")}
            >
              EXIT
            </Button>
            <Button
              type="submit"
              size="small"
              color="info"
              startIcon={<SaveIcon />}
              variant="contained"
              disabled={buttonText === "Saved" ? true : false}
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

        {/* Right Form */}

        <div className="w-full lg:w-1/2 flex flex-col gap-5">
          <h3 className="text-2xl">FAQs</h3>
          {data.faqs.map((faq, index) => (
            <div
              key={index}
              className="flex flex-col gap-2 border p-2 rounded-md"
            >
              <input
                type="text"
                name="question"
                value={faq.question}
                onChange={(e) => handleFaqsChange(e, index)}
                placeholder="Question"
                className="p-2 border rounded-md"
              />
              <textarea
                name="answer"
                value={faq.answer}
                onChange={(e) => handleFaqsChange(e, index)}
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
            <div
              key={index}
              className="flex flex-col gap-2 border p-2 rounded-md"
            >
              <input
                type="text"
                name="key"
                value={keyterm.key}
                onChange={(e) => handleFaqsChange(e, index)}
                placeholder="Key"
                className="p-2 border rounded-md"
              />
              <textarea
                name="terms"
                value={keyterm.terms}
                onChange={(e) => handleFaqsChange(e, index)}
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
      </form>
    </div>
  );
};

export default LabelForm;
