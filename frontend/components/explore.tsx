import React from "react";
import Image from "next/image";
import Link from "next/link";
import { quizes, topics } from "@/assets/assets";

const Explore: React.FC = () => {
  return (
    <div
      className="w-full md:w-5/6 p-2 md:m-auto flex flex-col md:flex-row gap-2 flex-wrap md:flex-nowrap border border-gray-100 rounded-lg"
      id="explore"
    >
      {/* Left Section */}
      <div className="w-full md:w-1/3 p-5">
        <h3 className="text-lg font-semibold">একটি কুইজ নিন</h3>
        <br />
        <div className="flex flex-col space-y-2">
          {quizes.map((quiz, index) => (
            <React.Fragment key={index}>
              <Link
                href={quiz.link}
                className="flex justify-between items-center text-lg hover:text-red-500"
              >
                <p>{quiz.quesion}</p>
                <Image src={quiz.icon} alt={quiz.alt} className="w-10 h-10" />
              </Link>
              {index < 3 && <hr className="opacity-30" />}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full md:w-2/3 p-5">
        <h3 className="text-lg font-semibold">মানসিক সাস্থ্য</h3>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-5 text-center mt-5">
          {topics.map((topic, index) => (
            <Link href="" key={index} className="hover:text-red-500">
              <Image
                src={topic.icon}
                alt={topic.alt}
                height={96}
                width={96}
                className="md:w-32 md:h-32"
              />

              <h4 className="mt-2">{topic.topic}</h4>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Explore;
