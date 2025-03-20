"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import PostProps from "@/types/postProps";
import CatalogProps from "@/types/catalogProps";
import axios from "axios";
import { useSearchContext } from "@/context/SearchContext";

const Searchbar: React.FC = () => {
  const { setSearchResult, setSearchPerformed } = useSearchContext();
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams?.get("query") || "";
  const [query, setQuery] = useState(initialQuery);
  const [searchTime, setSearchTime] = useState("");
  const url = process.env.NEXT_PUBLIC_SERVER_URL;

  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault();
    setSearchTime(Date.now().toString());
    router.push(`/search?query=${encodeURIComponent(query)}`);

    try {
      const response = await axios.get(url + "/api/search/" + query);

      const data = response.data.data.map(
        ({ item }: { item: PostProps | CatalogProps }) => item
      );

      setSearchResult(data);
      setSearchPerformed(true);
    } catch (error) {
      console.error("Search request failed:", error);
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [searchTime]);

  return (
    <form
      onSubmit={handleSearch}
      className="flex items-center justify-center p-5"
    >
      <input
        type="search"
        value={query}
        ref={inputRef}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="এখানে টাইপ করুন"
        className="w-1/5 p-2 text-red-500 bg-green-300 rounded-l-lg focus:outline-none"
      />
      <button
        type="submit"
        className="p-2 text-white bg-red-500 rounded-r-lg cursor-pointer"
      >
        খুঁজুন
      </button>
    </form>
  );
};

export default Searchbar;
