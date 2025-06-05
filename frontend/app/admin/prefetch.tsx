"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { fetchOverviewIndex } from "@/redux/catalogSlice";

const PreFetch = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchOverviewIndex());
  }, [dispatch]);

  return null;
};

export default PreFetch;
