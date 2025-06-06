"use client";

import React from "react";
import ConditionProps from "@/types/conditionProps";
import PostProps from "@/types/postProps";
import ItemSearch from "./ItemSearch";

export default function SearchList({
  data,
}: {
  data: (PostProps | ConditionProps)[];
}) {
  return (
    <div className="flex flex-col gap-3 mb-10">
      {data?.map((item, index) => (
        <ItemSearch post={item} key={index} />
      ))}
    </div>
  );
}

