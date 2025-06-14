"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import LoadingSpinner from "@/components/ui/loading-spinner";
import PostGrid from "@/components/showcase/PostGrid";
import Accordion from "@/components/ui/accordion";
import { fetchCondition } from "@/redux/conditionsSlice";

const Condition = () => {
  const { label } = useParams() as { label: string };
  const [activeKey, setActiveKey] = useState(0);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch<AppDispatch>();
  const condition = useSelector(
    (state: RootState) => state.conditions.condition
  );

  useEffect(() => {
    dispatch(fetchCondition(label)).finally(() => setLoading(false));
  }, [label, dispatch]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!condition) {
    return (
      <div className="w-full mt-12 p-5 md:p-20 bg-white">
        Condition Not Found
        <Link href="/conditions" className="p-1 text-blue-700 underline">
          Explore Conditions
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full mt-16 p-5 md:p-20">
      <Link className="font-semibold" href="">
        {condition?.label?.toUpperCase()}
      </Link>
      <h1 className="text-4xl font-bold mt-2">{condition.title}</h1>

      <ul className="flex gap-4 text-gray-600 mt-4">
        <li>
          পর্যালোচনা করেছেন{" "}
          <Link href="" className="text-blue-500">
            {condition.author?.name}
          </Link>
        </li>
        <li>
          সময় <span>{condition.updatedAt?.split("T")[0]}</span>
        </li>
      </ul>

      <div className="flex flex-wrap gap-4 mt-6">
        {condition.keyterms?.map(
          (item, index) =>
            item.key && (
              <Link
                key={index}
                href={`/condition/${item.key}`}
                className="px-4 py-2 text-green-600 border border-green-500 rounded-md text-lg font-semibold transition hover:bg-green-500 hover:text-white"
              >
                {item.key}
              </Link>
            )
        )}
      </div>

      <blockquote className="my-6 p-6 bg-gray-100 border-l-4 border-green-500 text-lg text-gray-800">
        {condition.desc}
      </blockquote>

      {condition.faqs.length > 0 && condition.faqs[0].question && (
        <ul className="my-6 border border-green-500 rounded-lg p-4">
          <h2 className="text-xl font-bold text-white bg-green-500 p-2 rounded-t-md">
            প্রায়ই জিজ্ঞাসিত প্রশ্নোত্তর
          </h2>
          {<Accordion dataArr={condition.faqs} />}
        </ul>
      )}

      {condition.keyterms.length > 0 && condition.keyterms[0].key && (
        <div className="my-6 border border-green-500 rounded-lg p-4">
          <h2 className="text-xl font-bold text-white bg-green-500 p-2 rounded-t-md">
            তথ্য সুচক
          </h2>
          <div className="flex flex-wrap gap-2 p-4">
            {condition.keyterms.map(
              (item, index) =>
                item.key && (
                  <b
                    key={index}
                    className={`px-3 py-1 cursor-pointer rounded-md text-lg ${
                      activeKey === index
                        ? "bg-green-500 text-white"
                        : "bg-gray-200"
                    }`}
                    onClick={() => setActiveKey(index)}
                  >
                    {item.key}
                  </b>
                )
            )}
          </div>
          <div className="p-4 text-lg">
            <b className="text-gray-600">{condition.keyterms[activeKey].key}</b>
            <p>{condition.keyterms[activeKey].terms}</p>
          </div>
        </div>
      )}

      <h2 className="text-2xl font-semibold mt-6">এই ওভারভিউ এর সমস্ত পোস্ট</h2>
      <PostGrid label={label} />
    </div>
  );
};

export default Condition;
