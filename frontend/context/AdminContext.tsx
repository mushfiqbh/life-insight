"use client";
import {
  createContext,
  useState,
  useContext,
  Dispatch,
  SetStateAction,
} from "react";

interface AdminContextState {
  toggle: boolean;
  setToggle: Dispatch<SetStateAction<boolean>>;
  page1: number;
  page2: number;
  setPage1: Dispatch<SetStateAction<number>>;
  setPage2: Dispatch<SetStateAction<number>>;
}

const AdminContext = createContext<AdminContextState | null>(null);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [toggle, setToggle] = useState(true);
  const [page1, setPage1] = useState(1);
  const [page2, setPage2] = useState(1);

  return (
    <AdminContext.Provider
      value={{
        toggle,
        setToggle,
        page1,
        page2,
        setPage1,
        setPage2,
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
