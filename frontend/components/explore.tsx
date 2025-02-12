import React from "react";
import Image from "next/image";
import Link from "next/link";
import { assets } from "@/assets/assets";

const Explore: React.FC = () => {
  return (
    <div className="w-4/5 mx-auto flex gap-2 flex-wrap md:flex-nowrap" id="explore">
      {/* Left Section */}
      <div className="w-full md:w-1/3 p-5 bg-white border-r-4 border-b-4 border-gray-200">
        <h3 className="text-lg font-semibold">একটি কুইজ নিন</h3>
        <br />
        <div className="flex flex-col space-y-2">
          {["attachment", "gaslight", "emotion", "leadership"].map((quiz, index) => (
            <React.Fragment key={index}>
              <Link href="" className="flex justify-between items-center text-lg hover:text-red-500">
                <p>{quiz}</p>
                <Image src={assets[quiz]} alt="" className="w-10 h-10" />
              </Link>
              {index < 3 && <hr className="opacity-30" />}
            </React.Fragment>
          ))}
        </div>
      </div>
      
      {/* Right Section */}
      <div className="w-full md:w-2/3 p-5 bg-white border-r-4 border-b-4 border-gray-200">
        <h3 className="text-lg font-semibold">মানসিক সাস্থ্য</h3>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-5 text-center mt-5">
          {["meditation", "brain_health", "adhd", "anxiety", "addiction", "psychology"].map((topic, index) => (
            <Link href="" key={index} className="hover:text-red-500">
              <video src={assets[topic]} className="w-24 h-24 md:w-32 md:h-32"></video>
              <h4 className="mt-2">{topic}</h4>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Explore;
