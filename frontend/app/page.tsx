import React from "react";
import Statbar from "@/components/statbar";
import Explore from "@/components/explore";
import Section from "@/components/section";
import Spotlight from "@/components/spotlight";

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
