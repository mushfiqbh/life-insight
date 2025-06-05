"use client";

import { useParams } from "next/navigation";
import ConditionForm from "@/components/admin/ConditionForm";

const Page = () => {
  const { conditionId } = useParams() as { conditionId: string };

  return <ConditionForm conditionId={conditionId} />;
};

export default Page;
