"use client";
import ConditionProps from "@/types/conditionProps";
import PostProps from "@/types/postProps";
import { Dispatch, SetStateAction } from "react";
import { createContext, useState, useContext } from "react";

interface SearchContextState {
  searchPerformed: boolean;
  setSearchPerformed: Dispatch<SetStateAction<boolean>>;
  searchResult: (PostProps | ConditionProps)[];
  setSearchResult: Dispatch<SetStateAction<(PostProps | ConditionProps)[]>>;
}

const SearchContext = createContext<SearchContextState | null>(null);

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [searchPerformed, setSearchPerformed] = useState<boolean>(false);
  const [searchResult, setSearchResult] = useState<
    (PostProps | ConditionProps)[]
  >([]);

  return (
    <SearchContext.Provider
      value={{
        searchPerformed,
        setSearchPerformed,
        searchResult,
        setSearchResult,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export function useSearchContext(): SearchContextState {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
}
