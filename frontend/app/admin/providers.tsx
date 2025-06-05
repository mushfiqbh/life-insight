"use client";

import { AdminProvider } from "@/context/AdminContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";

export default function Providers({ children }: { children: ReactNode }) {
  // Use a state so that QueryClient persists across re-renders
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <AdminProvider>{children}</AdminProvider>
    </QueryClientProvider>
  );
}
