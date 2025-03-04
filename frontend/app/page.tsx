import React from "react";
import Statbar from "@/components/statbar";
import Content from "@/components/content";
import Explore from "@/components/explore";
import Section from "@/components/section";

const page = async () => {
  return (
    <div className="mt-16">
      <Statbar />
      <Content />
      <Explore />
      <Section />
    </div>
  );
};

export default page;
