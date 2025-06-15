
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { useAssessmentFlow } from "@/hooks/useAssessmentFlow";
import AssessmentStageManager from "./AssessmentStageManager";

export default function AssessmentFlow() {
  const assessmentState = useAssessmentFlow();

  return (
    <>
      <AssessmentStageManager {...assessmentState} />
      <Toaster />
    </>
  );
}
