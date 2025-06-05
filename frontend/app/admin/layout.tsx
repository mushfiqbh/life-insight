import type { Metadata } from "next";
import PreFetch from "./prefetch";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "Admin - Life Insight",
  description: "Implementing Redux in Next(App Router)",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <PreFetch />
      <div className="admin">
        <main>{children}</main>
      </div>
    </Providers>
  );
}
