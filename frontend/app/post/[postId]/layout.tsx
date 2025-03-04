import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Post - Next-Redux",
  description: "Implementing Redux in Next(App Router)",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-4/5 mx-auto bg-white p-4 md:w-full md:mx-0 mt-20">
      {children}
    </div>
  );
}
