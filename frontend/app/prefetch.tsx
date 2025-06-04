"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import {
  getUserInfo,
  setToken,
  loadTokenFromStorage,
} from "@/redux/usersSlice";
import Cookies from "js-cookie";

const PreFetch = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(setToken(Cookies.get("token") || ""));
    dispatch(getUserInfo());
    dispatch(loadTokenFromStorage());
  }, [dispatch]);

  return null;
};

export default PreFetch;
