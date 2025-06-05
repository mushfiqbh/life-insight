"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { fetchConditionIndex } from "@/redux/conditionsSlice";

const PreFetch = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchConditionIndex());
  }, [dispatch]);

  return null;
};

export default PreFetch;
