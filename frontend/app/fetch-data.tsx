"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { fetchPosts } from "@/redux/postsSlice";
import { fetchCatalog } from "@/redux/catalogSlice";
import { setToken } from "@/redux/usersSlice";
import Cookies from "js-cookie";

const FetchData = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(setToken(Cookies.get("token") || ""));
    dispatch(fetchPosts());
    dispatch(fetchCatalog());
  }, [dispatch]);

  return null;
};

export default FetchData;
