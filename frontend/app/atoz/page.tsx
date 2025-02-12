"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
// import { assets } from "@/assets/assets";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const Page: React.FC = () => {
  const [activeAlpha, setActiveAlpha] = useState<string>("All");
  const [alphas, setAlphas] = useState<string[]>([]);

  const catalog = useSelector((state: RootState) => state.catalogs.catalog);

  useEffect(() => {
    if (!catalog || !Array.isArray(catalog)) return;

    const alphabet = Array.from(
      new Set(
        catalog
          .map((item) => item?.title?.[0])
          .concat(
            catalog
              .map((item) => item?.subtitle?.[0]?.toUpperCase())
              .filter(Boolean)
          )
      )
    );

    setAlphas(["All", ...alphabet.sort()]);
  }, [catalog]);

  return (
    <>
      <div className="w-full p-5 md:px-[10%] flex justify-between bg-green-500">
        <h1 className="text-xl font-bold text-white">এটুজেড কন্ডিশন</h1>
        {/* <div className="flex items-center justify-end gap-6">
          {[
            { src: assets.meditation, label: "ধ্যান" },
            { src: assets.brain_health, label: "উন্নতি" },
            { src: assets.adhd, label: "ADHD" },
            { src: assets.anxiety, label: "দুশ্চিন্তা" },
            { src: assets.addiction, label: "অনুরতি" },
            { src: assets.psychology, label: "মনোবিজ্ঞান" },
          ].map((item, index) => (
            <Link href="" key={index} className="text-center">
              <video src={item.src} className="h-16 w-16" />
              <h4 className="text-white">{item.label}</h4>
            </Link>
          ))}
        </div> */}
      </div>

      <div className="w-4/5 mx-auto p-5 bg-white">
        <h3 className="text-lg font-semibold text-gray-800">
          প্রথম বর্ণ দিয়ে খুঁজুন
        </h3>
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

      <div className="w-4/5 mx-auto p-5 bg-white flex flex-wrap gap-5 font-bold">
        {catalog.map((item, index) => {
          if (
            activeAlpha === "All" ||
            activeAlpha === item.title[0] ||
            activeAlpha === item.subtitle[0]
          ) {
            return (
              <Link
                href={`/overview/${item.label}`}
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
    </>
  );
};

export default Page;
