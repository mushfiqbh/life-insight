"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import parse from "html-react-parser";
import "./contentTOC.css";

export default function ContentWithTOC({ data }: { data: string }) {
  const [headings, setHeadings] = useState<
    { id: string; text: string; level: string }[]
  >([]);

  useEffect(() => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = data;
    const extractedHeadings = Array.from(
      tempDiv.querySelectorAll("h1, h2, h3")
    )?.map((heading) => ({
      id: heading.innerHTML.replace(/\s+/g, "-").toLowerCase(),
      text: heading.innerHTML,
      level: heading.tagName.toLowerCase(),
    }));

    setHeadings(extractedHeadings);
  }, [data]);

  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* Sidebar TOC */}
      <aside className="w-full md:w-1/4 h-fit p-4 bg-white shadow-md rounded-lg">
        <h2 className="text-lg font-semibold mb-2">Contents</h2>
        <ul className="space-y-2">
          {headings.map((heading) => (
            <li key={heading.id} className="pl-2 border-l-2 border-gray-300">
              <a
                href={`#${heading.id}`}
                className="text-blue-500 hover:underline block"
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content */}
      <Card className="w-full md:w-3/4 p-2">
        <motion.div
          className="post_elements_parent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {parse(
            (data ?? "").replace(/<h1|<h2|<h3/g, (match) => {
              const tag = match.slice(1);
              return `<${tag} id="${tag.replace(/\s+/g, "-").toLowerCase()}"`;
            })
          )}
        </motion.div>
      </Card>
    </div>
  );
}
