"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button, Stack } from "@mui/material";
import PostList from "@/components/showcase/postlist";
import CatalogList from "@/components/showcase/cataloglist";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import LoadingSpinner from "@/components/ui/loading-spinner";
import PostProps from "@/types/postProps";

const Page = () => {
  const { posts, loading: loading1 } = useSelector(
    (state: RootState) => state.posts
  );
  const { catalog, loading: loading2 } = useSelector(
    (state: RootState) => state.catalogs
  );
  const [toggle, setToggle] = useState(true);
  const [postList, setPostList] = useState<PostProps[]>([]);
  const router = useRouter();

  const labelList = catalog.map((item) => item.label);
  const nonLabeledPosts = posts.filter(
    (item) => !labelList.includes(item.label)
  );

  useEffect(() => {
    setPostList([...posts].reverse());
  }, [posts]);

  const reverser = (list: PostProps[]) => [...list].reverse();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    if (value === "ALL") {
      setPostList(reverser(posts));
    } else if (value === "NON") {
      setPostList(reverser(nonLabeledPosts));
    } else {
      const filterPosts = posts.filter(
        (item) => item.label.toLowerCase() === value
      );
      setPostList(reverser(filterPosts));
    }
  };

  if (loading1 && loading2) {
    return <LoadingSpinner />;
  }

  return (
    <div className="p-4 mt-20">
      <Stack
        spacing={2}
        direction="row"
        className="w-4/5 mx-auto flex-wrap gap-2 bg-white p-4 rounded-lg shadow-md"
      >
        <Button
          variant={toggle ? "contained" : "outlined"}
          color="info"
          onClick={() => setToggle(true)}
        >
          POST LIST
        </Button>
        <Button
          variant={toggle ? "outlined" : "contained"}
          color="info"
          onClick={() => setToggle(false)}
        >
          OVERVIEW LIST
        </Button>
        <Button
          variant="text"
          color="info"
          onClick={() => router.push("/admin/post")}
        >
          Add Post
        </Button>
        <Button
          variant="text"
          color="info"
          onClick={() => router.push("/admin/label")}
        >
          Add Overview
        </Button>
        <select
          name="bycatalog"
          onChange={handleChange}
          disabled={!toggle}
          className="p-2 text-sm border-none outline-none bg-white hover:bg-gray-100 rounded-md"
        >
          <option value="ALL">ALL LABEL</option>
          {catalog?.map((item, index) => (
            <option value={item.label} key={index}>
              {item.subtitle}
            </option>
          ))}
          <option value="NON">NON LABELED</option>
        </select>
      </Stack>

      <div className="mt-4">
        {toggle ? <PostList data={postList} /> : <CatalogList data={catalog} />}
      </div>
    </div>
  );
};

export default Page;
