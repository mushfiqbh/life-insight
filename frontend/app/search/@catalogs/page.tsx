import React from "react";
import Link from "next/link";
import { catalogue } from "@/assets/assets";

const Catalogs: React.FC = () => {
  return (
    <div className="w-full p-5 flex flex-col items-center gap-5" id="catalog">
      {catalogue?.map((set, index) => (
        <div key={index} className="min-w-[50%] sm:min-w-full">
          <Link href={set.pathname}>
            <h1 className="text-green-600 hover:text-red-600 text-xl font-bold">
              {set.title}
            </h1>
          </Link>
          <hr className="my-2" />
          <div className="grid grid-cols-3 gap-2 py-5 sm:grid-cols-2">
            {set.includes.map((item, idx) => (
              <Link
                key={idx}
                href={item.pathname}
                className="font-semibold hover:text-red-600"
              >
                {item.subtitle}
              </Link>
            ))}
          </div>
          <Link
            href={set.pathname}
            className="text-gray-400 font-semibold hover:text-red-600"
          >
            সবগুলো দেখুন
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Catalogs;
