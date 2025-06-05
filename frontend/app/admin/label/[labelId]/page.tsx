"use client"

import { useParams } from "next/navigation";
import LabelForm from "@/components/admin/LabelForm";

const Page = () => {
  const { labelId } = useParams() as { labelId: string };

  return <LabelForm labelId={labelId} />;
};

export default Page;
