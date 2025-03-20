import React from "react";
import Image from "next/image";
import { assets } from "@/assets/assets";
import { useTranslations } from "next-intl";

const Statbar: React.FC = () => {
  const t = useTranslations("statbar");

  return (
    <div className="w-full min-h-[5.5rem] bg-deep_blue text-white flex flex-col md:flex-row items-center justify-between p-[10px] md:px-[10%]">
      <div className="w-full md:w-[55%] min-h-[5.5rem] text-sm md:text-lg flex items-center justify-between md:pt-[10px] md:pr-5">
        <div>
          <h3>{t("bio")}</h3>
          <h3 className="text-md text-[#2ebe7e]">{t("slogan")}</h3>
        </div>
        <Image
          src={assets.logo}
          alt="logo"
          width={100}
          height={100}
          className="float-right md:float-none"
        />
      </div>
      <div className="w-full md:w-[45%] text-sm md:text-lg flex items-center justify-between gap-2">
        {[
          { value: "150M+", label: t("readers") },
          { value: "100+", label: t("exparts") },
          { value: "100+", label: t("topics") },
        ].map((stat, index) => (
          <div
            key={index}
            className="flex items-center cursor-pointer border-l border-dashed hover:text-red-500 transition-all duration-200"
          >
            <div className="pl-2">
              <h3 className="text-xl font-bold">{stat.value}</h3>
              <h4 className="text-sm">{stat.label}</h4>
            </div>
            <b className="ml-2 text-3xl">&#129170;</b>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Statbar;
