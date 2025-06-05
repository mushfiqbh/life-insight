"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { topics } from "@/assets/assets";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchConditionIndex } from "@/redux/conditionsSlice";
import { useTranslations } from "next-intl";
import LoadingSpinner from "@/components/ui/loading-spinner";

const Page: React.FC = () => {
  const [activeAlpha, setActiveAlpha] = useState<string>("All");
  const [alphas, setAlphas] = useState<string[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const conditions = useSelector((state: RootState) => state.conditions.index);
  const [loading, setLoading] = useState<boolean>(true);
  const t = useTranslations("explore");

  useEffect(() => {
    if (conditions) {
      setLoading(false);
    }
  }, [conditions]);

  useEffect(() => {
    dispatch(fetchConditionIndex());
  }, [dispatch]);

  useEffect(() => {
    if (!conditions || !Array.isArray(conditions)) return;

    const alphabet = Array.from(
      new Set(
        conditions
          .map((item) => item?.title?.[0])
          .concat(
            conditions
              .map((item) => item?.subtitle?.[0]?.toUpperCase())
              .filter(Boolean)
          )
      )
    );

    setAlphas(["All", ...alphabet.sort()]);
  }, [conditions]);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="atoz mt-24">
      <div className="w-full p-5 md:px-[10%] md:flex justify-between bg-primary_green">
        <h1 className="text-xl mb-2 font-bold text-white">এটুজেড কন্ডিশন</h1>
        <div className="flex flex-wrap items-center justify-start gap-6">
          {topics.map((item, index) => (
            <Link href={item.link} key={index} className="text-center">
              <Image
                src={item.icon}
                alt={item.title}
                width={100}
                height={100}
                className="h-16 w-16"
              />
              <h4 className="text-white">{t(item.title)}</h4>
            </Link>
          ))}
        </div>
      </div>

      <div className="w-full md:w-4/5 mx-auto p-5">
        <h3 className="text-lg text-gray-800">প্রথম বর্ণ দিয়ে খুঁজুন</h3>
        <div className="flex flex-wrap gap-2 mt-2">
          {alphas.map((alpha, index) => (
            <b
              key={index}
              className={`px-3 py-2 border rounded cursor-pointer transition ${
                alpha === activeAlpha
                  ? "bg-green-500 text-white"
                  : "border-green-500"
              }`}
              onClick={() => setActiveAlpha(alpha)}
            >
              {alpha === "All" ? "সব" : alpha}
            </b>
          ))}
        </div>
      </div>

      <div className="w-full md:w-4/5 mx-auto p-5 flex flex-wrap gap-5 font-bold">
        {conditions.map((item, index) => {
          if (
            activeAlpha === "All" ||
            activeAlpha === item.title[0] ||
            activeAlpha === item.subtitle[0]
          ) {
            return (
              <Link
                href={`/condition/${item.label}`}
                key={index}
                className="w-36"
              >
                {item.title}
                <br />
                <span className="opacity-70">({item.subtitle})</span>
              </Link>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default Page;
