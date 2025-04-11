import { AdminProvider } from "@/context/AdminContext";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin - Life Insight",
  description: "Implementing Redux in Next(App Router)",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AdminProvider>
      <div className="admin">
        <main>{children}</main>
      </div>
    </AdminProvider>
  );
}
