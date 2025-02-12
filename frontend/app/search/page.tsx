"use client";

import { useState } from "react";
import Catalogs from "@/components/catalogs";
import SearchList from "@/components/showcase/searchlist";
import PostProps from "@/types/postProps";
import CatalogProps from "@/types/catalogProps";
import Searchbar from "./search-bar";

const Page = () => {
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [searchResult, setSearchResult] = useState<(PostProps | CatalogProps)[]>([]);

  return (
    <div className="w-4/5 mx-auto bg-white p-4 md:w-full md:mx-0 mt-20">
      <Searchbar
        setSearchResult={setSearchResult}
        setSearchPerformed={setSearchPerformed}
      />
      {searchPerformed && (
        <>
          <h3 className="text-center p-2 text-gray-400 md:text-left">
            {searchResult.length} টি ফলাফল পাওয়া গেছে
          </h3>
          <SearchList data={searchResult} />
        </>
      )}
      <Catalogs />
    </div>
  );
};

export default Page;
