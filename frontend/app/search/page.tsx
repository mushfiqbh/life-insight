"use client";

import SearchList from "@/components/showcase/SearchList";
import { useSearchContext } from "@/context/SearchContext";
import React from "react";

const Page = () => {
  const { searchResult, searchPerformed } = useSearchContext();

  return (
    <div>
      {searchPerformed ? (
        <div className="search-parent">
          <h3 className="text-center p-2 text-gray-400 md:text-left">
            {searchResult.length} টি ফলাফল পাওয়া গেছে
          </h3>
          <SearchList data={searchResult} />
        </div>
      ) : (
        Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 rounded-lg shadow-sm text-foreground bg-background hover:shadow-md transition"
          >
            <div className="flex items-center gap-4 flex-1">
              <div className="w-14 h-14 flex-shrink-0 overflow-hidden rounded-md bg-gray-200 animate-pulse"></div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold bg-gray-200 animate-pulse h-6 w-3/4 mb-2"></h3>
                <p className="text-sm line-clamp-1 bg-gray-200 animate-pulse h-4 w-full"></p>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Page;
