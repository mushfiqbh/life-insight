import React from "react";
import Statbar from "@/components/home/statbar";
import Explore from "@/components/home/explore";
import Section from "@/components/home/section";
import Spotlight from "@/components/home/spotlight";

const Page = () => {
  return (
    <div className="mt-20">
      <Statbar />
      <Spotlight />
      <Explore />
      <Section />
    </div>
  );
};

export default Page;
