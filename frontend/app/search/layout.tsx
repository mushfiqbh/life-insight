import type { Metadata } from "next";
import { SearchProvider } from "@/context/SearchContext";

export const metadata: Metadata = {
  title: "Search - Next-Redux",
  description: "Implementing Redux in Next(App Router)",
};

export default function Layout({
  children,
  catalogs,
  searchBar,
}: {
  children: React.ReactNode;
  catalogs: React.ReactNode;
  searchBar: React.ReactNode;
}) {
  return (
    <SearchProvider>
      <div className="w-4/5 mx-auto bg-white p-4 md:w-full md:mx-0 mt-20">
        {searchBar}
        {children}
        {catalogs}
      </div>
    </SearchProvider>
  );
}
