"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { useSearchContext } from "@/context/SearchContext";
import PostProps from "@/types/postProps";
import ConditionProps from "@/types/conditionProps";

const Searchbar: React.FC = () => {
  const { setSearchResult, setSearchPerformed } = useSearchContext();
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams?.get("query") || "";
  const [query, setQuery] = useState(initialQuery);
  const url = process.env.NEXT_PUBLIC_SERVER_URL;

  // Debounce search effect
  useEffect(() => {
    if (!query) {
      setSearchResult([]);
      setSearchPerformed(false);
      return;
    }

    const delayDebounce = setTimeout(async () => {
      router.push(`/search?query=${encodeURIComponent(query)}`);

      try {
        const response = await axios.get(url + "/api/search/" + query);
        const data = response.data.data.map(
          ({ item }: { item: PostProps | ConditionProps }) => item
        );

        setSearchResult(data);
        setSearchPerformed(true);
      } catch (error) {
        console.error("Search request failed:", error);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [query, router, url, setSearchResult, setSearchPerformed]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <form className="flex items-center justify-center p-5">
      <input
        type="search"
        value={query}
        ref={inputRef}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="এখানে টাইপ করুন"
        className="w-full md:w-2/5 p-2 text-red-500 bg-green-300 rounded-lg focus:outline-none"
      />
    </form>
  );
};

export default Searchbar;
