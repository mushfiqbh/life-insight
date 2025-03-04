"use client";

import SearchList from "@/components/showcase/searchlist";
import { useSearchContext } from "@/context/SearchContext";
import React from "react";

const Page = () => {
  const { searchResult, searchPerformed } = useSearchContext();

  return (
    <div>
      {searchPerformed && (
        <div className="search-parent">
          <h3 className="text-center p-2 text-gray-400 md:text-left">
            {searchResult.length} টি ফলাফল পাওয়া গেছে
          </h3>
          <SearchList data={searchResult} />
        </div>
      )}
    </div>
  );
};

export default Page;

