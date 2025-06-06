"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { deleteCondition } from "@/redux/conditionsSlice";
import ConditionProps from "@/types/conditionProps";
import { detectLanguage } from "@/lib/detectLanguage";

export default function ItemCondition({
  condition,
}: {
  condition: ConditionProps;
}) {
  const [language, setLanguage] = useState<string>("en");
  const userInfo = useSelector((state: RootState) => state.user.userInfo);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    setLanguage(detectLanguage(condition?.title));
  }, [condition, setLanguage]);

  return (
    <div
      lang={language}
      className="flex items-center justify-between p-4 border rounded-lg shadow-sm text-foreground bg-background hover:shadow-md transition"
    >
      <Link
        target="_blank"
        href={`/condition/${condition.label}`}
        className="flex-1 flex items-center gap-4"
      >
        <div className="flex-1">
          <h3 className="text-lg font-semibold">{condition.title}</h3>
          <p className="text-sm">
            <b>{condition?.postIds?.length} Posts</b> Labeled For{" "}
            <b>{condition.label}</b> Reviewed By <b>{condition.author.name}</b>
          </p>
        </div>
      </Link>

      <div className="flex gap-2">
        {userInfo?.permissions?.includes("edit") && (
          <Link
            href={`/admin/condition/${condition._id}`}
            className="px-3 py-1 text-sm font-medium text-blue-600 border border-blue-600 rounded-md hover:bg-blue-600 hover:text-white transition"
          >
            Edit
          </Link>
        )}
        {userInfo?.permissions?.includes("delete") && (
          <button
            className="px-3 py-1 text-sm font-medium text-red-600 border border-red-600 rounded-md hover:bg-red-600 hover:text-white transition"
            onClick={() => {
              if (confirm("Are you sure to delete?") && condition._id) {
                dispatch(deleteCondition(condition._id));
              }
            }}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}
