import React from "react";
import Link from "next/link";
import { grouped_conditions } from "@/assets/assets";

const Conditions: React.FC = () => {
  return (
    <div className="w-full flex flex-col gap-5" id="condition">
      {grouped_conditions?.map((set, index) => (
        <div key={index} className="min-w-[50%] sm:min-w-full">
          <Link href={set.pathname}>
            <h1 className="text-green-600 hover:text-red-600 text-xl font-bold">
              {set.title}
            </h1>
          </Link>
          <hr className="my-2" />
          <div className="flex flex-wrap gap-5 md:gap-12 py-5">
            {set.includes.map((item, idx) => (
              <Link
                key={idx}
                href={item.pathname}
                className="font-semibold rounded-lg border-2 border-background hover:border-foreground p-3"
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

export default Conditions;
