import React from "react";
import Image from "next/image";
import Link from "next/link";
import { assets } from "@/assets/assets";

const Section = () => {
  return (
    <div className="w-full">
      <div className="w-4/5 mx-auto my-4 bg-transparent p-4">
        <h3 className="pl-5">আমাদের প্রতিশ্রুতি</h3>
        <div className="p-5 mt-2 rounded-xl bg-green-500 flex flex-wrap items-center justify-around">
          <div className="w-1/3 pb-5">
            <h2>
              আমাদের বিষয়বস্তু আপনাকে আপনার মানসিক জন্য সেরা পছন্দ করতে সাহায্য
              করে মঙ্গল
            </h2>
            <br />
            <Link
              href=""
              className="p-4 text-white rounded-md bg-green-600 hover:bg-green-800 transition-all"
            >
              আমাদের প্রক্রিয়া সম্পর্কে পড়ুন
            </Link>
          </div>
          {[
            {
              img: assets.health_expert,
              text: "লিখেছেন মানসিক স্বাস্থ্য বিশেষজ্ঞ এবং সাংবাদিক",
            },
            {
              img: assets.fact_checked,
              text: "বিজ্ঞান-সমর্থিত গবেষণার সাথে ফ্যাক্ট-চেক করা হয়েছে",
            },
            {
              img: assets.medical_reviewd,
              text: "চিকিত্সক এবং মানসিক স্বাস্থ্য পেশাদারদের দ্বারা পর্যালোচনা",
            },
            {
              img: assets.update,
              text: "সর্বশেষ স্বাস্থ্য তথ্য প্রতিফলিত করার জন্য আপডেট",
            },
          ].map((step, index) => (
            <div key={index} className="w-1/5 text-center">
              <Image src={step.img} alt="" className="w-24 mx-auto" />
              <h4>{step.text}</h4>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Section;
