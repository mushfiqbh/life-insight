import type { Metadata } from "next";
import { SearchProvider } from "@/context/SearchContext";

export const metadata: Metadata = {
  title: "Search - Next-Redux",
  description: "Implementing Redux in Next(App Router)",
};

export default function Layout({
  children,
  conditions,
  searchBar,
}: {
  children: React.ReactNode;
  conditions: React.ReactNode;
  searchBar: React.ReactNode;
}) {
  return (
    <SearchProvider>
      <div className="w-full md:w-fit mx-auto p-4 mt-20">
        {searchBar}
        {children}
        {conditions}
      </div>
    </SearchProvider>
  );
}
