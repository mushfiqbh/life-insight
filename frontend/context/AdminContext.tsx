"use client";
import PostProps from "@/types/postProps";
import {
  createContext,
  useState,
  useContext,
  Dispatch,
  SetStateAction,
} from "react";

interface AdminContextState {
  data: PostProps;
  setData: Dispatch<SetStateAction<PostProps>>;
}

const AdminContext = createContext<AdminContextState | null>(null);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<PostProps>({
    _id: "",
    readingTime: 0,
    views: 0,
    adminChoice: false,
    label: "",
    title: "",
    subtitle: "",
    author: {
      name: "",
      bio: "",
    },
    editors: [],
    sources: [{ text: "", href: "" }],
    content: "",
    image: "",
    date: new Date().toISOString(),
  });

  return (
    <AdminContext.Provider
      value={{
        data,
        setData,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdminContext(): AdminContextState {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
}
