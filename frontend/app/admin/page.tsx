"use client";

import { useRouter } from "next/navigation";
import { Stack } from "@mui/material";
import { Button } from "@/components/ui/button";
import { useAdminContext } from "@/context/AdminContext";
import PostPagination from "./_posts/page";
import OverviewPagination from "./_overviews/page";

const Page = () => {
  const router = useRouter();
  const { toggle, setToggle } = useAdminContext();

  return (
    <div className="p-4 mt-20">
      <Stack
        spacing={2}
        direction="row"
        className="w-full flex-wrap gap-2 bg-background p-4 rounded-lg shadow-md"
      >
        <Button
          variant={toggle ? "contained" : "outlined"}
          onClick={() => setToggle(true)}
        >
          POST LIST
        </Button>
        <Button
          variant={toggle ? "outlined" : "contained"}
          onClick={() => setToggle(false)}
        >
          OVERVIEW LIST
        </Button>
        <Button variant="text" onClick={() => router.push("/admin/post")}>
          Add Post
        </Button>
        <Button variant="text" onClick={() => router.push("/admin/label")}>
          Add Overview
        </Button>
      </Stack>
      {toggle ? <PostPagination /> : <OverviewPagination />}
    </div>
  );
};

export default Page;
