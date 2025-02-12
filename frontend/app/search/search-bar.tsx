"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Fuse from "fuse.js";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import PostProps from "@/types/postProps";
import CatalogProps from "@/types/catalogProps";

interface SearchbarProps {
  setSearchResult: (result: (PostProps | CatalogProps)[]) => void;
  setSearchPerformed: (performed: boolean) => void;
}

const Searchbar: React.FC<SearchbarProps> = ({
  setSearchResult,
  setSearchPerformed,
}) => {
  const posts = useSelector((state: RootState) => state.posts.posts);
  const catalog = useSelector((state: RootState) => state.catalogs.catalog);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams?.get("query") || "";
  const [query, setQuery] = useState(initialQuery);
  const [searchTime, setSearchTime] = useState("");

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    setSearchTime(Date.now().toString());
    router.push(`/search?query=${encodeURIComponent(query)}`);

    const options = {
      keys: ["title", "subtitle", "content", "desc"],
      includeScore: true,
      threshold: 0.3,
    };

    const fuse = new Fuse([...posts, ...catalog], options);
    const result = fuse.search(query);
    const data = result.map<PostProps | CatalogProps>(
      ({ item }) => item as PostProps | CatalogProps
    );
    setSearchResult(data);
    setSearchPerformed(true);
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
