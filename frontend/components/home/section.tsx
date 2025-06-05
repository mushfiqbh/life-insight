import React from "react";
import Image from "next/image";
import Link from "next/link";
import { sections } from "@/assets/assets";
import { useTranslations } from "next-intl";

const Section = () => {
  const t = useTranslations("section");

  return (
    <div className="w-full md:w-5/6 px-2 md:px-0 mx-auto">
      <div className="bg-transparent my-4 py-4">
        <h3 className="pl-5">{t("promise")}</h3>
        <div className="p-5 md:p-10 mt-2 rounded-xl bg-mint_green flex flex-col md:flex-row items-center justify-around">
          <div className="pb-5">
            <h2>{t("promiseHead")}</h2>
            <br />
            <Link
              href=""
              className="p-4 text-sm text-white rounded-md bg-green-600 hover:bg-green-800 transition-all"
            >
              {t("promiseBtn")}
            </Link>
          </div>
          {sections.promises.map((step, index) => (
            <div key={index} className="text-center flex md:flex-col">
              <Image src={step.img} alt="" className="w-24 mx-auto" />
              <h4>{t(step.text)}</h4>
            </div>
          ))}
        </div>
      </div>

      <div className="my-4 py-4 shadow1 rounded-lg">
        <h3 className="pl-5">{t("review")}</h3>
        <div className="mt-3 md:flex rounded-lg">
          <div className="md:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-5 ml-[10px]">
            {sections.reviewBoard.map(({ name, role, image, width }, index) => (
              <Link
                key={index}
                href=""
                className="flex items-center gap-[10px] hover:text-red-500"
              >
                <Image
                  className="rounded-sm"
                  src={image}
                  alt=""
                  width={width}
                />
                <div>
                  <h4>{name}</h4>
                  <p>{role}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="md:w-1/2 flex flex-col items-center justify-center gap-5 md:px-10 py-10">
            <h2>{t("reviewHead")}</h2>
            <Link
              href=""
              className="self-center md:self-start p-4 bg-green-700 hover:bg-slate-700 text-white rounded-md transition-all duration-200"
            >
              {t("reviewBtn")}
            </Link>
          </div>
        </div>
      </div>

      {/* Award Section */}
      <div className="bg-transparent my-4 py-4">
        <h3>{t("awards")}</h3>
        <div className="mt-3 flex flex-col items-start md:flex-row md:items-center justify-between gap-3">
          {sections.rewards.map(({ title, image }, index) => (
            <div key={index}>
              <Image src={image} alt="award_logo" width={100} className="h-auto" />
              <h4>{title}</h4>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Section;
