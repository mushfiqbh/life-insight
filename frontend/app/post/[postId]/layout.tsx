import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Post - Next-Redux",
  description: "Implementing Redux in Next(App Router)",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="">
      {children}
    </div>
  );
}
