"use client";

import { useState } from "react";
import { Stack } from "@mui/material";
import ToggleButtons from "@/components/admin/ToggleButtons";
import PostList from "@/components/showcase/PostList";
import ConditionList from "@/components/showcase/ConditionList";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const AdminDashboardPage = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"posts" | "conditions">("posts");

  return (
    <div className="w-fit mx-auto p-4 mt-20">
      {/* Toggle between posts and conditions */}
      <Stack
        spacing={2}
        direction="row"
        className="w-full flex-wrap gap-2 bg-background p-4 rounded-lg shadow-md"
      >
        <ToggleButtons activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Buttons to create post and create condition */}

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
            router.push("/admin/condition");
          }}
        >
          Create Condition
        </Button>
      </Stack>

      {/* Render Posts or Conditions */}
      {activeTab === "posts" && <PostList />}
      {activeTab === "conditions" && <ConditionList />}
    </div>
  );
};

export default AdminDashboardPage;
