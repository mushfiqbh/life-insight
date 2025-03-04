"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { getUserInfo, setToken } from "@/redux/usersSlice";
import Cookies from "js-cookie";

const FetchData = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(setToken(Cookies.get("token") || ""));
    dispatch(getUserInfo(Cookies.get("token") || ""));
  }, [dispatch]);

  return null;
};

export default FetchData;
