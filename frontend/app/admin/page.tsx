"use client";

import { useState } from "react";
import { Stack } from "@mui/material";
import ToggleButtons from "@/components/admin/ToggleButtons";
import PostList from "./components/PostList";
import CategoryList from "./components/CategoryList";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const AdminDashboardPage = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"posts" | "categories">("posts");

  return (
    <div className="w-fit mx-auto p-4 mt-20">
      {/* Toggle between posts and categories */}
      <Stack
        spacing={2}
        direction="row"
        className="w-full flex-wrap gap-2 bg-background p-4 rounded-lg shadow-md"
      >
        <ToggleButtons activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Buttons to create post and create category */}

        <Button
          variant="text"
          onClick={() => {
            router.push("/admin/post");
          }}
        >
          Create Post
        </Button>

        <Button
          variant="text"
          onClick={() => {
            router.push("/admin/label");
          }}
        >
          Create Category
        </Button>
      </Stack>

      {/* Render Posts or Categories */}
      {activeTab === "posts" && <PostList />}
      {activeTab === "categories" && <CategoryList />}
    </div>
  );
};

export default AdminDashboardPage;
