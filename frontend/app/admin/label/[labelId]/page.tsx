"use client"

import { useParams } from "next/navigation";
import LabelForm from "../label-form";

const Page = () => {
  const { labelId } = useParams() as { labelId: string };

  return <LabelForm labelId={labelId} />;
};

export default Page;
